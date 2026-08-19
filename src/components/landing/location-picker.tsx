'use client'

import { Loader2, LocateFixed, MapPin, Search } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useRef, useState } from 'react'

export type PickedLocation = {
  coordinates: number[]
  address: string
}

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org'

const DEFAULT_CENTER: [number, number] = [23.8103, 90.4125]

const markerIcon = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" fill="#d8321d"><path d="M12 2C8.13 2 5 5.13 5 8.2c0 5.35 7 13.55 7 13.55s7-8.2 7-13.55C19 5.13 15.87 2 12 2zm0 8.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z"/></svg>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
})

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  const res = await fetch(
    `${NOMINATIM_URL}/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    { headers: { Accept: 'application/json', 'Accept-Language': 'en' } }
  )
  if (!res.ok) return ''
  const data = (await res.json()) as unknown
  if (isObject(data) && typeof data.display_name === 'string') {
    return data.display_name
  }
  return ''
}

async function forwardGeocode(
  query: string
): Promise<{ lat: number; lng: number; address: string } | null> {
  const res = await fetch(
    `${NOMINATIM_URL}/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`,
    { headers: { Accept: 'application/json', 'Accept-Language': 'en' } }
  )
  if (!res.ok) return null
  const data = (await res.json()) as unknown
  if (Array.isArray(data)) {
    const first = data[0]
    if (
      isObject(first) &&
      typeof first.lat === 'string' &&
      typeof first.lon === 'string' &&
      typeof first.display_name === 'string'
    ) {
      return {
        lat: Number(first.lat),
        lng: Number(first.lon),
        address: first.display_name,
      }
    }
  }
  return null
}

export function LocationPicker({
  value,
  onChange,
}: {
  value: PickedLocation
  onChange: (location: PickedLocation) => void
}) {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [addressQuery, setAddressQuery] = useState(value.address)
  const [searching, setSearching] = useState(false)
  const [locating, setLocating] = useState(false)

  const hasCoordinates =
    Array.isArray(value.coordinates) && value.coordinates.length === 2

  const placeMarker = useCallback(
    (lat: number, lng: number) => {
      if (!mapRef.current) return
      if (!markerRef.current) {
        markerRef.current = L.marker([lat, lng], { icon: markerIcon })
          .addTo(mapRef.current)
          .bindTooltip('Service location', { permanent: false })
      } else {
        markerRef.current.setLatLng([lat, lng])
      }
      mapRef.current.setView([lat, lng], Math.max(mapRef.current.getZoom(), 14))
    },
    []
  )

  useEffect(() => {
    if (!containerRef.current) return

    const map = L.map(containerRef.current, {
      center: hasCoordinates
        ? [value.coordinates[1], value.coordinates[0]]
        : DEFAULT_CENTER,
      zoom: hasCoordinates ? 15 : 11,
      attributionControl: true,
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    mapRef.current = map

    if (hasCoordinates) {
      placeMarker(value.coordinates[1], value.coordinates[0])
    }

    map.on('click', async (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng
      placeMarker(lat, lng)
      const address = await reverseGeocode(lat, lng)
      const nextAddress = address || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      setAddressQuery(nextAddress)
      onChange({ coordinates: [lng, lat], address: nextAddress })
    })

    return () => {
      if (mapRef.current === map) {
        map.remove()
      }
      mapRef.current = null
      markerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSearch() {
    const query = addressQuery.trim()
    if (!query) return
    setSearching(true)
    try {
      const result = await forwardGeocode(query)
      if (result) {
        placeMarker(result.lat, result.lng)
        setAddressQuery(result.address)
        onChange({
          coordinates: [result.lng, result.lat],
          address: result.address,
        })
      }
    } finally {
      setSearching(false)
    }
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        placeMarker(latitude, longitude)
        const address = await reverseGeocode(latitude, longitude)
        const nextAddress =
          address || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
        setAddressQuery(nextAddress)
        onChange({
          coordinates: [longitude, latitude],
          address: nextAddress,
        })
        setLocating(false)
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex h-10 flex-1 items-center gap-2 bg-[#edf8ff] px-3 text-sm">
          <MapPin className="size-4 shrink-0" />
          <input
            value={addressQuery}
            onChange={(event) => setAddressQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleSearch()
              }
            }}
            placeholder="Search your address"
            className="w-full bg-transparent outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search address"
          disabled={searching}
          className="grid size-10 shrink-0 place-items-center rounded bg-[#2d76b9] text-white transition hover:bg-[#205f96] disabled:opacity-60"
        >
          {searching ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
        </button>
        <button
          type="button"
          onClick={handleUseMyLocation}
          aria-label="Use my current location"
          disabled={locating}
          className="grid size-10 shrink-0 place-items-center rounded bg-[#ff914d] text-white transition hover:bg-[#e67e3a] disabled:opacity-60"
        >
          {locating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <LocateFixed className="size-4" />
          )}
        </button>
      </div>

      <div className="h-64 w-full overflow-hidden rounded border border-[#8ebce8]">
        <div ref={containerRef} className="h-full w-full" />
      </div>

      <p className="text-xs text-[#667078]">
        Click anywhere on the map to pin your exact location.
      </p>
    </div>
  )
}