RED SOCIAL

Este proyecto es una red social sencilla que permite a los usuarios interactuar, usando una arquitectura
cliente-servidor. Está dividido en un frontend en React y un backend en Node.js con Express. Todo se puede
levantar con Docker.


TECNOLOGÍAS UTILIZADAS
BACKEND (red-social-backend)
- Node.js v22.14
- Express ^5.1.0
- Sequelize ^6.37.7 (ORM)
- OracleDB ^6.8.0 (Base de datos Oracle)
- jsonwebtoken ^9.0.2 (JWT para autenticación)
- bcryptjs ^3.0.2 (Encriptación de contraseñas)
- dotenv ^16.4.7 (Variables de entorno)
- cors ^2.8.5
- swagger-jsdoc y swagger-ui-express (Documentación de la API)
- nodemon ^3.1.9 (Modo desarrollo)
  
FRONTEND (red-social-frontend)
- React con Create React App
- HTML, CSS, JS (moderno)
- Docker y nginx para producción

ESTRUCTURA DEL PROYECTO
red-social/
--- red-social-backend/ # API RESTful con Express
--- red-social-frontend/ # Interfaz de usuario con React
--- docker-compose.yml # Orquestación de servicios
--- README.md


CÓMO LEVANTAR EL PROYECTO
CON DOCKER (recomendado)
1. Clona el repositorio:
 git clone https://github.com/DavidPaez592/red-social.git
 cd red-social

1. Crea un archivo .env dentro de red-social-backend con tus variables (ver ejemplo más abajo).

2. Ejecuta:
 docker compose down -v && docker compose up --build

1. Accede a:
 - Frontend: http://localhost:3001
 - Backend: http://localhost:3000
 Para acceder a la documentación de la API, se debe tener el backend levantado.
 - Documentacion : http://localhost:3000/api-docs/#/


VARIABLES DE ENTORNO (.env de ejemplo)
DB_USER=system
DB_PASSWORD=oracle
DB_NAME=XEPDB1
DB_HOST=oracle
DB_PORT=1521
JWT_SECRET=U8!k3Gz@fP2$wQ7mL0^ZbE5&nTsY
