import { Client } from "discord.js";

export default function readyListeneroid(e: Client<true>) {
  console.log(`✅ Bot connected as ${e.user.tag}`);
  e.user.presence.set({ status: "idle", activities: [{ name: "Waiting..." }] });
}
