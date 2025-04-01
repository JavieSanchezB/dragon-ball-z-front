# 🐉 Dragon Ball Z Front

![Dragon Ball Z Banner](https://via.placeholder.com/1200x400?text=Dragon+Ball+Z+Front) <!-- Reemplazar con imagen real -->

Dragon Ball Z Front es una aplicación front-end desarrollada con Next.js que consume una API en Node.js para mostrar información sobre personajes de Dragon Ball Z.

## 🚀 Tecnologías Utilizadas

| Tecnología | Descripción |
|------------|-------------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white) | Framework de React para el desarrollo del frontend |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) | Entorno de ejecución para JavaScript en el servidor |
| ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) | Biblioteca de JavaScript para construir interfaces de usuario |
| ![PM2](https://img.shields.io/badge/PM2-2B037A?logo=pm2&logoColor=white) | Administrador de procesos para aplicaciones Node.js en producción |
| ![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white) | Servidor web utilizado como proxy inverso |

## ✨ Características Principales

- 🎨 **Interfaz dinámica**: Los datos de los personajes se obtienen dinámicamente de la API en Node.js
- 🖼️ **Representación visual**: Muestra imágenes y descripciones detalladas de los personajes
- 🧭 **Navegación intuitiva**: Permite explorar diferentes personajes y sus transformaciones
- ⚡ **Rendimiento optimizado**: Gracias a la generación estática de Next.js
- 🔒 **Seguridad**: Configuración profesional con proxy inverso y gestión de procesos

## 📂 Estructura del Proyecto

```bash
dragon-ball-z-front/
├── app/
│   └── page.js        # Componente principal que muestra la información del personaje
├── next.config.js     # Configuración de Next.js con reescrituras para proxy de API
├── package.json       # Dependencias y scripts del proyecto
├── public/            # Assets estáticos (imágenes, fuentes)
└── components/        # Componentes reutilizables
```
⚡ Instalación y Ejecución Local

1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/dragon-ball-z-front.git
```
```bash
cd dragon-ball-z-front
```
2️⃣ Instalar dependencias
```bash
npm install
```

3️⃣ Configurar la API
Este proyecto consume datos de una API en Node.js. Asegúrate de que la API esté corriendo en http://localhost:3001 o ajusta el archivo next.config.js si es necesario.

4️⃣ Ejecutar en desarrollo
```bash
npm run dev
```
El proyecto estará disponible en:
http://localhost:3000

🌍 Despliegue en AWS EC2
1️⃣ Conectarse a la instancia EC2
Desde tu terminal, conéctate a la instancia EC2:
```bash
ssh -i "tu-clave.pem" ubuntu@tu-ip-publica
```
2️⃣ Instalar Node.js y PM2 en EC2
```bash
sudo apt update && sudo apt install -y curl
```
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```
```bash
sudo apt install -y nodejs
```
```bash
sudo npm install -g pm2
```
3️⃣ Clonar el proyecto en EC2
```bash
git clone https://github.com/tu-usuario/dragon-ball-z-front.git
```
```bash
cd dragon-ball-z-front
```
```bash
npm install
```
4️⃣ Crear la versión de producción
```bash
npm run build
```
5️⃣ Iniciar el servidor con PM2
```bash
pm2 start npm --name dbz -- start
```
```bash
pm2 save
```
```bash
pm2 startup
```
🔹 PM2 mantendrá la aplicación corriendo en segundo plano y reiniciará el proceso si el servidor se reinicia.

🌐 Configurar Nginx para acceso público (opcional)
Si deseas acceder sin poner :3000, instala y configura Nginx como proxy inverso:

1️⃣ Instalar Nginx
```bash
sudo apt install nginx -y
```
2️⃣ Crear configuración para el proyecto
```bash
sudo nano /etc/nginx/sites-available/dragon-ball-z
```
3️⃣ Agregar esta configuración
```bash
server {
    listen 80;
    server_name tu-dominio.com;  # O usa la IP pública de tu EC2

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
4️⃣ Guardar y activar la configuración
```bash
sudo ln -s /etc/nginx/sites-available/dragon-ball-z /etc/nginx/sites-enabled/
```
```bash
sudo systemctl restart nginx
```
🔥 Acceder a la Aplicación
📌 Si configuraste Nginx, accede desde:

http://tu-dominio.com (si tienes un dominio)

http://tu-ip-publica (IP de la instancia EC2)

🤝 Contribuciones
Las contribuciones son bienvenidas. Para proponer cambios:

Fork al repositorio

Crear una nueva branch

Hacer un pull request

📜 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

🎉 ¡Gracias por visitar este proyecto! Si te ha sido útil, ⭐ dale un star al repositorio y sigue contribuyendo. 🚀

