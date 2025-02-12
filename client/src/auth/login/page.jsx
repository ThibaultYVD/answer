import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import axios from "axios";
import { useAuth } from "@hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/signin",
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.token) {
        await login(response.data.token);
        navigate("/quizz");
      } else {
        throw new Error("Token non reçu");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg 
    border border-gray-300
    focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
    transition-all duration-200 ease-in-out 
    text-gray-700 bg-gray-50
    placeholder-gray-400
  `;

  const labelClasses = `
    text-sm font-medium text-gray-600 mb-1 block
  `;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-8 border border-gray-100">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Connexion
            </h1>
            <p className="text-gray-500 text-lg">
              Connectez-vous pour accéder à vos quizz
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl animate-shake">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2 group">
                <label htmlFor="email" className={`${labelClasses} group-focus-within:text-purple-600`}>
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  placeholder="john.doe@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 group">
                <label htmlFor="password" className={`${labelClasses} group-focus-within:text-purple-600`}>
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClasses}
                  placeholder="••••••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                extraClass={`
                  w-full py-4 px-6 rounded-xl text-white text-base font-semibold
                  transition-all duration-200 ease-in-out
                  ${isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                  }
                  transform hover:-translate-y-0.5 active:translate-y-0
                  shadow-lg hover:shadow-xl active:shadow-md
                `}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Pas encore de compte ?{' '}
              <a 
                href="/auth/register" 
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
              >
                Inscrivez-vous
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;