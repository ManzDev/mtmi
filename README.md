# mtmi: *Manz Twitch Messaging Interface*

> **IMPORTANTE**: Versión pre-alpha actualmente en desarrollo. No usar en producción.

## Mensajes en el chat

```js
import { client } from "https://unpkg.com/mtmi@0.0.3/dist/mtmi.js";

client.connect({ channels: ["manzdev"] });

client.on("message", ({ username, channel, message }) => {
  console.log(`${channel} [${username}]: ${message}`);
});
```

| Parámetro | Descripción |
|-|-|
| `type`     | Tipo de mensaje. |
| `username` | Nombre del usuario (nombre interno) |
| `channel`  | Canal donde se envió el mensaje. |
| `message`  | Mensaje enviado (sólo texto). |
| `badges`   | Array con los badges mostrados en el chat por el usuario. |
| `userInfo` | Información del usuario. |
| `messageInfo` | Información del mensaje. |
| `replyInfo` | Información de la respuesta (si es un mensaje respuesta). |
| `bitsInfo` | Información de los bits enviados (si es un mensaje con bits). |
| `raw` | Mensaje crudo (el que envía Twitch) |

#### > Badges del usuario

| Parámetro | Descripción |
|-|-|
| `name` | Nombre del badge. |
| `value` | Valor del badge. |
| `image` | URL de Imagen del badge. |
| `description` | Descripción del badge. |
| `fullMonths` | Número completo de meses. |
| `founderNumber` | Número de fundador. |
| `predictionInfo` | Información sobre la predicción del usuario. |

#### > Información del usuario

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

#### > Información del mensaje

| Parámetro | Descripción |
|-|-|
| `isFirstMessage` | Si es el primer mensaje del usuario en el canal. |
| `isReturningChatter` | Si el usuario ha regresado al canal. |
| `isEmoteOnly` | Si el mensaje solo contiene emotes. |
| `isHighlightedMessage` | Si se trata de un mensaje destacado canjeado por el usuario. |
| `isGigantifiedEmoteMessage` | Si el mensaje ha sido canjeado para «gigantificar» un emote (bits). |
| `isAnimatedMessage` | Si el mensaje ha sido canjeado para ser un mensaje animado (bits). |
| `flagsInfo` | Información sobre los flags (automod) del mensaje. |
| `roomId` | ID del canal. |
| `userId` | ID del usuario. |
| `tmi` | Información de TMI. |
| `msgId` | ID del mensaje. |
| `message` | Mensaje procesado (sanitizado) para mostrar emotes. Devuelve un elemento `<span>`. |
| `rawMessage` | Mensaje sin procesar. |

#### Mensajes de respuesta

* Pendiente de documentar *

#### Información de bits

* Pendiente de documentar *

#### Información de flags

* Pendiente de documentar *

## Subscripciones

* Pendiente de documentar *

## Regalos de suscripción

* Pendiente de documentar *

## Entradas/Salidas del canal

| Parámetro | Descripción |
|-|-|
| `type` | Tipo de evento. Si el usuario está llegando, `join`. Si se ha ido, `part`. |
| `username` | Nombre del usuario. |
| `channel` | Canal donde ha ocurrido el evento. |
| `raw` | Mensaje sin procesar. |

> Nota: Los eventos de entrada y salida del canal sólo las emite Twitch en canales con menos de 1000 espectadores. No se emiten en tiempo real, sino cada 4-5 minutos.

## Baneos/Timeout

| Parámetro | Descripción |
|-|-|
| `type` | Tipo de evento. Si es un permaban, `ban`. Si es un ban temporal, `timeout`. |
| `banDuration` | Tiempo del ban temporal. Sólo en los `timeout`. |
| `username` | Nombre del usuario baneado. |
| `channel` | Canal donde ha ocurrido el baneo. |
| `roomId` | ID del canal. |
| `targetUserId` | ID del usuario baneado. |
| `tmi` | Timestamp del momento en el que ocurre el evento. |
| `raw` | Mensaje sin procesar |

## Borrar el chat

Un moderador ha borrado el chat.

| Parámetro | Descripción |
|-|-|
| `type` | Tipo de evento: `clearchat`. |
| `roomId` | ID del canal. |
| `tmi` | Timestamp del momento en el que ocurre el evento. |
| `raw` | Mensaje sin procesar. |

## Cambios de modo del canal

* Pendiente de documentar *

## Anuncios de moderador

* Pendiente de documentar *

## Avisos de raid

* Pendiente de documentar *

## Anuncios de hitos (rachas)

* Pendiente de documentar *
