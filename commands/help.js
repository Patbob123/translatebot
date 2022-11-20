const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('bot syntax')
    ,
    async execute(interaction) {
        let x = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle("Commands: /help -  List of Commands!")
            .addFields(
                { name: '/language', value: 'configure language'},
                { name: '/toggle', value: 'Toggle translator to translate USER or CHANNEL', inline:true},
                { name: '/status', value: 'Displays current toggle status', inline:true},
                { name: '/rhyme', value: 'Find rhyming words', inline: true},
                { name: '/synonym', value: 'Find synonyms', inline:true},
                { name: '/define', value: 'Define a word', inline:true},
                { name: '/pronounce', value: 'How to pronounce a word', inline:true},
                { name: '/madlib', value: 'Start a madlib, !stop to stop', inline:true},
                { name: '/paraphrase', value: 'Rewrites a sentence', inline:true},
                { name: '/kanji', value: 'Descriptions for a kanji character'},
            )
            .setTimestamp()
        await interaction.reply({ embeds: [x] });
    },
};