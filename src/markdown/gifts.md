---
title:
description:
---

# Suscripciones regaladas

En Twitch, los usuarios pueden regalar suscripciones a otros usuarios. Pueden hacerlo de forma anónima o no, y todo esto es detectable desde este tipo de evento.

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

## Tipos de eventos

| Tipo de evento | Descripción |
|-|-|
| `subgift` | Un usuario ha regalado una suscripción. |
| `submysterygift` | Un usuario ha regalado una suscripción aleatoria. |
| `standardpayforward` | |
| `communitypayforward` | |
| `primepaidupgrade` | Un usuario ha renovado su suscripción de prime a una de pago. |
| `giftpaidupgrade` | Un usuario ha renovado su suscripción regalada a una de pago. |

