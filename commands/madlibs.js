const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'http://madlibz.herokuapp.com/api/random';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('madlib')
        .setDescription('random madlib!')
    ,
    async execute(interaction) {
        let status = ''
        let getmadlib = (fetch(API, {
            method: 'GET',
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(res => {
            if (status >= 400 && status <= 600) {
            } else {
                return res
            }
        }).catch(err => {
        })).then(res => console.log(res))

        getmadlib.then(res => {
            let madlib = res
            let x = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Madlib ${madlib.title} started`)
            await interaction.reply({ embeds: [x] });
        })


    },
};

