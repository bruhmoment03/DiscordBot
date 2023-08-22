const { Message, MessageEmbed, Client, CommandInteraction } = require("discord.js");
const moment = require('moment')

module.exports = {
    name: "serverinfo",
    description: "returns info",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const guild = interaction.guild;
        const infoembed = new MessageEmbed()
        .setColor("#ca49c6")
        .setTitle(interaction.guild.name)
        .setThumbnail(interaction.guild.iconURL({dynamic : true}))
        .addField('General Info', [
            `**Server ID: **${guild.id}`,
            `**Server Name :** ${guild.name}`,
            `**Verified :** ${interaction.guild.verified}`,
        ].join("\n").toString())

        .addFields(
            { name: "Members :", value: `${guild.memberCount}`, inline: true},
            { name: "Voice Channels :", value: `${guild.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size}`, inline: true},
            { name: "Text Channels :", value: `${guild.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size}`, inline: true},
            { name: "Emojis :", value: `${guild.emojis.cache.size}`, inline: true},
            { name: "Roles :", value: `${guild.roles.cache.size}`, inline: true}
        )

        .addField("Additional Information", [
            `**Created at :** ${moment(guild.createdTimestamp).format('LL')} ${moment(guild.createdTimestamp).fromNow()}`
        ].join("\n").toString())

          interaction.followUp({ embeds: [infoembed]}).catch(console.error);
    },
};
