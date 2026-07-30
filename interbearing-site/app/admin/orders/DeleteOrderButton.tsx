"use client";

import { LoaderCircle, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DeleteOrderButton({
  id,
  orderNumber,
}: {
  id: string;
  orderNumber: string;
}) {
  const router = useRouter();
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function deleteOrder() {
    if (isDeleting) return;

    setIsDeleting(true);
    setError("");

    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError("Не вдалося видалити замовлення.");
      setIsDeleting(false);
      return;
    }

    router.refresh();
  }

  if (!confirmationVisible) {
    return (
      <button
        type="button"
        onClick={() => {
          setConfirmationVisible(true);
          setError("");
        }}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/5 px-4 text-sm font-semibold text-red-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-200"
      >
        <Trash2 size={17} />
        Видалити
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
      <p className="text-xs leading-5 text-red-200">
        Видалити замовлення №{orderNumber}? Відновити його буде неможливо.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={isDeleting}
          onClick={() => setConfirmationVisible(false)}
          className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-white/10 bg-[#0b1220] px-3 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:text-white disabled:opacity-50"
        >
          <X size={14} />
          Ні
        </button>

        <button
          type="button"
          disabled={isDeleting}
          onClick={deleteOrder}
          className="inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-red-600 px-3 text-xs font-bold text-white transition hover:bg-red-500 disabled:cursor-wait disabled:opacity-60"
        >
          {isDeleting ? (
            <LoaderCircle size={15} className="animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}
          Так
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  );
}
