## container multi-stage build

## etapa 1 instalação de depêndencias.
FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

## etapa 2 container com somente arquivos necessários e depêndencias de produção.
FROM node:16

WORKDIR /app

COPY --from=builder /app/dist /app
COPY --from=builder /app/package*.json /app

RUN npm install --production

EXPOSE 3000

# CMD ["npm", "run", "start:prod"]
CMD tail -f /dev/null