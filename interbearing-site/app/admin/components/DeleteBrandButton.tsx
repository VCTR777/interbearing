"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DeleteBrandButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function remove() {
    if (!window.confirm(`Видалити бренд ${name}? Товари не буде видалено.`)) return;
    setBusy(true);
    const { error } = await createClient().from("brands").delete().eq("id", id);
    if (error) window.alert(`Не вдалося видалити бренд: ${error.message}`);
    setBusy(false);
    router.refresh();
  }
  return <button type="button" disabled={busy} onClick={remove} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 text-sm font-semibold text-red-300 hover:bg-red-500/10 disabled:opacity-50"><Trash2 size={17} />{busy ? "Видалення…" : "Видалити"}</button>;
}
