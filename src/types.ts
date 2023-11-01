import { ClearChatType, ClearChatInfoType } from "@/modules/clearchat/parseClearChat";
import { BanInfoType } from "@/modules/clearchat/parseBan";
import { TimeoutInfoType } from "@/modules/clearchat/parseTimeout";
import { ClearMsgInfoType } from "@/modules/clearmsg/parseClearMsg";
import { SubType, SubInfoType } from "@/modules/usernotice/sub/parseSub";
import { GiftType } from "@/modules/usernotice/parseGift";
import { JoinPartType, JoinPartInfoType } from "@/modules/joinpart/parseJoinPart";
import { NoticeGroupType } from "@/modules/notice/parseNotice";
import { RaidInfoType } from "./modules/usernotice/parseRaid";
import { MysteryGiftInfoType } from "./modules/usernotice/gift/parseMysteryGift";
import { StandardPayforwardInfoType } from "./modules/usernotice/gift/parseStandardPayforward";
import { GiftPaidUpgradeInfoType } from "./modules/usernotice/gift/parseGiftPaidUpgrade";
import { GiftInfoType } from "./modules/usernotice/gift/parseSubGift";

export type EventType =
  JoinPartType |
  SubType | "extendsub" | "primepaidupgrade" |
  GiftType | "anonsubgift" | "rewardgift" | "anongiftpaidupgrade" |
  "communitypayforward" |
  "bits" | "bitsbadgetier" | "charity" |
  "ritual" |
  ClearChatType |
  "clearmsg" |
  "raid" | "unraid" |
  "roomstate" |
  "announcement" |
  "raw" |
  "message" | "action" | NoticeGroupType;

export type EventTypeMap = {
  "clearchat": ClearChatInfoType,
  "clearmsg": ClearMsgInfoType,
  "ban": BanInfoType,
  "timeout": TimeoutInfoType,
  "sub": SubInfoType,
  "resub": SubInfoType,
  "raid": RaidInfoType,
  "join": JoinPartInfoType,
  "part": JoinPartInfoType,
  "submysterygift": MysteryGiftInfoType,
  "standardpayforward": StandardPayforwardInfoType,
  "subgiftpaidupgrade": GiftPaidUpgradeInfoType,
  "subgift": GiftInfoType,
  "emote_only_off": NoticeGroupType,
  "emote_only_on": NoticeGroupType,
  "followers_on": NoticeGroupType,
  "followers_off": NoticeGroupType,
  "slow_on": NoticeGroupType,
  "slow_off": NoticeGroupType,
  "subs_on": NoticeGroupType,
  "subs_off": NoticeGroupType,
  "r9k_on": NoticeGroupType,
  "r9k_off": NoticeGroupType,
}
