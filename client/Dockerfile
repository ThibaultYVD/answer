# Étape 1 : Build de l'application React
FROM node:18 AS build

WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copie tout le code source
COPY . .

# Build de l'application
RUN npm run build

# Étape 2 : Serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copie les fichiers de build dans le dossier de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
