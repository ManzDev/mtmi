import { parseEquals } from "@/modules/utils";

interface RoomStateType {
  emoteOnly: boolean,
  followersOnly: number, // minutos que debe seguir el canal para hablar
  r9k: boolean, // ritual: los mensajes deben ser únicos (solo mensajes > 9 chars)
  roomId: number,
  slow: number, // segundos que debe esperar el usuario entre mensajes para enviarlos
  subsOnly: boolean
}

export const parseRoomState = ({ type, eventMessage, timeStamp }) : RoomStateType => {
  // eslint-disable-next-line
  const [options, host, id, channel] = eventMessage.substring(1).split(" ");
  const fields = parseEquals(options);

  return {
    emoteOnly: fields["emote-only"] === "1",
    followersOnly: Number(fields["followers-only"]),
    r9k: fields.r9k === "1",
    roomId: Number(fields["room-id"]),
    slow: Number(fields.slow),
    subsOnly: fields["subs-only"] === "1",
    type: "roomstate"
  };
};
