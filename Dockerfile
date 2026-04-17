FROM node:latest AS base

WORKDIR /api

COPY . .

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

FROM base AS dev
RUN echo "==> Iniciando dev..."
RUN npm i
CMD ["npm", "run", "dev"]

FROM base AS prod
RUN echo "==> Iniciando prod..."
RUN npm install --include=dev
RUN npm run build
CMD ["npm", "run", "start"]

EXPOSE 8000
