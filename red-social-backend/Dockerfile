FROM node:18

# Instalar netcat
RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force && npm install --force


COPY . .
RUN chmod +x ./start.sh

EXPOSE 3000

CMD ["sh", "./start.sh"]
