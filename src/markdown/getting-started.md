---
title: Instrucciones de uso de mtmi | mtmi
description: Instalación, uso y consejos iniciales para aprender a utilizar la librería mtmi (chat de Twitch) de Javascript.
---

# ¿Qué es MTMI?

`mtmi` es una librería **Javascript** para obtener información de la **actividad** en un **chat de Twitch**, de forma sencilla, sin necesidad de utilizar un **backend**, ni de **registrar** una cuenta. La información se obtiene mediante la API oficial de IRC de Twitch y es de sólo lectura (ideal para detectar **eventos** o **sucesos** del chat).

**Nota:** Si tu intención es escribir mensajes en el chat, tendrías que utilizar la API oficial y sus métodos de autenticación o librerías como [twurple](https://twurple.js.org/).

## Instalación

Puedes utilizar `mtmi` directamente desde un CDN, sin necesidad de usar `npm` u otros:

```js
import { client } from "https://unpkg.com/mtmi@0.0.3/dist/mtmi.js";
```

Si lo prefieres, puedes usar `npm`, `yarn` o `pnpm`:

```bash
npm install mtmi
```

Y luego, importando la librería desde el `node_modules/`:

```js
import { client } from "mtmi";
```

## Uso

A continuación tienes una lista de desplegables con la información necesaria para realizar diferentes acciones. Elige la que prefieras:

```js
import { client } from "https://unpkg.com/mtmi@0.0.3/dist/mtmi.js";

client.connect({ channels: ["manzdev"] });

client.on("message", ({ username, channel, message }) => {
  console.log(`${channel} [${username}]: ${message}`);
});
```
