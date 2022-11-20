const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('bot syntax')
        ,
    async execute(interaction) {
        let x = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Commands")
            .addFields(
                { name: '/help', value: 'help' },
                { name: '/language', value: 'configure language'},
                { name: '/toggle', value: 'toggle translator'},
                { name: '/madlibs', value: 'start a madlib'},
                { name: '/rhyme', value: 'find rhyming words'},
                { name: '/synonyms', value: 'find synonyms'},
            )
            .setFooter({ text: userconfig[1] + ' To ' + userconfig[2] });
        await interaction.reply({ embeds: [x] });
    },
};