FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY src/prisma ./src/prisma
COPY .env ./
COPY . .

RUN npm install
RUN npm run build

RUN apk add update && apk add install -y openssh-server
RUN mkdir /var/run/sshd

EXPOSE 2222 
EXPOSE 8080

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]



