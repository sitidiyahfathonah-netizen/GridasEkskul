"use client";

import LoginForm from "@/components/organisms/admin/login-form";

export default function AdminLoginPage() {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[url('/images/bg-sekolah.jpg')]
        bg-cover
        bg-center
        bg-no-repeat
        p-4
        text-white
      "
    >
      {/* Overlay gelap agar background tidak terlalu terang */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Form login */}
      <div className="relative z-10 flex w-full justify-center">
        <LoginForm />
      </div>
    </main>
  );
}