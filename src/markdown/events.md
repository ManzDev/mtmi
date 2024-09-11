---
title:
description:
---

# Eventos

Detecta cuando un usuario se une a un canal (*entrada*) o abandona un canal (*salida*).

| Parámetro | Descripción |
|-|-|
| `type` | Si el usuario está llegando, `join`. Si se ha ido, `part`. |
| `username` | Nombre del usuario. |
| `channel` | Canal donde ha ocurrido el evento. |
| `raw` | Mensaje sin procesar. |

> Nota: Los eventos de entrada y salida del canal sólo las emite Twitch en canales con menos de 1000 espectadores. No se emiten en tiempo real, sino cada 4-5 minutos, mostrando a todos los usuarios que hayan salido o entrado al canal.
