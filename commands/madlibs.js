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
        let madlib = fetch(API, {
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
            .setColor(0x0099FF)
            .setTitle(`Madlib ${madlib.title} Started`)
        interaction.reply({ embeds: [x] });

    },
};

