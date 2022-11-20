const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('cross-fetch');
const API = 'http://madlibz.herokuapp.com/api/random';

const filter = m => m;

async function questionAndAnswers(interaction, madlib, index, answers) {
    if (index >= madlib.blanks.length) {
        let storytext = madlib.value[0]
        for(let i =0;i<answers.length;i++){
            storytext += `${answers[i]}${madlib.value[i+1]}`
        }
        let story = new EmbedBuilder()
        .setColor(0xb411fa)
        .setTitle(madlib.title)
        .setDescription(storytext)
        await interaction.followUp({ embeds: [story]})
        return
    }
    let question = new EmbedBuilder()
        .setColor(0xb411fa)
        .setTitle(`Enter ${madlib.blanks[index]}!`)
        .setFooter({ text: `${index+1} out of ${madlib.blanks.length}, !stop to stop`})
    await interaction.followUp({ embeds: [question], fetchReply: true })
        .then(() => {
            interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    if(collected.first().content == "!stop"){
                        let stopped = new EmbedBuilder()
                        .setColor(0xb411fa)
                        .setTitle(`Madlib stopped`)
                        interaction.followUp({embeds: [stopped]});
                        return
                    }
                    answers.push(collected.first())
                    return questionAndAnswers(interaction, madlib, index + 1, answers);

                })
                .catch(collected => {
                    let timeout = new EmbedBuilder()
                        .setColor(0xb411fa)
                        .setTitle(`30 Second Time Out`)
                    interaction.followUp({embeds: [timeout]});
                });
        });


}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('madlib')
        .setDescription('random madlib!')
    ,
    async execute(interaction) {
        let status = ''
        let madlib = await fetch(API, {
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(res => {
            if (status >= 400 && status <= 600) {
            } else {
                return res
            }
        }).catch(err => {
        })


        let x = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle(`Mystery madlib started!`)
        await interaction.reply({ embeds: [x] });


        let answers = await questionAndAnswers(interaction, madlib, 0, [])

        // let story = madlib.value[0]
        // for(let i =0;i<answers.length;i++){
        //     story += `${answers[i]} ${madlib.value[i+1]}`
        // }
        // console.log(story)

        //value
    },

};

