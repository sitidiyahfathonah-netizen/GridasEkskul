"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Proses autentikasi login di sini
    // Setelah berhasil, arahkan ke dashboard admin:
    router.push("/admin/dashboard");
  };

  return (
    <div
      className="
        w-full
        max-w-[900px]
        rounded-[32px]
        border
        border-white/20
        bg-[#00598A]/85
        px-8
        py-10
        text-white
        shadow-2xl
        backdrop-blur-md

        sm:px-14
        sm:py-12

        md:px-24
        md:py-14
      "
    >
      {/* Judul */}
      <h1
        className="
          mb-8
          text-center
          text-4xl
          font-extrabold
          tracking-[0.08em]

          sm:mb-10
          sm:text-5xl
        "
      >
        LOGIN
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          mx-auto
          w-full
          max-w-[650px]
        "
      >
        {/* Field Email */}
        <div className="mb-7">
          <label
            htmlFor="email"
            className="
              mb-3
              block
              text-lg
              font-bold
            "
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            required
            className="
              h-[58px]
              w-full
              rounded-xl
              border-0
              bg-white
              px-6
              text-base
              font-medium
              text-gray-800
              placeholder:text-gray-400
              outline-none
              focus:ring-4
              focus:ring-sky-300/40
            "
          />
        </div>

        {/* Field Password */}
        <div>
          <label
            htmlFor="password"
            className="
              mb-3
              block
              text-lg
              font-bold
            "
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            required
            className="
              h-[58px]
              w-full
              rounded-xl
              border-0
              bg-white
              px-6
              text-base
              font-medium
              text-gray-800
              placeholder:text-gray-400
              outline-none
              focus:ring-4
              focus:ring-sky-300/40
            "
          />
        </div>

        {/* Tombol Login */}
        <div className="flex justify-center pt-10">
          <button
            type="submit"
            className="
              h-[56px]
              w-[180px]
              rounded-xl
              bg-white
              text-lg
              font-bold
              text-[#00598A]
              shadow-lg
              transition
              duration-200
              hover:bg-gray-100
              hover:scale-[1.02]
              active:scale-[0.98]
            "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}