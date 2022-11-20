const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'https://rhymebrain.com/talk?function=getRhymes&word=';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rhyme')
        .setDescription('get word that rhyme with another word!')
        .addStringOption((word) =>
            word.setName('word')
                .setDescription('Returns a rhyme for a given word!')
                .setRequired(true)
        ),
    async execute(interaction) {
        let word = interaction.options.getString('word')
        let status = ''
        let rhymesList = await fetch(API + word, {
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
        let rhymes = []
        for (let i = 0; i < Math.min(rhymesList.length,8); i++) {
            rhymes.push(rhymesList[i].word.charAt(0).toUpperCase() + rhymesList[i].word.slice(1))
        }
        console.log(rhymes)
        let x = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle("Rhymes For " + (word.charAt(0).toUpperCase() + word.slice(1)))
            .addFields(
                { name: '‣ ' + rhymes.join(' ‣ '), value: '​​​' }
            )
            .setTimestamp()
        await interaction.reply({ embeds: [x] });
    },
};