import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    title: 'Cleaning',
    image: '/images/category-cleaning.jpg',
    href: '/services/cleaning',
  },
  {
    title: 'Plumbing',
    image: '/images/category-plumbing.jpg',
    href: '/services/plumbing',
  },
  {
    title: 'Electrical',
    image: '/images/category-electrical.jpg',
    href: '/services/electrical',
  },
  {
    title: 'Carpentry',
    image: '/images/category-carpentry.jpg',
    href: '/services/carpentry',
  },
  {
    title: 'Painting',
    image: '/images/category-painting.jpg',
    href: '/services/painting',
  },
  {
    title: 'Interior',
    image: '/images/service-cleaning.jpg',
    href: '/services/interior',
  },
  {
    title: 'Construction',
    image: '/images/category-construction.jpg',
    href: '/services/construction',
  },
]

export function CategoriesHero() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden sm:min-h-[500px]">
      <Image
        src="/images/trust-handshake.jpg"
        alt="Professionals agreeing on a home service"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="container relative mx-auto px-4 text-center text-white">
        <h1 className="text-3xl font-bold text-[#559cff] sm:text-4xl">
          What We Provide
        </h1>
        <p className="mx-auto mt-3 max-w-[720px] text-sm leading-6 text-white/90 sm:text-base">
          Discover how The Unburdened Mind can support your journey toward
          clarity, purpose, and freedom from what no longer serves you.
        </p>
      </div>
    </section>
  )
}

export function CategoriesGrid() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#343b40] sm:text-4xl">
            Services Categories
          </h2>
          <p className="mt-2 text-sm text-[#667078] sm:text-base">
            We provide modern, reliable, and scalable digital solutions to help
            businesses grow faster online.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1160px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => (
            <Link
              key={category.title}
              href={category.href}
              className="group overflow-hidden rounded-xl bg-[#f1f1f1]"
            >
              <div className="relative h-[230px] sm:h-[250px]">
                <Image
                  src={category.image}
                  alt={`${category.title} service`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="py-5 text-center text-2xl font-bold text-[#383f44]">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
