# OLVÉN — The Art of Fragrance

Catálogo web de perfumes con Next.js (App Router), TypeScript, Tailwind CSS y Supabase.

## 1. Instalar y correr

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). El panel de carga está en `/admin`.

## 2. Variables de entorno

En `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

Las encontrás en **Supabase → Project Settings → API**.
`SUPABASE_SERVICE_ROLE_KEY` queda solo en el servidor y se usa para subir imágenes e insertar filas. No la expongas en el cliente.

## 3. Crear la tabla `perfumes`

1. Entrá a **SQL Editor**.
2. Pegá y ejecutá `supabase/schema.sql`.

Eso crea:

| Columna     | Tipo        | Notas                          |
|-------------|-------------|--------------------------------|
| `id`        | `uuid`      | PK, `gen_random_uuid()`        |
| `name`      | `text`      | Nombre del perfume             |
| `category`  | `text`      | Una de las 6 categorías (slug) |
| `image_url` | `text`      | URL pública del Storage        |
| `created_at`| `timestamptz` | Default `now()`              |

## 4. Bucket de Storage `perfumes_images`

El mismo script SQL crea el bucket. Si preferís hacerlo a mano:

1. **Storage → New bucket**
2. Name: `perfumes_images`
3. Public bucket: **ON**
4. Guardá
5. En **Policies**, permití `SELECT` e `INSERT` para `bucket_id = 'perfumes_images'`

## 5. Rutas

- `/` home con las 6 categorías
- `/catalogo/[categoria]` grilla filtrada
- `/admin` formulario para cargar perfumes
