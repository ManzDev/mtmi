---
title:
description:
---

# Mensajes del chat

Detectar **mensajes** en el chat del **streamer**, con muy **poco código** puedes obtener mucha información.

```js
import { client } from "https://unpkg.com/mtmi@0.0.3/dist/mtmi.js";

client.connect({ channels: ["manzdev"] });

client.on("message", ({ username, channel, message }) => {
  console.log(`${channel} [${username}]: ${message}`);
});
```

Lista de los **parámetros** que se pueden utilizar al obtener mensajes del chat.

| Parámetro | Descripción |
|-|-|
| `type`     | Tipo de evento. En este caso, `message`. |
| `username` | Nombre del usuario (nombre interno) |
| `channel`  | Canal donde se envió el mensaje. |
| `message`  | Mensaje enviado (sólo texto). |
| [`badges`](#badges-del-usuario) ➕ | Lista de badges mostrados por el usuario. |
| [`userInfo`](#información-del-usuario) ➕ | Información del usuario. |
| [`messageInfo`](#información-del-mensaje) ➕ | Información del mensaje. |
| [`replyInfo`](#respuestas-a-los-mensajes) ➕ | Información de la respuesta (si es una respuesta). |
| [`bitsInfo`](#información-de-bits) ➕ | Información de los bits enviados (si fueron enviados). |
| `raw` | Mensaje sin procesar de Twitch. |

## Badges del usuario

| Parámetro | Descripción |
|-|-|
| `name` | Nombre del badge. |
| `value` | Valor del badge. |
| `image` | URL de Imagen del badge. |
| `description` | Descripción del badge. |
| `fullMonths` | Número completo de meses. |
| `founderNumber` | Número de fundador. |
| `predictionInfo` | Información sobre la predicción del usuario. |

## Información del usuario

| Parámetro | Descripción |
|-|-|
| `username` | Nombre del usuario. |
| `displayName` | Nombre mostrado por el usuario. |
| `color` | Color del nombre del usuario. |
| `isVip` | Si el usuario es VIP. |
| `isMod` | Si el usuario es moderador. |
| `isSub` | Si el usuario es suscriptor. |
| `isTurbo` | Si el usuario tiene turbo. |
| `isPrime` | Si el usuario tiene Prime. |
| `isBot` | Si el usuario es un bot conocido. |

## Información del mensaje

| Parámetro | Descripción |
|-|-|
| `isFirstMessage` | Si es el primer mensaje del usuario en el canal. |
| `isReturningChatter` | Si el usuario ha regresado al canal. |
| `isEmoteOnly` | Si el mensaje solo contiene emotes. |
| `isHighlightedMessage` | Si se trata de un mensaje destacado canjeado por el usuario. |
| `isGigantifiedEmoteMessage` | Si el mensaje ha sido canjeado para «gigantificar» un emote (bits). |
| `isAnimatedMessage` | Si el mensaje ha sido canjeado para ser un mensaje animado (bits). |
| [`flagsInfo`](#información-de-flags) ➕ | Información sobre los flags (automod) del mensaje. |
| `roomId` | ID del canal. |
| `userId` | ID del usuario. |
| `tmi` | Información de TMI. |
| `msgId` | ID del mensaje. |
| `message` | Mensaje procesado (sanitizado) para mostrar emotes. Devuelve un elemento `<span>`. |
| `rawMessage` | Mensaje sin procesar. |

## Respuestas a los mensajes

| Parámetro | Descripción |
|-|-|
| `type` | Tipo de evento: `reply` en este caso. |
| `userLogin` | Nombre del usuario original. |
| `parentUserLogin` | Nombre del usuario original. |
| `msgBody` | Mensaje original al que se le responde. |
| `userId` | ID del usuario original. |
| `parentMsgId` | ID del mensaje original. |
| `msgId` | ID del mensaje de respuesta. |

## Información de bits

| Parámetro | Descripción |
|-|-|
| `bits` | Número de bits (cheers) enviados en el mensaje. |

## Información de flags

| Parámetro | Descripción |
|-|-|
| `messageFragment` | Fragmento del mensaje marcado por el automod. |
| `scoreList`       | Lista de flags alcanzados por el fragmento de mensaje. |

Los `scoreList` tienen un campo `level` (numérico) y un campo `flag` que puede ser:

| Flag | Descripción |
|-|-|
| `I` | ISCORE: Identity language (raza, religión, género, orientación, discapacidad, hate...) |
| `S` | SSCORE: Sexually explicit language (palabras de tipo sexual, partes íntimas...) |
| `A` | ASCORE: Aggressive language (hostilidad, bullying...) |
| `P` | PSCORE: Profanity (lenguaje vulgar, útil para mantener un chat family-friendly) |
