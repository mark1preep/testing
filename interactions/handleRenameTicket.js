// interactions/rename_ticket.js
/*
const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');

async function handleRenameTicket(interaction, hasClaimPermission) {
    if (!hasClaimPermission(interaction.member)) {
        await interaction.reply({ content: 'You do not have the authority to take this action', ephemeral: true });
        return;
    }
  try {
    if (interaction.isButton()) {
      if (interaction.customId === 'rename-ticket-button') {
        // تعيين حالة الزر إلى معطل
        interaction.message.components.forEach(row => {
          row.components.forEach(comp => {
            if (comp.customId === 'rename-ticket-button') {
              comp.setDisabled(true);
            }
          });
        });
        await interaction.message.edit({ components: interaction.message.components });

        const modal = new Modal()
          .setCustomId('rename-ticket-modal')
          .setTitle('Rename Ticket')
          .addComponents([
            new MessageActionRow().addComponents(
              new TextInputComponent()
                .setCustomId('rename-ticket-input')
                .setLabel('Enter the name of the new ticket')
                .setStyle('SHORT')
                .setMaxLength(12)
                .setPlaceholder('Enter Name Ticket')
                .setRequired(true),
            ),
          ]);

        await interaction.showModal(modal);
      }
    }

    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'rename-ticket-modal') {
        const response = interaction.fields.getTextInputValue('rename-ticket-input');

        if (interaction.member.permissions.has('MANAGE_CHANNELS')) {
          await interaction.channel.setName(response);
          interaction.reply(`Yay, your answer is submitted: "${response}"`);
        } else {
          interaction.reply("I don't have permission to rename channels!");
        }
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
    interaction.reply('An error occurred while processing your request. Please try again later.');
  }
}

module.exports = {
  handleRenameTicket
};
*/