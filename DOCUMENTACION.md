# Documentacion de mitienda

## Resumen
Proyecto Vue 3 que consume una API JSON para listar productos, mostrar detalle y navegar entre vistas. Usa Vue Router para las rutas, Vuex (configurado pero sin estado), Bootstrap para estilos base y Axios para llamadas HTTP.

## Requisitos y dependencias
- Vue 3, Vue Router 4, Vuex 4.
- Axios para HTTP.
- Bootstrap 5 y Popper.

Detalles en [package.json](package.json).

## Scripts disponibles
- `npm install` instala dependencias.
- `npm run serve` inicia desarrollo.
- `npm run build` compila para produccion.
- `npm run lint` ejecuta lint.

Ver [README.md](README.md).

## Estructura de carpetas
- [src/main.js](src/main.js) inicializa la app, router, store y Bootstrap.
- [src/App.vue](src/App.vue) compone navegacion y layout base.
- [src/router/index.js](src/router/index.js) define rutas.
- [src/store/index.js](src/store/index.js) crea el store (sin estado).
- [src/servicios/ServiciosProductos.js](src/servicios/ServiciosProductos.js) encapsula llamadas HTTP.
- [src/components](src/components) componentes reutilizables de tarjetas.
- [src/views](src/views) vistas de pagina.
- [src/assets/css/style.css](src/assets/css/style.css) estilos extra.

## Inicializacion de la app
La entrada [src/main.js](src/main.js) crea la aplicacion con `createApp(App)`, registra `store` y `router`, y monta en `#app`. Tambien importa Bootstrap JS y CSS.

## Enrutamiento
Configurado en [src/router/index.js](src/router/index.js):
- Ruta `/` -> vista `ListaProductos`.
- Ruta `/detalle-producto/:id` -> vista `DetalleProducto` con `props: true`.
- Ruta `/sobre-nosotros` -> carga lazy de `SobreNosotros`.
- Ruta comodin `/:pathMatch(.*)*` -> `NoEncontrado`.
- Paginacion se maneja con query `page` y se convierte a numero en el `props` de la ruta principal.

## Store
El store se crea en [src/store/index.js](src/store/index.js) pero sin `state`, `getters`, `mutations` ni `actions` activos. Es un placeholder para crecer.

## Servicios HTTP
En [src/servicios/ServiciosProductos.js](src/servicios/ServiciosProductos.js):
- `apiClient` configura base URL: `https://my-json-server.typicode.com/alvarezrod/dbjson/`.
- `obtenerProducto()` -> GET `/productos/`.
- `obtenerProductoId(id)` -> GET `/productos/:id`.
- `obtenerProductos(perPage, page)` -> GET `/productos?_limit=...&_page=...`.

## Componentes
### TarjetaProducto
- Archivo: [src/components/TarjetaProducto.vue](src/components/TarjetaProducto.vue).
- Props: `producto`.
- Renderiza card de Bootstrap con imagen, nombre, descripcion y enlace a detalle.
- Usa `router-link` con `DetalleProducto` y parametro `id`.

### TarjetaDetalle
- Archivo: [src/components/TarjetaDetalle.vue](src/components/TarjetaDetalle.vue).
- Props: `producto`.
- Muestra imagen y detalle en una card.
- Metodo `fixUrl(p)` corrige rutas que vienen como `./imagenes/...` para que apunten a `/imagenes/...`.
- Boton para volver a la lista (`/`).

## Vistas
### ListaProductos
- Archivo: [src/views/ListaProductos.vue](src/views/ListaProductos.vue).
- Props: `page` (numero de pagina, desde query).
- Data: `productos`, `totalProductos`.
- `watchEffect` recarga lista al cambiar `page`.
- Llama `ServiciosProductos.obtenerProductos(5, page)`.
- Calcula `totalPaginasSiguientes` con `Math.ceil(totalProductos / 5)` para habilitar el link `Next`.
- Renderiza lista con `TarjetaProducto` y enlaces de paginacion.

### DetalleProducto
- Archivo: [src/views/DetalleProducto.vue](src/views/DetalleProducto.vue).
- Props: `id` (desde ruta).
- En `created` llama `ServiciosProductos.obtenerProductoId(id)`.
- Renderiza `TarjetaDetalle` con el producto.

### NavMusic
- Archivo: [src/views/NavMusic.vue](src/views/NavMusic.vue).
- Barra superior con titulo, logo y seccion de usuario.
- Referencia logo en `src/assets/images/logo/logo.png`.

### NavMusicTool
- Archivo: [src/views/NavMusicTool.vue](src/views/NavMusicTool.vue).
- Barra secundaria con boton de carrito y enlaces (About Us, Login/Register).
- Incluye un offcanvas de Bootstrap para el carrito.
- Elementos con ids (`summary`, `cart-total`) listos para integracion JS.

### SobreNosotros
- Archivo: [src/views/SobreNosotros.vue](src/views/SobreNosotros.vue).
- Vista simple con texto base.

### NoEncontrado
- Archivo: [src/views/NoEncontrado.vue](src/views/NoEncontrado.vue).
- Mensaje 404 basico.

## Layout principal
En [src/App.vue](src/App.vue):
- Navegacion con `router-link` hacia lista y sobre nosotros.
- Inserta `NavMusic` y `NavMusicTool`.
- Renderiza `router-view` para las vistas.

## Estilos
En [src/assets/css/style.css](src/assets/css/style.css):
- Estilos para imagenes, layout, tipografias y clases varias.
- Incluye clases para tarjetas y detalles del producto.

## Flujo de datos
1. Lista de productos: `ListaProductos` -> servicio `obtenerProductos` -> API.
2. Detalle de producto: `DetalleProducto` -> servicio `obtenerProductoId` -> API.
3. Navegacion: rutas gestionadas por Vue Router.

## Notas tecnicas
- La paginacion depende del header `x-total-count` que devuelve el servicio.
- `watchEffect` se usa dentro de `created` para reaccionar a cambios de `page`.
- El store esta listo para ampliar si se necesita carrito real o usuario.

## Posibles mejoras
- Mover `watchEffect` a `watch` sobre `page` para mayor claridad.
- Agregar manejo de errores visible al usuario.
- Integrar carrito real en `NavMusicTool`.
- Añadir tests y tipado.
