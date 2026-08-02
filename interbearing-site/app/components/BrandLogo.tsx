import Image from "next/image";

export default function BrandLogo() {
  return (
    <span className="inline-flex items-center">
      <span className="relative h-11 w-11 sm:hidden">
        <Image src="/brand/logo-mark-dark.svg" alt="InterBearing" fill priority className="theme-logo-dark object-contain" />
        <Image src="/brand/logo-mark-light.svg" alt="InterBearing" fill priority className="theme-logo-light object-contain" />
      </span>

      <span className="relative hidden h-[58px] w-[250px] sm:block lg:h-[64px] lg:w-[278px]">
        <Image src="/brand/logo-horizontal-dark.svg" alt="InterBearing — Надійність у кожному оберті" fill priority sizes="278px" className="theme-logo-dark object-contain object-left" />
        <Image src="/brand/logo-horizontal-light.svg" alt="InterBearing — Надійність у кожному оберті" fill priority sizes="278px" className="theme-logo-light object-contain object-left" />
      </span>
    </span>
  );
}
