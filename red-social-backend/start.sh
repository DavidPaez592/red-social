#!/bin/sh

echo "⏳ Esperando a que Oracle DB esté disponible..."

# Espera hasta que el puerto 1521 de Oracle esté listo
while ! nc -z oracle 1521; do
  sleep 1
done

echo "✅ Oracle DB está lista."

echo "🚀 Ejecutando Seeder..."
node seeder.js

echo "📦 Iniciando backend..."
node src/app.js