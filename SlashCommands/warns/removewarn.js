const { CommandInteraction } = require('discord.js');
const warnModel = require('../../models/warnModel');

module.exports = {
    name: 'remove-warn',
    description: 'remove a warn from an id',
    userPermissions: ['MANAGE_MESSAGES'],
    options: [
        {
            name: "warnid",
            description: 'warnId that u wanna delete',
            type: 'STRING',
            required: true,
        },
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        const warnId = interaction.options.getString('warnid');

        const data = await warnModel.findById(warnId);

        if(!data) 
        return interaction.followUp({
            content: `${warnId} isnt a valid id!`,
        });

        data.delete();

        const user = interaction.guild.members.cache.get(data.userId);
        return interaction.followUp({ content: `Removed 1 of ${user}'s warnings'`});
    },
}