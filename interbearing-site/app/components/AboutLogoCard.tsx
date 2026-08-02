import Image from "next/image";

export default function AboutLogoCard() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B] p-6 sm:min-h-[440px] sm:p-8">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative flex min-h-[310px] flex-col items-center justify-center gap-7 rounded-2xl border border-white/10 bg-[#0B0F19]/70 px-5 py-8 sm:min-h-[374px]">
        <div className="relative h-44 w-44 sm:h-56 sm:w-56">
          <div className="absolute inset-5 rounded-full bg-blue-500/20 blur-3xl" />
          <Image
            src="/brand/logo-mark.svg"
            alt="Фірмовий знак InterBearing"
            fill
            sizes="(max-width: 640px) 176px, 224px"
            className="relative object-contain drop-shadow-[0_16px_36px_rgba(37,99,235,0.3)]"
          />
        </div>

        <Image
          src="/brand/logo-horizontal-dark.svg"
          alt="InterBearing — Надійність у кожному оберті"
          width={1120}
          height={280}
          className="h-auto w-full max-w-[430px]"
        />
      </div>
    </div>
  );
}
