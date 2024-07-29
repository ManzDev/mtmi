const IGNORETYPES = [
  "PRIVMSG", "ROOMSTATE"
];

const IGNORELIST = [
  "resub", "sub", "subgift", "viewermilestone", "raid", "announcement", "submysterygift", "slow_off"
];

export const debugId = (raw : any) => {
  const [rawFields, rawHost, rawType, rawChannel] = raw.split(" ");
  const fields : Array<string> = raw.substring(1).split(";");
  const id = fields.find(field => field.startsWith("msg-id"));

  if (id) {
    const [, value] = id.split("=");

    if (IGNORETYPES.includes(rawType)) { return; }

    if (IGNORELIST.includes(value)) { return; }

    console.log("=>", rawType, value, rawFields, rawChannel);
  }
};
