'use client'

import {
  getServicePrice,
  getCategoryWiseServices,
  type Service,
} from '@/services/catalog-api'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { CatalogEmpty, CatalogError } from '@/components/landing/catalog-states'
import { ArrowLeft, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const fallbackImage = '/images/service-cleaning.jpg'
const fallbackAvatar = '/images/customer-rikan-bhart.jpg'

function ServiceCard({ service }: { service: Service }) {
  const details = service.serviceDetails
  const provider =
    typeof service.providerId === 'string' ? null : service.providerId
  const thumbnail = details.serviceThumbnails?.[0] || fallbackImage
  const price = getServicePrice(service)

  return (
    <article className="overflow-hidden rounded-lg border border-[#8ebce8] bg-white">
      <div className="relative h-[225px] overflow-hidden">
        <Image
          src={thumbnail}
          alt={`${details.title} service`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover"
        />
        <span className="absolute bottom-2 left-2 rounded-full bg-white px-4 py-1 text-xs text-[#2877bb] shadow-sm">
          {details.title}
        </span>
      </div>

      <div className="p-3">
        <h2 className="text-xl font-medium text-black">{details.title}</h2>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={provider?.profileImage || fallbackAvatar}
              alt={provider?.name || 'Provider'}
              width={34}
              height={34}
              className="size-[34px] rounded-full object-cover"
            />
            <div className="leading-tight">
              <h3 className="text-lg font-medium text-[#6b6b6b]">
                {provider?.name || 'Service Provider'}
              </h3>
              <p className="mt-1 text-xs text-[#777]">@Service Provider</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-[#4e5865]">
            <Star className="size-5 text-[#ffb000]" />
            <span>
              {service.averageRating > 0
                ? service.averageRating.toFixed(1)
                : 'New'}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-[#747d8c]">
          <span className="flex items-center gap-1">
            <MapPin className="size-5" />
            {details.address || 'Location available'}
          </span>
          {price ? <span>{price}</span> : null}
        </div>

        <Link
          href={`/services/${typeof service.category === 'string' ? service.category : service.category._id}/details/${service._id}`}
          className="mt-4 flex h-12 items-center justify-center rounded-full bg-[#2d76b9] text-lg font-medium text-white transition hover:bg-[#205f96]"
        >
          View
        </Link>
      </div>
    </article>
  )
}

function ServiceListingSkeleton() {
  return (
    <div className="mx-auto mt-12 grid max-w-[1160px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-[#8ebce8] bg-white"
        >
          <Skeleton className="h-[225px] w-full rounded-none" />
          <div className="space-y-3 p-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ServiceListing({ categoryId }: { categoryId: string }) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['services', categoryId],
    queryFn: () => getCategoryWiseServices(categoryId),
  })

  const categoryName =
    data?.[0] && typeof data[0].category === 'object'
      ? data[0].category.name.trim()
      : 'Service'

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-[1160px]">
          <Link
            href="/categories"
            aria-label="Back to categories"
            className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-[#313131] text-[#313131] transition hover:border-[#2877bb] hover:text-[#2877bb] sm:top-3"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="px-12 text-center">
            <h1 className="text-3xl font-bold text-[#343b40] sm:text-4xl">
              {isLoading ? (
                <Skeleton className="mx-auto h-9 w-64" />
              ) : (
                `${categoryName} Services`
              )}
            </h1>
            <p className="mx-auto mt-3 max-w-[760px] text-sm text-[#667078] sm:text-base">
              Find reliable, experienced professionals for high-quality{' '}
              {categoryName.toLowerCase()} services near you.
            </p>
          </div>
        </div>

        {isLoading ? (
          <ServiceListingSkeleton />
        ) : isError ? (
          <CatalogError error={error} onRetry={() => refetch()} />
        ) : !data || data.length === 0 ? (
          <CatalogEmpty
            title="No services found"
            description="No services are available in this category yet."
          />
        ) : (
          <div className="mx-auto mt-12 grid max-w-[1160px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
