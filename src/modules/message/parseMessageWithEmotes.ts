import { createEmotesDictionary } from "./createEmotesDictionary";
import { getEmoteHTML } from "./getEmote";

export const parseMessageWithEmotes = (fields) => {
  // No tiene emotes
  const { rawMessage } = fields;
  if (!fields.emotes) { return rawMessage; }

  const options = {
    emotes: fields.emotes,
    emoteOnly: Boolean(fields?.["emote-only"]) ?? false
  };

  const { emotes, emoteOnly } = options;
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
