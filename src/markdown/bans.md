---
title:
description:
---

# Baneos/Timeout

Detecta cuando el streamer o un moderador banea de forma permanente (*ban*) o temporal (*timeout*) a un usuario del canal.

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
