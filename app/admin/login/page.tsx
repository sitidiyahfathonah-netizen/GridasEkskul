"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@gridas.sch.id" && password === "admin123") {
      localStorage.setItem("admin_token", "logged_in");
      alert("Login Berhasil!");
      router.push("/admin/dashboard");
    } else {
      alert("Email atau Password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">LOGIN ADMIN</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500 text-white"
              placeholder="admin@gridas.sch.id"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500 text-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#007cc2] hover:bg-[#006aa7] text-white font-bold py-3.5 rounded-xl transition shadow-lg mt-2"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}