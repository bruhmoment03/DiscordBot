const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const moment = require('moment');
const fetch = require('node-fetch')

module.exports = {
    name: 'covid',
    description: 'country u wanna know',
    options:[
        {
            name: 'country',
            type: 'STRING',
            description: 'country cases',
            required: false
        },
    ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   * @param {String[]} args
   */
    run: async (message, interaction, args) => {
        let link;
        const guild = interaction.guild;
        let embed = new MessageEmbed()
        if (!args[0] || args[0].match(/all|global|globe|world/gi)) {
            let jsonData = await fetch("https://disease.sh/v3/covid-19/all")
            jsonData = await jsonData.json()

            embed
            .setTitle("Global Covid Cases")
            .setColor("YELLOW")
            .setThumbnail(`https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png`)
            .addField("**Total Cases: **", jsonData.cases.toLocaleString(), true)
            .addField("**Total Deaths: **", jsonData.deaths.toLocaleString(), true)
            .addField("**Total Recovered: **", jsonData.recovered.toLocaleString(), true)
            .addField("**Today's Cases: **", jsonData.todayCases.toLocaleString(), true)
            .addField("**Today's Deaths: **", jsonData.todayDeaths.toLocaleString(), true)
            .addField("**Affected Countries: **", jsonData.affectedCountries.toLocaleString(), true)
        } else {
            let jsonData = await fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
            jsonData = await jsonData.json()
            if (!jsonData.country) return interaction.followUp({ content: "I am unable to get the details for **" + args[0] + "**."})

                 embed
                 .setTitle(`${jsonData.country} Covid Cases`)
                 .setColor("RANDOM")
                 .setThumbnail(`https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png`)
                 .addField("**Total Cases: **", jsonData.cases.toLocaleString(), true)
                 .addField("**Total Deaths: **", jsonData.deaths.toLocaleString(), true)
                 .addField("**Total Recovered: **", jsonData.recovered.toLocaleString(), true)
                 .addField("**Today's Cases: **", jsonData.todayCases.toLocaleString(), true)
                 .addField("**Today's Deaths: **", jsonData.todayDeaths.toLocaleString(), true)
                 .addField("**Country Population: **", jsonData.population.toLocaleString(), true)
        }
        return interaction.followUp({ embeds: [embed] }).catch(err => {
            console.log(err)
        })
  },
};