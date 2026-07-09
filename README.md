# Curriculum Frontend

Un sitio web moderno y responsive para mostrar tu currículum vitae y portfolio personal, construido con React y Tailwind CSS.

![Portfolio Website](public/logo.png)

## 🌟 Características

- Diseño responsive que funciona en móvil, tablet y escritorio
- Carga dinámica de contenido desde una API backend
- Navegación con desplazamiento suave
- Componentes interactivos
- Tema oscuro con colores de acento
- CV/Currículum descargable
- Formulario de contacto con funcionalidad de email
- Exhibición de portfolio
- Línea de tiempo de experiencia laboral
- Categorización de habilidades
- Integración con redes sociales

## 🛠️ Tecnologías utilizadas

- **React 19**: Biblioteca moderna para UI
- **Vite**: Herramienta de frontend de última generación
- **Tailwind CSS**: Framework CSS basado en utilidades
- **React Router**: Para navegación y enrutamiento
- **Axios**: Cliente HTTP basado en promesas
- **Swiper**: Slider táctil moderno para móvil
- **React Icons**: Biblioteca de iconos populares
- **React Toastify**: Para notificaciones toast
- **React Spinners**: Animaciones de carga

## 🏗️ Estructura del proyecto

```
src/
  ├── api/              # Servicios de API y endpoints
  ├── assets/           # Activos estáticos (imágenes, etc.)
  ├── components/       # Componentes UI reutilizables
  ├── data/             # Configuraciones de datos estáticos
  ├── hooks/            # Hooks personalizados de React
  ├── lib/              # Utilidades y helpers
  ├── pages/            # Componentes de página
  ├── router/           # Configuración de enrutamiento
  ├── styles/           # Estilos CSS globales
  ├── App.jsx           # Componente principal de la aplicación
  ├── config.js         # Configuración de entorno y aplicación
  └── main.jsx          # Punto de entrada de la aplicación
```

## 🚀 Empezando

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/cdryampi/curriculum-frontend.git
   cd curriculum-frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn
   ```

3. Crea un archivo `.env` en el directorio raíz con las siguientes variables:

   ```
   VITE_API_BASE_URL=https://backend.yampi.eu
   VITE_GIT_HUB_URL=https://github.com/cdryampi/
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abre tu navegador y navega a `http://localhost:5173`

## 📦 Construyendo para producción

Para crear una build de producción:

```bash
npm run build
# o
yarn build
```

La build se generará en el directorio `dist/`.

## ✅ Verificación local

Antes de abrir un Pull Request, ejecuta al menos:

```bash
npm run build
```

Para revisar el resultado en navegador:

```bash
npm run dev
```

## 🌐 Despliegue

Este proyecto está configurado para despliegue en Vercel. Incluye:

- Builds automáticos al hacer push a la rama principal
- Soporte para variables de entorno
- Ruta de API para mantener vivo el backend

Para desplegar:

1. Sube tu código a GitHub
2. Conecta el repositorio a Vercel
3. Configura las variables de entorno en Vercel
4. ¡Despliega!

## 📋 Páginas

- **Inicio**: Página principal con información personal
- **Sobre mí**: Información detallada sobre tu experiencia
- **Experiencia laboral**: Línea de tiempo de experiencia profesional
- **Portfolio**: Muestra de proyectos
- **Servicios**: Servicios profesionales ofrecidos
- **Educación y habilidades**: Formación académica y habilidades técnicas
- **Contacto**: Formulario para enviar mensajes
- **Páginas estáticas**: Páginas de contenido personalizado

## 📝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, siéntete libre de enviar un Pull Request.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- Inspiración de diseño de varias plantillas de portfolio
- Iconos de [React Icons](https://react-icons.github.io/react-icons/)
- Animaciones con CSS y bibliotecas de React
