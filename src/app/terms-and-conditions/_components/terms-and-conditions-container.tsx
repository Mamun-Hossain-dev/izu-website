const termsSections = [
  {
    title: "1. Acceptance of Terms",
    description:
      "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "2. Use of Service",
    description:
      "You agree to use our service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.",
  },
  {
    title: "3. Account Registration",
    description:
      "To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
  },
  {
    title: "4. Booking and Payment",
    description:
      "All Booking are subject to availability and confirmation of the order price. We reserve the right to refuse any order. Payment must be made in full before shipment of goods.",
  },
  {
    title: "4. Modifications to Terms",
    description:
      "We reserve the right to modify these terms at any time. Your continued use of the website after changes constitutes acceptance of the modified terms.",
  },
  {
    title: "5. Contact Information",
    description:
      "For any questions regarding these terms and conditions, please contact us at support@bookstore.com",
  },
];

const TermsAndConditionsContainer = () => {
  return (
    <main className="min-h-screen border-t border-slate-100 bg-white">
      <section className="container px-4 pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            See all Terms &amp; Conditions
          </p>
        </header>

        <div className="mt-9 overflow-hidden rounded-lg border border-slate-200 bg-[#fbfcfd] shadow-sm sm:mt-12 lg:mt-14">
          <div className="space-y-5 px-5 py-6 sm:px-10 sm:py-8 lg:px-14">
            {termsSections.map((section, index) => (
              <section key={`${section.title}-${index}`}>
                <h2 className="font-serif text-base font-medium text-slate-950 sm:text-lg">
                  {section.title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base sm:leading-6">
                  {section.description}
                </p>
              </section>
            ))}
          </div>

          <footer className="border-t border-slate-100 bg-white px-5 py-4 sm:px-10 lg:px-14">
            <p className="text-sm text-slate-500 sm:text-base">
              Last updated: May 9, 2026
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default TermsAndConditionsContainer;
