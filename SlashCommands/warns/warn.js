const { Client, CommandInteraction } = require('discord.js')
const warnModel = require('../../models/warnModel');

module.exports = {
    name: 'warn',
    description: 'warn a user',
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "target",
            description: 'user u wanna warn',
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason for this warning",
            type: "STRING",
            required: true,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        new warnModel({
            userId: user.id,
            guildId: interaction.guildId,
            moderatorId: interaction.user.id,
            reason,
            timestamp: Date.now(),
        }).save();

        user.send(
            `You have been warned in ${interaction.guild.name} for reason ${reason}`,
        ).catch(console.log);

        interaction.followUp({
             content: `${user} has been warned for reason: ${reason}`,
        });
    },
};