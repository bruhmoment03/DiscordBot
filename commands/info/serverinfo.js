const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "info",
    aliases: ['infos'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        const infoembed = new MessageEmbed()
        .setColor("#ca49c6")
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .addFields(
            { name: "Server Name :", value: `${message.guild.name}`},
            { name: "Total Members :", value: `${message.guild.memberCount}.`},
            { name: "Sercurity Level :", value: `${message.guild.verificationLevel}`},
            { name: "Created On :", value: `${message.guild.createdAt.toDateString()}`}
          )
          message.channel.send({embeds: [infoembed]}).catch(console.error());
    }
};
