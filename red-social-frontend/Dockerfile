# Etapa 1: construir la app
FROM node:22.1.0-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: servir con nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
