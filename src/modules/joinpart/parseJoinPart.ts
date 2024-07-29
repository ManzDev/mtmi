import { parseIRCHost } from "@/modules/utils.js";

export type JoinPartType = "join" | "part";

/**
 * Información del evento de entrada de un usuario.
 */
export interface JoinPartInfoType {
  /** Evento de entrada (join) o de salida (part). */
  type: JoinPartType,
  /** Nombre de usuario de la persona. */
  username: string,
  /** Canal en el que ha interactuado el usuario. */
  channel: string,
  /** Información cruda como llega del servidor */
  raw: string
}

export const parseJoinPart = ({ eventMessage } : any) : JoinPartInfoType => {
  // eslint-disable-next-line
  const [rawId, type, channel] = eventMessage.split(" ");
  const { username } = parseIRCHost(rawId);

  return {
    type: type.toLowerCase(),
    username,
    channel,
    raw: eventMessage
  };
};
