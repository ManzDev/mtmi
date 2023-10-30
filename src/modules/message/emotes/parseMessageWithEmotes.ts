import { createEmotesDictionary } from "./createEmotesDictionary";
import { getEmoteHTML } from "./getEmote";

export const parseMessageWithEmotes = (fields) => {
  const { rawMessage, emotes } = fields;

  // El mensaje no tiene emotes
  if (!emotes) { return rawMessage; }

  const emoteOnly = Boolean(fields?.["emote-only"]) ?? false;
  const emoteList = createEmotesDictionary(emotes);

  const newMessage: Array<String> = [];
  let i = 0;

  emoteList.forEach(({ name, start, end }) => {
    !emoteOnly && newMessage.push(rawMessage.substring(i, start));
    newMessage.push(getEmoteHTML(name));
    i = end + 1;
  });

  return newMessage.join("");
};
