<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Microservicio Gateway
Es el punto de comunicación entre nuestros clientes con nuestros microservicios.

## Levantar proyecto en entorno local

1. Clonar el proyecto
2. Crear un archivo `.env` basado en el archivo `.env.template`
3. Levantar la base de datos con:
```bash
$ docker compose up -d
```
4. Instalar las dependencias del proyecto con:

```bash
$ npm install
```
5. Levantar servidor de NATS
```bash
docker run -d --name transports-main -p 4222:4222 -p 6222:6222 -p 8222:8222 transports
```

6. Levantar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Nats
```bash
docker run -d --name transports-main -p 4222:4222 -p 6222:6222 -p 8222:8222 transports
```