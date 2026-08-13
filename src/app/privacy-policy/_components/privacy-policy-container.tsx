const policySections = [
  {
    title: "1. Information We Collect",
    description:
      "We collect information that you provide directly to us, including your name, email address, phone number, shipping address, and payment information when you create an account or place an order.",
  },
  {
    title: "2. How We Use Your Information",
    description:
      "We use the information we collect to process your orders, communicate with you about your purchases, send you marketing communications (with your consent), and improve our services.",
  },
  {
    title: "3. Information Sharing",
    description:
      "We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.",
  },
  {
    title: "4. Data Security",
    description:
      "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    title: "4. Data Security",
    description:
      "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    title: "5. Your Rights",
    description:
      "You have the right to access, update, or delete your personal information at any time. You can manage your account settings or contact us directly for assistance.",
  },
  {
    title: "6. Contact Us",
    description:
      "If you have any questions about this Privacy Policy, please contact us at privacy@bookstore.com",
  },
];

const PrivacyPolicyContainer = () => {
  return (
    <main className="min-h-screen border-t border-slate-100 bg-white">
      <section className="container px-4 pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            See all Privacy Policy
          </p>
        </header>

        <div className="mt-9 overflow-hidden rounded-lg border border-slate-200 bg-[#fbfcfd] shadow-sm sm:mt-12 lg:mt-14">
          <div className="space-y-5 px-5 py-6 sm:px-10 sm:py-8 lg:px-14">
            {policySections.map((section, index) => (
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

export default PrivacyPolicyContainer;
