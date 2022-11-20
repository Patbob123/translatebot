const { SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'http://madlibz.herokuapp.com/api/random';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('madlib')
        .setDescription('random madlib!')
        ,
    async execute(interaction) {
 

    },
};

let madlib = (text, inputlang, outputlang) => {
    
    let status = ''
    return fetch(API, {
        method: 'POST',
        headers: {
            'Authorization': 'DeepL-Auth-Key ' + apiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(params)
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

module.exports = { translateTxt };