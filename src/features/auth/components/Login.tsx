import { useState } from "react";
import { login } from "../../../config/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      console.log("Connecté :", userData);
      alert(`Bienvenue ${userData.name}`);
      localStorage.setItem("token", userData.token);
    } catch (err) {
      alert("Email ou mot de passe incorrect");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
      >
        Se connecter
      </button>
    </form>
  );
}
