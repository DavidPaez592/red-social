FROM node:18

# Crear carpeta app
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install

COPY . .
RUN chmod +x ./start.sh


# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la app
CMD ["sh", "./start.sh"]

