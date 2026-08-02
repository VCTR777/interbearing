import Image from "next/image";

export default function AboutLogoCard() {
  return (
    <div className="flex min-h-[350px] items-center justify-center px-2 py-6 sm:min-h-[430px] sm:px-6">
      <div className="flex w-full max-w-[580px] flex-col items-center justify-center gap-2">
        <div className="relative h-52 w-52 sm:h-72 sm:w-72">
          <Image src="/brand/logo-mark-dark.svg" alt="Фірмовий знак InterBearing" fill priority sizes="(max-width: 640px) 208px, 288px" className="theme-logo-dark object-contain drop-shadow-[0_18px_38px_rgba(37,99,235,0.2)]" />
          <Image src="/brand/logo-mark-light.svg" alt="Фірмовий знак InterBearing" fill priority sizes="(max-width: 640px) 208px, 288px" className="theme-logo-light object-contain drop-shadow-[0_18px_38px_rgba(37,99,235,0.16)]" />
        </div>

        <div className="relative h-[95px] w-full sm:h-[120px]">
          <Image src="/brand/logo-horizontal-dark.svg" alt="InterBearing — Надійність у кожному оберті" fill sizes="(max-width: 640px) 94vw, 580px" className="theme-logo-dark object-contain" />
          <Image src="/brand/logo-horizontal-light.svg" alt="InterBearing — Надійність у кожному оберті" fill sizes="(max-width: 640px) 94vw, 580px" className="theme-logo-light object-contain" />
        </div>
      </div>
    </div>
  );
}
