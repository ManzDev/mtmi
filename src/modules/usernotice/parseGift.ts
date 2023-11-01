import { parseMysteryGift, MysteryGiftInfoType } from "./gift/parseMysteryGift";
import { parseStandardPayforward, StandardPayforwardInfoType } from "./gift/parseStandardPayforward";
import { parseGiftPaidUpgrade, GiftPaidUpgradeInfoType } from "./gift/parseGiftPaidUpgrade";
import { parseSubGift, GiftInfoType } from "./gift/parseSubGift";

export type GiftType = "submysterygift" | "standardpayforward" | "subgiftpaidupgrade" | "subgift";

export type GiftGroupType = MysteryGiftInfoType | StandardPayforwardInfoType | GiftPaidUpgradeInfoType | GiftInfoType | object;

export const parseGift = (fields: any) : GiftGroupType => {
  const msgId = fields["msg-id"];

  if (msgId === "submysterygift") {
    return parseMysteryGift(fields);
  }

  if (msgId === "standardpayforward") {
    return parseStandardPayforward(fields);
  }

  if (msgId === "subgiftpaidupgrade") {
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
