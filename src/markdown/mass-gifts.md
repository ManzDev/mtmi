---
title:
description:
---

# Suscripciones en masa

En ciertas ocasiones los usuarios pueden regalar múltiples suscripciones a miembros del canal. Con este evento podemos detectar cuando ocurre un evento de regalo de suscripciones en masa.

| Parámetro | Descripción |
|-|-|
| `isAnonymous` | Indica si es una suscripción anónima. |
| `massGiftCount` | Número de subs regaladas (En `submysterygift`) |
| `senderCount` | Total acumulado de suscripciones regaladas por este usuario. |
| `originId` | ID del regalo de suscripciones. |
| `senderUsername` | Usuario que envía el regalo. |
| `subPlan` | Información del plan de la sub. |
| `systemMsg` | Mensaje del sistema. |

> Los regalos de suscripción masiva pueden ocurrir en eventos `submysterygift`.
