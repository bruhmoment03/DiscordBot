const warnModel = require('../../models/warnModel');
const moment = require('moment');
const { MessageEmbed, Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'warnings',
    description: ' display all warnings',
    options: [
        {
            name: 'target',
            description: 'user you wanna view warnings',
            type: 'USER',
            required: true
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
     run: async(client, interaction) => {
        const user = interaction.options.getUser("target");

        const userWarnings = await warnModel.find({
            userid: user.id,
            guildId: interaction.guildId,
        });

        if (!userWarnings?.length)
            return interaction.followUp({
                content: `${user} has no warnings in the server.`
            });

        const embedDescription = userWarnings.map((warn) => {
            const moderator = interaction.guild.members.cache.get(
                warn.moderatorId
            );

                return [
                    `warnId: ${warn._id}`,
                    `Moderator: ${moderator || 'This person is gone.'}`,
                    `Date: ${moment(warn.timestamp).format('MMMM Do YYYY')}`,
                    `Reason: ${warn.reason}`,
                ].join("\n");
        })
        .join("\n\n");

        const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s Warnings'`)
            .setDescription(embedDescription)
            .setColor("RANDOM");

            interaction.followUp({ embeds: [embed]});
    },
};