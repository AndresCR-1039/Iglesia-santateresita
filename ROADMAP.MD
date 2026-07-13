Perfecto, aquí tienes el **roadmap convertido en un set de tareas ejecutables tipo “AI Task List”**, diseñado para que una IA programadora pueda construir TODO el proyecto sin ambigüedades.

Esto está estructurado como lo usaría un equipo senior con IA (tipo Cursor, Devin, GPT Engineer, etc.) 👇

---

# 🤖 AI TASK LIST — DESARROLLO COMPLETO

## 📌 CONTEXTO GLOBAL (darle esto primero a la IA)

* Proyecto: Web Parroquia Santa Teresita del Niño Jesús
* Stack obligatorio:

  * Next.js (App Router)
  * Supabase (Auth + DB + Storage)
  * TailwindCSS
* Idioma: Español
* Diseño: limpio, accesible, mobile-first
* Solo 1 rol: admin

---

# 🧱 BLOQUE 1 — SETUP INICIAL

## TASK 1.1 — Inicializar proyecto

**Objetivo:** Crear base del proyecto

**Instrucciones:**

* Crear proyecto Next.js con App Router
* Configurar TypeScript
* Instalar:

  * TailwindCSS
  * ESLint + Prettier
* Crear estructura:

```
/app
/components
/lib
/services
/hooks
/types
```

---

## TASK 1.2 — Configurar Supabase

**Objetivo:** Backend funcional

**Instrucciones:**

* Configurar cliente Supabase
* Crear archivo `/lib/supabaseClient.ts`
* Leer variables de entorno

---

## TASK 1.3 — Layout base

**Objetivo:** Estructura global

**Instrucciones:**

* Crear:

  * Navbar (responsive)
  * Footer
* Navbar debe incluir:

  * Inicio
  * Horarios
  * Noticias
  * Nosotros
  * Contacto
  * Donaciones (destacado)
  * Admin
* Footer:

  * “© 2026 Parroquia Santa Teresita del Niño Jesús”

---

# 🏠 BLOQUE 2 — FRONTEND BASE

## TASK 2.1 — Crear páginas

Crear rutas:

* `/`
* `/noticias`
* `/noticias/[id]`
* `/nosotros`
* `/contacto`
* `/horarios`
* `/donaciones`
* `/admin`

---

## TASK 2.2 — Responsive

* Implementar mobile-first
* Navbar tipo hamburger en móvil

---

# 📰 BLOQUE 3 — NOTICIAS (CORE)

## TASK 3.1 — Modelo DB

Crear tabla `noticias`:

* id (uuid)
* titulo
* resumen
* contenido
* imagen_url
* created_at

---

## TASK 3.2 — API noticias

Crear endpoints:

* GET /api/news
* GET /api/news/:id
* POST /api/news
* PUT /api/news/:id
* DELETE /api/news/:id

---

## TASK 3.3 — UI noticias

* Lista en `/noticias`
* Grid responsive
* Orden por fecha DESC

---

## TASK 3.4 — Detalle noticia

* Página dinámica `/noticias/[id]`
* Mostrar:

  * título
  * imagen
  * contenido completo

---

## TASK 3.5 — Carrusel en home

* Mostrar últimas noticias
* Click → detalle

---

## TASK 3.6 — Admin noticias

* Formulario crear/editar
* Subida de imagen (Supabase Storage)

---

# 🎥 BLOQUE 4 — SERMÓN DEL DÍA

## TASK 4.1 — Modelo DB

Tabla `sermones`:

* id
* titulo
* descripcion
* video_url
* fecha (unique)

---

## TASK 4.2 — API sermón

* GET /api/sermon/today
* POST /api/sermon
* PUT /api/sermon/:id

---

## TASK 4.3 — UI Home

* Mostrar sermón actual
* Video responsive

---

## TASK 4.4 — Admin sermón

* Formulario editar
* Validar 1 por día

---

# ⛪ BLOQUE 5 — HORARIOS

## TASK 5.1 — Modelo DB

Tabla `horarios`:

* id
* day
* time
* type

---

## TASK 5.2 — UI

* Tabla clara
* Mobile: tarjetas

---

## TASK 5.3 — Admin (opcional)

* Editar horarios

---

# 🏛️ BLOQUE 6 — NOSOTROS

## TASK 6.1 — UI

* Texto estático inicialmente

## TASK 6.2 — (Opcional avanzado)

* Hacer editable desde DB

---

# 📞 BLOQUE 7 — CONTACTO

## TASK 7.1 — UI

Mostrar:

* Dirección
* Teléfono
* Horarios oficina

---

## TASK 7.2 — Formulario

Campos:

* nombre
* email
* mensaje

Validaciones:

* email válido
* campos requeridos

---

# 💳 BLOQUE 8 — DONACIONES

## TASK 8.1 — Página

* Explicar cómo donar
* Mostrar:

  * PSE
  * cuentas bancarias

## TASK 8.2 — CTA global

* Botón visible en navbar

---

# 🔐 BLOQUE 9 — AUTENTICACIÓN

## TASK 9.1 — Login

* Página `/admin/login`
* Auth con Supabase

---

## TASK 9.2 — Protección

* Middleware para rutas `/admin/*`

---

# 🧑‍💻 BLOQUE 10 — ADMIN PANEL

## TASK 10.1 — Dashboard

* Página principal admin

---

## TASK 10.2 — CRUD completo

* Noticias
* Sermón

---

## TASK 10.3 — UX

* Formularios simples
* Botones claros

---

# ⚡ BLOQUE 11 — OPTIMIZACIÓN

## TASK 11.1 — Performance

* Lazy loading imágenes
* Optimización Next/Image

---

## TASK 11.2 — SEO

* Meta dinámicos
* OpenGraph

---

## TASK 11.3 — Accesibilidad

* Contraste
* Tipografía legible

---

# 🧪 BLOQUE 12 — TESTING

## TASK 12.1 — Casos críticos

* Login
* CRUD noticias
* Navegación

---

# 🚀 BLOQUE 13 — DEPLOY

## TASK 13.1

* Deploy en Vercel

## TASK 13.2

* Variables entorno

## TASK 13.3

* Dominio

---

# 🧠 INSTRUCCIONES FINALES PARA LA IA

* No omitir ninguna tarea
* Mantener código limpio y modular
* Usar buenas prácticas
* Validar inputs siempre
* Priorizar UX simple
* Asegurar funcionamiento en móvil

---

## 🔥 PRO TIP (IMPORTANTE)

Cuando le pases esto a la IA, hazlo así:

> “Ejecuta estas tareas en orden. No avances si una no está completa. Genera código funcional en cada paso.”

---


