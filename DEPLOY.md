# Instrucciones de Despliegue

Este documento contiene instrucciones para desplegar la aplicación Curriculum Frontend en diferentes entornos.

## Variables de Entorno Requeridas

Antes de desplegar, asegúrate de configurar las siguientes variables de entorno:

```
VITE_API_BASE_URL=https://tu-backend-api.com
VITE_GLOBAL_DELAY_CALLBACK=1500
VITE_LOGIN_USER=tu_usuario
VITE_LOGIN_PASSWORD=tu_contraseña
VITE_GIT_HUB_URL=https://github.com/tuusuario/
```

## Métodos de Despliegue

### 1. Despliegue con Docker

#### Requisitos
- Docker
- Docker Compose (opcional)

#### Instrucciones

**Usando Docker Compose (recomendado):**

1. Configura las variables de entorno en un archivo `.env` en la raíz del proyecto o expórtalas en tu sistema.
2. Ejecuta:
   ```bash
   docker-compose up -d
   ```

**Usando Docker directamente:**

1. Construye la imagen:
   ```bash
   docker build -t curriculum-frontend --build-arg VITE_API_BASE_URL=https://tu-backend-api.com --build-arg VITE_GLOBAL_DELAY_CALLBACK=1500 --build-arg VITE_LOGIN_USER=tu_usuario --build-arg VITE_LOGIN_PASSWORD=tu_contraseña --build-arg VITE_GIT_HUB_URL=https://github.com/tuusuario/ .
   ```

2. Ejecuta el contenedor:
   ```bash
   docker run -d -p 80:80 curriculum-frontend
   ```

### 2. Despliegue en Vercel

Este proyecto está preconfigurado para Vercel con el archivo `vercel.json`.

1. Instala la CLI de Vercel:
   ```bash
   npm install -g vercel
   ```

2. Despliega:
   ```bash
   vercel
   ```

3. Para producción:
   ```bash
   vercel --prod
   ```

4. Configura las variables de entorno en el dashboard de Vercel.

### 3. Despliegue Manual

1. Construye el proyecto:
   ```bash
   npm install
   npm run build
   ```

2. Despliega el contenido de la carpeta `dist` en cualquier servidor web estático (Nginx, Apache, etc.).

## Cron Jobs

Este proyecto incluye una configuración para un cron job que mantiene activo el backend:

```json
{
  "crons": [
    {
      "path": "/api/ping-render",
      "schedule": "0 5 * * *"
    }
  ]
}
```

Este cron job está configurado para ejecutarse todos los días a las 5:00 AM (UTC) y hacer ping al backend para evitar que se duerma (útil para servicios gratuitos como Render).

## Solución de Problemas

### CORS
Si experimentas problemas de CORS, asegúrate de que tu backend esté configurado para aceptar solicitudes del dominio donde está alojado tu frontend.

### Variables de Entorno
Verifica que todas las variables de entorno estén correctamente configuradas en el entorno de despliegue.

### Cache del Navegador
Si los cambios no se reflejan después de un despliegue, intenta borrar la caché del navegador o usar modo incógnito.
