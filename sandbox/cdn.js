    import { client } from "https://unpkg.com/mtmi?module";
    const { badges } = import("https://unpkg.com/mtmi/dist/badges.full.json", { with: { type: "json" } });

    client.connect({
      channels: ["manzdev"],
      badges,
      debug: true,
    });

    client.on("message", async ({ username, channel, message }) => {
      console.log(username, channel, message);
    });
