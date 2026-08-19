'use client'

import { Check, Eye, EyeOff, X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import ProfileSidebar from '../../my-profile/_components/profile-sidebar'

type PasswordFieldProps = {
  id: 'currentPassword' | 'newPassword' | 'confirmPassword'
  label: string
  value: string
  onChange: (value: string) => void
}

function PasswordField({ id, label, value, onChange }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const placeholders = {
    currentPassword: 'Enter your current password',
    newPassword: 'Create a new password',
    confirmPassword: 'Re-enter your new password',
  }
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-900"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholders[id]}
          required
          autoComplete={
            id === 'currentPassword' ? 'current-password' : 'new-password'
          }
          className="h-11 w-full rounded border border-slate-300 bg-white px-3 pr-11 text-sm outline-none placeholder:text-slate-400 focus:border-[#2674b7] focus:ring-2 focus:ring-[#2674b7]/15"
        />
        <button
          type="button"
          onClick={() => setVisible(value => !value)}
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#2674b7]"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  )
}

type ChangePasswordInput = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const staticAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhODE0MzRhY2M0OGVlODU2MGEwYjM2YSIsImlhdCI6MTc4Njg1NjI3OCwiZXhwIjoxNzg3NDYxMDc4fQ.TnbrIwpTFYJEsO5MoF-DrWMKo0DJXOIQgIoc8W9d2js'

const changePassword = async (values: ChangePasswordInput): Promise<string> => {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5008/api/v1'
  const response = await fetch(`${apiBaseUrl}/profile/change-password`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${staticAccessToken}`,
    },
    body: JSON.stringify(values),
  })

  const payload: { message?: string; data?: { message?: string } } =
    await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'Unable to change password.')
  }

  return (
    payload.data?.message || payload.message || 'Password changed successfully.'
  )
}

const ChangePasswordContainer = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const resetForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: message => {
      resetForm()
      toast.success(message)
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.')
      return
    }

    mutation.mutate({ currentPassword, newPassword, confirmPassword })
  }

  const rules = [
    {
      valid: newPassword.length >= 8,
      label: 'Minimum 8–12 characters (recommend 12+ for stronger security).',
    },
    {
      valid: /[A-Z]/.test(newPassword),
      label: 'At least one uppercase letter must.',
    },
    {
      valid: /[a-z]/.test(newPassword),
      label: 'At least one lowercase letter must.',
    },
    { valid: /\d/.test(newPassword), label: 'At least one number must (0–9).' },
    {
      valid: /[^A-Za-z0-9\s]/.test(newPassword),
      label: 'At least special character (! @ # $ % ^ & * etc.).',
    },
    {
      valid: newPassword.length > 0 && !/\s/.test(newPassword),
      label: 'No spaces allowed.',
    },
  ]

  return (
    <main className="min-h-screen border-t border-slate-100 bg-white">
      <section className="container px-4 pb-12 pt-8 sm:pt-10 lg:pb-20">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your Profile
          </p>
        </header>

        <div className="mt-10 grid items-start gap-5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:mt-12 sm:p-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ProfileSidebar />
          <div className="min-h-[440px] rounded-lg border border-slate-200 bg-[#f8f9fa] p-5 sm:min-h-[500px] sm:p-8 lg:p-10">
            <h2 className="text-2xl font-semibold text-slate-800">
              Change Password
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage your account preferences, security settings, and privacy
              options.
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <PasswordField
                  id="currentPassword"
                  label="Current Password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                />
                <PasswordField
                  id="newPassword"
                  label="New Password"
                  value={newPassword}
                  onChange={setNewPassword}
                />
              </div>
              <div className="mt-5">
                <PasswordField
                  id="confirmPassword"
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
              </div>
              <ul className="mt-4 space-y-2">
                {rules.map(rule => (
                  <li
                    key={rule.label}
                    className={`flex items-start gap-2 text-xs sm:text-sm ${rule.valid ? 'text-emerald-600' : 'text-rose-500'}`}
                  >
                    {rule.valid ? (
                      <Check className="mt-0.5 size-4 shrink-0" />
                    ) : (
                      <X className="mt-0.5 size-4 shrink-0" />
                    )}
                    <span>{rule.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={mutation.isPending}
                  className="h-10 rounded-full border border-[#2674b7] px-5 text-sm font-medium text-[#2674b7] transition hover:bg-[#eef7fd] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="h-10 rounded-full bg-[#2a73b5] px-6 text-sm font-medium text-white transition hover:bg-[#205f96] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {mutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ChangePasswordContainer
