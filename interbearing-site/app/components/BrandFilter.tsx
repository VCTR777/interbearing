"use client";

const brands = [
  "Усі",
  "SKF",
  "FAG",
  "INA",
  "NSK",
  "KOYO",
  "NTN",
];

interface Props {
  active: string;
  setActive: (brand: string) => void;
}

export default function BrandFilter({ active, setActive }: Props) {
  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => setActive(brand)}
          className={`rounded-full px-5 py-2 transition ${
            active === brand
              ? "bg-blue-600 text-white"
              : "bg-[#151D2B] text-gray-300 hover:bg-blue-600"
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
}