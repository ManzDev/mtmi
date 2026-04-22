import { client } from "../dist/index.js";
import { styleText } from "node:util";

client.connect({ channels: ["manzdev"] });

const ansiColors = {
  black: [225, 225, 225], /* Force to white */
  red: [187, 0, 0],
  green: [0, 187, 0],
  yellow: [187, 187, 0],
  blue: [0, 0, 187],
  magenta: [187, 0, 187],
  cyan: [0, 187, 187],
  white: [255, 255, 255],
  blackBright: [85, 85, 85],
  redBright: [255, 85, 85],
  greenBright: [85, 255, 85],
  yellowBright: [255, 255, 85],
  blueBright: [85, 85, 255],
  magentaBright: [255, 85, 255],
  cyanBright: [85, 255, 255],
  whiteBright: [255, 255, 255]
};

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  const bigint = parseInt(hex, 16);
  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255
  ];
};

const getClosestStyleColor = (hex) => {
  const rgb = hexToRgb(hex);
  let minDistance = Infinity;
  let closest = null;

  for (const [name, color] of Object.entries(ansiColors)) {
    const dist = Math.sqrt(
      (rgb[0] - color[0]) ** 2 +
      (rgb[1] - color[1]) ** 2 +
      (rgb[2] - color[2]) ** 2
    );
    if (dist < minDistance) {
      minDistance = dist;
      closest = name;
    }
  }

  return closest;
};

client.on("message", (data) => {
  const nick = styleText(getClosestStyleColor(data.userInfo.color), `@${data.username}`);
  console.log(`${nick} ${data.messageInfo.message}`);
});

const joinOrPart = (data) => {
  const colors = data.type === "join" ? "bgGreen" : "bgRed";
  const event = styleText(colors, ` ${data.type.toUpperCase()} `);
  console.log(`${event} ${data.username}`);
};

client.on("join", (data) => joinOrPart(data));
client.on("part", (data) => joinOrPart(data));

client.on("sub", (data) => {
  console.log(`*** SUB: ${data.userInfo.username} ${data.cumulativeMonths} ${data.months}`);
});

client.on("raid", (data) => {
  console.log(`*** RAID: ${data.username} ${data.viewerCount}`);
});
