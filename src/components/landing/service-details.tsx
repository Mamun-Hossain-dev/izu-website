'use client'

import {
  getServiceById,
  getServicePrice,
  type Service,
} from '@/services/catalog-api'
import {
  createBooking,
  type CreateBookingPayload,
} from '@/services/booking-api'
import { useAuthStore } from '@/store/auth-store'
import { getApiErrorMessage } from '@/lib/api-error'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import { CatalogEmpty, CatalogError } from '@/components/landing/catalog-states'
import { type PickedLocation } from '@/components/landing/location-picker'
import { LocationPicker } from '@/components/landing/location-picker'
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  Navigation,
  Star,
  Tag,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

const fallbackAvatar = '/images/customer-rikan-bhart.jpg'

type ModalName = 'booking' | 'accepted' | 'confirm' | null

function ModalShell({
  children,
  onClose,
  label,
}: {
  children: React.ReactNode
  onClose: () => void
  label: string
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/65 p-4"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="my-auto w-full max-w-[590px] rounded-md bg-white p-3 shadow-2xl sm:p-6"
        onMouseDown={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

function DetailsSkeleton() {
  return (
    <div className="mx-auto mt-12 grid max-w-[1160px] gap-6 rounded-xl border border-[#8ebce8] p-3 lg:grid-cols-[390px_1fr]">
      <div className="space-y-2">
        <Skeleton className="h-[280px] w-full rounded-lg" />
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-[105px] rounded-md" />
          <Skeleton className="h-[105px] rounded-md" />
          <Skeleton className="h-[105px] rounded-md" />
        </div>
      </div>
      <div className="space-y-3 p-2 sm:p-3">
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-8 h-12 w-full rounded-full" />
      </div>
    </div>
  )
}

export function ServiceDetails({
  serviceId,
  categoryId,
}: {
  serviceId: string
  categoryId: string
}) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => getServiceById(serviceId),
  })

  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [modal, setModal] = useState<ModalName>(null)
  const [bookmarked, setBookmarked] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [bookingLocation, setBookingLocation] = useState<PickedLocation>({
    coordinates: [],
    address: '',
  })
  const [estimatedHours, setEstimatedHours] = useState(1)

  const bookingMutation = useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: (result) => {
      toast.success(result.message || 'Booking request sent successfully.')
      setModal(null)
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        router.push('/login')
        return
      }
      toast.error(
        getApiErrorMessage(err, 'Unable to create booking. Please try again.')
      )
    },
  })

  if (isLoading) return <DetailsSkeleton />
  if (isError) return <CatalogError error={error} onRetry={() => refetch()} />
  if (!data) {
    return (
      <CatalogEmpty
        title="Service not found"
        description="This service may have been removed or the link is incorrect."
      />
    )
  }

  const service: Service = data
  const details = service.serviceDetails
  const provider =
    typeof service.providerId === 'string' ? null : service.providerId
  const images = details.serviceThumbnails?.length
    ? details.serviceThumbnails
    : ['/images/service-cleaning.jpg']
  const price = getServicePrice(service)
  const priceValue =
    details.serviceType === 'hourly'
      ? details.hourlyPrice
      : details.perSessionPrice
  const total =
    priceValue != null
      ? details.serviceType === 'hourly'
        ? priceValue * estimatedHours
        : priceValue
      : 0

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) {
      router.push('/login')
      return
    }
    if (!bookingDate || !bookingTime) {
      toast.error('Please select booking date and time.')
      return
    }
    if (bookingLocation.coordinates.length !== 2) {
      toast.error('Please pick your exact location on the map.')
      return
    }
    const bookingTimeISO = new Date(`${bookingDate}T${bookingTime}`).toISOString()
    bookingMutation.mutate({
      serviceId: service._id,
      title: details.title,
      bookingTime: bookingTimeISO,
      location: {
        type: 'Point',
        coordinates: bookingLocation.coordinates,
        address: bookingLocation.address,
      },
      estimatedHours,
      bookingType: details.serviceType,
    })
  }

  return (
    <>
      <section className="bg-white py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-[1160px]">
            <Link
              href={`/services/${categoryId}`}
              aria-label="Back to services"
              className="inline-flex items-center gap-2 rounded-full border border-[#313131] px-4 py-2 text-sm font-medium transition hover:border-[#2877bb] hover:text-[#2877bb]"
            >
              <ArrowLeft className="size-4" />
              Back
            </Link>
            <div className="mt-5 text-center">
              <h1 className="text-2xl font-bold text-[#343b40] sm:text-4xl">
                Service Details
              </h1>
              <p className="mt-3 text-sm text-[#667078] sm:text-base">
                Everything you need to know before booking this professional
                service.
              </p>
            </div>
          </div>

          <article className="mx-auto mt-12 grid max-w-[1160px] gap-6 rounded-xl border border-[#8ebce8] p-3 lg:grid-cols-[390px_1fr]">
            <div className="grid grid-cols-3 gap-2">
              <div className="relative col-span-3 h-[240px] overflow-hidden rounded-lg sm:h-[280px]">
                <Image
                  src={images[activeImage % images.length]}
                  alt={`${details.title} service`}
                  fill
                  priority
                  sizes="390px"
                  className="object-cover"
                />
              </div>
              {images.length > 1 ? (
                images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show ${details.title} image ${index + 1}`}
                    className={`relative h-[105px] overflow-hidden rounded-md ${index === activeImage ? 'ring-2 ring-[#2877bb]' : ''}`}
                  >
                    <Image
                      src={image}
                      alt={`${details.title} service preview ${index + 1}`}
                      fill
                      sizes="130px"
                      className="object-cover"
                    />
                  </button>
                ))
              ) : (
                <div className="relative h-[105px] overflow-hidden rounded-md">
                  <Image
                    src={images[0]}
                    alt={`${details.title} service preview`}
                    fill
                    sizes="130px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="relative flex min-w-0 flex-col p-2 sm:p-3">
              <button
                type="button"
                onClick={() => setBookmarked(value => !value)}
                aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark service'}
                className="absolute right-1 top-1 text-[#2877bb]"
              >
                <Bookmark
                  className={`size-6 ${bookmarked ? 'fill-current' : ''}`}
                />
              </button>
              <h2 className="pr-10 text-3xl font-medium text-black">
                {details.title}
              </h2>
              <div className="mt-5 flex items-center gap-3">
                <Image
                  src={provider?.profileImage || fallbackAvatar}
                  alt={provider?.name || 'Provider'}
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-medium">
                    {provider?.name || 'Service Provider'}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-[#626b76]">
                    <Star className="size-4 fill-[#ffb000] text-[#ffb000]" />
                    {service.averageRating > 0
                      ? service.averageRating.toFixed(1)
                      : 'New'}
                  </p>
                </div>
              </div>
              {details.address ? (
                <p className="mt-4 flex items-center gap-2 text-sm">
                  <span className="grid size-7 place-items-center rounded bg-[#ff914d] text-white">
                    <MapPin className="size-4" />
                  </span>
                  {details.address}
                </p>
              ) : null}
              {price ? (
                <p className="mt-3 flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded bg-[#ff914d] text-white">
                    <Tag className="size-4" />
                  </span>
                  <strong>{price}</strong>
                  <span className="text-sm">({details.serviceType})</span>
                </p>
              ) : null}

              {details.details ? (
                <div className="mt-7">
                  <h3 className="text-lg font-medium">About Service</h3>
                  <p className="mt-2 max-w-[650px] text-base leading-6 text-[#404040]">
                    {details.details}
                  </p>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setModal('booking')}
                className="mt-auto flex h-12 items-center justify-center rounded-full bg-[#2d76b9] text-lg font-medium text-white transition hover:bg-[#205f96] lg:mt-8"
              >
                Book Now
              </button>
            </div>
          </article>
        </div>
      </section>

      {modal === 'booking' && (
        <ModalShell label="Book service" onClose={() => setModal(null)}>
          <form onSubmit={submitBooking}>
            <div className="rounded-[20px] bg-gradient-to-r from-[#215d94] to-[#6d5b53] px-4 py-10 text-center text-white sm:px-6 sm:py-12 relative overflow-hidden">
              <p className="text-base font-medium opacity-90">Total amount</p>
              <strong className="mt-1 block text-4xl sm:text-5xl font-bold">${total.toFixed(0)}</strong>
            </div>
            <div className="p-1 sm:p-2">
              <h2 className="mt-6 text-[15px] font-semibold text-[#101010]">
                Select Booking Time &amp; Date
              </h2>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <label className="flex h-[46px] flex-1 items-center gap-3 rounded-full border border-[#f97316] px-4 text-sm text-[#475569]">
                  <CalendarDays className="size-[18px] text-[#f97316]" />
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(event) => setBookingDate(event.target.value)}
                    className="w-full bg-transparent outline-none focus:outline-none font-medium"
                  />
                </label>
                <label className="flex h-[46px] flex-1 items-center gap-3 rounded-full border border-[#f97316] px-4 text-sm text-[#475569]">
                  <Clock3 className="size-[18px] text-[#f97316]" />
                  <input
                    type="time"
                    required
                    value={bookingTime}
                    onChange={(event) => setBookingTime(event.target.value)}
                    className="w-full bg-transparent outline-none focus:outline-none font-medium"
                  />
                </label>
              </div>
              
              <div className="mt-4">
                <LocationPicker
                  value={bookingLocation}
                  onChange={setBookingLocation}
                />
              </div>

              {details.serviceType === 'hourly' && (
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold text-[#101010] mb-3">Select Estimated<br/>Hour</h3>
                    <div className="relative">
                      <select
                        value={estimatedHours}
                        onChange={(event) =>
                          setEstimatedHours(Number(event.target.value))
                        }
                        className="h-[46px] w-full appearance-none rounded bg-[#f97316] px-4 text-white outline-none font-medium text-base"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold text-[#101010] mb-3"><br/>Time</h3>
                    <div className="flex h-[46px] items-center justify-center gap-2 rounded bg-[#f97316] px-4 text-white font-medium text-base">
                      <Clock3 className="size-[18px]" />
                      <span>{bookingTime || "11:00 A.M"}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="flex-1 h-[48px] rounded-full bg-[#2d76b9] font-semibold text-white transition hover:bg-[#205f96] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {bookingMutation.isPending ? 'Booking...' : 'Book Now'}
                </button>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 h-[48px] rounded-full border border-[#f97316] font-semibold text-[#101010] bg-white transition hover:bg-orange-50"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </form>
        </ModalShell>
      )}

      {modal === 'accepted' && (
        <ModalShell label="Booking accepted" onClose={() => setModal(null)}>
          <div className="py-5 text-center">
            <h2 className="mx-auto max-w-[330px] text-2xl leading-tight">
              {provider?.name || 'The provider'} has accepted your request.
            </h2>
            <Image
              src={provider?.profileImage || fallbackAvatar}
              alt={provider?.name || 'Provider'}
              width={76}
              height={76}
              className="mx-auto mt-6 size-[76px] rounded-full object-cover"
            />
            <p className="mt-4 text-[#777]">
              View {provider?.name || 'the provider'}&apos;s location or
              contact!
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setModal('confirm')}
                className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#2d76b9] text-white"
              >
                <Navigation className="size-5" />
                Location
              </button>
              <a
                href="mailto:support@codingmice.com"
                className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#ff914d] text-[#ff7d32]"
              >
                Contact
                <MessageCircle className="size-5" />
              </a>
            </div>
          </div>
        </ModalShell>
      )}

      {modal === 'confirm' && (
        <ModalShell
          label="Confirm service start"
          onClose={() => setModal(null)}
        >
          <div className="py-14 text-center">
            <h2 className="text-3xl">Are you sure?</h2>
            <p className="mx-auto mt-3 max-w-[400px] text-xl leading-6 text-[#747474]">
              {provider?.name || 'The provider'} is ready to start the service.
              Are you ready?
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="flex h-12 items-center justify-center gap-3 rounded-full border border-[#ff914d] text-lg text-[#ff7d32]"
              >
                Cancel
                <X className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="flex h-12 items-center justify-center gap-3 rounded-full bg-[#2d76b9] text-lg text-white"
              >
                <Check className="size-5" />
                Accept
              </button>
            </div>
          </div>
        </ModalShell>
      )}
    </>
  )
}
