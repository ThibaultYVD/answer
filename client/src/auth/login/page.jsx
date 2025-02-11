import React, { useState } from "react";
import Button from "@components/ui/Button";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/signin",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      window.location.href = "/quizz";
    } catch (err) {
      setError(err.response?.data?.message || "Échec de la connexion");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="text-center">
          <Button
            type="submit"
            extraClass="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
          >
            Se connecter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
