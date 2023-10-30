// Remove trail "\r\n"
export const chop = (text) => text.replace(/\r\n$/g, "");

// Parse raw field=value;field2=value2...
export const parseEquals = (message, castTo = String) => {
  const entries = message.split(";")
    .map(field => field.split("="))
    .map(([field, value]) => [field, castTo(value)]);

  return message && Object.fromEntries(entries);
};

// Parse IRC host :nickname!nickname@nickname.tmi.twitch.tv
export const parseIRCHost = (irchost) => {
  const [username, host] = irchost.substring(1).split("!");

  return {
    username,
    host
  };
};

// Parse raw field/value,field2/value2...
export const parseSlash = (message, castTo = Number) => {
  const entries = message.split(",")
    .map(badge => badge.split("/"))
    .map(([field, value]) => [field, castTo(value)]);

  return message && Object.fromEntries(entries);
};

export const cleanMessage = (message) => message?.replaceAll("\\s", " ");
