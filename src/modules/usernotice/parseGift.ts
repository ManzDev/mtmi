import { parseMysteryGift, MysteryGiftType } from "./gift/parseMysteryGift";
import { parseStandardPayforward, StandardPayforwardType } from "./gift/parseStandardPayforward";
import { parseGiftPaidUpgrade, GiftPaidUpgradeType } from "./gift/parseGiftPaidUpgrade";
import { parseSubGift, GiftType } from "./gift/parseSubGift";

export type GiftInfoType = MysteryGiftType | StandardPayforwardType | GiftPaidUpgradeType | GiftType | object;

export const parseGift = (fields: any) : GiftInfoType => {
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
