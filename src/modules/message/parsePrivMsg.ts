import { parseIRCHost, parseEquals } from "@/modules/utils";

export const parsePrivMsg = (data) => {
  // eslint-disable-next-line
  const [rawFields, hostIRC, type, channel, ...message] = data.substring(1).split(" ");

  const { username } = parseIRCHost(hostIRC);
  const fields = parseEquals(rawFields);

  return {
    username,
    rawMessage: message.join(" ").substring(1),
    channel,
    fields
  };
};
