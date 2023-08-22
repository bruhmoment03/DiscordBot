const rrModel = require('../../models/reactionRoles')
const { Client, CommandInteraction, Interaction } = require('discord.js')

module.exports = {
    name: 'remove-role',
    description: 'remove-role',
    userDescriptions: ['MANAGE_ROLES'],
    options: [
        {
            name: 'role',
            description: 'role to be removed',
            type: 'ROLE',
            required: true
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
        run: async(client, interaction) => {
            const role = interaction.options.getRole("role");
            
            const guildData = await rrModel.findOne({ guildId: interaction.guildId })
            if(!guildData) return interaction.followUp(
                'Theres no role in this server.'
                );

            const guildRoles = guildData.roles;

            const findRole = guildRoles.find(x => x.roleId === role.id);
            if(!findRole) return interaction.followUp(
                "that role isnt added to the reaction list"
                );

            const filteredRoles = guildRoles.filter(x => x.roleId !== role.id)
            guildData.roles = filteredRoles;

            await guildData.save()

            interaction.followUp(`removed: ${role.name}`);
    }
};