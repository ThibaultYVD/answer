import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Bienvenue sur Answer</h1>
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Qu'est-ce que Answer ?</h2>
        <p className="text-lg text-gray-700">
          Answer est une plateforme interactive qui permet aux professeurs de créer des questionnaires engageants pour leurs étudiants. Inspirée par Kahoot, notre application rend l'apprentissage amusant et interactif.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Fonctionnalités</h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>Créer des questionnaires personnalisés</li>
          <li>Ajouter des questions à choix multiples</li>
          <li>Définir des réponses correctes pour chaque question</li>
          <li>Suivre les performances des étudiants en temps réel</li>
          <li>Analyser les résultats des questionnaires</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Avantages pour les professeurs</h2>
        <p className="text-lg text-gray-700">
          Answer permet aux professeurs de créer des questionnaires interactifs qui captivent l'attention des étudiants et rendent l'apprentissage plus dynamique. Les professeurs peuvent facilement suivre les progrès des étudiants et identifier les domaines qui nécessitent une attention particulière.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Avantages pour les étudiants</h2>
        <p className="text-lg text-gray-700">
          Les étudiants bénéficient d'une expérience d'apprentissage interactive et engageante. Answer rend l'apprentissage amusant et compétitif, ce qui motive les étudiants à participer activement et à améliorer leurs connaissances.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Comment commencer ?</h2>
        <p className="text-lg text-gray-700">
          Pour commencer, inscrivez-vous en tant que professeur et créez votre premier questionnaire. Invitez vos étudiants à rejoindre la session et commencez à poser des questions. Suivez les résultats en temps réel et analysez les performances de vos étudiants.
        </p>
        <div className="text-center mt-6">
          <a href="/auth/register" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            S'inscrire
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;