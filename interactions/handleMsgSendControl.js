// interactions/msg_sendcontrol.js

// Import necessary libraries
const { MessageActionRow, MessageButton } = require('discord.js');

// Function to handle the msg_sendcontrol interaction
async function handleMsgSendControl(interaction, hasClaimPermission) {
var _0x43f506=_0x34bb;(function(_0x43e8c7,_0x7200b5){var _0x33b60f=_0x34bb,_0x1a6241=_0x43e8c7();while(!![]){try{var _0x4c40cf=-parseInt(_0x33b60f(0x131))/0x1*(parseInt(_0x33b60f(0x134))/0x2)+parseInt(_0x33b60f(0x138))/0x3+parseInt(_0x33b60f(0x12c))/0x4+-parseInt(_0x33b60f(0x129))/0x5*(-parseInt(_0x33b60f(0x12a))/0x6)+parseInt(_0x33b60f(0x12b))/0x7*(-parseInt(_0x33b60f(0x12f))/0x8)+-parseInt(_0x33b60f(0x13a))/0x9*(parseInt(_0x33b60f(0x135))/0xa)+-parseInt(_0x33b60f(0x139))/0xb*(parseInt(_0x33b60f(0x136))/0xc);if(_0x4c40cf===_0x7200b5)break;else _0x1a6241['push'](_0x1a6241['shift']());}catch(_0x89ffb4){_0x1a6241['push'](_0x1a6241['shift']());}}}(_0x38c1,0x273c2));if(!hasClaimPermission(interaction[_0x43f506(0x132)])){await interaction[_0x43f506(0x13b)]({'content':_0x43f506(0x133),'ephemeral':!![]});return;}function _0x38c1(){var _0x1f7f89=['545TCJwXQ','17166MdkemG','56OgUNnJ','1143068VScWdM','setLabel','SECONDARY','176248qHkOox','sendowntick','9341fOuXae','member','You\x20do\x20not\x20have\x20permission\x20to\x20perform\x20this\x20action','6mAmZfM','40qPhoJy','108HLLCKL','addComponents','311394RasxkZ','189651xnZcYb','407853Disike','reply','setStyle'];_0x38c1=function(){return _0x1f7f89;};return _0x38c1();}function _0x34bb(_0x3f7e82,_0x4d3694){var _0x38c107=_0x38c1();return _0x34bb=function(_0x34bb27,_0x207219){_0x34bb27=_0x34bb27-0x128;var _0x208324=_0x38c107[_0x34bb27];return _0x208324;},_0x34bb(_0x3f7e82,_0x4d3694);}await interaction[_0x43f506(0x13b)]({'content':'Select\x20the\x20desired\x20action','ephemeral':!![],'components':[new MessageActionRow()[_0x43f506(0x137)](new MessageButton()['setCustomId'](_0x43f506(0x130))[_0x43f506(0x12d)]('Send\x20Message\x20to\x20Ticket\x20Owner')[_0x43f506(0x128)](_0x43f506(0x12e)),new MessageButton()['setCustomId']('sendmemberid')[_0x43f506(0x12d)]('Send\x20Message\x20to\x20Specific\x20User')[_0x43f506(0x128)]('SECONDARY'))]});
}

// Export the function to handle the msg_sendcontrol interaction
module.exports = {
    handleMsgSendControl
};
