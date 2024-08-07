// src/modules/utils.ts
var chop = (text) => text.replace(/\r\n$/g, "");
var parseEquals = (message, castTo = String) => {
  const entries = message.split(";").map((field) => field.split("=")).map(([field, value]) => [field, castTo(value)]);
  return message && Object.fromEntries(entries);
};
var parseIRCHost = (irchost) => {
  const [username, host] = irchost.substring(1).split("!");
  return {
    username,
    host
  };
};
var parseSlashToString = (message) => {
  const entries = message.split(",").map((badge) => badge.split("/")).map(([field, value]) => [field, String(value)]);
  return message && Object.fromEntries(entries);
};
var cleanMessage = (message) => message?.replaceAll("\\s", " ");

// src/modules/clearchat/parseBan.ts
var parseBan = (fields) => {
  const { channel, username } = fields;
  return {
    type: "ban",
    roomId: Number(fields["room-id"]),
    targetUserId: Number(fields["target-user-id"]),
    tmi: Number(fields["tmi-sent-ts"]),
    channel,
    username,
    raw: fields
  };
};

// src/modules/clearchat/parseTimeout.ts
var parseTimeout = (fields) => {
  const banData = parseBan(fields);
  return {
    ...banData,
    type: "timeout",
    banDuration: Number(fields["ban-duration"])
  };
};

// src/modules/clearchat/parseClearChat.ts
var parseClearChat = ({ eventMessage }) => {
  const [rawFields, host, rawType, channel, rawUsername] = eventMessage.substring(1).split(" ");
  const username = rawUsername?.substring(1) ?? "";
  const fields = parseEquals(rawFields);
  if (fields["ban-duration"]) {
    return {
      ...parseTimeout({ username, channel, ...fields }),
      raw: eventMessage
    };
  } else if (fields["target-user-id"]) {
    return {
      ...parseBan({ username, channel, ...fields }),
      raw: eventMessage
    };
  } else {
    return {
      type: "clearchat",
      roomId: Number(fields["room-id"]),
      tmi: Number(fields["tmi-sent-ts"]),
      raw: eventMessage
    };
  }
};

// src/modules/message/parsePrivMsg.ts
var parsePrivMsg = (rawMessage) => {
  const [rawFields, hostIRC, type, channel, ...message] = rawMessage.substring(1).split(" ");
  const { username } = parseIRCHost(hostIRC);
  const fields = parseEquals(rawFields);
  return {
    username,
    rawMessage: message.join(" ").substring(1),
    channel,
    fields
  };
};

// src/modules/message/parseReplyMessage.ts
var parseReplyMessage = (fields) => {
  const isReply = Boolean(fields["reply-parent-user-id"]);
  if (!isReply) {
    return {};
  }
  const replyParent = {
    displayName: fields?.["reply-parent-display-name"],
    msgBody: cleanMessage(fields?.["reply-parent-msg-body"]),
    msgId: fields?.["reply-parent-msg-id"],
    userId: fields?.["reply-parent-user-id"],
    userLogin: fields?.["reply-parent-user-login"]
  };
  const replyThread = {
    parentMsgId: fields?.["reply-thread-parent-msg-id"],
    parentUserLogin: fields?.["reply-thread-parent-user-login"]
  };
  return {
    type: "reply",
    ...replyParent,
    ...replyThread
  };
};

// src/modules/message/badges/parseBadgeInfo.ts
var BADGES = [
  "subscriber",
  "founder",
  "predictions"
];
var parseBadgeInfo = (badgeInfo) => {
  const fieldsBadgeInfo = parseSlashToString(badgeInfo) || {};
  const isPresent = Object.keys(fieldsBadgeInfo).every((badge) => BADGES.includes(badge));
  !isPresent && console.log("----> badgeInfo descubierto: ", fieldsBadgeInfo);
  return {
    ...fieldsBadgeInfo
  };
};

// src/modules/message/badges/badges.json
var badges_default = [
  {
    text: "1979-revolution/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/7833bb6e-d20d-48ff-a58d-67fe827a4f84/3",
    description: "1979 Revolution",
    value: 1
  },
  {
    text: "60-seconds/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/1e7252f9-7e80-4d3d-ae42-319f030cca99/3",
    description: "60 Seconds!",
    value: 1
  },
  {
    text: "60-seconds/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/64513f7d-21dd-4a05-a699-d73761945cf9/3",
    description: "60 Seconds!",
    value: 2
  },
  {
    text: "60-seconds/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/f4306617-0f96-476f-994e-5304f81bcc6e/3",
    description: "60 Seconds!",
    value: 3
  },
  {
    text: "H1Z1/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/fc71386c-86cd-11e7-a55d-43f591dc0c71/3",
    description: "H1Z1",
    value: 1
  },
  {
    text: "admin/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/9ef7e029-4cdf-4d4d-a0d5-e2b3fb2583fe/3",
    description: "Admin",
    value: 1
  },
  {
    text: "ambassador/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/2cbc339f-34f4-488a-ae51-efdf74f4e323/3",
    description: "Twitch Ambassador",
    value: 1
  },
  {
    text: "anomaly-2/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/d1d1ad54-40a6-492b-882e-dcbdce5fa81e/3",
    description: "Anomaly 2",
    value: 1
  },
  {
    text: "anomaly-warzone-earth/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/858be873-fb1f-47e5-ad34-657f40d3d156/3",
    description: "Anomaly Warzone Earth",
    value: 1
  },
  {
    text: "anonymous-cheerer/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/ca3db7f7-18f5-487e-a329-cd0b538ee979/3",
    description: "Anonymous Cheerer",
    value: 1
  },
  {
    text: "artist-badge/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/4300a897-03dc-4e83-8c0e-c332fee7057f/3",
    description: "Artist",
    value: 1
  },
  {
    text: "axiom-verge/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/f209b747-45ee-42f6-8baf-ea7542633d10/3",
    description: "Axiom Verge",
    value: 1
  },
  {
    text: "battlechefbrigade/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/24e32e67-33cd-4227-ad96-f0a7fc836107/3",
    description: "Battle Chef Brigade",
    value: 1
  },
  {
    text: "battlechefbrigade/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/ef1e96e8-a0f9-40b6-87af-2977d3c004bb/3",
    description: "Battle Chef Brigade",
    value: 2
  },
  {
    text: "battlechefbrigade/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/107ebb20-4fcd-449a-9931-cd3f81b84c70/3",
    description: "Battle Chef Brigade",
    value: 3
  },
  {
    text: "battlerite_1/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/484ebda9-f7fa-4c67-b12b-c80582f3cc61/3",
    description: "Battlerite",
    value: 1
  },
  {
    text: "bits/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/73b5c3fb-24f9-4a82-a852-2f475b59411c/3",
    description: "cheer 1",
    value: 1
  },
  {
    text: "bits/100",
    image: "https://static-cdn.jtvnw.net/badges/v1/09d93036-e7ce-431c-9a9e-7044297133f2/3",
    description: "cheer 100",
    value: 100
  },
  {
    text: "bits/1000",
    image: "https://static-cdn.jtvnw.net/badges/v1/0d85a29e-79ad-4c63-a285-3acd2c66f2ba/3",
    description: "cheer 1000",
    value: 1e3
  },
  {
    text: "bits/5000",
    image: "https://static-cdn.jtvnw.net/badges/v1/57cd97fc-3e9e-4c6d-9d41-60147137234e/3",
    description: "cheer 5000",
    value: 5e3
  },
  {
    text: "bits/10000",
    image: "https://static-cdn.jtvnw.net/badges/v1/68af213b-a771-4124-b6e3-9bb6d98aa732/3",
    description: "cheer 10000",
    value: 1e4
  },
  {
    text: "bits/25000",
    image: "https://static-cdn.jtvnw.net/badges/v1/64ca5920-c663-4bd8-bfb1-751b4caea2dd/3",
    description: "cheer 25000",
    value: 25e3
  },
  {
    text: "bits/50000",
    image: "https://static-cdn.jtvnw.net/badges/v1/62310ba7-9916-4235-9eba-40110d67f85d/3",
    description: "cheer 50000",
    value: 5e4
  },
  {
    text: "bits/75000",
    image: "https://static-cdn.jtvnw.net/badges/v1/ce491fa4-b24f-4f3b-b6ff-44b080202792/3",
    description: "cheer 75000",
    value: 75e3
  },
  {
    text: "bits/100000",
    image: "https://static-cdn.jtvnw.net/badges/v1/96f0540f-aa63-49e1-a8b3-259ece3bd098/3",
    description: "cheer 100000",
    value: 1e5
  },
  {
    text: "bits/200000",
    image: "https://static-cdn.jtvnw.net/badges/v1/4a0b90c4-e4ef-407f-84fe-36b14aebdbb6/3",
    description: "cheer 200000",
    value: 2e5
  },
  {
    text: "bits/300000",
    image: "https://static-cdn.jtvnw.net/badges/v1/ac13372d-2e94-41d1-ae11-ecd677f69bb6/3",
    description: "cheer 300000",
    value: 3e5
  },
  {
    text: "bits/400000",
    image: "https://static-cdn.jtvnw.net/badges/v1/a8f393af-76e6-4aa2-9dd0-7dcc1c34f036/3",
    description: "cheer 400000",
    value: 4e5
  },
  {
    text: "bits/500000",
    image: "https://static-cdn.jtvnw.net/badges/v1/f6932b57-6a6e-4062-a770-dfbd9f4302e5/3",
    description: "cheer 500000",
    value: 5e5
  },
  {
    text: "bits/600000",
    image: "https://static-cdn.jtvnw.net/badges/v1/4d908059-f91c-4aef-9acb-634434f4c32e/3",
    description: "cheer 600000",
    value: 6e5
  },
  {
    text: "bits/700000",
    image: "https://static-cdn.jtvnw.net/badges/v1/a1d2a824-f216-4b9f-9642-3de8ed370957/3",
    description: "cheer 700000",
    value: 7e5
  },
  {
    text: "bits/800000",
    image: "https://static-cdn.jtvnw.net/badges/v1/5ec2ee3e-5633-4c2a-8e77-77473fe409e6/3",
    description: "cheer 800000",
    value: 8e5
  },
  {
    text: "bits/900000",
    image: "https://static-cdn.jtvnw.net/badges/v1/088c58c6-7c38-45ba-8f73-63ef24189b84/3",
    description: "cheer 900000",
    value: 9e5
  },
  {
    text: "bits/1000000",
    image: "https://static-cdn.jtvnw.net/badges/v1/494d1c8e-c3b2-4d88-8528-baff57c9bd3f/3",
    description: "cheer 1000000",
    value: 1e6
  },
  {
    text: "bits/1250000",
    image: "https://static-cdn.jtvnw.net/badges/v1/ce217209-4615-4bf8-81e3-57d06b8b9dc7/3",
    description: "cheer 1250000",
    value: 125e4
  },
  {
    text: "bits/1500000",
    image: "https://static-cdn.jtvnw.net/badges/v1/c4eba5b4-17a7-40a1-a668-bc1972c1e24d/3",
    description: "cheer 1500000",
    value: 15e5
  },
  {
    text: "bits/1750000",
    image: "https://static-cdn.jtvnw.net/badges/v1/183f1fd8-aaf4-450c-a413-e53f839f0f82/3",
    description: "cheer 1750000",
    value: 175e4
  },
  {
    text: "bits/2000000",
    image: "https://static-cdn.jtvnw.net/badges/v1/7ea89c53-1a3b-45f9-9223-d97ae19089f2/3",
    description: "cheer 2000000",
    value: 2e6
  },
  {
    text: "bits/2500000",
    image: "https://static-cdn.jtvnw.net/badges/v1/cf061daf-d571-4811-bcc2-c55c8792bc8f/3",
    description: "cheer 2500000",
    value: 25e5
  },
  {
    text: "bits/3000000",
    image: "https://static-cdn.jtvnw.net/badges/v1/5671797f-5e9f-478c-a2b5-eb086c8928cf/3",
    description: "cheer 3000000",
    value: 3e6
  },
  {
    text: "bits/3500000",
    image: "https://static-cdn.jtvnw.net/badges/v1/c3d218f5-1e45-419d-9c11-033a1ae54d3a/3",
    description: "cheer 3500000",
    value: 35e5
  },
  {
    text: "bits/4000000",
    image: "https://static-cdn.jtvnw.net/badges/v1/79fe642a-87f3-40b1-892e-a341747b6e08/3",
    description: "cheer 4000000",
    value: 4e6
  },
  {
    text: "bits/4500000",
    image: "https://static-cdn.jtvnw.net/badges/v1/736d4156-ac67-4256-a224-3e6e915436db/3",
    description: "cheer 4500000",
    value: 45e5
  },
  {
    text: "bits/5000000",
    image: "https://static-cdn.jtvnw.net/badges/v1/3f085f85-8d15-4a03-a829-17fca7bf1bc2/3",
    description: "cheer 5000000",
    value: 5e6
  },
  {
    text: "bits-charity/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/a539dc18-ae19-49b0-98c4-8391a594332b/3",
    description: "Direct Relief - Charity 2018",
    value: 1
  },
  {
    text: "bits-leader/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/8bedf8c3-7a6d-4df2-b62f-791b96a5dd31/3",
    description: "Bits Leader 1",
    value: 1
  },
  {
    text: "bits-leader/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/f04baac7-9141-4456-a0e7-6301bcc34138/3",
    description: "Bits Leader 2",
    value: 2
  },
  {
    text: "bits-leader/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/f1d2aab6-b647-47af-965b-84909cf303aa/3",
    description: "Bits Leader 3",
    value: 3
  },
  {
    text: "brawlhalla/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/bf6d6579-ab02-4f0a-9f64-a51c37040858/3",
    description: "Brawlhalla",
    value: 1
  },
  {
    text: "broadcaster/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3",
    description: "Broadcaster",
    value: 1
  },
  {
    text: "broken-age/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/56885ed2-9a09-4c8e-8131-3eb9ec15af94/3",
    description: "Broken Age",
    value: 1
  },
  {
    text: "bubsy-the-woolies/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/c8129382-1f4e-4d15-a8d2-48bdddba9b81/3",
    description: "Bubsy: The Woolies Strike Back",
    value: 1
  },
  {
    text: "chatter-cs-go-2022/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/57b6bd6b-a1b5-4204-9e6c-eb8ed5831603/3",
    description: "CS:GO Week Brazil 2022",
    value: 1
  },
  {
    text: "clip-champ/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/f38976e0-ffc9-11e7-86d6-7f98b26a9d79/3",
    description: "Power Clipper",
    value: 1
  },
  {
    text: "creator-cs-go-2022/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/a2ea6df9-ac0a-4956-bfe9-e931f50b94fa/3",
    description: "CS:GO Week Brazil 2022",
    value: 1
  },
  {
    text: "cuphead/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/4384659a-a2e3-11e7-a564-87f6b1288bab/3",
    description: "Cuphead",
    value: 1
  },
  {
    text: "darkest-dungeon/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/52a98ddd-cc79-46a8-9fe3-30f8c719bc2d/3",
    description: "Darkest Dungeon",
    value: 1
  },
  {
    text: "deceit/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/b14fef48-4ff9-4063-abf6-579489234fe9/3",
    description: "Deceit",
    value: 1
  },
  {
    text: "devil-may-cry-hd/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/633877d4-a91c-4c36-b75b-803f82b1352f/3",
    description: "Devil May Cry HD Collection",
    value: 1
  },
  {
    text: "devil-may-cry-hd/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/408548fe-aa74-4d53-b5e9-960103d9b865/3",
    description: "Devil May Cry HD Collection",
    value: 2
  },
  {
    text: "devil-may-cry-hd/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/df84c5bf-8d66-48e2-b9fb-c014cc9b3945/3",
    description: "Devil May Cry HD Collection",
    value: 3
  },
  {
    text: "devil-may-cry-hd/4",
    image: "https://static-cdn.jtvnw.net/badges/v1/af836b94-8ffd-4c0a-b7d8-a92fad5e3015/3",
    description: "Devil May Cry HD Collection",
    value: 4
  },
  {
    text: "devilian/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/3cb92b57-1eef-451c-ac23-4d748128b2c5/3",
    description: "Devilian",
    value: 1
  },
  {
    text: "duelyst/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/7d9c12f4-a2ac-4e88-8026-d1a330468282/3",
    description: "Duelyst",
    value: 1
  },
  {
    text: "duelyst/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/1938acd3-2d18-471d-b1af-44f2047c033c/3",
    description: "Duelyst",
    value: 2
  },
  {
    text: "duelyst/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/344c07fc-1632-47c6-9785-e62562a6b760/3",
    description: "Duelyst",
    value: 3
  },
  {
    text: "duelyst/4",
    image: "https://static-cdn.jtvnw.net/badges/v1/39e717a8-00bc-49cc-b6d4-3ea91ee1be25/3",
    description: "Duelyst",
    value: 4
  },
  {
    text: "duelyst/5",
    image: "https://static-cdn.jtvnw.net/badges/v1/290419b6-484a-47da-ad14-a99d6581f758/3",
    description: "Duelyst",
    value: 5
  },
  {
    text: "duelyst/6",
    image: "https://static-cdn.jtvnw.net/badges/v1/c5e54a4b-0bf1-463a-874a-38524579aed0/3",
    description: "Duelyst",
    value: 6
  },
  {
    text: "duelyst/7",
    image: "https://static-cdn.jtvnw.net/badges/v1/cf508179-3183-4987-97e0-56ca44babb9f/3",
    description: "Duelyst",
    value: 7
  },
  {
    text: "enter-the-gungeon/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/53c9af0b-84f6-4f9d-8c80-4bc51321a37d/3",
    description: "Enter The Gungeon",
    value: 1
  },
  {
    text: "eso/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/18647a68-a35f-48d7-bf97-ae5deb6b277d/3",
    description: "Elder Scrolls Online",
    value: 1
  },
  {
    text: "extension/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/ea8b0f8c-aa27-11e8-ba0c-1370ffff3854/3",
    description: "Extension",
    value: 1
  },
  {
    text: "firewatch/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/b6bf4889-4902-49e2-9658-c0132e71c9c4/3",
    description: "Firewatch",
    value: 1
  },
  {
    text: "founder/0",
    image: "https://static-cdn.jtvnw.net/badges/v1/511b78a9-ab37-472f-9569-457753bbe7d3/3",
    description: "Founder",
    value: 0
  },
  {
    text: "frozen-cortext/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/2015f087-01b5-4a01-a2bb-ecb4d6be5240/3",
    description: "Frozen Cortext",
    value: 1
  },
  {
    text: "frozen-synapse/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/d4bd464d-55ea-4238-a11d-744f034e2375/3",
    description: "Frozen Synapse",
    value: 1
  },
  {
    text: "game-developer/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/85856a4a-eb7d-4e26-a43e-d204a977ade4/3",
    description: "Game Developer",
    value: 1
  },
  {
    text: "getting-over-it_1/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/8d4e178c-81ec-4c71-af68-745b40733984/3",
    description: "Getting Over It",
    value: 1
  },
  {
    text: "getting-over-it/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/bb620b42-e0e1-4373-928e-d4a732f99ccb/3",
    description: "Getting Over It",
    value: 2
  },
  {
    text: "glhf-pledge/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/3158e758-3cb4-43c5-94b3-7639810451c5/3",
    description: "GLHF Pledge",
    value: 1
  },
  {
    text: "glitchcon2020/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/1d4b03b9-51ea-42c9-8f29-698e3c85be3d/3",
    description: "GlitchCon 2020",
    value: 1
  },
  {
    text: "global/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/9384c43e-4ce7-4e94-b2a1-b93656896eba/3",
    description: "Global Moderator",
    value: 1
  },
  {
    text: "heavy-bullets/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/fc83b76b-f8b2-4519-9f61-6faf84eef4cd/3",
    description: "Heavy Bullets",
    value: 1
  },
  {
    text: "hello/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/030cab2c-5d14-11e7-8d91-43a5a4306286/3",
    description: "Hello Neighbor",
    value: 1
  },
  {
    text: "hype-train/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/fae4086c-3190-44d4-83c8-8ef0cbe1a515/3",
    description: "Current Hype Train Conductor",
    value: 1
  },
  {
    text: "hype-train/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/9c8d038a-3a29-45ea-96d4-5031fb1a7a81/3",
    description: "Former Hype Train Conductor",
    value: 2
  },
  {
    text: "innerspace/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/97532ccd-6a07-42b5-aecf-3458b6b3ebea/3",
    description: "Innerspace",
    value: 1
  },
  {
    text: "innerspace/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/fc7d6018-657a-40e4-9246-0acdc85886d1/3",
    description: "Innerspace",
    value: 2
  },
  {
    text: "jackbox-party-pack/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/0f964fc1-f439-485f-a3c0-905294ee70e8/3",
    description: "Jackbox Party Pack",
    value: 1
  },
  {
    text: "kingdom-new-lands/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/e3c2a67e-ef80-4fe3-ae41-b933cd11788a/3",
    description: "Kingdom: New Lands",
    value: 1
  },
  {
    text: "moderator/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
    description: "Moderator",
    value: 1
  },
  {
    text: "moments/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/bf370830-d79a-497b-81c6-a365b2b60dda/3",
    description: "Moments Badge - Tier 1",
    value: 1
  },
  {
    text: "moments/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/fc46b10c-5b45-43fd-81ad-d5cb0de6d2f4/3",
    description: "Moments Badge - Tier 2",
    value: 2
  },
  {
    text: "moments/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/d08658d7-205f-4f75-ad44-8c6e0acd8ef6/3",
    description: "Moments Badge - Tier 3",
    value: 3
  },
  {
    text: "moments/4",
    image: "https://static-cdn.jtvnw.net/badges/v1/fe5b5ddc-93e7-4aaf-9b3e-799cd41808b1/3",
    description: "Moments Badge - Tier 4",
    value: 4
  },
  {
    text: "moments/5",
    image: "https://static-cdn.jtvnw.net/badges/v1/c8a0d95a-856e-4097-9fc0-7765300a4f58/3",
    description: "Moments Badge - Tier 5",
    value: 5
  },
  {
    text: "moments/6",
    image: "https://static-cdn.jtvnw.net/badges/v1/f9e3b4e4-200e-4045-bd71-3a6b480c23ae/3",
    description: "Moments Badge - Tier 6",
    value: 6
  },
  {
    text: "moments/7",
    image: "https://static-cdn.jtvnw.net/badges/v1/a90a26a4-fdf7-4ac3-a782-76a413da16c1/3",
    description: "Moments Badge - Tier 7",
    value: 7
  },
  {
    text: "moments/8",
    image: "https://static-cdn.jtvnw.net/badges/v1/f22286cd-6aa3-42ce-b3fb-10f5d18c4aa0/3",
    description: "Moments Badge - Tier 8",
    value: 8
  },
  {
    text: "moments/9",
    image: "https://static-cdn.jtvnw.net/badges/v1/5cb2e584-1efd-469b-ab1d-4d1b59a944e7/3",
    description: "Moments Badge - Tier 9",
    value: 9
  },
  {
    text: "moments/10",
    image: "https://static-cdn.jtvnw.net/badges/v1/9c13f2b6-69cd-4537-91b4-4a8bd8b6b1fd/3",
    description: "Moments Badge - Tier 10",
    value: 10
  },
  {
    text: "moments/11",
    image: "https://static-cdn.jtvnw.net/badges/v1/7573e7a2-0f1f-4508-b833-d822567a1e03/3",
    description: "Moments Badge - Tier 11",
    value: 11
  },
  {
    text: "moments/12",
    image: "https://static-cdn.jtvnw.net/badges/v1/f2c91d14-85c8-434b-a6c0-6d7930091150/3",
    description: "Moments Badge - Tier 12",
    value: 12
  },
  {
    text: "moments/13",
    image: "https://static-cdn.jtvnw.net/badges/v1/35eb3395-a1d3-4170-969a-86402ecfb11a/3",
    description: "Moments Badge - Tier 13",
    value: 13
  },
  {
    text: "moments/14",
    image: "https://static-cdn.jtvnw.net/badges/v1/cb40eb03-1015-45ba-8793-51c66a24a3d5/3",
    description: "Moments Badge - Tier 14",
    value: 14
  },
  {
    text: "moments/15",
    image: "https://static-cdn.jtvnw.net/badges/v1/b241d667-280b-4183-96ae-2d0053631186/3",
    description: "Moments Badge - Tier 15",
    value: 15
  },
  {
    text: "moments/16",
    image: "https://static-cdn.jtvnw.net/badges/v1/5684d1bc-8132-4a4f-850c-18d3c5bd04f3/3",
    description: "Moments Badge - Tier 16",
    value: 16
  },
  {
    text: "moments/17",
    image: "https://static-cdn.jtvnw.net/badges/v1/3b08c1ee-0f77-451b-9226-b5b22d7f023c/3",
    description: "Moments Badge - Tier 17",
    value: 17
  },
  {
    text: "moments/18",
    image: "https://static-cdn.jtvnw.net/badges/v1/14057e75-080c-42da-a412-6232c6f33b68/3",
    description: "Moments Badge - Tier 18",
    value: 18
  },
  {
    text: "moments/19",
    image: "https://static-cdn.jtvnw.net/badges/v1/6100cc6f-6b4b-4a3d-a55b-a5b34edb5ea1/3",
    description: "Moments Badge - Tier 19",
    value: 19
  },
  {
    text: "moments/20",
    image: "https://static-cdn.jtvnw.net/badges/v1/43399796-e74c-4741-a975-56202f0af30e/3",
    description: "Moments Badge - Tier 20",
    value: 20
  },
  {
    text: "no_audio/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/aef2cd08-f29b-45a1-8c12-d44d7fd5e6f0/3",
    description: "Watching without audio",
    value: 1
  },
  {
    text: "no_video/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/199a0dba-58f3-494e-a7fc-1fa0a1001fb8/3",
    description: "Listening only",
    value: 1
  },
  {
    text: "okhlos/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/dc088bd6-8965-4907-a1a2-c0ba83874a7d/3",
    description: "Okhlos",
    value: 1
  },
  {
    text: "overwatch-league-insider/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/51e9e0aa-12e3-48ce-b961-421af0787dad/3",
    description: "OWL All-Access Pass 2018",
    value: 1
  },
  {
    text: "overwatch-league-insider_2018B/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/34ec1979-d9bb-4706-ad15-464de814a79d/3",
    description: "OWL All-Access Pass 2018",
    value: 1
  },
  {
    text: "overwatch-league-insider_2019A/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/ca980da1-3639-48a6-95a3-a03b002eb0e5/3",
    description: "OWL All-Access Pass 2019",
    value: 1
  },
  {
    text: "overwatch-league-insider_2019A/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/ab7fa7a7-c2d9-403f-9f33-215b29b43ce4/3",
    description: "OWL All-Access Pass 2019",
    value: 2
  },
  {
    text: "overwatch-league-insider_2019B/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/c5860811-d714-4413-9433-d6b1c9fc803c/3",
    description: "OWL All-Access Pass 2019",
    value: 1
  },
  {
    text: "overwatch-league-insider_2019B/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/75f05d4b-3042-415c-8b0b-e87620a24daf/3",
    description: "OWL All-Access Pass 2019",
    value: 2
  },
  {
    text: "overwatch-league-insider_2019B/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/765a0dcf-2a94-43ff-9b9c-ef6c209b90cd/3",
    description: "OWL All-Access Pass 2019",
    value: 3
  },
  {
    text: "overwatch-league-insider_2019B/4",
    image: "https://static-cdn.jtvnw.net/badges/v1/a8ae0ccd-783d-460d-93ee-57c485c558a6/3",
    description: "OWL All-Access Pass 2019",
    value: 4
  },
  {
    text: "overwatch-league-insider_2019B/5",
    image: "https://static-cdn.jtvnw.net/badges/v1/be87fd6d-1560-4e33-9ba4-2401b58d901f/3",
    description: "OWL All-Access Pass 2019",
    value: 5
  },
  {
    text: "partner/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",
    description: "Verified",
    value: 1
  },
  {
    text: "power-rangers/0",
    image: "https://static-cdn.jtvnw.net/badges/v1/9edf3e7f-62e4-40f5-86ab-7a646b10f1f0/3",
    description: "Black Ranger",
    value: 0
  },
  {
    text: "power-rangers/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/1eeae8fe-5bc6-44ed-9c88-fb84d5e0df52/3",
    description: "Blue Ranger",
    value: 1
  },
  {
    text: "power-rangers/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/21bbcd6d-1751-4d28-a0c3-0b72453dd823/3",
    description: "Green Ranger",
    value: 2
  },
  {
    text: "power-rangers/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/5c58cb40-9028-4d16-af67-5bc0c18b745e/3",
    description: "Pink Ranger",
    value: 3
  },
  {
    text: "power-rangers/4",
    image: "https://static-cdn.jtvnw.net/badges/v1/8843d2de-049f-47d5-9794-b6517903db61/3",
    description: "Red Ranger",
    value: 4
  },
  {
    text: "power-rangers/5",
    image: "https://static-cdn.jtvnw.net/badges/v1/06c85e34-477e-4939-9537-fd9978976042/3",
    description: "White Ranger",
    value: 5
  },
  {
    text: "power-rangers/6",
    image: "https://static-cdn.jtvnw.net/badges/v1/d6dca630-1ca4-48de-94e7-55ed0a24d8d1/3",
    description: "Yellow Ranger",
    value: 6
  },
  {
    text: "predictions/blue-1",
    image: "https://static-cdn.jtvnw.net/badges/v1/e33d8b46-f63b-4e67-996d-4a7dcec0ad33/3",
    description: "Predicted Blue (1)",
    value: null
  },
  {
    text: "predictions/blue-10",
    image: "https://static-cdn.jtvnw.net/badges/v1/072ae906-ecf7-44f1-ac69-a5b2261d8892/3",
    description: "Predicted Blue (10)",
    value: null
  },
  {
    text: "predictions/blue-2",
    image: "https://static-cdn.jtvnw.net/badges/v1/ffdda3fe-8012-4db3-981e-7a131402b057/3",
    description: "Predicted Blue (2)",
    value: null
  },
  {
    text: "predictions/blue-3",
    image: "https://static-cdn.jtvnw.net/badges/v1/f2ab9a19-8ef7-4f9f-bd5d-9cf4e603f845/3",
    description: "Predicted Blue (3)",
    value: null
  },
  {
    text: "predictions/blue-4",
    image: "https://static-cdn.jtvnw.net/badges/v1/df95317d-9568-46de-a421-a8520edb9349/3",
    description: "Predicted Blue (4)",
    value: null
  },
  {
    text: "predictions/blue-5",
    image: "https://static-cdn.jtvnw.net/badges/v1/88758be8-de09-479b-9383-e3bb6d9e6f06/3",
    description: "Predicted Blue (5)",
    value: null
  },
  {
    text: "predictions/blue-6",
    image: "https://static-cdn.jtvnw.net/badges/v1/46b1537e-d8b0-4c0d-8fba-a652e57b9df0/3",
    description: "Predicted Blue (6)",
    value: null
  },
  {
    text: "predictions/blue-7",
    image: "https://static-cdn.jtvnw.net/badges/v1/07cd34b2-c6a1-45f5-8d8a-131e3c8b2279/3",
    description: "Predicted Blue (7)",
    value: null
  },
  {
    text: "predictions/blue-8",
    image: "https://static-cdn.jtvnw.net/badges/v1/4416dfd7-db97-44a0-98e7-40b4e250615e/3",
    description: "Predicted Blue (8)",
    value: null
  },
  {
    text: "predictions/blue-9",
    image: "https://static-cdn.jtvnw.net/badges/v1/fc74bd90-2b74-4f56-8e42-04d405e10fae/3",
    description: "Predicted Blue (9)",
    value: null
  },
  {
    text: "predictions/gray-1",
    image: "https://static-cdn.jtvnw.net/badges/v1/144f77a2-e324-4a6b-9c17-9304fa193a27/3",
    description: "Predicted Gray (1)",
    value: null
  },
  {
    text: "predictions/gray-2",
    image: "https://static-cdn.jtvnw.net/badges/v1/097a4b14-b458-47eb-91b6-fe74d3dbb3f5/3",
    description: "Predicted Gray (2)",
    value: null
  },
  {
    text: "predictions/pink-1",
    image: "https://static-cdn.jtvnw.net/badges/v1/75e27613-caf7-4585-98f1-cb7363a69a4a/3",
    description: "Predicted Pink (1)",
    value: null
  },
  {
    text: "predictions/pink-2",
    image: "https://static-cdn.jtvnw.net/badges/v1/4b76d5f2-91cc-4400-adf2-908a1e6cfd1e/3",
    description: "Predicted Pink (2)",
    value: null
  },
  {
    text: "premium/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/3",
    description: "Prime Gaming",
    value: 1
  },
  {
    text: "psychonauts/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/a9811799-dce3-475f-8feb-3745ad12b7ea/3",
    description: "Psychonauts",
    value: 1
  },
  {
    text: "raiden-v-directors-cut/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/441b50ae-a2e3-11e7-8a3e-6bff0c840878/3",
    description: "Raiden V",
    value: 1
  },
  {
    text: "rift/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/f939686b-2892-46a4-9f0d-5f582578173e/3",
    description: "RIFT",
    value: 1
  },
  {
    text: "samusoffer/0",
    image: "https://static-cdn.jtvnw.net/badges/v1/aa960159-a7b8-417e-83c1-035e4bc2deb5/3",
    description: "beta_title1",
    value: 0
  },
  {
    text: "staff/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/3",
    description: "Staff",
    value: 1
  },
  {
    text: "starbound/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/e838e742-0025-4646-9772-18a87ba99358/3",
    description: "Starbound",
    value: 1
  },
  {
    text: "strafe/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/0051508d-2d42-4e4b-a328-c86b04510ca4/3",
    description: "Strafe",
    value: 1
  },
  {
    text: "sub-gift-leader/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/21656088-7da2-4467-acd2-55220e1f45ad/3",
    description: "Gifter Leader 1",
    value: 1
  },
  {
    text: "sub-gift-leader/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/0d9fe96b-97b7-4215-b5f3-5328ebad271c/3",
    description: "Gifter Leader 2",
    value: 2
  },
  {
    text: "sub-gift-leader/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/4c6e4497-eed9-4dd3-ac64-e0599d0a63e5/3",
    description: "Gifter Leader 3",
    value: 3
  },
  {
    text: "sub-gifter/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/a5ef6c17-2e5b-4d8f-9b80-2779fd722414/3",
    description: "Sub Gifter",
    value: 1
  },
  {
    text: "sub-gifter/5",
    image: "https://static-cdn.jtvnw.net/badges/v1/ee113e59-c839-4472-969a-1e16d20f3962/3",
    description: "5 Gift Subs",
    value: 5
  },
  {
    text: "sub-gifter/10",
    image: "https://static-cdn.jtvnw.net/badges/v1/d333288c-65d7-4c7b-b691-cdd7b3484bf8/3",
    description: "10 Gift Subs",
    value: 10
  },
  {
    text: "sub-gifter/25",
    image: "https://static-cdn.jtvnw.net/badges/v1/052a5d41-f1cc-455c-bc7b-fe841ffaf17f/3",
    description: "25 Gift Subs",
    value: 25
  },
  {
    text: "sub-gifter/50",
    image: "https://static-cdn.jtvnw.net/badges/v1/c4a29737-e8a5-4420-917a-314a447f083e/3",
    description: "50 Gift Subs",
    value: 50
  },
  {
    text: "sub-gifter/100",
    image: "https://static-cdn.jtvnw.net/badges/v1/8343ada7-3451-434e-91c4-e82bdcf54460/3",
    description: "100 Gift Subs",
    value: 100
  },
  {
    text: "sub-gifter/150",
    image: "https://static-cdn.jtvnw.net/badges/v1/514845ba-0fc3-4771-bce1-14d57e91e621/3",
    description: "150 Gift Subs",
    value: 150
  },
  {
    text: "sub-gifter/200",
    image: "https://static-cdn.jtvnw.net/badges/v1/c6b1893e-8059-4024-b93c-39c84b601732/3",
    description: "200 Gift Subs",
    value: 200
  },
  {
    text: "sub-gifter/250",
    image: "https://static-cdn.jtvnw.net/badges/v1/cd479dc0-4a15-407d-891f-9fd2740bddda/3",
    description: "250 Gift Subs",
    value: 250
  },
  {
    text: "sub-gifter/300",
    image: "https://static-cdn.jtvnw.net/badges/v1/9e1bb24f-d238-4078-871a-ac401b76ecf2/3",
    description: "300 Gift Subs",
    value: 300
  },
  {
    text: "sub-gifter/350",
    image: "https://static-cdn.jtvnw.net/badges/v1/6c4783cd-0aba-4e75-a7a4-f48a70b665b0/3",
    description: "350 Gift Subs",
    value: 350
  },
  {
    text: "sub-gifter/400",
    image: "https://static-cdn.jtvnw.net/badges/v1/6f4cab6b-def9-4d99-ad06-90b0013b28c8/3",
    description: "400 Gift Subs",
    value: 400
  },
  {
    text: "sub-gifter/450",
    image: "https://static-cdn.jtvnw.net/badges/v1/b593d68a-f8fb-4516-a09a-18cce955402c/3",
    description: "450 Gift Subs",
    value: 450
  },
  {
    text: "sub-gifter/500",
    image: "https://static-cdn.jtvnw.net/badges/v1/60e9504c-8c3d-489f-8a74-314fb195ad8d/3",
    description: "500 Gift Subs",
    value: 500
  },
  {
    text: "sub-gifter/550",
    image: "https://static-cdn.jtvnw.net/badges/v1/024d2563-1794-43ed-b8dc-33df3efae900/3",
    description: "550 Gift Subs",
    value: 550
  },
  {
    text: "sub-gifter/600",
    image: "https://static-cdn.jtvnw.net/badges/v1/3ecc3aab-09bf-4823-905e-3a4647171fc1/3",
    description: "600 Gift Subs",
    value: 600
  },
  {
    text: "sub-gifter/650",
    image: "https://static-cdn.jtvnw.net/badges/v1/eeabf43c-8e4c-448d-9790-4c2172c57944/3",
    description: "650 Gift Subs",
    value: 650
  },
  {
    text: "sub-gifter/700",
    image: "https://static-cdn.jtvnw.net/badges/v1/4a9acdc7-30be-4dd1-9898-fc9e42b3d304/3",
    description: "700 Gift Subs",
    value: 700
  },
  {
    text: "sub-gifter/750",
    image: "https://static-cdn.jtvnw.net/badges/v1/ca17277c-53e5-422b-8bb4-7c5dcdb0ac67/3",
    description: "750 Gift Subs",
    value: 750
  },
  {
    text: "sub-gifter/800",
    image: "https://static-cdn.jtvnw.net/badges/v1/9c1fb96d-0579-43d7-ba94-94672eaef63a/3",
    description: "800 Gift Subs",
    value: 800
  },
  {
    text: "sub-gifter/850",
    image: "https://static-cdn.jtvnw.net/badges/v1/cc924aaf-dfd4-4f3f-822a-f5a87eb24069/3",
    description: "850 Gift Subs",
    value: 850
  },
  {
    text: "sub-gifter/900",
    image: "https://static-cdn.jtvnw.net/badges/v1/193d86f6-83e1-428c-9638-d6ca9e408166/3",
    description: "900 Gift Subs",
    value: 900
  },
  {
    text: "sub-gifter/950",
    image: "https://static-cdn.jtvnw.net/badges/v1/7ce130bd-6f55-40cc-9231-e2a4cb712962/3",
    description: "950 Gift Subs",
    value: 950
  },
  {
    text: "sub-gifter/1000",
    image: "https://static-cdn.jtvnw.net/badges/v1/bfb7399a-c632-42f7-8d5f-154610dede81/3",
    description: "1000 Gift Subs",
    value: 1e3
  },
  {
    text: "sub-gifter/2000",
    image: "https://static-cdn.jtvnw.net/badges/v1/4e8b3a32-1513-44ad-8a12-6c90232c77f9/3",
    description: "2000 Gift Subs",
    value: 2e3
  },
  {
    text: "sub-gifter/3000",
    image: "https://static-cdn.jtvnw.net/badges/v1/b18852ba-65d2-4b84-97d2-aeb6c44a0956/3",
    description: "3000 Gift Subs",
    value: 3e3
  },
  {
    text: "sub-gifter/4000",
    image: "https://static-cdn.jtvnw.net/badges/v1/efbf3c93-ecfa-4b67-8d0a-1f732fb07397/3",
    description: "4000 Gift Subs",
    value: 4e3
  },
  {
    text: "sub-gifter/5000",
    image: "https://static-cdn.jtvnw.net/badges/v1/d775275d-fd19-4914-b63a-7928a22135c3/3",
    description: "5000 Gift Subs",
    value: 5e3
  },
  {
    text: "subscriber/0",
    image: "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3",
    description: "Subscriber",
    value: 0
  },
  {
    text: "subscriber/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3",
    description: "Subscriber",
    value: 1
  },
  {
    text: "subscriber/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/25a03e36-2bb2-4625-bd37-d6d9d406238d/3",
    description: "2-Month Subscriber",
    value: 2
  },
  {
    text: "subscriber/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/e8984705-d091-4e54-8241-e53b30a84b0e/3",
    description: "3-Month Subscriber",
    value: 3
  },
  {
    text: "subscriber/4",
    image: "https://static-cdn.jtvnw.net/badges/v1/2d2485f6-d19b-4daa-8393-9493b019156b/3",
    description: "6-Month Subscriber",
    value: 4
  },
  {
    text: "subscriber/5",
    image: "https://static-cdn.jtvnw.net/badges/v1/b4e6b13a-a76f-4c56-87e1-9375a7aaa610/3",
    description: "9-Month Subscriber",
    value: 5
  },
  {
    text: "subscriber/6",
    image: "https://static-cdn.jtvnw.net/badges/v1/ed51a614-2c44-4a60-80b6-62908436b43a/3",
    description: "6-Month Subscriber",
    value: 6
  },
  {
    text: "superhot/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/c5a06922-83b5-40cb-885f-bcffd3cd6c68/3",
    description: "Superhot",
    value: 1
  },
  {
    text: "the-surge/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/c9f69d89-31c8-41aa-843b-fee956dfbe23/3",
    description: "The Surge",
    value: 1
  },
  {
    text: "the-surge/2",
    image: "https://static-cdn.jtvnw.net/badges/v1/2c4d7e95-e138-4dde-a783-7956a8ecc408/3",
    description: "The Surge",
    value: 2
  },
  {
    text: "the-surge/3",
    image: "https://static-cdn.jtvnw.net/badges/v1/0a8fc2d4-3125-4ccb-88db-e970dfbee189/3",
    description: "The Surge",
    value: 3
  },
  {
    text: "this-war-of-mine/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/6a20f814-cb2c-414e-89cc-f8dd483e1785/3",
    description: "This War of Mine",
    value: 1
  },
  {
    text: "titan-souls/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/092a7ce2-709c-434f-8df4-a6b075ef867d/3",
    description: "Titan Souls",
    value: 1
  },
  {
    text: "treasure-adventure-world/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/59810027-2988-4b0d-b88d-fc414c751305/3",
    description: "Treasure Adventure World",
    value: 1
  },
  {
    text: "turbo/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/3",
    description: "Turbo",
    value: 1
  },
  {
    text: "twitchbot/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/df9095f6-a8a0-4cc2-bb33-d908c0adffb8/3",
    description: "AutoMod",
    value: 1
  },
  {
    text: "twitchcon2017/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/0964bed0-5c31-11e7-a90b-0739918f1d9b/3",
    description: "TwitchCon 2017 - Long Beach",
    value: 1
  },
  {
    text: "twitchcon2018/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/e68164e4-087d-4f62-81da-d3557efae3cb/3",
    description: "TwitchCon 2018 - San Jose",
    value: 1
  },
  {
    text: "twitchconAmsterdam2020/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/ed917c9a-1a45-4340-9c64-ca8be4348c51/3",
    description: "TwitchCon 2020 - Amsterdam",
    value: 1
  },
  {
    text: "twitchconEU2019/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/590eee9e-f04d-474c-90e7-b304d9e74b32/3",
    description: "TwitchCon 2019 - Berlin",
    value: 1
  },
  {
    text: "twitchconEU2022/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/e4744003-50b7-4eb8-9b47-a7b1616a30c6/3",
    description: "TwitchCon 2022 - Amsterdam",
    value: 1
  },
  {
    text: "twitchconNA2019/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/569c829d-c216-4f56-a191-3db257ed657c/3",
    description: "TwitchCon 2019 - San Diego",
    value: 1
  },
  {
    text: "twitchconNA2020/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/ed917c9a-1a45-4340-9c64-ca8be4348c51/3",
    description: "TwitchCon 2020 - North America",
    value: 1
  },
  {
    text: "twitchconNA2022/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/344d429a-0b34-48e5-a84c-14a1b5772a3a/3",
    description: "TwitchCon 2022 - San Diego",
    value: 1
  },
  {
    text: "tyranny/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/0c79afdf-28ce-4b0b-9e25-4f221c30bfde/3",
    description: "Tyranny",
    value: 1
  },
  {
    text: "user-anniversary/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/ccbbedaa-f4db-4d0b-9c2a-375de7ad947c/3",
    description: "Twitchiversary Badge",
    value: 1
  },
  {
    text: "vga-champ-2017/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/03dca92e-dc69-11e7-ac5b-9f942d292dc7/3",
    description: "2017 VGA Champ",
    value: 1
  },
  {
    text: "vip/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3",
    description: "VIP",
    value: 1
  },
  {
    text: "warcraft/alliance",
    image: "https://static-cdn.jtvnw.net/badges/v1/c4816339-bad4-4645-ae69-d1ab2076a6b0/3",
    description: "Alliance",
    value: null
  },
  {
    text: "warcraft/horde",
    image: "https://static-cdn.jtvnw.net/badges/v1/de8b26b6-fd28-4e6c-bc89-3d597343800d/3",
    description: "Horde",
    value: null
  },
  {
    text: "twitchconEU2023/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/a8f2084e-46b9-4bb9-ae5e-00d594aafc64/3",
    description: "TwitchCon 2023 - Paris",
    value: 1
  },
  {
    text: "superultracombo-2023/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/5864739a-5e58-4623-9450-a2c0555ef90b/3",
    description: "SuperUltraCombo 2023",
    value: 1
  },
  {
    text: "twitchconNA2023/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/c90a753f-ab20-41bc-9c42-ede062485d2c/3",
    description: "Attended TwitchCon Las Vegas 2023",
    value: 1
  },
  {
    text: "rplace-2023/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/e33e0c67-c380-4241-828a-099c46e51c66/3",
    description: "r/place 2023 Cake",
    value: 1
  },
  {
    text: "twitch-intern-2023/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/e239e7e0-e373-4fdf-b95e-3469aec28485/3",
    description: "Twitch Intern 2023",
    value: 1
  },
  {
    text: "twitch-recap-2023/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/4d9e9812-ba9b-48a6-8690-13f3f338ee65/3",
    description: "Twitch Recap 2023",
    value: 1
  },
  {
    text: "raging-wolf-helm/1",
    image: "https://static-cdn.jtvnw.net/badges/v1/3ff668be-59a3-4e3e-96af-e6b2908b3171/3",
    description: "Casco de Lobo Furioso",
    value: 1
  }
];

// src/modules/message/parseBadges.ts
var parseBadges = (fields) => {
  const badges = parseSlashToString(fields.badges) || {};
  const badgeInfo = parseBadgeInfo(fields["badge-info"]);
  const badgesName = Object.keys(badges);
  return badgesName.map((name) => {
    const value = badges[name];
    const key = `${name}/${value}`;
    const keyData = badges_default.find((badge) => badge.text === key);
    const data = {
      name,
      value,
      image: keyData?.image,
      description: keyData?.description
    };
    name === "subscriber" && (data.fullMonths = Number(badgeInfo.subscriber));
    name === "founder" && (data.founderNumber = Number(badgeInfo.founder));
    name === "predictions" && (data.predictionInfo = cleanMessage(badgeInfo.predictions));
    return data;
  });
};

// src/modules/message/bots.js
var bots_default = [
  { name: "streamelements", type: "bot" },
  { name: "nightbot", type: "bot" }
];

// src/modules/message/parseUser.ts
var BOTNAMES = bots_default.map((bot) => bot.name);
var parseUser = (fields) => ({
  username: fields.username,
  displayName: fields["display-name"] || fields.username,
  color: fields.color.toLowerCase() || "currentColor",
  isMod: Boolean(fields.mod === "1"),
  isVip: Boolean(fields.vip === "1"),
  isSub: Boolean(fields.subscriber !== "0"),
  isPrime: Boolean(fields.badges?.premium === "1"),
  // isTurbo: Boolean(fields.turbo), // Deprecated
  isTurbo: Boolean(fields.badges?.turbo === "1"),
  isBot: Boolean(BOTNAMES.includes(fields.username))
  // serType: fields["user-type"] || "normal",
});

// src/modules/message/emotes/createEmotesDictionary.ts
var createEmotesDictionary = (rawMessage) => {
  if (!rawMessage) {
    return {};
  }
  const emoteDictionary = [];
  const emoteList = rawMessage.split("/");
  emoteList.forEach((emoteMessage) => {
    const [name, rawPosList] = emoteMessage.split(":");
    const posList = rawPosList.split(",");
    posList.forEach((positions) => {
      const [start, end] = positions.split("-");
      emoteDictionary.push({ name, start: Number(start), end: Number(end) });
    });
  });
  return emoteDictionary.sort((a, b) => a.start - b.start);
};

// src/modules/message/emotes/getEmote.ts
var getEmoteImage = (id, format = "default", theme = "dark", scale = "1.0") => {
  const img = document.createElement("img");
  img.className = "emote";
  img.src = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${scale}`;
  img.alt = "emote";
  return img;
};
var createFragment = (message) => {
  const tag = document.createElement("span");
  tag.textContent = message;
  return tag;
};

// src/modules/message/emotes/parseMessageWithEmotes.ts
var groupElements = (elements) => {
  const container = document.createElement("span");
  container.append(...elements);
  return container;
};
var parseMessageWithEmotes = (fields) => {
  const { rawMessage, emotes } = fields;
  if (!emotes) return createFragment(rawMessage);
  const emoteOnly = Boolean(fields?.["emote-only"]) ?? false;
  const emoteList = createEmotesDictionary(emotes);
  const newMessage = [];
  let i = 0;
  emoteList.forEach(({ name, start, end }) => {
    if (!emoteOnly) {
      newMessage.push(createFragment(rawMessage.substring(i, start)));
    }
    newMessage.push(getEmoteImage(name));
    i = end + 1;
  });
  return groupElements(newMessage);
};

// src/modules/message/parseFlags.ts
var parseFlags = (fields) => {
  const { flags, rawMessage } = fields;
  if (!flags) {
    return {};
  }
  const flagData = flags.split(",").map((field) => field.split(":")).map(([range, list]) => {
    const [start, end] = range.split("-");
    const categories = list.split("/") ?? [];
    const messageFragment = rawMessage.substring(start, end + 1);
    const scoreList = categories.map((score) => {
      const [flag, level] = score.split(".");
      return { flag, level: Number(level) };
    });
    return { messageFragment, scoreList };
  });
  return flagData;
};

// src/modules/message/parseMessage.ts
var parseMessage = (fields) => {
  const { username, channel, flags, rawMessage } = fields;
  const message = parseMessageWithEmotes({ rawMessage, ...fields });
  const flagsInfo = parseFlags({ flags, rawMessage });
  return {
    id: fields.id,
    isEmoteOnly: Number(fields["emote-only"] ?? 0) !== 0,
    isFirstMessage: Number(fields["first-msg"] ?? 0) !== 0,
    isReturningChatter: Number(fields["returning-chatter"] ?? 0) !== 0,
    isHighlightedMessage: fields["msg-id"] === "highlighted-message",
    flagsInfo,
    roomId: Number(fields["room-id"]),
    tmi: Number(fields["tmi-sent-ts"]),
    userId: Number(fields["user-id"]),
    msgId: fields["msg-id"] ?? "message",
    message,
    rawMessage
  };
};

// src/modules/message/parseBits.ts
var parseBits = (fields) => {
  const bits = Number(fields.bits ?? 0);
  if (!bits) {
    return {};
  }
  return {
    bits
  };
};

// src/modules/message/parseUserMessage.ts
var parseUserMessage = ({ eventMessage }) => {
  const { fields, username, rawMessage, channel } = parsePrivMsg(eventMessage);
  const badges = parseBadges(fields);
  const userInfo = parseUser({ username, ...fields });
  const messageInfo = parseMessage({ username, channel, rawMessage, ...fields });
  const replyInfo = parseReplyMessage(fields);
  const bitsInfo = parseBits(fields);
  const newType = rawMessage.startsWith("ACTION ") ? "action" : "message";
  const data = {
    type: newType,
    username,
    badges,
    userInfo,
    messageInfo,
    message: rawMessage,
    channel,
    raw: eventMessage
  };
  Object.keys(replyInfo).length && (data.replyInfo = replyInfo);
  if (Object.keys(bitsInfo).length > 0) {
    return {
      ...data,
      bitsInfo,
      type: "bits"
    };
  }
  return data;
};

// src/modules/joinpart/parseJoinPart.ts
var parseJoinPart = ({ eventMessage }) => {
  const [rawId, type, channel] = eventMessage.split(" ");
  const { username } = parseIRCHost(rawId);
  return {
    type: type.toLowerCase(),
    username,
    channel,
    raw: eventMessage
  };
};

// src/modules/clearmsg/parseClearMsg.ts
var parseClearMsg = ({ eventMessage }) => {
  const [rawFields, host, rawType, channel, ...rawMessage] = eventMessage.split(" ");
  const message = rawMessage.join(" ").substring(1);
  const fields = parseEquals(rawFields.substring(1));
  return {
    username: fields.login,
    roomId: fields["room-id"],
    type: fields["msg-id"],
    tmi: fields["tmi-sent-ts"],
    channel,
    message
  };
};

// src/modules/usernotice/sub/parseSubPlan.ts
var parseSubPlan = (fields) => {
  const plan = fields["msg-param-sub-plan"];
  const planName = cleanMessage(fields["msg-param-sub-plan-name"]);
  return {
    plan,
    planName: cleanMessage(planName),
    isPrime: plan === "Prime",
    isTier1: plan === "1000",
    isTier2: plan === "2000",
    isTier3: plan === "3000"
  };
};

// src/modules/usernotice/sub/parseSub.ts
var parseSub = (fields) => {
  if (!["sub", "resub"].includes(fields["msg-id"])) {
    return {};
  }
  const subPlan = parseSubPlan(fields);
  const wasGifted = fields["msg-param-was-gifted"];
  return {
    cumulativeMonths: Number(fields["msg-param-cumulative-months"]),
    months: Number(fields["msg-param-months"]),
    multimonthDuration: Number(fields["msg-param-multimonth-duration"]),
    multimonthTenure: Number(fields["msg-param-multimonth-tenure"]),
    shouldShareStreak: Boolean(Number(fields["msg-param-should-share-streak"])),
    streakMonths: Number(fields["msg-param-streak-months"] ?? 0),
    subPlan,
    wasGifted: wasGifted !== "false",
    systemMsg: cleanMessage(fields["system-msg"])
  };
};

// src/modules/usernotice/gift/parseMysteryGift.ts
var parseMysteryGift = (fields) => {
  const originId = cleanMessage(fields["msg-param-origin-id"]);
  const data = {
    massGiftCount: Number(fields["msg-param-mass-gift-count"]),
    originId,
    senderCount: Number(fields["msg-param-sender-count"]),
    senderUsername: fields.login,
    isAnonymous: fields.login === "ananonymousgifter",
    subPlan: fields["msg-param-sub-plan"],
    systemMsg: cleanMessage(fields["system-msg"])
  };
  fields["msg-param-sender-count"] && (data.senderCount = Number(fields["msg-param-sender-count"]));
  return data;
};

// src/modules/usernotice/gift/parseStandardPayforward.ts
var parseStandardPayforward = (fields) => {
  const gifterAnonymous = fields["msg-param-prior-gifter-anonymous"] !== "false";
  return {
    gifterAnonymous,
    gifterId: Number(fields["msg-param-prior-gifter-id"]),
    gifterUserName: fields["msg-param-prior-gifter-user-name"],
    gifterDisplayName: fields["msg-param-prior-gifter-display-name"],
    recipientId: Number(fields["msg-param-recipient-id"]),
    recipientUserName: fields["msg-param-recipient-user-name"],
    recipientDisplayName: fields["msg-param-recipient-display-name"],
    systemMsg: fields["system-msg"]
  };
};

// src/modules/usernotice/gift/parseCommunityPayforward.ts
var parseCommunityPayforward = (fields) => {
  const gifterAnonymous = fields["msg-param-prior-gifter-anonymous"] !== "false";
  return {
    gifterAnonymous,
    gifterId: Number(fields["msg-param-prior-gifter-id"]),
    gifterUserName: fields["msg-param-prior-gifter-user-name"],
    gifterDisplayName: fields["msg-param-prior-gifter-display-name"],
    systemMsg: cleanMessage(fields["system-msg"])
  };
};

// src/modules/usernotice/gift/parseGiftPaidUpgrade.ts
var parseGiftPaidUpgrade = (fields) => {
  const username = fields.login;
  return {
    type: fields["msg-id"],
    senderUsername: fields["msg-param-sender-username"],
    senderDisplayName: fields["msg-param-sender-display-name"],
    systemMsg: cleanMessage(fields["system-msg"]),
    username,
    displayName: fields["display-name"]
  };
};

// src/modules/usernotice/gift/parsePrimePaidUpgrade.ts
var parsePrimePaidUpgrade = (fields) => {
  const username = fields.login;
  return {
    type: fields["msg-id"],
    username,
    displayName: fields["display-name"],
    subPlan: fields["msg-param-sub-plan"],
    systemMsg: cleanMessage(fields["system-msg"])
  };
};

// src/modules/usernotice/gift/parseGoal.ts
var parseGoal = (fields) => {
  if (!fields["msg-param-goal-contribution-type"]) {
    return {};
  }
  return {
    contributionType: fields["msg-param-goal-contribution-type"],
    currentContributions: Number(fields["msg-param-goal-current-contributions"]),
    description: fields["msg-param-goal-description"],
    targetContributions: Number(fields["msg-param-goal-target-contributions"]),
    userContributions: Number(fields["msg-param-goal-user-contributions"])
  };
};

// src/modules/usernotice/gift/parseSubGift.ts
var parseSubGift = (fields) => {
  const originId = cleanMessage(fields["msg-param-origin-id"]);
  const subPlan = parseSubPlan(fields);
  const goalInfo = parseGoal(fields);
  const data = {
    giftMonths: Number(fields["msg-param-gift-months"]),
    months: Number(fields["msg-param-months"]),
    originId,
    isAnonymous: fields.login === "ananonymousgifter",
    gifterUserName: fields.login,
    gifterDisplayName: fields["display-name"],
    recipientDisplayName: fields["msg-param-recipient-display-name"],
    recipientId: Number(fields["msg-param-recipient-id"]),
    recipientUserName: fields["msg-param-recipient-user-name"],
    subPlan,
    systemMsg: cleanMessage(fields["system-msg"])
  };
  fields["msg-param-sender-count"] && (data.senderCount = Number(fields["msg-param-sender-count"]));
  Object.keys(goalInfo).length && (data.goalInfo = goalInfo);
  fields["msg-param-fun-string"] && (data.funString = fields["msg-param-fun-string"]);
  return data;
};

// src/modules/usernotice/parseGift.ts
var parseGift = (fields) => {
  const msgId = fields["msg-id"];
  if (msgId === "submysterygift") {
    return parseMysteryGift(fields);
  }
  if (msgId === "standardpayforward") {
    return parseStandardPayforward(fields);
  }
  if (msgId === "communitypayforward") {
    return parseCommunityPayforward(fields);
  }
  if (msgId === "primepaidupgrade") {
    return parsePrimePaidUpgrade(fields);
  }
  if (msgId === "giftpaidupgrade") {
    return parseGiftPaidUpgrade(fields);
  }
  if (msgId === "subgift") {
    return parseSubGift(fields);
  }
  if (!fields["msg-param-sub-plan"]) {
    return {};
  }
  return {};
};

// src/modules/usernotice/parseRaid.ts
var parseRaid = (fields) => {
  if (!fields["msg-param-profileImageURL"]) {
    return {};
  }
  const profileImageURL = fields["msg-param-profileImageURL"].replaceAll("%s", "150x150");
  return {
    displayName: fields["msg-param-displayName"],
    profileImageURL,
    username: fields["msg-param-login"],
    viewerCount: Number(fields["msg-param-viewerCount"])
  };
};

// src/modules/usernotice/parseAnnouncement.ts
var parseAnnouncement = (fields) => {
  if (fields["msg-id"] !== "announcement") {
    return {};
  }
  const color = fields["msg-param-color"];
  return {
    color,
    roomId: Number(fields["room-id"]),
    systemMsg: fields["system-msg"]
  };
};

// src/modules/usernotice/parseViewerMilestone.ts
var parseViewerMilestone = (fields) => {
  const category = fields["msg-param-category"];
  const copoReward = fields["msg-param-copoReward"];
  const value = fields["msg-param-value"];
  const systemMsg = cleanMessage(fields["system-msg"]);
  return {
    category,
    copoReward: Number(copoReward),
    value: Number(value),
    systemMsg
  };
};

// src/modules/usernotice/parseUserNotice.ts
var parseUserNotice = ({ eventMessage }) => {
  const [rawFields, host, rawType, channel, ...rawMessage] = eventMessage.substring(1).split(" ");
  const fields = parseEquals(rawFields);
  const message = rawMessage.join(" ").substring(1);
  const username = fields.login;
  const userInfo = parseUser({ username, ...fields });
  const messageInfo = parseMessage({ username, channel, rawMessage: message, ...fields });
  const subInfo = parseSub(fields);
  const raidInfo = parseRaid(fields);
  const giftInfo = parseGift(fields);
  const milestoneInfo = parseViewerMilestone(fields);
  const announcementInfo = parseAnnouncement(fields);
  const data = {
    type: fields["msg-id"],
    channel,
    userInfo,
    messageInfo,
    message,
    raw: eventMessage
  };
  Object.keys(subInfo).length && (data.subInfo = subInfo);
  Object.keys(giftInfo).length && (data.giftInfo = giftInfo);
  Object.keys(raidInfo).length && (data.raidInfo = raidInfo);
  Object.keys(announcementInfo).length && (data.announcementInfo = announcementInfo);
  milestoneInfo?.category && (data.milestoneInfo = milestoneInfo);
  return data;
};

// src/modules/parseRawMessage.ts
var parseRawMessage = ({ eventMessage, timeStamp }) => {
  const [host, id, user] = eventMessage.split(" ", 3);
  const message = eventMessage.split(" ").slice(3).join(" ").substring(1);
  console.log("RAW: ", eventMessage);
  return {
    type: "raw",
    raw: eventMessage
  };
};

// src/modules/notice/parseNotice.ts
var parseNotice = ({ eventMessage }) => {
  const [rawFields, host, rawType, channel, ...rawMessage] = eventMessage.substring(1).split(" ");
  const fields = parseEquals(rawFields);
  const message = rawMessage.join(" ").substring(1);
  const type = fields["msg-id"] ?? "notice";
  return {
    type,
    channel,
    message
  };
};

// src/modules/roomstate/parseRoomState.ts
var parseRoomState = ({ eventMessage }) => {
  const [options, host, type, channel] = eventMessage.substring(1).split(" ");
  const fields = parseEquals(options);
  return {
    emoteOnly: fields["emote-only"] === "1",
    followersOnly: Number(fields["followers-only"] ?? -1),
    r9k: fields.r9k === "1",
    roomId: Number(fields["room-id"]),
    slow: Number(fields.slow ?? -1),
    subsOnly: fields["subs-only"] === "1",
    type: type.toLowerCase(),
    channel
  };
};

// src/debugId.ts
var IGNORETYPES = [
  "PRIVMSG",
  "ROOMSTATE"
];
var IGNORELIST = [
  "resub",
  "sub",
  "subgift",
  "viewermilestone",
  "raid",
  "announcement",
  "submysterygift",
  "slow_off"
];
var debugId = (raw) => {
  const [rawFields, rawHost, rawType, rawChannel] = raw.split(" ");
  const fields = raw.substring(1).split(";");
  const id = fields.find((field) => field.startsWith("msg-id"));
  if (id) {
    const [, value] = id.split("=");
    if (IGNORETYPES.includes(rawType)) {
      return;
    }
    if (IGNORELIST.includes(value)) {
      return;
    }
    console.log("=>", rawType, value, rawFields, rawChannel);
  }
};

// src/mtmi.ts
var isHttp = location.protocol === "http:";
var WEBSOCKET_URL = isHttp ? "ws://irc-ws.chat.twitch.tv:80" : "wss://irc-ws.chat.twitch.tv:443";
var USERNAME = "justinfan123";
var DEBUG = true;
var Client = class {
  channels = [];
  client;
  startTime;
  events = [];
  done = false;
  options;
  connect(options) {
    this.options = options;
    this.client = new WebSocket(WEBSOCKET_URL);
    this.startTime = (/* @__PURE__ */ new Date()).getTime();
    this.channels.push(...options.channels);
    this.client.addEventListener("open", (event) => this.open(event));
    this.client.addEventListener("message", (event) => this.message(event));
    this.client.addEventListener("close", (event) => this.close(event));
  }
  open(event) {
    DEBUG && console.log(`Conectado a Twitch: ${event.target.url}`);
    this.client?.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
    this.client?.send(`NICK ${USERNAME}`);
    this.channels.forEach((channel) => this.client?.send(`JOIN #${channel}`));
  }
  on(type, action) {
    const object = { type, action };
    this.events.push(object);
  }
  message(event) {
    const data = chop(event.data);
    if (data === "PING :tmi.twitch.tv") {
      this.pong();
      return;
    }
    const eventMessages = data.split("\r\n");
    eventMessages.forEach((eventMessage) => {
      const type = eventMessage.split("tmi.twitch.tv ").at(1).split(" ").at(0);
      debugId(eventMessage);
      switch (type) {
        case "PRIVMSG":
          this.#manageEvent(parseUserMessage({ eventMessage: data }));
          break;
        case "JOIN":
          this.#manageEvent(parseJoinPart({ eventMessage }));
          break;
        case "PART":
          this.#manageEvent(parseJoinPart({ eventMessage }));
          break;
        case "CLEARCHAT":
          this.#manageEvent(parseClearChat({ eventMessage }));
          break;
        case "CLEARMSG":
          this.#manageEvent(parseClearMsg({ eventMessage }));
          break;
        case "ROOMSTATE":
          this.#manageEvent(parseRoomState({ eventMessage }));
          break;
        case "NOTICE":
          this.#manageEvent(parseNotice({ eventMessage }));
          break;
        case "USERNOTICE":
          this.#manageEvent(parseUserNotice({ eventMessage }));
          break;
        case "CAP":
        case "001":
        case "002":
        case "003":
        case "004":
        case "372":
        case "375":
        case "376":
        case "353":
        case "366":
        case "421":
          break;
        default:
          !this.done && console.log(eventMessage);
          this.#manageEvent(parseRawMessage({ eventMessage }));
          break;
      }
    });
  }
  #manageEvent(eventData) {
    const eventType = eventData.type;
    if (["join", "part"].includes(eventType) && eventData.username && eventData.username.startsWith("justinfan")) {
      return;
    }
    this.done = true;
    this.events.filter(({ type }) => type === eventType).forEach(({ action }) => action(eventData));
  }
  pong() {
    this.client?.send("PONG :tmi.twitch.tv");
    DEBUG && console.log("PONG :tmi.twitch.tv");
  }
  close(event) {
    const { type, reason, code } = event;
    DEBUG && console.log(`${type}: REASON ${reason} ${code}`);
    if (code === 1006) {
      console.log("Reconnectando en 5 segundos...");
      setTimeout(() => this.options && this.connect(this.options), 5e3);
    }
  }
};
var client = new Client();
export {
  client
};
