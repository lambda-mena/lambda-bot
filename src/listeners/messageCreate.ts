import { Command } from "../lib/interfaces";
import { Message } from "discord.js";
import { PREFIX } from "../config";
import path from "path";
import fs from "fs";

let availableCommands = new Map<string, Command>();

function registerCommands(files: string[]) {
  files.forEach((v) => {
    const commandObject: Command = require(path.join(
      __dirname,
      "..",
      "commands",
      v
    )).default;
    const commandName = v.split(".");
    availableCommands.set(commandName[0], commandObject);
  });
}

function readCommandFiles() {
  fs.readdir(path.join(__dirname, "..", "commands"), (err, v) => {
    if (!err) {
      console.log(`📝 ${v.length} Commands loaded.`);
      registerCommands(v);
    } else {
      console.error(`❌ Error at loading commands.`);
    }
  });
}

readCommandFiles();

export default function messageCreateListener(e: Message<true>) {
  if (e.content.startsWith(PREFIX)) {
    const splittedContent = e.content.split(" ");
    const commandName = splittedContent[0].split(PREFIX)[1];
    if (availableCommands.has(commandName)) {
      const command = availableCommands.get(commandName)!;
      const commandArgs = splittedContent.slice(1).reduce((prev, current) => prev+current);
      try {
        command.onExecution(e, commandArgs);
      } catch (ex) {
        e.channel.send("❌ Bot internal error");
      }
    } else {
      e.reply({ content: "Unrecognized command." });
    }
  }
}
