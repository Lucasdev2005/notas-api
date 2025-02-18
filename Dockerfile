## multi-stage build

## etapa 1 instalação de depêndencias.
FROM node:16 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

## etapa 2 instalação de depêndencias.
FROM node:16-slim

WORKDIR /app
COPY --from=builder /app /app
RUN npm install --only=development
EXPOSE 3000

CMD ["npm", "run", "start:dev"]