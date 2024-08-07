import { ClearChatInfoType } from "@/modules/clearchat/parseClearChat";
import { BanInfoType } from "@/modules/clearchat/parseBan";
import { TimeoutInfoType } from "@/modules/clearchat/parseTimeout";
import { ClearMsgInfoType } from "@/modules/clearmsg/parseClearMsg";
import { RoomStateInfoType } from "@/modules/roomstate/parseRoomState";
import { AnnouncementInfoType } from "./modules/usernotice/parseAnnouncement";
import { SubInfoType } from "@/modules/usernotice/sub/parseSub";
import { UserMessageInfoType } from "@/modules/message/parseUserMessage";
import { JoinPartInfoType } from "@/modules/joinpart/parseJoinPart";
import { NoticeGroupType } from "@/modules/notice/parseNotice";
import { RaidInfoType } from "@/modules/usernotice/parseRaid";
import { MysteryGiftInfoType } from "@/modules/usernotice/gift/parseMysteryGift";
import { StandardPayforwardInfoType } from "@/modules/usernotice/gift/parseStandardPayforward";
import { CommunityPayforwardInfoType } from "@/modules/usernotice/gift/parseCommunityPayforward";
import { GiftPaidUpgradeInfoType } from "@/modules/usernotice/gift/parseGiftPaidUpgrade";
import { PrimePaidUpgradeInfoType } from "@/modules/usernotice/gift/parsePrimePaidUpgrade";
import { GiftInfoType } from "@/modules/usernotice/gift/parseSubGift";
import { BitsInfoType } from "@/modules/message/parseBits";
import { ViewerMilestoneType } from "@/modules/usernotice/parseViewerMilestone";

export type EventType =
  "join" | "part" |
  "sub" | "resub" | "extendsub" | "primepaidupgrade" | "primecommunitygiftreceived" |
  "subgift" | "submysterygift" | "standardpayforward" | "subgiftpaidupgrade" |
  "anonsubgift" | "rewardgift" | "anongiftpaidupgrade" | "communitypayforward" |
  "bits" | "bitsbadgetier" | "charity" |
  "ritual" |
  "clearchat" | "ban" | "timeout" |
  "clearmsg" |
  "raid" | "unraid" |
  "roomstate" |
  "announcement" |
  "raw" |
  "message" | "action" |
  "emote_only_off" | "emote_only_on" |
  "followers_on" | "followers_off" |
  "slow_on" | "slow_off" |
  "subs_on" | "subs_off" |
  "r9k_on" | "r9k_off" |
  "viewermilestone";

/**
 * Tipos de eventos de Twitch que puedes escuchar
 */
export type EventTypeMap = {
  // El streamer o un moderador ha limpiado el chat.
  "clearchat": ClearChatInfoType,
  // El streamer o un moderador ha baneado permanentemente a un usuario.
  "ban": BanInfoType,
  // El streamer o un moderador ha baneado temporalmente a un usuario.
  "timeout": TimeoutInfoType,
  // El streamer o un moderador ha eliminado el mensaje de un usuario.
  "clearmsg": ClearMsgInfoType,
  // Un usuario se ha suscrito por primera vez al canal
  "sub": SubInfoType,
  // Un usuario se ha vuelto a suscribir al canal
  "resub": SubInfoType,
  // Un usuario ha hecho raid y ha traído usuarios al canal
  "raid": RaidInfoType,
  // Un usuario ha entrado en el canal
  "join": JoinPartInfoType,
  // Un usuario se ha ido del canal
  "part": JoinPartInfoType,
  // Un usuario ha regalado subs en el canal
  "submysterygift": MysteryGiftInfoType,
  // (no claro hasta ahora)
  "communitypayforward": CommunityPayforwardInfoType,
  // (no claro hasta ahora)
  "standardpayforward": StandardPayforwardInfoType,
  // Un usuario ha renovado su suscripción regalada
  "primepaidupgrade": PrimePaidUpgradeInfoType,
  // Un usuario ha renovado su suscripción regalada
  "giftpaidupgrade": GiftPaidUpgradeInfoType,
  // Un usuario ha recibido una suscripción regalada
  "subgift": GiftInfoType,
  // Se han modificado los modos del canal
  "roomstate": RoomStateInfoType,
  // Se ha hecho un anuncio en el canal
  "announcement": AnnouncementInfoType,
  /** Un usuario ha escrito un mensaje en el canal */
  "message": UserMessageInfoType,
  // Un usuario ha realizado una acción en el canal
  "action": UserMessageInfoType,
  // Un usuario ha regalado bits en el canal
  "bits": BitsInfoType,
  // Mensaje desconocido
  "raw": object,
  // Se ha activado el modo solo emotes en el canal
  "emote_only_on": NoticeGroupType,
  // Se ha desactivado el modo solo emotes en el canal
  "emote_only_off": NoticeGroupType,
  // Se ha activado el modo solo seguidores en el canal
  "followers_on": NoticeGroupType,
  // Se ha desactivado el modo solo seguidores en el canal
  "followers_off": NoticeGroupType,
  // Se ha modificado el modo lento en el canal
  "slow_on": NoticeGroupType,
  // Se ha desactivado el modo lento en el canal
  "slow_off": NoticeGroupType,
  // Se ha activado el modo solo suscriptores en el canal
  "subs_on": NoticeGroupType,
  // Se ha desactivado el modo solo suscriptores en el canal
  "subs_off": NoticeGroupType,
  // Se ha activado el modo mensajes únicos en el canal
  "r9k_on": NoticeGroupType,
  // Se ha desactivado el modo mensajes únicos en el canal
  "r9k_off": NoticeGroupType,
  // Un usuario ha alcanzado un hito o racha
  "viewermilestone": ViewerMilestoneType
}
