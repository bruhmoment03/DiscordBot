const { Message } = require("discord.js");
const client = require("../index");

client.on("ready", () => {
    setInterval(function () {
        const guild = client.guilds.cache.get("your guilds id");
        const MembercountChannel = client.channels.cache.get("your channels id");

        MembercountChannel.setName(`Members: ${guild.memberCount}`);
        return console.log("woohoo!")
    }, 5000);
});
