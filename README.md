# mtmi: *Manz Twitch Messaging Interface*

> **IMPORTANTE**: Versión pre-alpha actualmente en desarrollo. No usar en producción.

`mtmi` es una librería Javascript para obtener información de la actividad en un chat de Twitch, de forma sencilla, sin necesidad de utilizar un backend, ni de registrar una cuenta. La información se obtiene mediante la API oficial de IRC de Twitch y es de sólo lectura (ideal para detectar eventos o sucesos del chat).

Nota: Si tu intención es escribir mensajes en el chat, tendrías que utilizar la API oficial y sus métodos de autenticación o librerías como [twurple](https://twurple.js.org/).

## Posibilidades de `mtmi`

¿Qué cosas puedo detectar con `mtmi`? Aquí tienes una lista:

- 💬 Mensajes en el chat (mensajes, acciones, respuestas, etc...)
- 💸 Suscripciones (prime, de pago, regaladas, etc...)
- 💲 Bits (cheers) enviados a un canal
- 📢 Anuncios de moderadores enviados a un canal
- 🥇 Emblemas o insignias de los usuarios
- ⛔ Baneos permanentes o temporales
- 🚫 Detección de palabras o fragmentos malsonantes (automod)
- 🔁 Entradas y salidas de usuarios en un canal
- ⚓ Raids recibidas en un canal
- 🔊 Avisos de hitos o rachas conseguidas

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

<details>
<summary>💬 Mensajes de chat</summary>
<div>

```js
import { client } from "https://unpkg.com/mtmi@0.0.3/dist/mtmi.js";

client.connect({ channels: ["manzdev"] });

client.on("message", ({ username, channel, message }) => {
  console.log(`${channel} [${username}]: ${message}`);
});
```

| Parámetro | Descripción |
|-|-|
| `type`     | Tipo de evento. En este caso, `message`. |
| `username` | Nombre del usuario (nombre interno) |
| `channel`  | Canal donde se envió el mensaje. |
| `message`  | Mensaje enviado (sólo texto). |
| `badges` ➕ | Lista de badges mostrados por el usuario. |
| `userInfo` ➕ | Información del usuario. |
| `messageInfo` ➕ | Información del mensaje. |
| `replyInfo` ➕ | Información de la respuesta (si es una respuesta). |
| `bitsInfo` ➕ | Información de los bits enviados (si fueron enviados). |
| `raw` | Mensaje sin procesar de Twitch. |

<details>
<summary>Badges del usuario: <code>badges</code></summary>
<div>

| Parámetro | Descripción |
|-|-|
| `name` | Nombre del badge. |
| `value` | Valor del badge. |
| `image` | URL de Imagen del badge. |
| `description` | Descripción del badge. |
| `fullMonths` | Número completo de meses. |
| `founderNumber` | Número de fundador. |
| `predictionInfo` | Información sobre la predicción del usuario. |

</div>
</details>

<details>
<summary>Información del usuario: <code>userInfo</code></summary>
<div>

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

</div>
</details>

<details>
<summary>Información del mensaje: <code>messageInfo</code></summary>
<div>

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

</div>
</details>

<details>
<summary>Mensajes de respuesta: <code>replyInfo</code></summary>
<div>

| Parámetro | Descripción |
|-|-|
| `type` | Tipo de evento: `reply` en este caso. |
| `userLogin` | Nombre del usuario original. |
| `parentUserLogin` | Nombre del usuario original. |
| `msgBody` | Mensaje original al que se le responde. |
| `userId` | ID del usuario original. |
| `parentMsgId` | ID del mensaje original. |
| `msgId` | ID del mensaje de respuesta. |

</div>
</details>

<details>
<summary>Información de bits: <code>bitsInfo</code></summary>
<div>

| Parámetro | Descripción |
|-|-|
| `bits` | Número de bits (cheers) enviados en el mensaje. |

</div>
</details>

<details>
<summary>Información de flags: <code>flagsInfo</code></summary>
<div>

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

</div>
</details>

---

</div>
</details>

<details>
<summary>💸 Subscripción</summary>
<div>

```js
import { client } from "https://unpkg.com/mtmi@0.0.3/dist/mtmi.js";

client.connect({ channels: ["manzdev"] });

client.on("resub", ({ channel, message, subInfo }) => {
  const { cumulativeMonths } = subInfo;
  console.log(`${channel} [${username}] se ha vuelto a suscribir. Lleva ${cumulativeMonths} mes(es).`);
});
```

| Parámetro | Descripción |
|-|-|
| `type` | Tipo de subscripción. primera suscripción: `sub`, renovación de suscripción: `resub` |
| `channel` | Canal al que se subscribió. |
| `message` | Mensaje enviado en la suscripción. |
| `messageInfo` | Información sobre el mensaje de la suscripción. |
| `subInfo` | Información sobre la suscripción. |
| `raw` | Mensaje sin procesar. |

<details>
<summary>Información de suscripción: <code>subInfo</code></summary>
<div>

| Parámetro | Descripción |
|-|-|
| `cumulativeMonths` | Cantidad total de meses de suscripción acumulados. |
| `months` | Mes actual. `0` si es `sub`. ⛔ **DEPRECATED** |
| `multimonthDuration` | El usuario se ha suscrito varios meses por adelantado. Por defecto, `1`. |
| `multimonthTenure` |  |
| `shouldShareStreak` | Indica si el usuario ha compartido su racha. |
| `streakMonths` | Racha de meses consecutivos. |
| `subPlan` | Información del plan de suscripción |
| `systemMsg` | Mensaje del sistema. |
| `wasGifted` | Indica si la suscripción fue regalada. |

</div>
</details>

<details>
<summary>Información del plan: <code>subPlan</code></summary>
<div>

| Parámetro | Descripción |
|-|-|
| `isPrime` | Indica si es una suscripción Prime. |
| `isTier1` | Indica si es una suscripción Tier 1. |
| `isTier2` | Indica si es una suscripción Tier 2. |
| `isTier3` | Indica si es una suscripción Tier 3. |
| `plan`    | Número de identificación del plan. Personalizable en Twitch. |
| `planName` | Nombre del plan. Personalizable en Twitch. |

</div>
</details>

---

</div>
</details>

<details>
<summary>💖 Suscripciones regaladas</summary>

<div>

| Parámetro | Descripción |
|-|-|
| `isAnonymous` | Indica si es una suscripción anónima. |
| `giftMonths` | Número de meses regalados (Sólo en `subgift` y `anonsubgift`) |
| `months` | Número de meses acumulados. |
| `originId` | ID de la suscripción regalada. |
| `gifterUserName` | Nombre de usuario del que regala la sub. |
| `gifterDisplayName` | Nombre de usuario para mostrar del que regala la sub. |
| `recipientUserName` | Nombre de usuario del que recibe la sub. |
| `recipientDisplayName` | Nombre de usuario para mostrar del que recibe la sub. |
| `recipientId` | ID del usuario que recibe la sub. |
| `senderCount` | Total acumulado de suscripciones regaladas por este usuario. |
| `subPlan` | Información del plan de la sub. |
| `systemMsg` | Mensaje del sistema. |
| `funString` | |
| `goalInfo` | Información del objetivo del streamer. |

<details>
<summary>Tipos de eventos: <code>type</code></summary>
<div>

| Tipo de evento | Descripción |
|-|-|
| `subgift` | Un usuario ha regalado una suscripción. |
| `submysterygift` | Un usuario ha regalado una suscripción aleatoria. |
| `standardpayforward` | |
| `communitypayforward` | |
| `primepaidupgrade` | Un usuario ha renovado su suscripción de prime a una de pago. |
| `giftpaidupgrade` | Un usuario ha renovado su suscripción regalada a una de pago. |

</div>
</details>

---

</div>
</details>

<details>
<summary>💕 Suscripciones en masa</summary>

<div>

Los regalos de suscripción masiva pueden ser con eventos `submysterygift`.

| Parámetro | Descripción |
|-|-|
| `isAnonymous` | Indica si es una suscripción anónima. |
| `massGiftCount` | Número de subs regaladas (En `submysterygift`) |
| `senderCount` | Total acumulado de suscripciones regaladas por este usuario. |
| `originId` | ID del regalo de suscripciones. |
| `senderUsername` | Usuario que envía el regalo. |
| `subPlan` | Información del plan de la sub. |
| `systemMsg` | Mensaje del sistema. |

---

</div>
</details>

<details>
<summary>🔁 Entradas/Salidas del canal</summary>

<div>

| Parámetro | Descripción |
|-|-|
| `type` | Tipo de evento. Si el usuario está llegando, `join`. Si se ha ido, `part`. |
| `username` | Nombre del usuario. |
| `channel` | Canal donde ha ocurrido el evento. |
| `raw` | Mensaje sin procesar. |

> Nota: Los eventos de entrada y salida del canal sólo las emite Twitch en canales con menos de 1000 espectadores. No se emiten en tiempo real, sino cada 4-5 minutos.

---

</div>
</details>

<details>
<summary>⛔ Baneos/Timeout</summary>

<div>

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

---

</div>
</details>

<details>
<summary>✏ Borrado del chat</summary>

<div>

Un moderador ha borrado el chat.

| Parámetro | Descripción |
|-|-|
| `type` | Tipo de evento: `clearchat`. |
| `roomId` | ID del canal. |
| `tmi` | Timestamp del momento en el que ocurre el evento. |
| `raw` | Mensaje sin procesar. |

---

</div>
</details>

<details>
<summary>🚦 Cambios de modo del canal</summary>

<div>
  * Pendiente de documentar *

  ---
</div>
</details>

<details>
<summary>📢 Anuncios de moderador</summary>

<div>
  * Pendiente de documentar *

  ---
</div>
</details>

<details>
<summary>⚓ Avisos de raid</summary>

<div>
  * Pendiente de documentar *

  ---
</div>
</details>

<details>
<summary>📢 Anuncios de hitos (rachas)</summary>

<div>
  * Pendiente de documentar *

  ---
</div>
</details>
