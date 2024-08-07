export const getEmoteImage = (id, format = "default", theme = "dark", scale = "1.0") => {
  const img = document.createElement("img");
  img.className = "emote";
  img.src = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${scale}`;
  img.alt = "emote";
  return img;
};

export const getEmoteHTML = (id, format = "default", theme = "dark", scale = "1.0") => {
  const url = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${scale}`;
  return `<img class="emote" src="${url}" alt="emote" />`;
};

export const createFragment = (message: string) => {
  const tag = document.createElement("span");
  tag.textContent = message;
  return tag;
};
