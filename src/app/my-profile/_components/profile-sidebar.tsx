'use client'

import {
  ChevronRight,
  LockKeyhole,
  LogOut,
  Pencil,
  SquarePen,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { API_BASE_URL } from '@/lib/axios'
import { getAccessToken, useAuthStore } from '@/store/auth-store'
import { LogoutModal } from '@/components/shared/logout-modal'

type Profile = {
  _id: string
  name?: string
  email?: string
  phone?: string
  profileImage?: string
}

const profileQueryKey = ['profile'] as const

const fetchProfile = async (): Promise<Profile> => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })

  if (!response.ok) {
    throw new Error('Unable to retrieve your profile.')
  }

  const payload: { data: Profile } = await response.json()
  return payload.data
}

const updateProfileImage = async (profileImage: File): Promise<Profile> => {
  const formData = new FormData()
  formData.append('profileImage', profileImage)

  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.message || 'Unable to update your profile image.')
  }

  const payload: { data: Profile } = await response.json()
  return payload.data
}

const navigation = [
  { label: 'Edit Profile', href: '/my-profile', icon: SquarePen },
  {
    label: 'Change Password',
    href: '/change-password',
    icon: LockKeyhole,
  },
]

const ProfileSidebar = () => {
  const pathname = usePathname()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const { data: profile } = useQuery({
    queryKey: profileQueryKey,
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 2,
  })

  const handleLogout = () => {
    clearAuth()
    signOut({ callbackUrl: '/login' })
  }

  const imageMutation = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: updatedProfile => {
      queryClient.setQueryData(profileQueryKey, updatedProfile)
      toast.success('Profile image updated successfully.')
    },
    onError: (error: Error) => toast.error(error.message),
  })

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImagePreview(URL.createObjectURL(file))
    imageMutation.mutate(file, {
      onSettled: () => {
        event.target.value = ''
        setImagePreview(null)
      },
    })
  }

  const name = useMemo(
    () => profile?.name || session?.user?.name || 'Madina Lata',
    [profile, session],
  )
  const email = useMemo(
    () => profile?.email || session?.user?.email || 'bessieedwards@gmail.com',
    [profile, session],
  )
  const avatar = useMemo(
    () =>
      imagePreview ||
      profile?.profileImage ||
      session?.user?.image ||
      '/images/customer-rikan-bhart.jpg',
    [imagePreview, profile, session],
  )

  return (
    <>
      <aside className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="h-24 bg-[#69abe0] sm:h-28" />
        <div className="relative px-4 pb-4">
          <div className="relative mx-auto -mt-14 size-24 rounded-full border-4 border-white bg-slate-100 shadow-sm">
            {/* Profile URLs are supplied by the API and may use different image hosts. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt={`${name}'s profile`}
              className="size-full rounded-full object-cover"
            />
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              disabled={imageMutation.isPending}
              aria-label="Change profile image"
              className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full border-2 border-white bg-[#2a73b5] text-white transition hover:bg-[#205f96] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Pencil className="size-3.5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 text-center">
            <h2 className="text-lg font-semibold text-[#2674b7]">{name}</h2>
            <p className="break-all text-xs text-slate-500">{email}</p>
          </div>

          <nav
            aria-label="Profile navigation"
            className="mt-7 divide-y divide-slate-200 border-y border-slate-200"
          >
            {navigation.map(({ label, href, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-12 items-center gap-3 px-1 text-sm font-medium transition hover:text-[#2674b7] ${
                    active ? 'text-[#2674b7]' : 'text-slate-900'
                  }`}
                >
                  <Icon
                    className="size-5 shrink-0"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                  <ChevronRight className="ml-auto size-4" aria-hidden="true" />
                </Link>
              )
            })}
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="flex min-h-12 w-full items-center gap-3 px-1 text-left text-sm font-medium text-slate-900 transition hover:text-[#2674b7]"
            >
              <LogOut
                className="size-5 shrink-0"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <span>Log Out</span>
              <ChevronRight className="ml-auto size-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </aside>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  )
}

export default ProfileSidebar
