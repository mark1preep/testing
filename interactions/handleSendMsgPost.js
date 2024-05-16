const { Interaction, EmbedBuilder } = require("discord.js");

async function handleSendMsgPost(interaction, hasClaimPermission) {
    if (!hasClaimPermission(interaction.member)) {
        await interaction.reply({ content: 'You do not have the authority to perform this action', ephemeral: true });
        return;
    }

    const modalContent = 'Enter the text to send the message';
    const modal = new EmbedBuilder()
        .setTitle('Sending a Message')
        .setDescription(modalContent)
        .setColor('BLUE')
        .setFooter('Please enter your message');

    const msg = await interaction.reply({ embeds: [modal], ephemeral: true });

    const filter = m => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });

    collector.on('collect', async m => {
        const content = m.content.trim();
        try {
            await interaction.channel.send({ content: content });
            await m.delete();
            await msg.delete();
        } catch (error) {
            console.error('An error occurred while trying to send the message:', error);
            await interaction.followUp({ content: 'An error occurred while trying to send the message', ephemeral: true });
        }
    });

    collector.on('end', collected => {
        if (collected.size === 0) {
            interaction.followUp({ content: 'The text was not provided to send the message in time', ephemeral: true });
            msg.delete();
        }
    });
}

module.exports = {
    handleSendMsgPost
};
