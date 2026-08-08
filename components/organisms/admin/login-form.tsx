"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

      // Request login ke endpoint Strapi
      const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email, // Strapi v4/v5 menggunakan key 'identifier'
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Email atau password salah");
      }

      // Simpan JWT token ke localStorage agar bisa dipakai untuk request selanjutnya
      localStorage.setItem("admin_token", data.jwt);
      localStorage.setItem("user_info", JSON.stringify(data.user));

      // Redirect ke dashboard admin setelah berhasil
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "Gagal melakukan login. Periksa koneksi atau kredensial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#00598A]/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-white border border-white/20">
      <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wider">
        LOGIN
      </h1>

      {/* Tampilkan Pesan Error Jika Ada */}
      {errorMsg && (
        <div className="mb-4 rounded-xl bg-red-500/80 p-3 text-center text-xs font-semibold text-white">
          {errorMsg}
        </div>
      )}

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
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm font-medium"
          />
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
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm font-medium"
          />
        </div>

        {/* Tombol Login */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="mx-auto mt-4 block w-full max-w-[220px] rounded-xl bg-white py-4 text-lg font-bold text-[#00598A] transition duration-200 hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}