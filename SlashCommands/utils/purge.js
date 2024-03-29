const { Client, CommandInteraction } = require("discord.js");
const ms = require("ms")
module.exports = {
    name: 'purge',
    description: 'remove messages',
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: 'amount',
            description: 'amount of messages that have to be deleted',
            type: "INTEGER",
            required: true,
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        const amount = interaction.options.getInteger("amount");

        if (amount > 100)
        return interaction.followUp({
            content: 
            "the maximum amount u can delete is 100",
        });

        const messages = await interaction.channel.messages.fetch({
            limit: amount + 1,
        });

        const filtered = messages.filter(
            (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
        );

        await interaction.channel.bulkDelete(filtered);

        interaction.channel.send({
            content: `Deleted ${filtered.size - 1} messages!`,
        }).then((msg) =>{
            setTimeout(() => msg.delete(), ms('5 seconds'))
        })
    },
};