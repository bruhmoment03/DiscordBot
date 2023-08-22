const { Message, Client } = require("discord.js");

module.exports = {
    name: "latency",
    aliases: ['latency'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.reply(`Ping: **${client.ws.ping}ms**`);
    },
};
