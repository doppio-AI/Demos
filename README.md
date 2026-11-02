# Dra. Claudia Magally Ramírez García

Sitio web profesional para la práctica de Ginecología y Obstetricia de la Dra. Claudia Magally Ramírez García en Querétaro.

**Concepto:** acompañamiento médico femenino en cada etapa de la vida.  
**Eslogan:** “Tu salud es una prioridad.”

## Stack

- React 19 + TypeScript + Vite
- React Router
- Motion para React
- Lucide React
- CSS modular con variables de diseño y tipografías Poppins / Lato autoalojadas
- Playwright + axe-core para verificación visual, funcional y de accesibilidad

## Ejecutar

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

El servidor de desarrollo escucha por defecto en `http://localhost:5173`.

## Páginas

- `/` — Inicio
- `/perfil` — Perfil profesional
- `/servicios` — Servicios
- `/contacto` — Contacto y ubicación
- `/agenda` — Solicitud de cita
- `/aviso-de-privacidad` — Aviso de privacidad
- `*` — Página no encontrada

## Datos y configuración

La información profesional está centralizada en `src/data/site.ts`:

- Nombre y especialidad.
- Cédulas y registro COFEPRIS.
- Teléfono y WhatsApp.
- Hospital de atención.
- Servicios y descripciones.
- Enlaces y mensajes de WhatsApp.

La URL pública se configura con `VITE_SITE_URL` (ver `.env.example`). Se utiliza para canonical y metadatos Open Graph. Si no se define, se usa el origen actual.

## Fotografía de la doctora

En el entorno de trabajo no se encontró una fotografía original en buena resolución. Por ello, `doctor.photo` está en `null` y el hero utiliza una composición editorial de marca con ilustración lineal, no una persona generada por IA ni una fotografía de stock.

Para incorporar el retrato oficial:

1. Guardar la fotografía autorizada en `public/images/dra-claudia-magally.jpg` (idealmente vertical, alta resolución, fondo claro).
2. Cambiar en `src/data/site.ts`:

```ts
photo: '/images/dra-claudia-magally.jpg',
```

3. Verificar recorte responsive en 360, 390, 768 y 1440 px.

El componente `PortraitArtwork` ya admite la fotografía y conserva el marco, la placa de identificación y el tratamiento visual. No se debe usar una imagen externa sin autorización de la doctora.

## Agenda y WhatsApp

La agenda no simula disponibilidad ni confirma citas. El flujo:

1. Tipo de consulta.
2. Fecha preferida y preferencia horaria.
3. Datos mínimos de contacto y consentimiento.
4. Revisión.
5. Apertura de WhatsApp con un mensaje prellenado.

La interfaz indica expresamente que la solicitud queda **pendiente de confirmación** y que no se ha reservado ningún horario. La confirmación real ocurre en la conversación con el consultorio.

Para conectar un backend de agenda real se deberá sustituir el envío por WhatsApp por una llamada a la API correspondiente, conservar el estado de “solicitud” hasta recibir confirmación y no mostrar horarios disponibles hasta que exista una fuente real de disponibilidad.

## Datos pendientes de validación

Antes de publicar, se requiere confirmación de:

- Fotografía oficial en alta resolución y autorización de uso.
- Texto biográfico aprobado por la doctora. El actual está marcado como provisional en la interfaz.
- Dirección exacta del consultorio y horarios de atención.
- Validación documental de cédulas y registro COFEPRIS.
- Revisión legal del aviso de privacidad.
- Dominio definitivo para canonical, Open Graph y sitemap.

No se incluyeron precios, años de experiencia, testimonios, reseñas, certificaciones adicionales ni servicios distintos a los proporcionados.

## Estructura relevante

```text
src/
  components/
    forms/          Flujo de solicitud de cita
    layout/         Header, MobileMenu, Footer, barra móvil
    sections/       Hero, intro, etapas, servicios, perfil, credenciales, ubicación, CTA
    services/       Tarjeta de servicio
    ui/             Marca, arte del retrato, botones de WhatsApp, PageHero, Reveal
  data/site.ts      Información profesional y configuración
  lib/              Formato de fechas, teléfono y SEO
  pages/            Rutas del sitio
  styles/           Tokens, reset y estilos globales
public/
  favicon.svg
  apple-touch-icon.png
  og-image.png
  robots.txt
```

## QA realizado

- `npm run build` sin errores de TypeScript ni de compilación.
- Revisión visual en 360, 390, 768, 1024 y 1440 px sin desbordamiento horizontal.
- Flujo de agenda probado: preselección desde servicios, validaciones, revisión, apertura de WhatsApp y estado pendiente de confirmación.
- Menú móvil con bloqueo de scroll, cierre con Escape y trampa de foco.
- axe-core (WCAG 2.0/2.1 A y AA): 0 violaciones en Inicio, Perfil, Servicios, Contacto, Agenda y Aviso de privacidad.
- `prefers-reduced-motion` respetado en CSS y Motion.

Scripts de verificación incluidos (requieren el servidor en `127.0.0.1:5173` y Microsoft Edge instalado):

```bash
node scripts/visual-check.mjs
node scripts/functional-check.mjs
node scripts/all-width-check.mjs
```

Comprobación responsive automatizada (63 combinaciones de ruta y viewport, de 320 a 2560 px, orientación horizontal, menú en pantallas bajas y cambio a escritorio):

```bash
# Con Chromium instalado en el entorno en la nube:
BROWSER_PATH=/usr/bin/chromium node scripts/responsive-check.mjs
# Sin BROWSER_PATH se utiliza el Chromium de Playwright previamente instalado.
```

Se puede probar contra el build de producción con `BASE_URL=http://127.0.0.1:4173` después de ejecutar `npm run preview`.

## Notas técnicas

- El mapa es una consulta embebida de Google Maps centrada en el Hospital Star Médica Querétaro. No se declara una dirección de consultorio inexistente. Si el iframe no carga, permanece el enlace externo a Google Maps.
- No se añadieron analíticas, píxeles publicitarios ni cookies propias. El mapa y WhatsApp son servicios de terceros y se describen en el aviso de privacidad.
- Los formularios no recopilan información clínica y el aviso de privacidad lo advierte de forma expresa.
- El sitio es una SPA con React Router. Al desplegar en un hosting estático se debe configurar el fallback de rutas hacia `index.html` para que enlaces directos como `/perfil` o `/agenda` funcionen. `vite preview` ya resuelve este comportamiento localmente.
