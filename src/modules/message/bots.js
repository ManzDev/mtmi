const BOTLIST = [
  { name: "streamelements", type: "bot" },
  { name: "nightbot", type: "bot" }
];

export default {
  add: (name) => BOTLIST.push({ name, type: "bot" }),
  getAll: () => BOTLIST.map(bot => bot.name)
};
