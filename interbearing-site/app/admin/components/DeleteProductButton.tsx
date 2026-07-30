"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  id: string;
  title: string;
  imageUrl: string | null;
};

function getStoragePath(imageUrl: string) {
  const marker = "/storage/v1/object/public/product-images/";
  const index = imageUrl.indexOf(marker);
  return index === -1
    ? null
    : decodeURIComponent(imageUrl.slice(index + marker.length));
}

export default function DeleteProductButton({ id, title, imageUrl }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Видалити товар «${title}»?`)) return;

    setIsDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      window.alert(`Не вдалося видалити товар: ${error.message}`);
      setIsDeleting(false);
      return;
    }

    if (imageUrl) {
      const path = getStoragePath(imageUrl);
      if (path) await supabase.storage.from("product-images").remove([path]);
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:opacity-60"
    >
      {isDeleting ? (
        <LoaderCircle className="animate-spin" size={17} />
      ) : (
        <Trash2 size={17} />
      )}
      Видалити
    </button>
  );
}
