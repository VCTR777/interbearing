import Image from "next/image";

export default function BrandLogo() {
  return (
    <span className="inline-flex items-center">
      <Image
        src="/brand/logo-mark.svg"
        alt="InterBearing"
        width={48}
        height={48}
        priority
        className="h-11 w-11 sm:hidden"
      />

      <span className="relative hidden h-[58px] w-[232px] sm:block lg:h-[64px] lg:w-[256px]">
        <Image
          src="/brand/logo-horizontal-dark.svg"
          alt="InterBearing — Надійність у кожному оберті"
          fill
          priority
          sizes="256px"
          className="theme-logo-dark object-contain object-left"
        />
        <Image
          src="/brand/logo-horizontal-light.svg"
          alt="InterBearing — Надійність у кожному оберті"
          fill
          priority
          sizes="256px"
          className="theme-logo-light object-contain object-left"
        />
      </span>
    </span>
  );
}
