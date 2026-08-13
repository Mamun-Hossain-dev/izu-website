import Image from "next/image";

function StoreButton({ store }: { store: "App Store" | "Google Play" }) {
  const isApple = store === "App Store";

  return (
    <a href="#" className="flex min-w-[178px] items-center gap-3 rounded-md bg-[#2b75b7] px-5 py-3 text-white transition hover:bg-[#205f96]">
      <Image
        src={isApple ? "/images/apple-store-icon.png" : "/images/google-play-icon.png"}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
      <span className="text-left leading-tight">
        <small className="block text-sm text-white/70">{isApple ? "Download on" : "Get it on"}</small>
        <strong className="text-lg font-medium">{store}</strong>
      </span>
    </a>
  );
}

export function AppDownloadSection() {
  return (
    <section className="bg-[#eff8ff] py-12 sm:py-16">
      <div className="mx-auto grid max-w-[800px] items-center gap-10 px-5 md:grid-cols-[1fr_250px] md:gap-20">
        <div>
          <h2 className="text-4xl font-extrabold leading-[1.4] sm:text-[40px]">
            Reliable Home Services at<br className="hidden sm:block" /> Your Doorstep
          </h2>
          <p className="mt-5 max-w-[540px] text-lg leading-6 text-[#74665e]">
            Book skilled plumbers and cleaning experts in minutes and manage all your home services from one convenient platform
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <StoreButton store="App Store" />
            <StoreButton store="Google Play" />
          </div>
        </div>
        <div className="relative mx-auto h-[450px] w-[220px]">
          <Image src="/images/workyapa-app-preview.png" alt="Workyapa mobile application preview" fill sizes="220px" className="object-contain object-center" />
        </div>
      </div>
    </section>
  );
}
