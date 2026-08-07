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
    <div className="w-full max-w-md bg-[#00598A]/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-white border border-white/20">
      <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wider">
        LOGIN
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Field Email */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            required
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm font-medium" />
        </div>

        {/* Field Password */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            required
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm font-medium" />
        </div>

        {/* Tombol Login */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            className="mx-auto mt-10 block w-full max-w-[220px] rounded-xl bg-white py-4 text-lg font-bold text-[#00598A] transition duration-200 hover:bg-gray-100">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}