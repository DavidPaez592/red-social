FROM node:18

# Instalar netcat
RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

# Copiar package.json y lock primero para usar cache si no cambia
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install 

# Instalar todas las dependencias de forma global
RUN npm install --global nodemon

# Copiar el resto del proyecto
COPY . .

# Dar permisos al script de inicio
RUN chmod +x ./start.sh

EXPOSE 3000

# Comando de arranque
CMD ["sh", "./start.sh"]
