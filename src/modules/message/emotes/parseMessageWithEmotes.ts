import { createEmotesDictionary } from "./createEmotesDictionary";
import { createFragment, getEmoteImage } from "./getEmote";

const groupElements = (elements : Array<Element>) => {
  const container = document.createElement("span");
  container.append(...elements);
  return container;
};

export const parseMessageWithEmotes = (fields : any) => {
  const { rawMessage, emotes } = fields;

  // El mensaje no tiene emotes
  if (!emotes) return createFragment(rawMessage);

  const emoteOnly = Boolean(fields?.["emote-only"]) ?? false;
  const emoteList = createEmotesDictionary(emotes);

  const newMessage: Array<Element> = [];
  let i = 0;

  emoteList.forEach(({ name, start, end }) => {
    if (!emoteOnly) { newMessage.push(createFragment(rawMessage.substring(i, start))); }
    newMessage.push(getEmoteImage(name));
    i = end + 1;
  });

  i < rawMessage.length && newMessage.push(createFragment(rawMessage.substring(i, rawMessage.length)));

  return groupElements(newMessage);
};
