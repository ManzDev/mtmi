import { parseEquals } from "@/modules/utils";

export interface RoomStateInfoType {
  type: string,
  emoteOnly: boolean,
  followersOnly: number, // minutos que debe seguir el canal para hablar
  r9k: boolean, // ritual: los mensajes deben ser únicos (solo mensajes > 9 chars)
  roomId: number,
  slow: number, // segundos que debe esperar el usuario entre mensajes para enviarlos
  subsOnly: boolean,
  channel: string
}

export const parseRoomState = ({ eventMessage } : any) : RoomStateInfoType => {
  // eslint-disable-next-line
  const [options, host, type, channel] = eventMessage.substring(1).split(" ");
  const fields = parseEquals(options);

  return {
    emoteOnly: fields["emote-only"] === "1",
    followersOnly: Number(fields["followers-only"] ?? -1),
    r9k: fields.r9k === "1",
    roomId: Number(fields["room-id"]),
    slow: Number(fields.slow ?? -1),
    subsOnly: fields["subs-only"] === "1",
    type: type.toLowerCase(),
    channel
  };
};
