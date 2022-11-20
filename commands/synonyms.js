const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'https://words.bighugelabs.com/api/2/' + '7e6c456cd4c60603c72f98e6747d3f5c';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('synonym')
        .setDescription('get synonym for word!')
        .addStringOption((word) =>
            word.setName('word')
                .setDescription('Returns a synonym for a given word!')
                .setRequired(true)
        ),
    async execute(interaction) {
        let word = interaction.options.getString('word')
        let status = ''
        let synonym = await fetch(API+'/'+word+'/json', {
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
        let synonyms = []
        for(let i in synonym) {
            let words = synonym[i].syn
            console.log("11111" ,words)
            for(let j = 0; j < Math.min(words.length,3); j++) {
                console.log("22222",words[j])
                synonyms.push(words[j].charAt(0).toUpperCase() + words[j].slice(1))
            }
        }
        console.log(synonyms)
        let x = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Synonym For " + (word.charAt(0).toUpperCase() + word.slice(1)))
            .addFields(
                { name: '‣ ' + synonyms.join(' ‣ '), value: '​​​' }
            )
            .setTimestamp()
        await interaction.reply({ embeds: [x] });
    },
};