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


        let question = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle(`Enter ${blanks[index]}!`)
        await interaction.followUp({ content: { embeds: [question] }, fetchReply: true })
            .then(() => {
          
            });
        console.log(answers)
        // for(let i =0;i<madlib.blanks.length;i++){

        // }
        // let answers = await questionAndAnswers(interaction, madlib.blanks[i], 0, [])

        // let story = madlib.value[0]
        // for(let i =0;i<answers.length;i++){
        //     story += `${answers[i]} ${madlib.value[i+1]}`
        // }
        // console.log(story)

        //value
    },
    async questionAndAnswers(interaction, blanks, index, answers) {
        if (index > blanks.length) {
            return answers
        }
        let question = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle(`Enter ${blanks[index]}!`)
        await interaction.followUp({ content: { embeds: [question] }, fetchReply: true })
            .then(() => {
                interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        answers.push(collected)
                        questionAndAnswers(interaction, blanks, index + 1)
                    })
                    .catch(collected => {
                        let timeout = new EmbedBuilder()
                            .setColor(0xb411fa)
                            .setTitle(`Time out!`)
                        interaction.channel.send({ embeds: [timeout] })
                    });
            });

    }
};

