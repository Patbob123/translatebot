const { SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'http://madlibz.herokuapp.com/api/random';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('madlib')
        .setDescription('random madlib!')
        ,
    async execute(interaction) {
        
        let madlib = (text, inputlang, outputlang) => {
    
            let status = ''
            return fetch(API, {
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
        }
        
    },
};

