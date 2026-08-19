import Image from "next/image";

const benefits = [
  "Verified & experienced professionals",
  "Fast and reliable service response",
  "Affordable and transparent pricing",
  "Customer support assistance",
  "Quality workmanship guarantee",
  "Easy and hassle-free booking process",
  "Safe, trusted, and secure service",
  "Modern tools and professional equipment",
  "Customer satisfaction focused approach",
  "Flexible scheduling for your convenience",
];

const achievements = [
  { value: "200+", label: "Apartments" },
  { value: "20k+", label: "Customers" },
  { value: "100+", label: "Good Reviews" },
];

export function TrustAndAchievements({ showAchievements = true }: { showAchievements?: boolean }) {
  return (
    <>
      <section className="bg-[#f8f8f8] py-14 sm:py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Why Trust Us</h2>
            <p className="mt-2 text-lg text-[#666]">Easy Booking Process for Hassle-Free Home Services</p>
          </div>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <div className="text-base leading-[1.6] text-[#626262]">
              <h3 className="mb-4 text-xl font-bold text-black">Experience you can rely on</h3>
              <p className="text-justify">
                We are committed to delivering reliable, professional, and high-quality home services designed to make your everyday life easier. From skilled experts to fast response times, we focus on providing safe, affordable, and customer-friendly solutions you can trust. Our goal is to ensure comfort, convenience, and complete satisfaction with every service we provide.
              </p>
              <p>What Makes Us Different</p>
              <ul className="list-disc pl-6">
                {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
            </div>
            <div className="relative h-[360px] overflow-hidden rounded-xl sm:h-[430px] lg:h-[465px]">
              <Image src="/images/trust-handshake.jpg" alt="Professionals shaking hands" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {showAchievements && (
        <section className="relative mx-auto aspect-[1922/363] min-h-[300px] max-h-[363px] max-w-[1922px] overflow-hidden text-white">
          <Image src="/images/achivements.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#62b6ed]/40" />
          <div className="container relative grid h-full grid-cols-2 items-center gap-6 text-center sm:gap-8 md:grid-cols-4">
            <h2 className="text-2xl font-normal sm:text-4xl">Achievement</h2>
            {achievements.map((item) => (
              <div key={item.label}>
                <strong className="block text-3xl font-bold sm:text-4xl">{item.value}</strong>
                <span className="text-lg sm:text-2xl">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
