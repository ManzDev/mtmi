export const createEmotesDictionary = (rawMessage) => {
  if (!rawMessage) {
    return {};
  }

  const emoteDictionary = [];

  const emoteList = rawMessage.split("/");
  emoteList.forEach(emoteMessage => {
    const [name, rawPosList] = emoteMessage.split(":");
    const posList = rawPosList.split(",");
    posList.forEach(positions => {
      const [start, end] = positions.split("-");
      emoteDictionary.push({ name, start: Number(start), end: Number(end) });
    });
  });

  return emoteDictionary.sort((a, b) => a.start - b.start);
};
