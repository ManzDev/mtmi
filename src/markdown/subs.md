---
title:
description:
---

# Suscripciones

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

## Información de suscripción

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

## Información del plan

| Parámetro | Descripción |
|-|-|
| `isPrime` | Indica si es una suscripción Prime. |
| `isTier1` | Indica si es una suscripción Tier 1. |
| `isTier2` | Indica si es una suscripción Tier 2. |
| `isTier3` | Indica si es una suscripción Tier 3. |
| `plan`    | Número de identificación del plan. Personalizable en Twitch. |
| `planName` | Nombre del plan. Personalizable en Twitch. |

