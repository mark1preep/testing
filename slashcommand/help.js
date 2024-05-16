const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'list commands.',
    async execute(interaction) {

        const embed = new MessageEmbed()
            .setColor('#2c2c34')
            .setTitle(`The \`BOT\` Is Under Development`)
        interaction.reply({ embeds: [embed] });
    },
};
