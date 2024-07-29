// import { client } from "../src/mtmi.ts";
import { client } from "../dist/mtmi.js";

const channels = ["padawanstrainer", "chrisvdev"];

client.connect({ channels });

client.on("join", (data) => console.log("JOIN: ", data));
client.on("part", (data) => console.log("PART: ", data));

client.on("sub", (data) => console.log("SUB: ", data));
client.on("resub", (data) => console.log("RESUB: ", data));

client.on("subgift", (data) => console.log("SUBGIFT: ", data));
client.on("submysterygift", (data) => console.log("SUBMYSTERYGIFT: ", data));

client.on("communitypayforward", (data) => console.log("COMMUNITYPAYFORWARD: ", data));
client.on("standardpayforward", (data) => console.log("STANDARDPAYFORWARD: ", data));

client.on("giftpaidupgrade", (data) => console.log("GIFTPAIDUPGRADE: ", data));
client.on("primepaidupgrade", (data) => console.log("PRIMEPAIDUPGRADE: ", data));

client.on("clearchat", (data) => console.log("CLEARCHAT: ", data));
client.on("ban", (data) => console.log("BAN: ", data));
client.on("timeout", (data) => console.log("TIMEOUT: ", data));
client.on("clearmsg", (data) => console.log("DELETE MESSAGE: ", data));

client.on("raid", (data) => console.log("RAID: ", data));

client.on("unraid", (data) => console.log("UNRAID: ", data));

client.on("viewermilestone", (data) => console.log("VIEWERMILESTONE: ", data));

client.on("roomstate", (data) => console.log("ROOMSTATE: ", data));

client.on("announcement", (data) => console.log("ANNOUNCEMENT: ", data));

client.on("bits", (data) => console.log("BITS: ", data));

client.on("message", (data) => console.log("MESSAGE: ", data));

client.on("action", (data) => console.log("MESSAGE ACTION: ", data));

// MODES
client.on("emote_only_off", (data) => console.log("MODE: ", data));
client.on("emote_only_on", (data) => console.log("MODE: ", data));

client.on("followers_on", (data) => console.log("MODE: ", data));
client.on("followers_off", (data) => console.log("MODE: ", data));

client.on("slow_on", (data) => console.log("MODE: ", data));
client.on("slow_off", (data) => console.log("MODE: ", data));

client.on("subs_on", (data) => console.log("MODE: ", data));
client.on("subs_off", (data) => console.log("MODE: ", data));

client.on("r9k_on", (data) => console.log("MODE: ", data));
client.on("r9k_off", (data) => console.log("MODE: ", data));

client.on("raw", (data) => console.log("RAW: ", data));

// POR TESTEAR
client.on("bitsbadgetier", (data) => console.log("BITSBADGETIER: ", data));
client.on("rewardgift", (data) => console.log("REWARDGIFT: ", data));
client.on("charity", (data) => console.log("CHARITY: ", data));
client.on("anonsubgift", (data) => console.log("ANONSUBGIFT: ", data));
client.on("anongiftpaidupgrade", (data) => console.log("ANONGIFTPAIDUPGRADE: ", data));
client.on("extendsub", (data) => console.log("EXTENDSUB: ", data));
client.on("ritual", (data) => console.log("RITUAL: ", data));
