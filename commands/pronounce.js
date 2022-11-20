const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'https://rhymebrain.com/talk?function=getWordInfo&word=';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('pronounce')
        .setDescription('how to pronounce a word!')
        .addStringOption((word) =>
            word.setName('word')
                .setDescription('word to pronounce!')
                .setRequired(true)
        ),
    async execute(interaction) {
        let word = interaction.options.getString('word')
        let status = ''
        let wordinfo = await fetch(API + word, {
            method: 'GET',
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
            .setTitle("Rhymes For " + (word.charAt(0).toUpperCase() + word.slice(1)))
            .addFields(
                { name: wordinfo.pron, value: '​​​' }
            )
            .setTimestamp()
        await interaction.reply({ embeds: [x] });
    },
};