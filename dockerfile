# Etapa 1: Construir la aplicación
FROM node:lts-alpine3.20 AS build

WORKDIR /dermaai

COPY package*.json /dermaai/

RUN npm install

COPY . /dermaai/

RUN npm run build

RUN ls -la /dermaai

RUN ls -la /dermaai/build

# Etapa 2: Servir la aplicación con Nginx

EXPOSE 3000

CMD [ "npm", "run", "start" ]