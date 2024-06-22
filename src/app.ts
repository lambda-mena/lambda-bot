import { Client, GatewayIntentBits } from "discord.js";
import { registerListeners } from "./listeners";
import { TOKEN } from "./config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

registerListeners(client);

client.login(TOKEN);
