# Telco Frontend

Aplicación frontend desarrollada con **Angular 18** para el sistema de ventas Telco. Incluye autenticación, protección de rutas e interceptores para manejo de requests HTTP.

## 📋 Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js)
- **Git**

Puedes verificar tus versiones con:
```bash
node --version
npm --version
git --version
```

## 🚀 Instalación y Setup Inicial

### 1. Clonar el Repositorio desde GitHub

```bash
git clone https://github.com/cesarch23/TelcoFrontend.git
cd TelcoFrontend
```

### 2. Instalar Dependencias

```bash
npm install
```

Este comando descargará todas las dependencias necesarias del proyecto, incluyendo Angular, Material Design y sus herramientas de desarrollo.

### 3. Iniciar el Servidor de Desarrollo

```bash
npm start
```

O de forma alternativa:
```bash
ng serve
```

La aplicación estará disponible en: **http://localhost:4200/**

El servidor se reiniciará automáticamente cuando detecte cambios en los archivos.

 

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/      # Componente de dashboard
│   │   ├── login/          # Componente de login
│   │   └── unauthorized/   # Componente de acceso denegado
│   ├── guards/
│   │   └── auth.guard.ts   # Guard de protección de rutas
│   ├── interceptors/
│   │   └── auth.interceptor.ts  # Interceptor para autenticación
│   ├── services/
│   │   └── auth.service.ts      # Servicio de autenticación
│   └── app-routing/        # Configuración de rutas
├── public/                 # Recursos estáticos
└── index.html              # Página principal
```

## 🔐 Características de Seguridad

- **Auth Guard**: Protege las rutas autenticadas
- **Auth Interceptor**: Maneja automáticamente los tokens de autenticación en los requests HTTP
- **Auth Service**: Centraliza la lógica de autenticación

 

## 📦 Build para Producción

Para compilar la aplicación para producción:

```bash
npm build
```

Los archivos compilados estarán en la carpeta `dist/venta-frontend/`.

## 🌐 Dependencias Principales

- **@angular/core** ^18.2.0 - Framework principal
- **@angular/material** ^18.2.14 - Componentes UI
- **@angular/router** ^18.2.0 - Sistema de enrutamiento
- **@angular/forms** ^18.2.0 - Manejo de formularios
- **rxjs** ~7.8.0 - Programación reactiva
- **typescript** ~5.5.2 - Lenguaje de programación

## 🐛 Solución de Problemas

### Errores de dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```
## Uso de la aplicación
- Para el login usar la credenciales de prueba del backend
