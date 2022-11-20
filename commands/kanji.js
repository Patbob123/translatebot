const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'https://kanjialive-api.p.rapidapi.com/api/public/kanji/';
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanji')
        .setDescription('display info for a kanji character!')
        .addStringOption((word) =>
            word.setName('word')
                .setDescription('kanji character!')
                .setRequired(true)
        ),
    async execute(interaction) {
        let word = interaction.options.getString('word')
        let status = ''
        let kanjiinfo = await fetch(API + word, {
            method: 'GET'
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
        if(kanjiinfo.hasOwnProperty('Error')) await interaction.reply('Unknown Word');
        console.log(definitionList.list[0].definition)
        let x = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle(word)
            .addFields(
                { name: 'English Meaning:', value: kanjiinfo.kanji.meaning.english},
                { name: 'Strokes:', value: kanjiinfo.kanji.strokes},
                { name: '\u200B', value: '\u200B' },
                { name: 'Example:', value: kanjiinfo.examples[0].japanese},
                { name: 'English Meaning:', value: kanjiinfo.examples[0].meaning},
            )
            .setTimestamp()
        await interaction.reply({ embeds: [x] });
    },
};