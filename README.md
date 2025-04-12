# ConnectBuy 🛍️

ConnectBuy es una aplicación de comercio electrónico que permite a los usuarios encontrar productos de diferentes tiendas (Amazon, eBay, AliExpress) y filtrarlos por distancia, categoría y tienda.

## Características ✨

- 🔍 Búsqueda de productos
- 📍 Filtrado por distancia (basado en ubicación en Caracas)
- 🏷️ Filtrado por categorías
- 🏪 Filtrado por tiendas
- 🎠 Carrusel de productos destacados
- 📱 Diseño responsive
- 🔔 Sistema de notificaciones en tiempo real

## Tecnologías Utilizadas 🛠️

- React
- TypeScript
- Material-UI (MUI)
- WebSocket para notificaciones en tiempo real
- Zustand para gestión de estado
- Axios para peticiones HTTP

## Requisitos Previos 📋

- Node.js (versión 14 o superior)
- npm

## Instalación 🚀

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/connectBuy.git
cd connectBuy
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Inicia el servidor de websockets:**
```bash
npm run server
```

4. **Inicia el servidor de desarrollo:**
```bash
npm run dev
\`\`\`

## Estructura del Proyecto 📁

```plaintext
connectBuy/
├── src/
│   ├── components/    # Componentes reutilizables
│   │   ├── navbar/
│   │   ├── productCard/
│   │   ├── searchBar/
│   │   └── filters/
│   ├── hooks/        # Custom hooks
│   │   ├── useProducts.ts
│   │   └── useNotifications.ts
│   ├── state/        # Gestión de estado (Zustand)
│   │   └── filtersStore/
│   ├── utils/        # Utilidades y helpers
│   │   ├── location.ts
│   │   └── server.ts
│   ├── views/        # Componentes de página/vista
│   │   └── Home/
│   └── App.tsx       # Componente principal
├── public/          # Archivos estáticos
└── package.json     # Dependencias y scripts
```