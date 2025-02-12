import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  title: string;
  content: string;
}

interface SectionProps {
  section: Section;
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;
}

const SectionComponent: React.FC<SectionProps> = ({ section, activeSection, setActiveSection }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8 bg-white rounded-lg shadow-md overflow-hidden"
  >
    <button
      onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
      className="w-full px-6 py-4 text-left bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${
            activeSection === section.id ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>
    <motion.div
      initial={false}
      animate={{
        height: activeSection === section.id ? 'auto' : 0,
        opacity: activeSection === section.id ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="p-6 bg-white">
        <p className="text-gray-600 leading-relaxed">{section.content}</p>
      </div>
    </motion.div>
  </motion.div>
);

const RGPDPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections: Section[] = [
    {
      id: 'introduction',
      title: 'Introduction et Objectifs',
      content: 'Notre organisation s\'engage à protéger la confidentialité et la sécurité des données personnelles conformément au RGPD. Ce document définit notre politique de traitement des données personnelles.'
    },
    {
      id: 'collecte',
      title: 'Collecte des Données',
      content: 'Nous collectons uniquement les données nécessaires à nos services, incluant : nom, prénom, adresse email, adresse postale, numéro de téléphone. Ces données sont collectées avec le consentement explicite des utilisateurs.'
    },
    {
      id: 'utilisation',
      title: 'Utilisation des Données',
      content: 'Les données sont utilisées pour : la fourniture de nos services, la communication avec les clients, l\'amélioration de nos services, le respect des obligations légales.'
    },
    {
      id: 'protection',
      title: 'Protection des Données',
      content: 'Nous mettons en place des mesures de sécurité techniques et organisationnelles pour protéger les données : chiffrement, contrôle d\'accès, formation du personnel, audits réguliers.'
    },
    {
      id: 'droits',
      title: 'Droits des Utilisateurs',
      content: 'Les utilisateurs disposent des droits suivants : droit d\'accès aux données, droit de rectification, droit à l\'effacement, droit à la portabilité, droit d\'opposition, droit à la limitation du traitement.'
    },
    {
      id: 'conservation',
      title: 'Conservation des Données',
      content: 'Les données sont conservées uniquement pendant la durée nécessaire aux finalités du traitement, conformément aux obligations légales.'
    },
    {
      id: 'soustraitants',
      title: 'Sous-traitants',
      content: 'Nos sous-traitants sont soumis aux mêmes obligations de protection des données et font l\'objet de contrats spécifiques.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Politique de Protection des Données
          </h1>
          <p className="text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <div className="space-y-4">
          {sections.map(section => (
            <SectionComponent
              key={section.id}
              section={section}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-600">
            Pour toute question concernant notre politique de protection des données ou pour exercer vos droits, veuillez contacter notre Délégué à la Protection des Données :
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <p className="text-blue-800">Email : dpo@answer.com</p>
            <p className="text-blue-800">Téléphone : +33 (0)1 23 45 67 89</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RGPDPage;