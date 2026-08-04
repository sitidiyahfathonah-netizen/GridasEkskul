import { Suspense } from "react";
import { PendaftaranForm } from "@/components/organisms/pendaftaran";

export default function DaftarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#16357a] text-white flex items-center justify-center">Loading...</div>}>
      <PendaftaranForm />
    </Suspense>
  );
}