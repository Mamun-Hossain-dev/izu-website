import Image from "next/image";

type AuthShellProps = {
  children: React.ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="grid min-h-svh bg-[#f1faff] lg:grid-cols-2">
      <div className="relative hidden min-h-svh overflow-hidden lg:block">
        <Image
          src="/images/auth-plumber.jpg"
          alt="Professional plumber repairing a kitchen sink"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
      </div>
      <section className="flex min-h-svh items-center justify-center px-5 py-10 sm:px-10">
        {children}
      </section>
    </main>
  );
}
