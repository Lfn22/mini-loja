import React, { useState } from "react";

function Login({ setUsuario, setPagina }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login simulado
    if (form.username && form.password) {
      setUsuario({ username: form.username });
      setPagina("home");
      alert("Login realizado com sucesso!");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md flex flex-col gap-4 w-80">
        <h2 className="text-xl font-bold mb-2 text-center">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Usuário"
          value={form.username}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
