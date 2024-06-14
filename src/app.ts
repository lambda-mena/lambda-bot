import { Client, Events, GatewayIntentBits } from "discord.js";
import { registerListeners } from "./listeners";
import { TOKEN } from "./config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

/*
client.once(Events.ClientReady, readyEvent => {
  console.log(`Bot logged in as ${readyEvent.user.tag}`);
});
*/

registerListeners(client);

client.login(TOKEN);
