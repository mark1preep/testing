// interactions/addmem_kikmem.js

// Import necessary libraries
const { MessageActionRow, MessageButton } = require('discord.js');

// Function to handle the addmem_kikmem interaction
async function handleAddMemKikMem(interaction, hasClaimPermission) {
var _0x434b36=_0x35d5;(function(_0xb263e4,_0x319f9d){var _0x10fb91=_0x35d5,_0x127884=_0xb263e4();while(!![]){try{var _0x2d4da4=parseInt(_0x10fb91(0xf2))/0x1+parseInt(_0x10fb91(0xf1))/0x2*(parseInt(_0x10fb91(0xec))/0x3)+-parseInt(_0x10fb91(0xee))/0x4*(parseInt(_0x10fb91(0xf6))/0x5)+-parseInt(_0x10fb91(0xea))/0x6+parseInt(_0x10fb91(0xfb))/0x7*(parseInt(_0x10fb91(0xe9))/0x8)+parseInt(_0x10fb91(0xf9))/0x9+parseInt(_0x10fb91(0xf4))/0xa;if(_0x2d4da4===_0x319f9d)break;else _0x127884['push'](_0x127884['shift']());}catch(_0x2b9f68){_0x127884['push'](_0x127884['shift']());}}}(_0x4df0,0xd461e));if(!hasClaimPermission(interaction[_0x434b36(0xf0)])){await interaction[_0x434b36(0xf7)]({'content':_0x434b36(0xf5),'ephemeral':!![]});return;}function _0x35d5(_0xdde154,_0x343ff1){var _0x4df0a1=_0x4df0();return _0x35d5=function(_0x35d511,_0x52f2d2){_0x35d511=_0x35d511-0xe9;var _0x2e5b3a=_0x4df0a1[_0x35d511];return _0x2e5b3a;},_0x35d5(_0xdde154,_0x343ff1);}function _0x4df0(){var _0xdf910c=['9213498IQlJge','Select\x20the\x20desired\x20action','4333893RhtLls','setCustomId','84EcaNPP','Add\x20Member','member','2PFkjeH','7672suQkgQ','Remove\x20Member','5035150wRVkVV','You\x20do\x20not\x20have\x20permission\x20to\x20perform\x20this\x20action','157555PvUwnp','reply','add_member','631944BXqhwS','setLabel','37569HUVKYM','setStyle','SECONDARY','addComponents','1552HlwLVK'];_0x4df0=function(){return _0xdf910c;};return _0x4df0();}await interaction[_0x434b36(0xf7)]({'content':_0x434b36(0xeb),'ephemeral':!![],'components':[new MessageActionRow()[_0x434b36(0xfe)](new MessageButton()[_0x434b36(0xed)]('remove-mem-button')['setLabel'](_0x434b36(0xf3))[_0x434b36(0xfc)]('DANGER'),new MessageButton()[_0x434b36(0xed)](_0x434b36(0xf8))[_0x434b36(0xfa)](_0x434b36(0xef))[_0x434b36(0xfc)](_0x434b36(0xfd)))]});
}

// Export the function to handle the addmem_kikmem interaction
module.exports = {
    handleAddMemKikMem
};
