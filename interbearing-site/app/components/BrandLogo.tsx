import Image from "next/image";

export default function BrandLogo() {
  return (
    <picture>
      <source media="(max-width: 420px)" srcSet="/brand/logo-mark.svg" />
      <Image
        src="/brand/logo-horizontal-dark.svg"
        alt="InterBearing — Надійність у кожному оберті"
        width={1120}
        height={280}
        priority
        className="h-12 w-auto sm:h-14"
      />
    </picture>
  );
}
