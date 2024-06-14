import { Base } from "discord.js";

export type Listener = {
  (event: Base): void | Promise<void>; 
}