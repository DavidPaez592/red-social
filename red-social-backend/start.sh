#!/bin/sh

echo "⏳ Esperando a que Oracle DB esté disponible..."

while ! nc -z oracle 1521; do
  sleep 1
done

echo "🚀 Ejecutando Seeder..."
node seeder.js

echo "📦 Iniciando backend..."
node src/app.js