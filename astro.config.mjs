import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    partytown({
      config: {
        // Google Analytics corre en un web worker (Partytown). "forward" crea en la página
        // versiones de estas funciones que reenvían las llamadas al worker, así los eventos
        // (clics en CV, contacto, proyectos) llegan a gtag.
        forward: ["dataLayer.push", "gtag"],
      },
    }),
  ],
});
