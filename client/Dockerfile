# Utilisation d'une image légère de Node.js (version 20 avec Alpine Linux)
FROM node:20-alpine

# Définition du répertoire de travail
WORKDIR /src

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY . .

# Exposition du port 3000 (port utilisé par Vite en mode développement)
EXPOSE 3000

# Commande pour lancer Vite en mode développement
CMD ["npm", "run", "dev"]
