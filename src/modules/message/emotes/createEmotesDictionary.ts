export interface EmoteItem {
  name: string,
  start: number,
  end: number
}

export const createEmotesDictionary = (rawMessage): Array<EmoteItem> | [] => {
  if (!rawMessage) {
    return [];
  }

  const emoteDictionary : Array<EmoteItem> = [];

  const emoteList : Array<string> = rawMessage.split("/");
  emoteList.forEach((emoteMessage: string) => {
    const [name, rawPosList] = emoteMessage.split(":");
    const posList = rawPosList.split(",");
    posList.forEach(positions => {
      const [start, end] = positions.split("-");
      emoteDictionary.push({ name, start: Number(start), end: Number(end) });
    });
  });

  return emoteDictionary.sort((a, b) => a.start - b.start);
};
