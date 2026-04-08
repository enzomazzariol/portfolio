# ✅ To-Do: Mejoras de usabilidad — enzomazzariol.is-a.dev

> Trabaja estos ítems uno a uno con Claude Code desde tu terminal.
> Orden sugerido: de mayor a menor impacto.

---

## 🔴 Alta prioridad

- [x] **Corregir inconsistencia de año en el nav** ✅
  Navbar.jsx ya usa `{new Date().getFullYear()}` en el menú mobile.

- [ ] **Arreglar el H1 del hero**
  El DOM lee `"EnzoMazzariol"` sin espacio. Si es un salto de línea estético, asegúrate de que en el HTML tenga espacio o un `<br>` explícito, no que las palabras estén concatenadas.

- [x] **Renombrar el archivo del CV** ✅
  Archivo ya era `EnzoMazzariol-CV.pdf`. Referencias en Navbar.jsx actualizadas.

- [ ] **Añadir foto en la página About**
  Incorpora una foto tuya en `/sobre-mi`. Puede ser un `<img>` con tu foto profesional o casual. Añade `alt="Enzo Mazzariol"`.

- [x] **Indicar campos obligatorios en el formulario** ✅
  Placeholders de nombre, email y mensaje llevan `*`. Nota `"* Campos obligatorios"` añadida antes del botón.

- [x] **Indicar opcionalidad del teléfono en el label** ✅
  Placeholder ya dice "(opcional)"; label sr-only actualizado a "Teléfono (opcional)".

- [x] **Arreglar espacio faltante en el heading de contacto** ✅
  Ya dice `Cuéntame<br />tu proyecto.` — correcto.

- [x] **Feedback post-envío en el formulario de contacto** ✅
  Ya implementado: estado success, error y botón deshabilitado durante envío.

- [x] **Marcar la opción por defecto del select como disabled** ✅
  Ya tiene `<option value="" disabled>`.

---

## 🟡 Media prioridad

- [ ] **Unificar idioma en los títulos de sección**
  Cambia los títulos en inglés al español:
  - `"Selected Works"` → `"Trabajo seleccionado"`
  - `"Process"` → `"Proceso"`
  - `"Stack"` → `"Tecnologías"` (o mantén "Stack" pero de forma consistente)
  - `"SEO services"` → `"Servicios SEO"`
  - `"WordPress developer"` → `"Desarrollador WordPress"`
  - `"Landing page design"` → `"Diseño de landing pages"`

- [ ] **Títulos únicos por página (`<title>` y meta description)**
  Cada página debe tener su propio `<title>`. Ejemplos:
  - Home: `Enzo Mazzariol — Desarrollador Web Freelance · Barcelona`
  - About: `Sobre mí — Enzo Mazzariol`
  - Proyectos: `Proyectos — Enzo Mazzariol`
  - Contacto: `Contacto — Enzo Mazzariol`

- [ ] **Añadir resultados/métricas en las descripciones de proyectos**
  En la página `/proyectos`, añade 1-2 datos concretos por proyecto (ej: "Aumentó el tiempo en página un 40%", "Tienda operativa desde el primer día con X ventas").

- [x] **Hacer dinámico "X años programando" en About** ✅
  `AboutPage.jsx`: ahora calcula `new Date().getFullYear() - 2023` automáticamente.

- [x] **Hacer dinámico el año en el copyright** ✅
  Ya usa `{new Date().getFullYear()}` en `footer.jsx`.

- [x] **Completar el footer con todos los enlaces de navegación** ✅
  Ya tiene: Inicio, Proyectos, Contacto, Sobre mí.

- [x] **Consistencia en la URL de About** ✅
  URL cambiada a `/sobre-mi` en App.jsx, Navbar y footer.

---

## 🟠 Contraste y legibilidad

- [x] **Subir contraste de labels de sección** ✅
  `AboutPage.jsx`: todos los `text-white/25` → `text-white/45`.

- [x] **Subir contraste de metadatos del menú mobile** ✅
  `Navbar.jsx`: `text-white/20` → `text-white/40`.

- [x] **Subir contraste de links secundarios en hero** ✅
  `HomePage.jsx`: `text-white/40` → `text-white/55`.

- [x] **Subir contraste de placeholders del formulario** ✅
  `ContactPage.jsx`: `placeholder-white/20` → `placeholder-white/35`.

- [x] **Subir contraste del texto secundario en la página de contacto** ✅
  `ContactPage.jsx`: `text-white/30` → `text-white/50` (label "Hablemos" y sección email).

- [x] **Subir contraste del email en el footer** ✅
  `footer.jsx`: `text-white/40` → `text-white/60`.

---

## 🟢 Accesibilidad y calidad técnica

- [ ] **Añadir `alt` text a todos los logos de tecnologías en la sección Stack**
  Cada `<img>` de logo debe tener `alt="React"`, `alt="Tailwind"`, etc.

- [ ] **Corregir la doble navegación en el DOM**
  Hay dos elementos `<nav>` en `Navbar.jsx` (desktop y mobile overlay). Consolídalos en un solo `<nav>` y controla la visibilidad con CSS/JS.

- [ ] **Añadir texto accesible a las tarjetas de proyecto en la home**
  Los links de proyecto en "Selected Works" deberían tener `aria-label` descriptivo, ej: `aria-label="Ver proyecto: New Vision Sports"`.

- [ ] **Mejorar la semántica de las tarjetas de servicio**
  Cada servicio es un `<a>` que envuelve un `<h3>`. Añade un CTA explícito ("Contáctame →") para que el link tenga texto descriptivo.

- [ ] **Explicar la diferencia entre "Dominio" y "Experiencia" en la sección Stack**
  Añade un tooltip o subtítulo breve que explique qué distingue las dos categorías de tecnologías.

---

## 💡 Bonus (oportunidades de conversión)

- [ ] **Añadir testimonios** de clientes (Guarapo Media, Regalexia, etc.) en la home o en About.

- [ ] **Actualizar o contextualizar "Disponible para proyectos"**
  Añade una fecha estimada o hazlo dinámico para que no quede desactualizado (ej: "Disponible desde junio 2026").

---

*Generado el 08/04/2026 — basado en análisis de usabilidad de enzomazzariol.is-a.dev*
*Actualizado: añadidas tareas de contraste/legibilidad, marcadas tareas completadas.*
