import { Client } from "discord.js";
import fs from "fs/promises";
import path from "path";
import { Listener } from "../lib/types";

async function getLocalListeners(): Promise<string[]> {
  try {
    const files = await fs.readdir(__dirname);
    return files.filter((v) => !v.includes("index"));
  } catch (ex) {
    return [];
  }
}

export async function registerListeners(client: Client) {
  const listenerFiles = await getLocalListeners();
  if (listenerFiles.length <= 0) console.log("😥 No listeners to add.");

  console.log(`🤖 ${listenerFiles.length} Listeners loaded.`);

  listenerFiles.forEach((v) => {
    const eventListener: Listener = require(path.join(__dirname, v)).default;
    const eventStringList = v.split(".");
    client.on(eventStringList[0], eventListener);
  });
}
