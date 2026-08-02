import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export default function BrandLogo({
  compact = false,
  className = "",
}: BrandLogoProps) {
  if (compact) {
    return (
      <Image
        src="/brand/logo-mark.svg"
        alt="InterBearing"
        width={48}
        height={48}
        priority
        className={`h-10 w-10 sm:h-11 sm:w-11 ${className}`}
      />
    );
  }

  return (
    <picture className={className}>
      <source
        media="(max-width: 420px)"
        srcSet="/brand/logo-mark.svg"
      />
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
