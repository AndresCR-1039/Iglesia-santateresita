# 📘 ESPECIFICACIÓN TÉCNICA COMPLETA (SPEC - NIVEL SENIOR)

## Proyecto: Sitio Web Parroquia Santa Teresita del Niño Jesús

---

## 1. 🎯 Objetivo

Construir una plataforma web moderna, segura, escalable y completamente administrable que permita gestionar contenido dinámico (noticias, sermones, información parroquial) sin intervención técnica.

---

## 2. 🧱 Arquitectura General

### 2.1 Stack Recomendado (Producción)

* Frontend: Next.js (App Router)
* Backend: Supabase (Auth + DB + Storage) o Firebase
* DB: PostgreSQL
* Hosting: Vercel
* Video: YouTube embed o storage externo

### 2.2 Arquitectura

* SSR/SSG híbrido
* API Routes protegidas
* Separación clara:

  * UI (components)
  * lógica (services)
  * datos (repositories)

---

## 3. 👥 Roles

### Admin (único)

* CRUD completo contenido
* Autenticación obligatoria

### Usuario Público

* Solo lectura

---

## 4. 🧩 Módulos del Sistema

---

## 5. 🧭 Navegación

### Navbar

* Sticky
* Responsive (hamburger móvil)
* Items:

  * Inicio
  * Horario de Misas
  * Noticias
  * Nosotros
  * Contacto
  * Donaciones (CTA destacado)
  * Admin (icono discreto)

---

## 6. 🏠 HOME

### Componentes:

* HeroSection
* NewsCarousel
* SermonSection

### Hero

* Imagen dinámica
* Overlay oscuro
* Texto editable

### Noticias (Carousel)

* Auto-scroll + manual
* Lazy loading imágenes
* Skeleton loading

### Sermón del día

* Video responsive
* Validación: solo 1 activo por fecha

---

## 7. 📰 NOTICIAS

### Lista

* Grid responsive
* Paginación
* Orden DESC por fecha

### Detalle

* SEO dinámico
* OpenGraph

### Validaciones

* título requerido (min 5 chars)
* contenido requerido
* imagen obligatoria

---

## 8. ⛪ HORARIOS

### Modelo

* day (enum)
* time
* type

### UI

* Tabla clara
* Mobile: tarjetas

---

## 9. 🏛️ NOSOTROS

Editable CMS simple

---

## 10. 📞 CONTACTO

### Datos

* Dirección
* Teléfono
* Horarios oficina

### Formulario

* Validación email
* Rate limit anti-spam

---

## 11. 💳 DONACIONES

### UI

* CTA persistente
* Modal o página

### Contenido

* Texto editable
* Datos bancarios
* PSE instrucciones

---

## 12. 🔐 AUTENTICACIÓN

### Requisitos

* JWT/session
* Hash bcrypt
* Protección rutas (/admin/*)

---

## 13. 🧑‍💻 ADMIN PANEL

### Secciones

* Dashboard
* Noticias CRUD
* Sermón CRUD
* Contenido editable

### UX

* Formularios simples
* Drag & drop imágenes (opcional)

---

## 14. 🗄️ MODELO DE DATOS

### noticias

* id UUID
* titulo
* resumen
* contenido
* imagen_url
* created_at
* updated_at

### sermones

* id
* titulo
* descripcion
* video_url
* fecha (unique)

### usuarios

* id
* username
* password_hash

### horarios

* id
* day
* time
* type

---

## 15. 🔌 API ENDPOINTS

### Auth

* POST /api/login
* POST /api/logout

### Noticias

* GET /api/news
* GET /api/news/:id
* POST /api/news
* PUT /api/news/:id
* DELETE /api/news/:id

### Sermón

* GET /api/sermon/today
* POST /api/sermon
* PUT /api/sermon/:id

### Horarios

* GET /api/schedule
* PUT /api/schedule

---

## 16. 🧠 VALIDACIONES

* Sanitización HTML (XSS)
* Límite tamaño imágenes
* Validación campos obligatorios

---

## 17. ⚡ PERFORMANCE

* Lazy load imágenes
* CDN
* Compresión imágenes

---

## 18. 🔍 SEO

* Meta dinámicos
* Sitemap
* Robots.txt

---

## 19. ♿ ACCESIBILIDAD

* Contraste AA
* Navegación teclado

---

## 20. 🧪 TESTING

* Unit tests
* E2E (login + CRUD)

---

## 21. 🚀 DEPLOY

* CI/CD automático
* Variables entorno seguras

---

## 22. 🔐 SEGURIDAD

* Rate limiting
* Protección CSRF
* Headers seguros

---

## 23. 📦 ENTREGABLES

* Código limpio
* Documentación
* Admin funcional
* Deploy activo

---

## 24. ✅ CRITERIOS DE ACEPTACIÓN

* Admin gestiona todo sin código
* Funciona en móvil perfectamente
* Noticias dinámicas
* Sermón actualizable diario

---

## 25. 🔮 FUTURO

* Streaming misas
* Notificaciones
* Multi-admin

---

FIN DEL SPEC (NIVEL PRODUCCIÓN)
