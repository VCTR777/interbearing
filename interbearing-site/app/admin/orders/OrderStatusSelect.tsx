"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const statuses = [
  { value: "new", label: "Нове" },
  { value: "processing", label: "В роботі" },
  { value: "completed", label: "Завершене" },
  { value: "cancelled", label: "Скасоване" },
];

export default function OrderStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function updateStatus(nextStatus: string) {
    if (nextStatus === currentStatus || isSaving) return;

    const previousStatus = currentStatus;
    setCurrentStatus(nextStatus);
    setIsSaving(true);
    setError("");

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: nextStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      setCurrentStatus(previousStatus);
      setError("Не вдалося змінити статус.");
    } else {
      router.refresh();
    }

    setIsSaving(false);
  }

  return (
    <div>
      <div className="relative">
        <select
          value={currentStatus}
          disabled={isSaving}
          onChange={(event) => updateStatus(event.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#0b1220] px-4 pr-10 text-sm font-semibold text-white outline-none focus:border-blue-500 disabled:opacity-60"
        >
          {statuses.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {isSaving && (
          <LoaderCircle
            aria-hidden="true"
            size={17}
            className="absolute right-3 top-3 animate-spin text-blue-400"
          />
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
