import { Intents } from "discord.js";
import "dotenv/config";

import { Bot } from "./structures/Bot";

export const bot = new Bot({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});



bot.on('ready', () => {
    console.log(`${bot.user.tag} is now watching online!`)
    bot.user.setActivity('Moderno', ({type: "WATCHING"}))
})




require('dotenv').config()

bot.start();
