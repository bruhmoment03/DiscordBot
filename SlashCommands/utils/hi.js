module.exports = {
    name: "hi",
    description: "hello world",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, interaction, args) => {
        interaction.followUp({ content: "hello world!" });
    },
};