# Luma Beauty

Luma Beauty es una Single Page Application desarrollada con Vue.js que simula un ecommerce lite de maquillaje. La aplicación permite explorar productos, registrarse, iniciar sesión, agregar productos al carrito, realizar compras simuladas, consultar el historial de compras y administrar productos desde un panel privado.

El proyecto fue desarrollado como Trabajo Práctico Final para la materia Programación en nuevas tecnologías Vue.js.

## Deploy

URL del proyecto desplegado:

```txt
https://luma-beauty.vercel.app
```

## Integrantes

* Lucas Rey
* Lucas Olivari
* Tomas Nuñez

## Objetivo del proyecto

El objetivo de Luma Beauty es resolver un problema simple del mundo real: permitir que una tienda de maquillaje muestre sus productos de forma online y que los usuarios puedan realizar una experiencia de compra simulada.

El proyecto aplica conceptos de desarrollo frontend moderno, arquitectura modular, gestión de estado global, autenticación, persistencia de datos, rutas protegidas, PWA y despliegue en producción.

## Tecnologías utilizadas

* Vue 3
* Vite
* JavaScript
* Vue Router
* Pinia
* Supabase
* Supabase Auth
* Supabase Database
* Supabase Storage
* Vite PWA
* Git y GitHub

## Funcionalidades principales

### Usuario público

* Ver la página de inicio.
* Ver el catálogo de productos.
* Buscar productos por nombre.
* Filtrar productos por categoría.
* Ver el detalle de un producto.
* Registrarse.
* Iniciar sesión.

### Usuario autenticado

* Agregar productos al carrito.
* Modificar cantidades del carrito.
* Eliminar productos del carrito.
* Vaciar el carrito.
* Finalizar una compra simulada.
* Ver el historial de compras.
* Cerrar sesión.

### Usuario administrador

* Acceder al panel admin.
* Crear productos.
* Editar productos.
* Eliminar productos.
* Cambiar precio y stock.
* Asignar categorías.
* Subir imágenes de productos a Supabase Storage.

## Requisitos del TP cumplidos

| Requisito                     | Implementación                               |
| ----------------------------- | -------------------------------------------- |
| Vue.js                        | Aplicación desarrollada con Vue 3            |
| Vite                          | Proyecto creado y ejecutado con Vite         |
| SPA                           | Navegación sin recargas usando Vue Router    |
| Vue Router                    | Rutas públicas, privadas y ruta 404          |
| Pinia                         | Stores para autenticación, carrito y compras |
| PWA                           | Configuración con vite-plugin-pwa            |
| Backend real                  | Supabase                                     |
| Registro/Login                | Supabase Auth                                |
| Persistencia de datos         | Supabase Database y localStorage             |
| Storage                       | Supabase Storage para imágenes               |
| Deploy público                | Proyecto desplegado en producción            |
| Documentación asistida por IA | README técnico generado y optimizado con IA  |
| Git                           | Historial de commits por fases               |

## Instalación local

Clonar el repositorio:

```bash
git clone https://github.com/LucasPatricioRey/luma-beauty.git
```

Entrar a la carpeta del proyecto:

```bash
cd luma-beauty
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=TU_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY=TU_SUPABASE_PUBLISHABLE_KEY
```

Ejecutar el proyecto en desarrollo:

```bash
npm run dev
```

Generar build de producción:

```bash
npm run build
```

Previsualizar build de producción:

```bash
npm run preview
```

## Variables de entorno

El proyecto usa variables de entorno para conectar con Supabase.

Archivo `.env`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

El archivo `.env` no debe subirse al repositorio. Para documentar las variables necesarias se puede incluir un archivo `.env.example`.

## Estructura del proyecto

```txt
luma-beauty/
├── public/
│   └── icons/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppNavbar.vue
│   │   └── PwaStatus.vue
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── services/
│   │   └── supabase.js
│   │
│   ├── stores/
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   └── orderStore.js
│   │
│   ├── views/
│   │   ├── AdminProductsView.vue
│   │   ├── CartView.vue
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── NotFoundView.vue
│   │   ├── OrdersView.vue
│   │   ├── ProductDetailView.vue
│   │   ├── ProductsView.vue
│   │   └── RegisterView.vue
│   │
│   ├── App.vue
│   └── main.js
│
├── package.json
└── vite.config.js
```

## Rutas principales

| Ruta               | Descripción             | Acceso           |
| ------------------ | ----------------------- | ---------------- |
| `/`                | Home                    | Público          |
| `/productos`       | Catálogo de productos   | Público          |
| `/productos/:id`   | Detalle de producto     | Público          |
| `/login`           | Inicio de sesión        | Público          |
| `/register`        | Registro de usuario     | Público          |
| `/carrito`         | Carrito de compras      | Usuario logueado |
| `/mis-compras`     | Historial de compras    | Usuario logueado |
| `/admin`           | Panel de administración | Usuario admin    |
| `/:pathMatch(.*)*` | Página no encontrada    | Público          |

## Gestión de estado con Pinia

El proyecto usa Pinia para centralizar estados importantes de la aplicación.

### `authStore.js`

Responsabilidades:

* Guardar el usuario actual.
* Cargar el perfil del usuario.
* Detectar si el usuario está logueado.
* Detectar si el usuario es administrador.
* Registrar usuarios.
* Iniciar sesión.
* Cerrar sesión.

### `cartStore.js`

Responsabilidades:

* Guardar productos del carrito.
* Agregar productos.
* Eliminar productos.
* Aumentar y disminuir cantidades.
* Calcular total de productos.
* Calcular total de precio.
* Persistir el carrito en localStorage.
* Recuperar el carrito al recargar la página.

### `orderStore.js`

Responsabilidades:

* Crear compras.
* Ejecutar la función de Supabase para validar stock y registrar órdenes.
* Cargar historial de compras.
* Manejar mensajes de error y éxito.

## Supabase

Supabase se utiliza como backend real del proyecto.

Servicios utilizados:

* Authentication
* Database
* Storage
* Row Level Security
* Remote Procedure Call

## Tablas principales

### `profiles`

Guarda información adicional de cada usuario.

Campos principales:

* `id`
* `full_name`
* `role`
* `created_at`

Roles utilizados:

* `user`
* `admin`

### `categories`

Guarda las categorías de productos.

Campos principales:

* `id`
* `name`
* `created_at`

Categorías iniciales:

* Labios
* Rostro
* Ojos
* Skincare
* Brochas

### `products`

Guarda los productos del ecommerce.

Campos principales:

* `id`
* `name`
* `description`
* `price`
* `stock`
* `image_url`
* `category_id`
* `created_at`

### `orders`

Guarda las compras realizadas por los usuarios.

Campos principales:

* `id`
* `user_id`
* `total`
* `status`
* `created_at`

### `order_items`

Guarda los productos incluidos en cada compra.

Campos principales:

* `id`
* `order_id`
* `product_id`
* `product_name`
* `quantity`
* `unit_price`
* `subtotal`
* `created_at`

## Seguridad

El proyecto utiliza Row Level Security en Supabase.

Reglas principales:

* Todos pueden leer productos y categorías.
* Cada usuario puede ver sus propias compras.
* Cada usuario puede ver su propio perfil.
* Solo usuarios administradores pueden crear, editar o eliminar productos.
* Solo usuarios administradores pueden subir imágenes de productos.
* La ruta `/admin` está protegida desde el frontend y validada por rol.

## Flujo de compra

El flujo de compra funciona de la siguiente manera:

1. El usuario inicia sesión.
2. El usuario navega por el catálogo.
3. El usuario entra al detalle de un producto.
4. Agrega productos al carrito.
5. Modifica cantidades si lo desea.
6. Finaliza la compra.
7. Supabase valida el stock real.
8. Se crea una orden.
9. Se crean los items de la orden.
10. Se descuenta el stock.
11. La compra aparece en el historial del usuario.

La validación final del stock se realiza en Supabase para evitar depender solamente del estado del frontend.

## PWA

Luma Beauty fue configurada como Progressive Web App usando `vite-plugin-pwa`.

Características:

* Manifest configurado.
* Íconos 192x192 y 512x512.
* Modo `standalone`.
* Service worker.
* Actualización automática.
* Soporte offline básico para assets estáticos.

Los datos dinámicos de Supabase requieren conexión a internet.

## Imágenes de productos

Las imágenes de productos pueden administrarse desde el panel admin.

El sistema permite:

* Subir imágenes JPG, PNG o WEBP.
* Validar tamaño máximo.
* Guardar la imagen en Supabase Storage.
* Obtener la URL pública.
* Guardar esa URL en la tabla `products`.

Bucket utilizado:

```txt
product-images
```

## Scripts disponibles

Ejecutar servidor de desarrollo:

```bash
npm run dev
```

Generar build de producción:

```bash
npm run build
```

Previsualizar producción:

```bash
npm run preview
```

## Decisiones técnicas

### Uso de Supabase como backend

Se eligió Supabase porque el TP requería un backend real con autenticación. Supabase permite resolver autenticación, base de datos, storage y reglas de seguridad sin crear un backend propio con Node.js.

### Uso de Pinia

Se utilizó Pinia para centralizar estados globales como la sesión del usuario, el carrito y las compras.

### Carrito con localStorage

El carrito se persiste en localStorage para que el usuario no pierda sus productos al recargar la página.

### Control de stock en Supabase

Aunque el frontend controla cantidades, la validación final del stock se realiza en Supabase al momento de finalizar la compra.

### Panel admin protegido

La administración de productos se limitó a usuarios con rol `admin`.

### PWA

Se agregó PWA para cumplir el requisito del TP y permitir que la aplicación sea instalable.

## Uso de inteligencia artificial

La documentación técnica fue generada y optimizada con asistencia de Inteligencia Artificial. Se utilizó IA para ordenar la explicación del proyecto, describir la arquitectura, resumir decisiones técnicas y mejorar la claridad del README.

## Estado final del proyecto

Luma Beauty cumple con los requisitos principales del trabajo práctico:

* SPA funcional.
* Backend real con Supabase.
* Registro e inicio de sesión.
* Productos reales desde base de datos.
* Carrito persistente.
* Compra simulada con órdenes en Supabase.
* Historial de compras.
* Panel admin.
* Subida de imágenes.
* Rutas protegidas.
* PWA.
* Deploy público.
* Documentación final.
