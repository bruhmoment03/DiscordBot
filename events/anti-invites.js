const client = require("../index");

client.on("messageCreate", async (message) => {
    if(!message.guild) return;
    if(message.member.permissions.has("MANAGE_MESSAGES")) return;

    function delmsg() {
        message.delete();
        message.channel.send("no advertistments!");
    }

    const links = ['discord.gg/', 'discord.com/invite/'];

    for (const link of links) {
        if(!message.content.includes(link)) return;

        const code = message.content.split(link)[1].split(" ")[0];
        const isGuildInvite = message.guild.invites.cache.has(code);

        if(!isGuildInvite) {
            try {
                const vanity = await message.guild.fetchVanityData();
                if(code !== vanity?.code) return delmsg();
            } catch(err) {
                delmsg();
            }
        }
    }
});