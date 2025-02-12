import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiUsers, FiBarChart2, FiAward, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
  >
    <div className="flex items-center mb-4">
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold ml-4">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-20 pb-32 text-center"
      >
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Bienvenue sur Answer
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          La plateforme interactive qui révolutionne l'apprentissage en classe
        </p>
        <Link
          to="/auth/register"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Commencer maintenant
          <FiPlay className="ml-2" />
        </Link>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">
          Pourquoi choisir <span className="text-blue-600">Answer</span> ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={FiBook}
            title="Création facile"
            description="Créez des questionnaires personnalisés en quelques clics avec notre interface intuitive."
          />
          <FeatureCard
            icon={FiUsers}
            title="Interaction en temps réel"
            description="Engagez vos étudiants avec des quiz interactifs et obtenez des réponses instantanées."
          />
          <FeatureCard
            icon={FiBarChart2}
            title="Analyses détaillées"
            description="Suivez les performances et identifiez les domaines d'amélioration grâce à nos rapports détaillés."
          />
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Comment ça marche ?</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              className="flex items-center bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex-shrink-0 mr-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Inscrivez-vous gratuitement</h3>
                <p className="text-gray-600">Créez votre compte professeur en quelques secondes</p>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              className="flex items-center bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex-shrink-0 mr-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Créez votre quiz</h3>
                <p className="text-gray-600">Ajoutez vos questions et définissez les bonnes réponses</p>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              className="flex items-center bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex-shrink-0 mr-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Lancez la session</h3>
                <p className="text-gray-600">Invitez vos étudiants et commencez le quiz en temps réel</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Prêt à commencer ?</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Rejoignez des milliers de professeurs qui rendent leurs cours plus interactifs avec Answer
        </p>
        <Link
          to="/auth/register"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Créer un compte gratuit
          <FiAward className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;