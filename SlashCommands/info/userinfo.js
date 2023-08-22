const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'userinfo',
    description: 'user informations',
    options: [
        {
            name: 'target',
            description: 'the mentioned user',
            type: 'USER',
            required: true
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) =>{
        const target = interaction.options.getMember('target');
        const userEmbed = new MessageEmbed()
        .setTitle(`User Information`)
        .setColor('RANDOM')
        .setThumbnail(target.user.displayAvatarURL({dynamic : true}))
        .addField(`**Is a bot :**`,`${target.user.bot}`,true)
        .addField(`** User ID :**`,`${target.user.id}`,true)
        .addField(`** Tag :**`,`${target.user.tag}`,true)
        .addField(`** Nickname :**`,`${target.nickname || "Doesn't have one"}`,true)
        .addField(`** Joined Date :**`,`${target.user.createdAt}`,true)
        .setFooter(`Requested by ${interaction.user.tag}`,`${interaction.user.displayAvatarURL({dynamic : false})}`)
        .setTimestamp()

        interaction.followUp({ embeds: [userEmbed]}).catch(console.error);
    },
};