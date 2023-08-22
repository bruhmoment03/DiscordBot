const rrModel = require('../../models/reactionRoles')
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    name: 'panel',
    description: 'reaction role panel',
    userDescriptions: ['MANAGE_ROLES'],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
        run: async(client, interaction) => {
            
            const guildData = await rrModel.findOne({ 
                guildId: interaction.guildId 
            });
            if(!guildData?.roles) return interaction.followUp(
                'Theres no role in this server.'
                );

            const options = guildData.roles.map(x => {
                const role = interaction.guild.roles.cache.get(x.roleId);

                return {
                    label: role.name,
                    value: role.id,
                    description: x.roleDescription || "No Description Provided.",
                    emoji: x.roleEmoji
                };
            });

            const panelEmbed = new MessageEmbed()
                .setTitle('Please select a role below')
                .setColor("RANDOM");

            const components = [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId("reaction-roles")
                        .setMaxValues(1)
                        .addOptions(options)
                )
            ];
            interaction.followUp("sent")
            interaction.followUp({ embeds : [panelEmbed], components });
    }
};