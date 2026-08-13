import Image from "next/image";

const AboutUsContainer = () => {
  return (
    <section className="container px-4 py-10 lg:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-900">
          About Us
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Connecting You with Skilled Professionals Near You
        </p>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="space-y-8 text-slate-700">
          <div>
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-900">
              About Your Website
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              We provide reliable and professional home maintenance and repair services
              for homeowners, landlords, and businesses. From plumbing and electrical work
              to general home improvement, we connect clients with vetted experts who deliver
              quality workmanship, timely service, and honest communication.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold tracking-[-0.03em] text-slate-900">
              Our Mission
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Our mission is to simplify home services by connecting trusted professionals
              with people who need dependable help. We aim to make every service experience
              seamless, transparent, and stress-free while delivering quality workmanship
              and friendly support.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-6">
              <div>
                <div className="text-2xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-3xl">
                  30K+
                </div>
                <div className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-3xl">
                  12K+
                </div>
                <div className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Completed Services
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-3xl">
                  2K+
                </div>
                <div className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Trusted Professionals
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold tracking-[-0.03em] text-slate-900">
              What We Offer
            </h3>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-600">
              <li>• Plumbing and drainage services</li>
              <li>• Electrical and lighting installations</li>
              <li>• Home repairs and maintenance</li>
              <li>• Cleaning and general household support</li>
              <li>• Carpentry, painting, and renovation tasks</li>
              <li>• Trusted local professionals and on-time service</li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-bold tracking-[-0.03em] text-slate-900">
              Why Choose our Platform
            </h3>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-600">
              <li>• We believe home services should be simple, transparent, and stress-free.</li>
              <li>• Easy booking and clear pricing</li>
              <li>• Experienced and verified service providers</li>
              <li>• Reliable support and responsive communication</li>
              <li>• Secure and efficient service experience for every customer</li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-bold tracking-[-0.03em] text-slate-900">
              Our Commitment
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Customer satisfaction is at the heart of our platform. We are committed to
              providing dependable service, maintaining professional standards, and creating
              a trustworthy environment where quality work and peace of mind come first.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-3xl font-bold tracking-[-0.03em] text-slate-900">
              Join Us
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Whether you are looking for trusted home services or want to grow your
              business as a professional, our platform is here to help you connect and
              succeed with confidence.
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:pl-2">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
            <Image
              src="/images/aboutus.png"
              alt="Service professional helping a customer"
              width={900}
              height={1150}
              priority
              sizes="(min-width:1024px) 42vw, 100vw"
              className="h-[460px] w-full object-cover sm:h-[560px] md:h-[600px] lg:h-[calc(100vh-7rem)] lg:min-h-[520px] lg:max-h-[540px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsContainer;
