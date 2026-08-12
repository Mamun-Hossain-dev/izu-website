import Image from "next/image";

const steps = [
  {
    title: "Choose Your Service",
    description: "Select the service you need from our wide range of professional home solutions.",
  },
  {
    title: "Book an Appointment",
    description: "Pick your preferred date and time easily through our platform.",
  },
  {
    title: "Get the Job Done",
    description: "Our skilled professional arrives at your location and completes the work efficiently.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="container">
        <div className="text-center">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="mt-2 text-lg text-[#666]">Easy Booking Process for Hassle-Free Home Services</p>
        </div>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[560px_1fr] lg:gap-16">
          <div className="relative h-[380px] overflow-hidden rounded-xl sm:h-[470px]">
            <Image src="/images/trust-handshake.jpg" alt="A successful service consultation" fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
          </div>
          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[70px_1fr] items-center gap-6">
                <span className="grid size-[70px] place-items-center rounded-full bg-[#dbe6ff] text-2xl font-bold text-[#2673b6]">{index + 1}</span>
                <div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-base text-[#666]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
