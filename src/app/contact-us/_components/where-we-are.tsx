const WhereWeAre = () => {
  return (
    <section className="border-b-2 border-[#2674b7] bg-white py-10 sm:py-12 lg:py-14">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#171717] sm:text-4xl">
            Where We Are?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Our team is always ready to assist you with any questions or concerns you
            might have. Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm sm:mt-12 lg:mt-14">
          <iframe
            title="Our location in the United States"
            src="https://www.google.com/maps?q=United%20States&z=5&output=embed"
            className="block h-[300px] w-full sm:h-[360px] lg:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default WhereWeAre;
