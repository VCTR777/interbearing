import Image from "next/image";

export default function AboutLogoCard() {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-4 py-8 sm:min-h-[440px] sm:px-8">
      <div className="absolute right-4 top-8 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute bottom-8 left-4 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative flex w-full max-w-[520px] flex-col items-center justify-center gap-5">
        <div className="relative h-48 w-48 sm:h-60 sm:w-60">
          <div className="absolute inset-8 rounded-full bg-blue-500/20 blur-3xl" />
          <Image
            src="/brand/logo-mark.svg"
            alt="Фірмовий знак InterBearing"
            fill
            priority
            sizes="(max-width: 640px) 192px, 240px"
            className="relative object-contain drop-shadow-[0_18px_40px_rgba(37,99,235,0.28)]"
          />
        </div>

        <div className="relative h-[88px] w-full sm:h-[108px]">
          <Image
            src="/brand/logo-horizontal-dark.svg"
            alt="InterBearing — Надійність у кожному оберті"
            fill
            sizes="(max-width: 640px) 90vw, 520px"
            className="theme-logo-dark object-contain"
          />
          <Image
            src="/brand/logo-horizontal-light.svg"
            alt="InterBearing — Надійність у кожному оберті"
            fill
            sizes="(max-width: 640px) 90vw, 520px"
            className="theme-logo-light object-contain"
          />
        </div>
      </div>
    </div>
  );
}
