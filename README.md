<div align="center">

## ZA Ducks Backend
API REST con NestJS 10, PostgreSQL y TypeScript. Descuento para títulos palíndromos.

</div>

📦 Instalación local (sin Docker)
Ejecuta estos comandos en tu terminal.
```bash
git clone [https://github.com/tu-usuario/za-ducks-backend.git](https://github.com/tu-usuario/za-ducks-backend.git)
cd za-ducks-backend
npm install
npm run start:dev
```
## Ver tipado en Swagger
<a href="http://localhost:3005/docs">Abrir Swagger local</a>

## Variables de entorno
Crea un archivo .env en la raíz con este contenido.
```bash
DATABASE_URL=postgres://postgres:123456@localhost:5432/za_ducks
PORT=3005
JWT_SECRET=supersecret
NODE_ENV=development
```
## Uso con Docker (recomendado)
Construye y levanta API + DB con Compose.
```bash
docker compose up --build api db
```
URLs de referencia:
```bash
API .......... http://localhost:3005/api
Postgres ..... postgres://postgres:123456@localhost:5432/za_ducks
```
Si cambiaste .env, reconstruye:
```bash
docker compose down -v
docker compose build --no-cache
docker compose up
```
# Endpoints principales
Usa estos ejemplos para probar la API.
```bash
GET /api/products
```
```bash
curl http://localhost:3005/api/products
```
```bash
GET /api/search?q=adi&skip=0&take=12
```
```bash
curl "http://localhost:3005/api/search?q=adi&skip=0&take=12"
```
```bash
POST /api/products
Content-Type: application/json

{
  "title": "Radar",
  "brand": "ZA",
  "description": "Palíndromo tecnológico",
  "price": 180000,
  "currency": "MXN"
}
```
```bash
curl -X POST http://localhost:3005/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Radar",
    "brand": "ZA",
    "description": "Palíndromo tecnológico",
    "price": 180000,
    "currency": "MXN"
  }'
```
## Datos de prueba (palíndromos)
Conéctate a Postgres del contenedor e inserta productos.

docker compose exec db psql -U postgres -d za_ducks
```bash
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```
```bash
INSERT INTO public.products (id, title, brand, description, price, currency, "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), 'adida',      'ZA', 'Palíndromo con "adi"', 150000, 'MXN', NOW(), NOW()),
  (gen_random_uuid(), 'Ana',        'ZA', 'Palíndromo simple',    100000, 'MXN', NOW(), NOW()),
  (gen_random_uuid(), 'Oso',        'ZA', 'Palíndromo corto',     120000, 'MXN', NOW(), NOW()),
  (gen_random_uuid(), 'Reconocer', 'ZA', 'Palíndromo largo',     160000, 'MXN', NOW(), NOW()),
  (gen_random_uuid(), 'Radar',      'ZA', 'Palíndromo tech',      180000, 'MXN', NOW(), NOW());
```
```bash
SELECT id, title, price
FROM public.products
WHERE lower(title) = reverse(lower(title))
ORDER BY "createdAt" DESC;
```
## Estructura del proyecto
Referencia rápida de carpetas/archivos.
```bash
src/
  ├─ app.module.ts
  ├─ main.ts
  ├─ products/
  │    ├─ products.module.ts
  │    ├─ products.controller.ts
  │    └─ products.service.ts
  └─ common/
```
## Scripts útiles
Comandos de NPM más usados.
```bash
npm run start:dev    # desarrollo
npm run build        # compilar
npm run start:prod   # producción local
npm run lint         # lint
npm run format       # formateo
```
