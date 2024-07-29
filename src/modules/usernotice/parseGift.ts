import { parseMysteryGift, MysteryGiftInfoType } from "./gift/parseMysteryGift";
import { parseStandardPayforward, StandardPayforwardInfoType } from "./gift/parseStandardPayforward";
import { parseCommunityPayforward, CommunityPayforwardInfoType } from "./gift/parseCommunityPayforward";
import { parseGiftPaidUpgrade, GiftPaidUpgradeInfoType } from "./gift/parseGiftPaidUpgrade";
import { parsePrimePaidUpgrade, PrimePaidUpgradeInfoType } from "./gift/parsePrimePaidUpgrade";
import { parseSubGift, GiftInfoType } from "./gift/parseSubGift";

export type GiftType = "submysterygift" | "standardpayforward" | "subgiftpaidupgrade" | "subgift";

export type GiftGroupType = MysteryGiftInfoType | StandardPayforwardInfoType | CommunityPayforwardInfoType | GiftPaidUpgradeInfoType | PrimePaidUpgradeInfoType | GiftInfoType | object;

export const parseGift = (fields: any) : GiftGroupType => {
  const msgId = fields["msg-id"];

  if (msgId === "submysterygift") {
    return parseMysteryGift(fields);
  }

  if (msgId === "standardpayforward") {
    return parseStandardPayforward(fields);
  }

  if (msgId === "communitypayforward") {
    return parseCommunityPayforward(fields);
  }

  if (msgId === "primepaidupgrade") {
    return parsePrimePaidUpgrade(fields);
  }

  if (msgId === "giftpaidupgrade") {
    return parseGiftPaidUpgrade(fields);
  }

  if (msgId === "subgift") {
    return parseSubGift(fields);
  }

  if (!fields["msg-param-sub-plan"]) {
    return {};
  }

  return {};
};
