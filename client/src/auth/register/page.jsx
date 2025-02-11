import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/ui/Button';
import axios from 'axios';
import { useAuth } from '@hooks/useAuth';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Validation
    if (!validatePassword(password)) {
      setError('Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/api/auth/signup', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      if (response.data.token) {
        await login(response.data.token);
        navigate('/quizz');
      } else {
        navigate('/auth/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Échec de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg border-2 border-gray-200 
    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
    transition-all duration-200 ease-in-out text-gray-700
    placeholder-gray-400 bg-white
  `;

  const labelClasses = `
    text-sm font-medium text-gray-700 mb-1 block
  `;

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Créez votre compte
            </h1>
            <p className="text-gray-500">
              Rejoignez-nous pour accéder à tous nos quizz
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className={labelClasses}>
                  Prénom
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClasses}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className={labelClasses}>
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClasses}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={labelClasses}>
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="password" className={labelClasses}>
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClasses}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className={labelClasses}>
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={inputClasses}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                extraClass={`
                  w-full py-3 px-6 rounded-lg text-white text-sm font-medium
                  transition-all duration-200 ease-in-out
                  ${isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
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
                    Inscription en cours...
                  </span>
                ) : (
                  "Créer mon compte"
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Déjà inscrit ?{' '}
              <a 
                href="/auth/login" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Connectez-vous
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
