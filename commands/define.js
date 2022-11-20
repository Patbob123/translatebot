const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=';
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('define a word!')
        .addStringOption((word) =>
            word.setName('word')
                .setDescription('word to define!')
                .setRequired(true)
        ),
    async execute(interaction) {
        let word = interaction.options.getString('word')
        let status = ''
        let definitionList = await fetch(API + word, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPIKEY,
              'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
            }
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(res => {
            if (status >= 400 && status <= 600) {
                console.log("Error: ", res);
            } else {
                // console.log(res);
                return res
            }
        }).catch(err => {
            console.log(err)
        });
        if(definitionList.list.length == 0) await interaction.reply("No definitions for " + (word.charAt(0).toUpperCase() + word.slice(1)));
        console.log(definitionList.list[0].definition)
        let x = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle("Rhymes For " + (word.charAt(0).toUpperCase() + word.slice(1)))
            .addFields(
                { name: definitionList.list[0].definition, value: '​​​' }
            )
            .setTimestamp()
        await interaction.reply({ embeds: [x] });
    },
};