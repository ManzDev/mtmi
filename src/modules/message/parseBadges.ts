import { parseSlash } from "@/modules/utils";

export interface BadgesType {
  [name: string]: string;
}

const BADGES = [
  "broadcaster",
  "partner",
  "moderator",
  "founder",
  "subscriber",
  "vip",
  "hype-train",
  "bits",
  "moments",
  "artist-badge",
  "predictions",
  /* GIFTS */
  "sub-gifter",
  "sub-gift-leader",
  "bits-leader",
  /* STATUS */
  "no_video",
  "no_audio",
  "turbo",
  "premium",
  "game-developer",
  /* EVENTS */
  "glhf-pledge",
  "glitchcon2020",
  "chatter-cs-go-2022",
  "overwatch-league-insider_1",
  "overwatch-league-insider_2019A",
  "overwatch-league-insider_2018B",
  "battlerite_1",
  "getting-over-it_1",
  "bits-charity",
  "rplace-2023",
  "creator-cs-go-2022",
  "superultracombo-2023",
  "twitchcon2017",
  "twitchcon2018",
  "twitchconEU2019",
  "twitchconNA2019",
  "twitchconAmsterdam2020",
  "twitchconEU2022",
  "twitchconNA2022",
  "twitchconEU2023",
  "twitchconNA2023",
  "ambassador",
  "staff"
];

export const parseBadges = (badges : string) => {
  const fieldBadges: BadgesType = parseSlash(badges, String) || {};

  const isPresent = Object.keys(fieldBadges).every(badge => BADGES.includes(badge));
  !isPresent && console.log("----> badge descubierto: ", fieldBadges);

  return {
    ...fieldBadges
  };
};
