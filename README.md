# Portfolio — Ignacio Zamo

Portfolio personal: perfil administrativo con más de 10 años de experiencia y desarrollo web junior.
Tiene tres páginas:

| Ruta | Contenido |
|---|---|
| `/` | Inicio, Sobre mí y Contacto |
| `/trayectoria` | Hoja de vida en pestañas: Experiencia, Formación, Skills y Trabajos |
| `/proyectos` | Proyectos web con filtro (Proyectos / Práctica / En equipo) |

## Tecnologías

- **Astro 5**: sitio estático de varias páginas, con componentes y buen SEO sin JavaScript de más.
- **Tailwind CSS 3**: tokens de diseño (colores, fuentes, breakpoints) en `tailwind.config.mjs`. Cada componente tiene su propio archivo `.css` con esas mismas variables.
- **Partytown**: corre Google Analytics en un web worker para no frenar la carga.
- **Devicon** (CDN) para los logos de tecnologías y **Google Fonts** para las tipografías.

## Estructura

```text
src/
├── pages/                      Rutas del sitio (una página = un archivo)
│   ├── index.astro             /
│   ├── trayectoria.astro       /trayectoria
│   └── proyectos.astro         /proyectos
├── layouts/
│   └── Layout.astro            <head>, fondo decorativo y scripts globales
├── componentes/
│   ├── comunes/                Partes que se repiten en todas las páginas
│   │   ├── GoogleAnalytics.astro
│   │   ├── header/             Header.astro + Header.css + navBar.js (menú mobile y sección activa)
│   │   └── footer/             Footer.astro + Footer.css
│   └── secciones/              Una carpeta por sección: .astro (markup) + .css (estilos) + .js
│       ├── inicio/             Inicio.astro + Inicio.css
│       ├── sobre-mi/           SobreMi.astro + SobreMi.css
│       ├── contacto/           Contacto.astro + Contacto.css + formulario.js (mailto)
│       ├── proyectos/          Proyectos.astro + Proyectos.css + filtroProyectos.js
│       └── trayectoria/        Trayectoria.astro + Trayectoria.css + trayectoria.js (pestañas)
│           └── paneles/        PanelExperiencia, PanelFormacion, PanelSkills y
│                               PanelTrabajos (cada uno con su .css) + trabajos.js (modal)
├── data/                       Contenido editable sin tocar el markup
│   ├── sitio.js                Enlaces compartidos (CV, redes) e ID de Analytics
│   ├── experiencia.json        Puestos de la línea de tiempo
│   ├── formacion.json          Títulos y cursos
│   ├── skills.json             Herramientas y soft skills
│   ├── trabajos.json           Videos de trabajos en Excel / Power BI
│   ├── proyectos.json          Proyectos web
│   └── iconos.js               Íconos SVG reutilizables
├── scripts/                    JavaScript global
│   ├── estrellas.js            Fondo de estrellas (canvas)
│   ├── analitica.js            registrarEvento() para Google Analytics
│   └── eventos.js              Mide los clics con data-evento
└── styles/
    └── global.css              Variables, base, botones, chips y tarjetas

public/
├── proyectos/                  Capturas (.webp, 1280×800) de los proyectos web
└── trabajos/                   Videos (.mp4) y portadas (.webp) de la pestaña Trabajos
```

Los imports usan alias definidos en `tsconfig.json`: `@layouts`, `@componentes`, `@data`, `@scripts` y `@styles`.

### Estilos

- `src/styles/global.css`: variables (colores, fuentes), base y clases compartidas (`.btn`, `.chip`, `.card`, `.section`…). Se carga en todas las páginas desde el Layout.
- Cada componente importa su `.css` en el frontmatter (`import "./Contacto.css"`). Astro solo incluye en cada página el CSS de los componentes que usa.
- Para que los estilos de una sección no afecten a otra, todos los selectores de su `.css` empiezan con la clase raíz de esa sección: `.nav`, `.footer`, `.hero`, `.sobre-mi`, `.contacto`, `.proyectos`, `.trayectoria` y `.panel-experiencia`, `.panel-formacion`, `.panel-skills`, `.panel-trabajos`. Al agregar reglas nuevas, respetar ese prefijo.

## Cómo editar el contenido

- **Sumar un puesto, curso o proyecto:** agregarlo en el JSON correspondiente de `src/data/`.
- **Cambiar el CV o las redes:** `src/data/sitio.js` (se actualiza en el header, el menú mobile y Contacto).
- **Sumar un trabajo (pestaña Trabajos):** copiar el video `.mp4` y su portada `.webp` (16:9) en `public/trabajos/` y agregarlo en `trabajos.json` con `src`, `poster` y `duracion`. También admite imágenes (`"tipo": "imagen"`) o el ID de un video de YouTube (`"tipo": "youtube"`).
- **Medir un botón nuevo en Analytics:** agregarle `data-evento="nombre"` y, si hace falta, `data-evento-*` con los parámetros.

## Paleta

| Variable | Hex | Uso |
|---|---|---|
| `--bg` | `#070C16` | Fondo |
| `--bg-2` | `#0B1322` | Bandas |
| `--surface` / `--surface-2` | `#0F1A2C` / `#13223A` | Tarjetas e inputs |
| `--text` / `--muted` / `--dim` | `#E6EDF6` / `#93A3B8` / `#5B6B82` | Textos |
| `--teal` | `#2DD4BF` | Acento |
| `--teal-deep` | `#0F9178` | Verde agua original (glows) |
| `--cyan` / `--indigo` | `#38BDF8` / `#818CF8` | Gradiente |
| `--grad` | `#2DD4BF → #38BDF8 → #818CF8` | Gradiente firma |

## Tipografías

- **Space Grotesk** 500/600/700: títulos.
- **Inter** 400/500/600: textos.
- **JetBrains Mono** 500/700: logo, fechas, etiquetas y tags.

## Breakpoints (mobile-first)

- Base: mobile (≤640px).
- `tablet`: desde 641px.
- `desktop`: desde 1025px (navbar completo; entre 1025 y 1199px se ocultan los íconos de redes).

## Cómo ejecutarlo

Requiere **Node.js 20.3 o superior** (recomendado: 22 LTS).

> En `package.json`, `overrides` fija `@astrojs/language-server` en 2.16.16: las versiones nuevas (usadas por `astro check`) necesitan Node 20.19+. Al pasar a Node 22 se puede quitar ese override.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + build en dist/
npm run preview   # sirve dist/ para probar el build
```

Google Analytics solo se carga en el build de producción, así las visitas en desarrollo no se cuentan.

## Pendientes

- Confirmar la captura del proyecto Zelectric (el archivo se llama `generador-pass.png`).
- Registrar en Google Analytics las dimensiones personalizadas de los eventos (`ubicacion`, `red`, `proyecto`, `tipo`, `pestana`, `trabajo`).
