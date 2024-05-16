// interactions/send_msg_embed.js

// Function to handle the sendmsgembed interaction
async function handleSendMsgEmbed(interaction, hasClaimPermission) {
    // Check user permissions
    if (!hasClaimPermission(interaction.member)) {
        await interaction.reply({ content: 'You do not have the authority to perform this action', ephemeral: true });
        return;
    }
    
    // Execute the action associated with sending a message using Embed
    const msg = await interaction.reply({ content: 'Enter the text to send the message using Embed', ephemeral: true });

    // Respond to the message coming from the user
    const filter = m => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });

    collector.on('collect', async m => {
        const content = m.content.trim(); // Extract the entered text from the user
        try {
            await sendEmbedMessage(interaction, content); // Call a function to send the message using Embed
            await interaction.deleteReply(); // Delete the original reply message
            await m.delete(); // Delete the user's message
        } catch (error) {
            console.error('An error occurred while trying to send the message with Embed:', error);
            await interaction.followUp({ content: 'An error occurred while trying to send the message with Embed', ephemeral: true });
        }
    });

    collector.on('end', collected => {
        if (collected.size === 0) {
            interaction.followUp({ content: 'The text was not provided to send the message using Embed in time', ephemeral: true });
            msg.delete(); // Delete the original request message
        }
    });
}

// Function to send a message using Embed
async function sendEmbedMessage(interaction, content) {
    // Here you can format the message as desired
    const embed = {
        description: content,
        color: '#2c2c34',
    };

    await interaction.channel.send({ embeds: [embed] });
}

// Export the function to handle the sendmsgembed interaction
module.exports = {
    handleSendMsgEmbed
};
