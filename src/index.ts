// Cliente principal
export { client } from "./mtmi.ts";

// Opciones y configuración
export type { OptionsObject, BadgeJSONInfoType } from "./mtmi.ts";

// Tipos del mapa de eventos
export type { EventType, EventTypeMap } from "./types.ts";

// Mensaje de chat
export type { UserMessageInfoType } from "./modules/message/parseUserMessage.ts";
export type { UserInfoType } from "./modules/message/parseUser.ts";
export type { MessageInfoType } from "./modules/message/parseMessage.ts";
export type { ReplyInfoType } from "./modules/message/parseReplyMessage.ts";
export type { BitsInfoType, BitsGroupType } from "./modules/message/parseBits.ts";
export type { FlagsType } from "./modules/message/parseFlags.ts";
export type { HypeChatInfoType } from "./modules/message/parseHypeChat.ts";

// Badges
export type { BadgeInfoType } from "./modules/message/badges/parseBadgeInfo.ts";

// Join / Part
export type { JoinPartInfoType, JoinPartType } from "./modules/joinpart/parseJoinPart.ts";

// ClearChat / Ban / Timeout
export type { ClearChatInfoType, ClearChatType } from "./modules/clearchat/parseClearChat.ts";
export type { BanInfoType } from "./modules/clearchat/parseBan.ts";
export type { TimeoutInfoType } from "./modules/clearchat/parseTimeout.ts";

// ClearMsg
export type { ClearMsgInfoType } from "./modules/clearmsg/parseClearMsg.ts";

// RoomState
export type { RoomStateInfoType } from "./modules/roomstate/parseRoomState.ts";

// Notice (modos de canal)
export type { NoticeGroupType } from "./modules/notice/parseNotice.ts";

// UserNotice base
export type {
  BaseUserNotice,
  SubNoticeType,
  RaidNoticeType,
  GiftNoticeType,
  AnnouncementNoticeType,
  ViewerMilestoneNoticeType,
  UserNoticeInfoType
} from "./modules/usernotice/parseUserNotice.ts";

// Suscripciones
export type { SubInfoType, SubInfoOptionalType, SubType } from "./modules/usernotice/sub/parseSub.ts";
export type { SubPlanType } from "./modules/usernotice/sub/parseSubPlan.ts";

// Raid
export type { RaidInfoType, RaidGroupType } from "./modules/usernotice/parseRaid.ts";

// Anuncio
export type { AnnouncementInfoType, AnnouncementGroupType } from "./modules/usernotice/parseAnnouncement.ts";

// Hitos / Viewer Milestone
export type { ViewerMilestoneType } from "./modules/usernotice/parseViewerMilestone.ts";

// Regalos
export type { GiftInfoType } from "./modules/usernotice/gift/parseSubGift.ts";
export type { MysteryGiftInfoType } from "./modules/usernotice/gift/parseMysteryGift.ts";
export type { GoalInfoType, GoalGroupType } from "./modules/usernotice/gift/parseGoal.ts";
export type { GiftPaidUpgradeInfoType } from "./modules/usernotice/gift/parseGiftPaidUpgrade.ts";
export type { PrimePaidUpgradeInfoType } from "./modules/usernotice/gift/parsePrimePaidUpgrade.ts";
export type { StandardPayforwardInfoType } from "./modules/usernotice/gift/parseStandardPayforward.ts";
export type { CommunityPayforwardInfoType } from "./modules/usernotice/gift/parseCommunityPayforward.ts";
