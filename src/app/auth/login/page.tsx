"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import api from "@/util/api";
import { endpoints } from "@/constants/endpoints";
import Input from "@/components/Input";
import Button from "@/components/Button";


export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post(endpoints.login, { username, password });

      
      localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      
      router.push(routes.dashboard);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.error || "Ocurrió un error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-4/12 min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl text-slate-500 mb-6 text-center">Iniciar Sesión</h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-slate-500">Usuario</label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="!w-full block border rounded px-3 py-2"
            placeholder="Ingrese su usuario"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-slate-500">Contraseña</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Ingrese su contraseña"
            required
          />
        </div>

        <Button
          
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </form>
    </div>
  );
}
