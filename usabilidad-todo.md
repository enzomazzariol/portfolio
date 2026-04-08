# ✅ To-Do: Mejoras de usabilidad — enzomazzariol.is-a.dev

> Trabaja estos ítems uno a uno con Claude Code desde tu terminal.
> Orden sugerido: de mayor a menor impacto.

---

## 🔴 Alta prioridad

- [ ] **Corregir inconsistencia de año en el nav**
  Busca el componente de navegación (probablemente `Navbar` o `Header`) y cambia "Enzo Mazzariol · 2025" por "Enzo Mazzariol · 2026" — o mejor, hazlo dinámico con `new Date().getFullYear()`.

- [ ] **Arreglar espacio faltante en el heading de contacto**
  En la página de contacto, el heading dice `"Cuéntametu proyecto."`. Añade el espacio: `"Cuéntame tu proyecto."`.

- [ ] **Arreglar el H1 del hero**
  El DOM lee `"EnzoMazzariol"` sin espacio. Si es un salto de línea estético, asegúrate de que en el HTML tenga espacio o un `<br>` explícito, no que las palabras estén concatenadas.

- [ ] **Renombrar el archivo del CV**
  Renombra `/assets/EnzoCV-summer.pdf` a algo neutro como `/assets/EnzoMazzariol-CV.pdf` y actualiza el enlace en el nav.

- [ ] **Añadir foto en la página About**
  Incorpora una foto tuya en `/about`. Puede ser un `<img>` con tu foto profesional o casual. Añade `alt="Enzo Mazzariol"`.

- [ ] **Feedback post-envío en el formulario de contacto**
  Implementa un estado de éxito (mensaje de confirmación), estado de error, y estado de carga (deshabilitar el botón mientras se envía).

- [ ] **Indicar campos obligatorios en el formulario**
  Añade un asterisco `*` en los labels de "Tu nombre", "Tu email" y "Tu mensaje". Añade también una nota pequeña tipo `* Campos obligatorios`.

- [ ] **Marcar la opción por defecto del select como disabled**
  En el `<select>` de "¿Qué necesitas?", la primera opción debe ser `<option value="" disabled selected>¿Qué necesitas?</option>` para que no sea enviable.

- [ ] **Indicar opcionalidad del teléfono en el label**
  Cambia el `<label>` de "Teléfono" a "Teléfono (opcional)" para que coincida con el placeholder.

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

- [ ] **Completar el footer con todos los enlaces de navegación**
  El footer solo tiene "Proyectos" y "Contacto". Añade también "Sobre mí" y el enlace a home.

- [ ] **Añadir resultados/métricas en las descripciones de proyectos**
  En la página `/proyectos`, añade 1-2 datos concretos por proyecto (ej: "Aumentó el tiempo en página un 40%", "Tienda operativa desde el primer día con X ventas").

- [ ] **Hacer dinámico el año en el copyright**
  En el footer, reemplaza `© 2026 Enzo Mazzariol` por `© ${new Date().getFullYear()} Enzo Mazzariol` para que no quede desactualizado.

- [ ] **Hacer dinámico "X años programando" en About**
  Reemplaza el texto estático "3 años programando" por un cálculo: `${new Date().getFullYear() - 2023} años programando` o cambia la redacción a "Programando desde 2023".

---

## 🟢 Accesibilidad y calidad técnica

- [ ] **Añadir `alt` text a todos los logos de tecnologías en la sección Stack**
  Cada `<img>` de logo debe tener `alt="React"`, `alt="Tailwind"`, etc.

- [ ] **Corregir la doble navegación en el DOM**
  Hay dos elementos `<nav>` con los mismos ítems (uno para desktop, uno para mobile). Consolídalos en un solo `<nav>` y controla la visibilidad con CSS/JS para evitar duplicados para lectores de pantalla.

- [ ] **Añadir texto accesible a las tarjetas de proyecto en la home**
  Los links de proyecto en "Selected Works" deberían tener un texto de acción visible o un `aria-label` descriptivo, ej: `aria-label="Ver proyecto: New Vision Sports"`.

- [ ] **Mejorar la semántica de las tarjetas de servicio**
  Actualmente cada servicio es un `<a>` que envuelve un `<h3>`. Considera añadir un CTA explícito dentro de cada tarjeta ("Contáctame →") para que el link tenga texto descriptivo.

- [ ] **Explicar la diferencia entre "Dominio" y "Experiencia" en la sección Stack**
  Añade un tooltip o subtítulo breve que explique qué distingue las dos categorías de tecnologías.

---

## 💡 Bonus (oportunidades de conversión)

- [ ] **Añadir testimonios** de clientes (Guarapo Media, Regalexia, etc.) en la home o en About.

- [ ] **Actualizar o contextualizar "Disponible para proyectos"**
  Añade una fecha estimada o hazlo dinámico para que no quede desactualizado (ej: "Disponible desde junio 2026").

- [ ] **Consistencia en la URL de About**
  La URL es `/about` (inglés) pero el enlace dice "Sobre mí". Considera cambiarla a `/sobre-mi` si el público objetivo es hispanohablante.

---

*Generado el 08/04/2026 — basado en análisis de usabilidad de enzomazzariol.is-a.dev*
