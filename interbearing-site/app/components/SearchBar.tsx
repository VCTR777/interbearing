"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="🔍 Пошук за артикулом або назвою..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#151D2B] px-5 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}