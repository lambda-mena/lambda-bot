import { Message } from "discord.js";
import { Command } from "../lib/interfaces";
import { getResponseStream } from "../lib/gemini";

const promptCommand: Command = {
  description: "Ask a question to the generative AI.",
  onExecution: async function (e: Message<true>, args: string) {
    let fullResponse = "";
    const interaction = await e.reply({ content: "Inferring..." });
    try {
      const responseStream = await getResponseStream(args);
      for await (const textChunk of responseStream) {
        await interaction.edit({ content: fullResponse + textChunk.text() });
        fullResponse += textChunk.text();
      }
    } catch (ex) {
      console.log(ex);
      interaction.edit("Error at inferring...");
    }
  },
};

export { promptCommand as default };
