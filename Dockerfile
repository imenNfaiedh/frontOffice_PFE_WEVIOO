# Étape 1 : Build Angular app avec Node 20
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --prod

# Étape 2 : Serveur NGINX pour les fichiers compilés
FROM nginx:alpine
COPY --from=build /app/dist/front-office-pfe-v1/browser  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
