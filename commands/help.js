const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('bot syntax')
    ,
    async execute(interaction) {
        let x = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle("Commands")
            .addFields(
                { name: '/help', value: 'help' },
                { name: '/language', value: 'configure language' },
                { name: '/toggle', value: 'toggle translator' },
                { name: '/madlib', value: 'start a madlib' },
                { name: '/rhyme', value: 'find rhyming words' },
                { name: '/synonyms', value: 'find synonyms' },
            )
            .setTimestamp()
        await interaction.reply({ embeds: [x] });
    },
};