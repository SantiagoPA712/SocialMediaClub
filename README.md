# Social Media Club Microservices with NATS and a Splash of Fun!

Este proyecto es un sistema basado en microservicios para gestionar reservas de eventos y órdenes de licor en el Social Media Club. La aplicación se compone de un frontend (`client-gateway`) y dos microservicios (`booking-service` y `liquor-service`), conectados mediante NATS para la comunicación entre servicios.

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución de los Servicios](#ejecución-de-los-servicios)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [Rutas API](#rutas-api)
  - [Booking Service](#booking-service)
  - [Liquor Service](#liquor-service)
- [Configuración de NATS](#configuración-de-nats)
- [Notas y Consideraciones](#notas-y-consideraciones)

## Requisitos

- **Node.js** y **npm**
- **Docker** (para contenerizar los servicios y bases de datos, si deseas)
- **NATS** para la comunicación entre microservicios
- **SQLite** para el `booking-service`
- **PostgreSQL** para el `liquor-service`

## Estructura del Proyecto

```plaintext
project-root/
├── client-gateway/               # Aplicación React para el frontend
├── booking-service/              # Microservicio de reservas usando SQLite
├── liquor-service/               # Microservicio de órdenes de licor usando PostgreSQL
└── README.md                     # Documentación principal del proyecto
```

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd project-root
```

### 2. Configurar e Instalar Dependencias

#### A. Client Gateway (Frontend)

```bash
cd client-gateway
npm install
```

#### B. Booking Service (Microservicio de Reservas)

```bash
cd ../booking-service
npm install
```

#### C. Liquor Service (Microservicio de Órdenes de Licor)

```bash
cd ../liquor-service
npm install
```

### 3. Configuración de NATS

Para iniciar un contenedor de NATS con Docker:

```bash
docker run -d --name nats-server -p 4222:4222 nats
```

O descarga y ejecuta NATS directamente según tu preferencia.

### 4. Configuración de PostgreSQL para Liquor Service

Si no tienes PostgreSQL configurado en tu sistema, puedes iniciarlo en un contenedor:

```bash
docker run --name postgres-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=santiago1 -e POSTGRES_DB=liquor_db -p 5432:5432 -d postgres
```

Luego, asegúrate de que `database.js` de `liquor-service` esté configurado correctamente para conectarse a PostgreSQL.

## Ejecución de los Servicios

### A. Iniciar el Client Gateway

```bash
cd client-gateway
npm start
```

### B. Iniciar el Booking Service

```bash
cd ../booking-service
npm start
```

### C. Iniciar el Liquor Service

```bash
cd ../liquor-service
npm start
```

## Uso de la Aplicación

1. **Client Gateway**: Abre el navegador y visita `http://localhost:3000` para interactuar con la interfaz gráfica.
2. **Booking Service**: Gestiona las reservas de eventos y corre en `http://localhost:3002`.
3. **Liquor Service**: Gestiona las órdenes de licor y corre en `http://localhost:3001`.

## Rutas API

### Booking Service

- `GET /bookings` - Obtener todas las reservas
- `POST /bookings` - Crear una nueva reserva
- `GET /bookings/:id` - Obtener una reserva específica
- `PUT /bookings/:id` - Actualizar una reserva
- `DELETE /bookings/:id` - Eliminar una reserva

### Liquor Service

- `GET /orders` - Obtener todas las órdenes
- `POST /orders` - Crear una nueva orden
- `GET /orders/:id` - Obtener una orden específica
- `PUT /orders/:id` - Actualizar una orden
- `DELETE /orders/:id` - Eliminar una orden

## Configuración de NATS

NATS se utiliza para la comunicación entre microservicios. Por ejemplo, `booking-service` puede recibir notificaciones de `liquor-service` cuando hay niveles bajos de inventario.

Para implementar esta comunicación, asegúrate de que:
1. Ambos microservicios estén conectados a la instancia de NATS.
2. `liquor-service` emita mensajes de notificación de stock bajo en NATS.
3. `booking-service` escuche estos mensajes para actualizar la interfaz de usuario o lanzar alertas.

## Notas y Consideraciones

- **CORS**: Asegúrate de que `booking-service` y `liquor-service` tienen CORS habilitado para permitir las solicitudes desde el frontend en `client-gateway`.
- **Docker**: Considera contenerizar los microservicios y las bases de datos (SQLite y PostgreSQL) usando Docker para simplificar el despliegue.
- **Proxy para Client Gateway**: Puedes configurar un proxy en `package.json` para redirigir las solicitudes a los microservicios y evitar problemas de CORS si deseas una configuración adicional.



