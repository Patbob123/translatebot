const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'https://paraphraser1.p.rapidapi.com/';
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('paraphrase')
        .setDescription('paraphrase a sentence!')
        .addStringOption((word) =>
            word.setName('sentence')
                .setDescription('enter a setence or multiple sentences!')
                .setRequired(true)
        ),
    async execute(interaction) {
        let sentence = interaction.options.getString('sentence')
        console.log('{"input": "'+sentence+'"}')
        let status = ''
        let paraphrasedSentences = await fetch(API, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPIDAPIKEY,
                'X-RapidAPI-Host': 'paraphraser1.p.rapidapi.com'
            },
            body: '{"input": "'+sentence+'"}'
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(res => {
            if (status >= 400 && status <= 600) {
                console.log("Error: ", res);
            } else {
                console.log(res);
                return res
            }
        }).catch(err => {
            console.log(err)
        });

        let x = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle("Don't like your sentence? Try this:")
            .addFields(
                { name: 'Input', value: paraphrasedSentences.input},
                { name: 'Language', value: paraphrasedSentences.language},
                
            )
            .setDescription(paraphrasedSentences.output)
            .setTimestamp()
        await interaction.reply({ embeds: [x] });
    },
};