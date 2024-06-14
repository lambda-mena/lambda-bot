import { Message } from "discord.js";

export interface Command {
  description: string;
  onExecution(e: Message<true>, args: string): Promise<void>;
}
