"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemePreference } from "./ThemeProvider";

const options: Array<{
  value: ThemePreference;
  label: string;
  Icon: typeof Monitor;
}> = [
  { value: "system", label: "Системна тема", Icon: Monitor },
  { value: "light", label: "Світла тема", Icon: Sun },
  { value: "dark", label: "Темна тема", Icon: Moon },
];

export default function ThemeToggle() {
  const { preference, isReady, setPreference } = useTheme();
  const currentIndex = options.findIndex((option) => option.value === preference);
  const current = options[currentIndex] || options[0];
  const next = options[(currentIndex + 1) % options.length];
  const Icon = current.Icon;

  return (
    <button
      type="button"
      disabled={!isReady}
      onClick={() => setPreference(next.value)}
      aria-label={`${current.label}. Перемкнути на: ${next.label}`}
      title={`${current.label}. Далі: ${next.label}`}
      className="theme-toggle inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white transition hover:border-blue-400/40 hover:bg-blue-500/10 disabled:opacity-60"
    >
      <Icon aria-hidden="true" size={20} />
    </button>
  );
}
