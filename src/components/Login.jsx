import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "", name: "", email: "" });
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      register(form);
      alert("Cadastro efetuado. Logado.");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      login(form);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("login")} className={`px-3 py-1 ${mode==="login"?"bg-blue-600 text-white":"bg-gray-100"}`}>Login</button>
        <button onClick={() => setMode("register")} className={`px-3 py-1 ${mode==="register"?"bg-blue-600 text-white":"bg-gray-100"}`}>Cadastro</button>
      </div>

      {mode === "login" ? (
        <form onSubmit={handleLogin} className="space-y-3">
          <input value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} placeholder="Usuário" className="w-full p-2 border rounded" />
          <input value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} type="password" placeholder="Senha" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-3">
          <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Nome" className="w-full p-2 border rounded" />
          <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
          <input value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} placeholder="Usuário" className="w-full p-2 border rounded" />
          <input value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} type="password" placeholder="Senha" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Cadastrar</button>
        </form>
      )}
    </div>
  );
}
