FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY src/prisma ./src/prisma
COPY .env ./
COPY dist ./dist
COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "node dist/server.js" ]