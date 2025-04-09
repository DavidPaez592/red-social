#!/bin/sh

echo "📦 Instalando dependencias dentro del contenedor..."
npm install
npm install --save-dev jest supertest

echo "⏳ Esperando a que Oracle DB esté disponible..."

while ! nc -z oracle 1521; do
  sleep 1
done

echo "🚀 Ejecutando Seeder..."
node seeder.js

echo "📦 Iniciando backend..."
node src/app.js