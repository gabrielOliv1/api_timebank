FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY src/prisma ./src/prisma
COPY .env ./
COPY /etc/ssh/sshd_config ./etc/ssh/sshd_config
COPY . .

RUN npm install
RUN npm run build

RUN apk update && apk add --no-cache openssh && echo "root:root" | chpasswd
RUN mkdir /var/run/sshd

# REMOVE IT AFTER DEBUG, SET KEY-BASED AUTHENTICATION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

EXPOSE 8080 2222

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]



