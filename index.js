const { Client, Modal, version, Intents, Permissions, MessageButton, TextInputComponent, DiscordAPIError, MessageSelectMenu, MessageAttachment, MessageEmbed, MessageActionRow } = require('discord.js');
const Discord = require('discord.js');
const { resolveImage, Canvas} = require("canvas-constructor/cairo");
const Keyv = require('keyv');
const { inviteTracker } = require("discord-inviter");
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { TextDecoder, TextEncoder, ReadableStream } = require("node:util")

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
})

const { Blob, File } = require("node:buffer")
const { fetch, Headers, FormData, Request, Response } = require("undici")

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
})
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const moment = require('moment');
require("moment-duration-format");
const db = new Keyv('sqlite://./storage/database.sqlite');
const express = require('express');
const app = express();
const path = require("path");
//ReferenceError: ReadableStream is not defined

//تعريفات ملف interactions
const { handleDeleteTicket } = require('./interactions/handleDeleteTicket');
const { handleCloseMinu } = require('./interactions/handleCloseMinu');
/*
const { handleCloseTicket } = require('./interactions/handleCloseTicket');
*/
const { handleAddMemKikMem } = require('./interactions/handleAddMemKikMem');
const { handleMsgSendControl } = require('./interactions/handleMsgSendControl');
const { handleMsgControl } = require('./interactions/handleMsgControl');
const { handleSendMemberId } = require('./interactions/handleSendMemberId');
const { handleSendMsgEmbed } = require('./interactions/handleSendMsgEmbed');
const { handleSendMsgPost } = require('./interactions/handleSendMsgPost');
const { handleMsgDeleted } = require('./interactions/handleMsgDeleted');
/*
const { handleRenameTicket } = require('./interactions/handleRenameTicket');
*/
const { handleAddNote } = require('./interactions/handleAddNote');
const { handleSendOwnTick } = require('./interactions/handleSendOwnTick');
const { handleClaimTicket } = require('./interactions/handleClaimTicket');
const { handleAddMember } = require('./interactions/handleAddMember');
const { handleRemoveMember } = require('./interactions/handleRemoveMember');
const { handleTranscript } = require('./interactions/handleTranscript');
const { handleSendMsgDisabled } = require('./interactions/handleSendMsgDisabled');
const rules = require('./rules.json');
// قائمة الملفات والدوال المستوردة


// فحص حالة كل ملف
//تعريف ملف config.json
const {
    prefix,
    categoryIDs,
    selectMenuOptions,
} = require('./config.json');
//منع ظهور الاخطاء البسيطه في console log
process.on("uncaughtException" , err => {
return;
})
 
process.on("unhandledRejection" , err => {
return;
})
 
process.on("rejectionHandled", error => {
  return;
});
// يمكنك استخدام mergedConfig في الشيفرة الخاصة بك الآن
let canvax = require('canvas')
canvax.registerFont("./storage/Uni Sans Heavy.otf", { family: 'Discord' })
canvax.registerFont("./storage/DejaVuSansCondensed-Bold.ttf", { family: 'Discordx' })
const client = new Client({
intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.MESSAGE_CONTENT,
  
],
}); // Declare client to be a new Discord Client (bot)
require('http').createServer((req, res) => res.end(`
</> Dveloper Bot : Q U E E N
</> Server Support : https://dsc.gg/quen
</> Servers : ${client.guilds.cache.size}
</> Users : ${client.users.cache.size}
</> channels : ${client.channels.cache.size}
</> Name : ${client.user.username}
`)).listen(3000) //Dont remove this 
  /*
  Code Below provides info about the bot 
  once it's ready
  */


const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 30; // أو أي قيمة تعتقد أنها مناسبة
require("events").EventEmitter.defaultMaxListeners = 30;

client.on('ready', () => {
  console.log(``);
  console.log(`</> Logged in as : ${client.user.tag}!`);
  console.log(`</> Servers : ${client.guilds.cache.size}`);
  console.log(`</> Users : ${client.users.cache.size}`);
  console.log(`</> channels : ${client.channels.cache.size}`);
  console.log(`</> Name : ${client.user.username}`);
  client.user.setStatus('idle');///dnd/online/idle
  client.user.setActivity('dsc.gg/quen ', { type: 'WATCHING' });
});
// هنا id
// الروم اللي البوت هيفضل قاعد فيها 24 ساعة
const channelID = '1239259952028323872'; // ID of the voice channel you want the bot to join

let reconnectTimeout = null; // Variable to hold the timeout for reconnection

client.once('ready', async () => {

    const channel = client.channels.cache.get(channelID);
    if (!channel || channel.type !== 'GUILD_VOICE') {
        return console.error('The channel does not exist or is not a voice channel.');
    }

    try {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
        console.log('</> Bot connected to the voice channel successfully!');
    } catch (error) {
        console.error(error);
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    // Check if the bot left the voice channel
    if (oldState.member && oldState.member.user.bot && oldState.channelId && !newState.channelId) {
        const channel = client.channels.cache.get(channelID);
        if (channel && channel.type === 'GUILD_VOICE') {
            try {
                // Clear previous timeout if exists
                if (reconnectTimeout) {
                    clearTimeout(reconnectTimeout);
                    reconnectTimeout = null;
                }

                reconnectTimeout = setTimeout(() => {
                    const connection = joinVoiceChannel({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    });

                    console.log('Bot reconnected to the voice channel.');
                }, 5000); // Reconnect after 5 seconds
            } catch (error) {
                console.error(error);
            }
        }
    }
});



client.commands = new Discord.Collection();

// قراءة الملفات داخل المجلد "commands"
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = new Map();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

// قراءة الملفات داخل المجلد "slashcommand"
const slashCommandFiles = fs.readdirSync('./slashcommand').filter(file => file.endsWith('.js'));

const slashCommands = [];

for (const file of slashCommandFiles) {
    const command = require(`./slashcommand/${file}`);
    slashCommands.push(command);
}

client.once('ready', async () => {
    try {
        await client.application?.commands.set(slashCommands);
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = slashCommands.find(cmd => cmd.name === interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Error executing command:', error);
        await interaction.reply({ content: 'There was an error executing that command!', ephemeral: true });
    }
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commands.has(commandName)) return;

    const command = commands.get(commandName);

    try {
        command.execute(message, args, client, prefix, Discord); // تمرير client و prefix و Discord إلى ملف الأمر
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing this command!');
    }
});

let nextAzkarIndex = 0;

let background2 = ''; // Initialize background2 variable

client.on('messageCreate', async message => {
  if (message.content.startsWith('st!setimagerules')) {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      const args = message.content.split(' ');
      if (args.length !== 2) {
        await message.reply({ content: "Please provide a valid image URL.", ephemeral: true });
        return;
      }
      background2 = args[1];
      await message.reply({ content: "Server rules image has been set successfully.", ephemeral: true });
    } else {
      await message.reply({ content: "You need to be an administrator to use this command.", ephemeral: true });
    }
  }
  
  if (message.content === 'r!r3rules') {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('List of Laws')
            .addOptions(rules.map(rule => ({
              label: rule.title,
              value: rule.id,
            }))),
        );

      const embed = new MessageEmbed()
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
        .setTitle("<a:3_:1089615585232556204> Server Rules Community <a:12:1150947511146664017>")
        .setDescription(`<a:11:1150943009442107523> to read the laws, choose from the list below \n<a:11:1150943009442107523> please do not violate server rules`)
        .setImage(background2);

      const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
      await message.delete();
    } else {
      await message.reply({ content: "You need to be an administrator to use this command.", ephemeral: true });
    }
  }
});

client.config = {
    prefix: "st!" // قم بتعيين بادئة الأمر هنا
};

/////////////////////////////////
client.on('messageCreate', async message => {
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'ping') {
        let msg = await message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription("> ⚙ **Please Wait...**")
            ],
        });

        let zap = "⚡";
        let green = "🟢";
        let red = "🔴";
        let yellow = "🟡";

        var botState = zap;
        var apiState = zap;
        var timediff = zap;

        let apiPing = client.ws.ping;
        let botPing = Math.floor(msg.createdAt - message.createdAt);

        if (apiPing >= 40 && apiPing < 200) {
            apiState = green;
        } else if (apiPing >= 200 && apiPing < 400) {
            apiState = yellow;
        } else if (apiPing >= 400) {
            apiState = red;
        }

        if (botPing >= 40 && botPing < 200) {
            botState = green;
        } else if (botPing >= 200 && botPing < 400) {
            botState = yellow;
        } else if (botPing >= 400) {
            botState = red;
        }
      
        if (botPing >= 40 && botPing < 200) {
            timediff = green;
        } else if (botPing >= 200 && botPing < 400) {
            timediff = yellow;
        } else if (botPing >= 400) {
            timediff = red;
        }

        setTimeout(() => {
            msg.delete();
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("📊 | Bot Statuss")
                        .addFields(
                            {
                                name: "API Latency",
                                value: `**\`\`\`yml\n${apiState} | ${apiPing}ms\`\`\`**`,
                                inline: true,
                            },
                            {
                                name: "Bot Latency",
                                value: `**\`\`\`yml\n${botState} | ${botPing}ms\`\`\`**`,
                                inline: true,
                            },
                            {
                                name: "API Latency",
                                value: `**\`\`\`yml\n${timediff} | ${(Date.now() - message.createdTimestamp)}ms\`\`\`**`,
                                inline: true,
                            }
                          
                        )
                        .setColor(client.config.embedColor)
                ],
            });
        }, 1000); // تأخير العملية لثانية واحدة (1000 مللي ثانية)
    }
});
/////////////////////////////////



// زيادة الحد الأقصى لعدد مستمعي الأحداث لعميل Discord
client.setMaxListeners(30); // تعيين العدد الذي ترغب فيه للحد الأقصى


client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'reportserverpanel') {
    const buttonRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('report-server-modal')
          .setStyle('PRIMARY')
          .setLabel('📝 Send Report')
      );

    const embed = new MessageEmbed()
      .setTitle('> <a:3_:1089615585232556204> Submit A Report <a:12:1150947511146664017>')
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
      .setImage("https://cdn.discordapp.com/attachments/1232668066069086248/1237501284551229511/E77wRD1KOLAfsd4tp6_standard.gif?ex=663be061&is=663a8ee1&hm=91a04116ef47ac24d61a2a8dea69fe3f2fa3c56d770a5122efe27ba470b3075a&")
      .setDescription(' **Rules Send Report** \n 1. Clearly state the violation observed. \n2. Provide relevant evidence, such as screenshots. \n3. Specify the time and location of the incident. \n4. Avoid using inflammatory language. \n5. Respect confidentiality and privacy concerns. \n6. Follow the server reporting guidelines. \n7. Await moderation team response patiently. \n8. Refrain from submitting false accusations.')
      .setColor('#2c2c34');

    message.channel.send({
      embeds: [embed],
      components: [buttonRow]
    });
  }
});


client.on('messageCreate', async message => {
    // تأكد من أن الرسالة ليست من البوت
    if (message.author.bot) return;

    // تحقق مما إذا كانت الرسالة تحتوي على mention للبوت
    if (message.mentions.has(client.user)) {
        // إضافة السطر التالي لبدء الرمز "الكتابة"
        await message.channel.sendTyping();

        const embed = new MessageEmbed()
            .setColor('#2c2c34')
            .setTitle(`My commands : \`4help\` or </help:1239056012434997341>`)

        // إرسال الـ embed إلى الشخص الذي قام بمنشن البوت
        message.reply({ embeds: [embed] });
    }
});



//testing code modal
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'suggestionsroom') {
    const buttonRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('suggestions-modal')
          .setStyle('PRIMARY')
          .setLabel('🤝 إرسال إقتراحات او ملاحظات')
      );

    const embed = new MessageEmbed()
      .setTitle('> قوانين إرسال الإقتراحات و الملاحظات')
      .setDescription('1. الاقتراحات والملاحظات يجب أن تكون موجهة بإحترام ووضوح، دون تجاوز الحدود. \n2. تجنب إرسال المحتوى الغير لائق أو المسيء أو المحتوى الذي ينتهك سياسات الخادم. \n3. يجب أن يتضمن كل اقتراح أو ملاحظة توضيحاً موجزاً للفكرة والهدف منه. \n4. تجنب إرسال الاقتراحات أو الملاحظات المكررة، يُفضل البحث عن محتوى مشابه قبل الإرسال. \n5. يجب الامتناع عن إرسال الرسائل الضارة أو التي تحتوي على فيروسات أو روابط مشبوهة. \n6. تجنب إرسال الاقتراحات أو الملاحظات التي لا تتعلق بموضوع الخادم أو القناة. \n7. تحديد عنوان واضح ومناسب لكل اقتراح أو ملاحظة يُرسل، لتسهيل تصنيفه ومتابعته. \n8. الامتناع عن استخدام اللغة البذيئة أو الإساءة اللفظية في الاقتراحات والملاحظات. \n9. يجب أن يكون الاقتراح أو الملاحظة مفهوماً وواضحاً للجميع دون الحاجة لتفسير إضافي.\n10. تجنب إرسال الرسائل الطويلة جداً، واختصار الفكرة في أطر موجزة ومفيدة.\n11. يُشجع على تقديم الاقتراحات التي تتماشى مع هدف الخادم ومبادئه الأساسية.\n12. الامتناع عن إرسال الاقتراحات أو الملاحظات العنيفة أو الهجومية.\n13. توجيه المقترحات للقنوات المناسبة وتجنب الإزعاج غير الضروري للأعضاء الآخرين.\n14. الإدارة تحتفظ بحقها في تعديل أو حذف أو تجاهل المقترحات غير متوافقة مع القوانين والتوجيهات.')
      .setColor('#2c2c34');

    message.channel.send({
      embeds: [embed],
      components: [buttonRow]
    });
  }
});

const votedMembersPerMessage = new Map();
const votedMembers = new Set();
const reportedMembersPerMessage = new Map();
const reportedMembers = new Set();
let votedEmbedIds = new Set();

//report server
const _0x3f32a7=_0x5b93;function _0x2b80(){const _0xec82d1=['Report\x20Title','✅\x20Accepted','value','❌\x20Reject','1237563155429720156','┕<t:','getHours','Enter\x20Report\x20Here','Enter\x20Report\x20Title\x20Here','6gMbCbQ','Report\x20Data','5648419FazBfV','9276201RELcBQ','error','interactionCreate','get','Status','Report\x20By','member','catch','setTitle','Aceept','#2c2c34','channels','2report-server-input','update','DANGER','setColor','what\x20Is\x20The\x20Report','3report-server-input','isText','Africa/Cairo','customId','setMinLength','setMaxLength','Report\x20Since','en-EG','isModalSubmit','now','```','You\x20do\x20not\x20have\x20permission\x20to\x20do\x20that.','getTextInputValue','3849wnnVsR','addComponents','addFields','148ayTqea','has','setCustomId','message','setImage','154873CzXMzQ','1150611319276453957','components','setDescription','>\x20Your\x20notification\x20has\x20been\x20successfully\x20sent\x20to\x20the\x20administrators\x20\x0a>\x20Your\x20report\x20is\x20being\x20reviewed','6yGYpvy','Reject','numeric','toLocaleTimeString','setStyle','Send\x20Report\x20Message','send','183390NxmWmP','unaccept_sug','cache','**Report\x20Title**\x20```','component','then','showModal','embeds','SUCCESS','حدث\x20خطأ\x20في\x20الرد:','setLabel','12450400EkwnGd','8223540krhMPn','report-server-modal','fields','setRequired','roles','name','Image\x20Link\x20/\x20Not\x20Mandatory','SHORT','en-US','find','report-server-input','setDisabled',':R>','setPlaceholder','client'];_0x2b80=function(){return _0xec82d1;};return _0x2b80();}function _0x5b93(_0x13d8b3,_0x3160a2){const _0x2b80d4=_0x2b80();return _0x5b93=function(_0x5b9362,_0x1e216a){_0x5b9362=_0x5b9362-0x72;let _0x10d196=_0x2b80d4[_0x5b9362];return _0x10d196;},_0x5b93(_0x13d8b3,_0x3160a2);}(function(_0x5c5b79,_0x44cc3f){const _0x104583=_0x5b93,_0x44aa83=_0x5c5b79();while(!![]){try{const _0x48e6ae=parseInt(_0x104583(0x7a))/0x1+-parseInt(_0x104583(0xaa))/0x2*(parseInt(_0x104583(0x72))/0x3)+-parseInt(_0x104583(0x75))/0x4*(-parseInt(_0x104583(0x86))/0x5)+parseInt(_0x104583(0x7f))/0x6*(-parseInt(_0x104583(0xac))/0x7)+-parseInt(_0x104583(0x91))/0x8+parseInt(_0x104583(0xad))/0x9+parseInt(_0x104583(0x92))/0xa;if(_0x48e6ae===_0x44cc3f)break;else _0x44aa83['push'](_0x44aa83['shift']());}catch(_0x32840a){_0x44aa83['push'](_0x44aa83['shift']());}}}(_0x2b80,0xf3a30),client['on'](_0x3f32a7(0xaf),async _0x5ba774=>{const _0x59513a=_0x3f32a7;if(_0x5ba774['isButton']()){if(_0x5ba774[_0x59513a(0xc1)]==='accept_sug'){if(!_0x5ba774[_0x59513a(0xb3)][_0x59513a(0x96)]['cache'][_0x59513a(0x76)](_0x59513a(0x7b)))return _0x5ba774['reply']({'content':_0x59513a(0xc9),'ephemeral':!![]});const _0x306885=_0x5ba774[_0x59513a(0x78)][_0x59513a(0x8d)][0x0];_0x306885[_0x59513a(0x94)][_0x59513a(0x9b)](_0x13d554=>_0x13d554[_0x59513a(0x97)]===_0x59513a(0xb1))[_0x59513a(0xa3)]=_0x59513a(0xa2),_0x5ba774['component']['setDisabled'](!![]),await _0x5ba774[_0x59513a(0xba)]({'embeds':[_0x306885],'components':[_0x5ba774[_0x59513a(0x78)][_0x59513a(0x7c)][0x0]]});}if(_0x5ba774[_0x59513a(0xc1)]===_0x59513a(0x87)){if(!_0x5ba774[_0x59513a(0xb3)][_0x59513a(0x96)]['cache'][_0x59513a(0x76)](_0x59513a(0x7b)))return _0x5ba774['reply']({'content':_0x59513a(0xc9),'ephemeral':!![]});const _0x330a33=_0x5ba774['message'][_0x59513a(0x8d)][0x0];_0x330a33[_0x59513a(0x94)][_0x59513a(0x9b)](_0x340476=>_0x340476[_0x59513a(0x97)]===_0x59513a(0xb1))[_0x59513a(0xa3)]=_0x59513a(0xa4),_0x5ba774[_0x59513a(0x8a)][_0x59513a(0x9d)](!![]),await _0x5ba774[_0x59513a(0xba)]({'embeds':[_0x330a33],'components':[_0x5ba774[_0x59513a(0x78)][_0x59513a(0x7c)][0x0]]});}if(_0x5ba774[_0x59513a(0xc1)]===_0x59513a(0x93)){const _0x16151a=new Modal()[_0x59513a(0x77)]('report-server-modal')[_0x59513a(0xb5)](_0x59513a(0x84))[_0x59513a(0x73)]([new MessageActionRow()['addComponents'](new TextInputComponent()[_0x59513a(0x77)](_0x59513a(0x9c))[_0x59513a(0x90)](_0x59513a(0xa1))[_0x59513a(0x83)](_0x59513a(0x99))['setMinLength'](0x1)[_0x59513a(0xc3)](0xc8)['setPlaceholder'](_0x59513a(0xa9))[_0x59513a(0x95)](!![])),new MessageActionRow()[_0x59513a(0x73)](new TextInputComponent()['setCustomId'](_0x59513a(0xb9))[_0x59513a(0x90)](_0x59513a(0xbd))[_0x59513a(0x83)]('PARAGRAPH')['setMinLength'](0x1)[_0x59513a(0xc3)](0xfa0)['setPlaceholder'](_0x59513a(0xa8))['setRequired'](!![])),new MessageActionRow()[_0x59513a(0x73)](new TextInputComponent()[_0x59513a(0x77)](_0x59513a(0xbe))[_0x59513a(0x90)](_0x59513a(0x98))['setStyle'](_0x59513a(0x99))[_0x59513a(0xc2)](0x1)[_0x59513a(0xc3)](0xc8)[_0x59513a(0x9f)]('Enter\x20Image\x20Link\x20Here')[_0x59513a(0x95)](![]))]);await _0x5ba774[_0x59513a(0x8c)](_0x16151a);}}if(_0x5ba774[_0x59513a(0xc6)]()){if(_0x5ba774[_0x59513a(0xc1)]===_0x59513a(0x93)){const _0x412a97=_0x5ba774[_0x59513a(0x94)][_0x59513a(0xca)](_0x59513a(0x9c)),_0x39a239=_0x5ba774[_0x59513a(0x94)][_0x59513a(0xca)](_0x59513a(0xb9)),_0x30ce2f=_0x5ba774[_0x59513a(0x94)][_0x59513a(0xca)](_0x59513a(0xbe)),_0x5772c8=Math['floor'](Date[_0x59513a(0xc7)]()/0x3e8)-0x1b;let _0x5da25b=new Date();_0x5da25b['setHours'](_0x5da25b[_0x59513a(0xa7)]()+0x1);const _0x279cd4=_0x5ba774['user']['id'],_0x3e5eac=new Date()['toLocaleDateString'](_0x59513a(0x9a),{'timeZone':_0x59513a(0xc0)}),_0x465be9=_0x5da25b[_0x59513a(0x82)](_0x59513a(0xc5),{'timeZone':'Africa/Cairo','hour12':!![],'hour':_0x59513a(0x81),'minute':_0x59513a(0x81)}),_0x20468f=new MessageEmbed()[_0x59513a(0xbc)]('#2c2c34')[_0x59513a(0xb5)]('>\x20📝\x20New\x20Report')[_0x59513a(0x79)](''+_0x30ce2f)[_0x59513a(0x7d)](_0x59513a(0x89)+_0x412a97+'```\x20\x0a**Report\x20Description**\x20```'+_0x39a239+_0x59513a(0xc8))[_0x59513a(0x74)]({'name':_0x59513a(0xb1),'value':'⏳\x20Pending\x20Review','inline':!![]},{'name':_0x59513a(0xc4),'value':_0x59513a(0xa6)+_0x5772c8+_0x59513a(0x9e),'inline':!![]},{'name':_0x59513a(0xb2),'value':'<@'+_0x279cd4+'>','inline':!![]},{'name':_0x59513a(0xab),'value':'```'+_0x465be9+','+_0x3e5eac+_0x59513a(0xc8),'inline':!![]}),_0x453bd9=new MessageButton()['setCustomId']('accept_sug')[_0x59513a(0x90)](_0x59513a(0xb6))[_0x59513a(0x83)](_0x59513a(0x8e)),_0x4ef599=new MessageButton()[_0x59513a(0x77)](_0x59513a(0x87))[_0x59513a(0x90)](_0x59513a(0x80))['setStyle'](_0x59513a(0xbb)),_0x8a82a1=new MessageActionRow()[_0x59513a(0x73)](_0x453bd9,_0x4ef599),_0x47626c=new MessageEmbed()[_0x59513a(0xbc)](_0x59513a(0xb7))['setTitle'](_0x59513a(0x7e));_0x5ba774['reply']({'embeds':[_0x47626c],'ephemeral':!![]})[_0x59513a(0x8b)](()=>{const _0x45c421=_0x59513a,_0x408e18=_0x5ba774[_0x45c421(0xa0)][_0x45c421(0xb8)][_0x45c421(0x88)][_0x45c421(0xb0)](_0x45c421(0xa5));_0x408e18&&_0x408e18[_0x45c421(0xbf)]()?_0x408e18[_0x45c421(0x85)]({'embeds':[_0x20468f],'components':[_0x8a82a1]}):console[_0x45c421(0xae)]('لا\x20يمكن\x20العثور\x20على\x20القناة\x20أو\x20القناة\x20غير\x20صالحة.');})[_0x59513a(0xb4)](_0xfd2be4=>console['error'](_0x59513a(0x8f),_0xfd2be4));}}}));
//send sug
(function(_0x2ff4d4,_0x45b926){const _0x243250=_0x5a9e,_0xaccd02=_0x2ff4d4();while(!![]){try{const _0x2b07f9=-parseInt(_0x243250(0x1ee))/0x1*(-parseInt(_0x243250(0x1cd))/0x2)+parseInt(_0x243250(0x1a7))/0x3*(parseInt(_0x243250(0x1b2))/0x4)+-parseInt(_0x243250(0x1b9))/0x5+parseInt(_0x243250(0x1dd))/0x6*(-parseInt(_0x243250(0x1f2))/0x7)+parseInt(_0x243250(0x1e7))/0x8*(parseInt(_0x243250(0x203))/0x9)+parseInt(_0x243250(0x1e1))/0xa+parseInt(_0x243250(0x1b3))/0xb*(-parseInt(_0x243250(0x1e2))/0xc);if(_0x2b07f9===_0x45b926)break;else _0xaccd02['push'](_0xaccd02['shift']());}catch(_0x4de78f){_0xaccd02['push'](_0xaccd02['shift']());}}}(_0x1931,0x1c931),client['on']('interactionCreate',async _0x560150=>{const _0x4695da=_0x5a9e;if(_0x560150[_0x4695da(0x221)]()){if(_0x560150[_0x4695da(0x213)]==='accept_sug22'){const _0xbb56e5=[_0x4695da(0x1dc),_0x4695da(0x1bd),_0x4695da(0x218)],_0x2257af=_0x560150['member'][_0x4695da(0x1e9)]['has'](_0x4695da(0x217)),_0x94e964=_0xbb56e5['some'](_0x2c6855=>_0x560150[_0x4695da(0x210)]['roles']['cache'][_0x4695da(0x1d2)](_0x2c6855));if(!_0x2257af&&!_0x94e964)return _0x560150[_0x4695da(0x1d4)]({'content':_0x4695da(0x224),'ephemeral':!![]});const _0x28f388=_0x560150[_0x4695da(0x1ad)]['embeds'][0x0];_0x28f388['fields'][_0x4695da(0x20b)](_0x427ae7=>_0x427ae7['name']==='الحالة')[_0x4695da(0x204)]=_0x4695da(0x220),_0x560150['component']['setDisabled'](!![]),await _0x560150[_0x4695da(0x1bb)]({'embeds':[_0x28f388],'components':[_0x560150['message'][_0x4695da(0x1c1)][0x0]]});const _0x3b8b00=_0x560150['guild'][_0x4695da(0x215)][_0x4695da(0x21c)][_0x4695da(0x1db)](_0x4695da(0x20e));if(_0x3b8b00){const _0xfa387a=_0x560150[_0x4695da(0x21a)],_0x3b8fad=_0x560150[_0x4695da(0x1ad)];let _0x30eee8=new Date();_0x30eee8[_0x4695da(0x1a8)](_0x30eee8[_0x4695da(0x1ae)]()+0x1);const _0x69cb39=Math['floor'](Date[_0x4695da(0x1f7)]()/0x3e8)-0x20,_0x193dcc=new Date()['toLocaleDateString'](_0x4695da(0x1e3),{'timeZone':'Africa/Cairo'}),_0x3e2691=_0x30eee8[_0x4695da(0x1ea)](_0x4695da(0x1e8),{'timeZone':'Africa/Cairo','hour12':!![],'hour':_0x4695da(0x219),'minute':_0x4695da(0x219)}),_0x23669f=new Discord[(_0x4695da(0x21d))]()[_0x4695da(0x1f8)](_0x4695da(0x205))[_0x4695da(0x21e)](_0x4695da(0x1de))[_0x4695da(0x1d1)](_0x560150['user'][_0x4695da(0x1ab)]({'dynamic':!![],'size':0x1000}))[_0x4695da(0x1f0)]({'name':_0x560150[_0x4695da(0x21a)][_0x4695da(0x1c8)],'iconURL':_0x560150[_0x4695da(0x21a)][_0x4695da(0x1ab)]({'dynamic':!![]})})['addFields']({'name':'\u2003','value':'\u2003','inline':![]},{'name':_0x4695da(0x211),'value':'┕'+_0xfa387a,'inline':!![]},{'name':_0x4695da(0x206),'value':'┕`'+_0x3e2691+','+_0x193dcc+'`','inline':!![]},{'name':'\u2003','value':'\u2003','inline':![]},{'name':_0x4695da(0x207),'value':_0x4695da(0x1da)+_0x69cb39+_0x4695da(0x20c),'inline':!![]},{'name':_0x4695da(0x222),'value':_0x4695da(0x19e)+_0x3b8fad[_0x4695da(0x1b7)]+')┕','inline':!![]});_0x3b8b00[_0x4695da(0x1f5)]({'embeds':[_0x23669f]});}}if(_0x560150[_0x4695da(0x213)]==='unaccept_sug22'){const _0xea28dc=[_0x4695da(0x1dc),_0x4695da(0x1bd),_0x4695da(0x218)],_0x289f86=_0x560150[_0x4695da(0x210)][_0x4695da(0x1e9)][_0x4695da(0x1d2)](_0x4695da(0x217)),_0x1afdb6=_0xea28dc[_0x4695da(0x1a1)](_0xa9c547=>_0x560150[_0x4695da(0x210)][_0x4695da(0x1b0)][_0x4695da(0x21c)][_0x4695da(0x1d2)](_0xa9c547));if(!_0x289f86&&!_0x1afdb6)return _0x560150[_0x4695da(0x1d4)]({'content':_0x4695da(0x224),'ephemeral':!![]});const _0x8850a4=_0x560150['message']['embeds'][0x0];_0x8850a4['fields'][_0x4695da(0x20b)](_0x554c78=>_0x554c78[_0x4695da(0x1eb)]===_0x4695da(0x1a5))[_0x4695da(0x204)]=_0x4695da(0x1cb),_0x560150[_0x4695da(0x1c4)][_0x4695da(0x202)](!![]),await _0x560150[_0x4695da(0x1bb)]({'embeds':[_0x8850a4],'components':[_0x560150['message'][_0x4695da(0x1c1)][0x0]]});const _0x32f44c=_0x560150[_0x4695da(0x1af)]['channels'][_0x4695da(0x21c)]['get'](_0x4695da(0x20e));if(_0x32f44c){const _0x189b1c=_0x560150['user'],_0x36ab91=_0x560150[_0x4695da(0x1ad)];let _0x41e015=new Date();_0x41e015[_0x4695da(0x1a8)](_0x41e015['getHours']()+0x1);const _0x5524f5=Math[_0x4695da(0x20a)](Date['now']()/0x3e8)-0x20,_0x1d1d8d=new Date()['toLocaleDateString'](_0x4695da(0x1e3),{'timeZone':_0x4695da(0x20d)}),_0x186068=_0x41e015[_0x4695da(0x1ea)](_0x4695da(0x1e8),{'timeZone':_0x4695da(0x20d),'hour12':!![],'hour':_0x4695da(0x219),'minute':_0x4695da(0x219)}),_0x3b5cc2=new Discord[(_0x4695da(0x21d))]()[_0x4695da(0x1f8)]('#FF0000')[_0x4695da(0x21e)](_0x4695da(0x1ec))[_0x4695da(0x1d1)](_0x560150['user'][_0x4695da(0x1ab)]({'dynamic':!![],'size':0x1000}))[_0x4695da(0x1f0)]({'name':_0x560150['user'][_0x4695da(0x1c8)],'iconURL':_0x560150['user'][_0x4695da(0x1ab)]({'dynamic':!![]})})['addFields']({'name':'\u2003','value':'\u2003','inline':![]},{'name':'تم\x20رفض\x20الإقتراح\x20بواسطة','value':'┕'+_0x189b1c,'inline':!![]},{'name':'تاريخ\x20رفض\x20الإقتراح','value':'┕`'+_0x186068+','+_0x1d1d8d+'`','inline':!![]},{'name':'\u2003','value':'\u2003','inline':![]},{'name':_0x4695da(0x207),'value':_0x4695da(0x1da)+_0x5524f5+_0x4695da(0x20c),'inline':!![]},{'name':_0x4695da(0x1aa),'value':_0x4695da(0x19e)+_0x36ab91[_0x4695da(0x1b7)]+')┕','inline':!![]});_0x32f44c['send']({'embeds':[_0x3b5cc2]});}}if(_0x560150['customId']===_0x4695da(0x216)||_0x560150[_0x4695da(0x213)]===_0x4695da(0x1a4)){!votedMembersPerMessage[_0x4695da(0x1d2)](_0x560150[_0x4695da(0x1ad)]['id'])&&votedMembersPerMessage['set'](_0x560150[_0x4695da(0x1ad)]['id'],new Set());const _0x3fa801=votedMembersPerMessage[_0x4695da(0x1db)](_0x560150['message']['id']);if(_0x3fa801['has'](_0x560150[_0x4695da(0x21a)]['id']))return _0x560150[_0x4695da(0x1d4)]({'content':'You\x20have\x20already\x20voted.','ephemeral':!![]});else _0x3fa801[_0x4695da(0x1fd)](_0x560150[_0x4695da(0x21a)]['id']);}const _0x4e6d0f=_0x4695da(0x1c2);if(_0x560150[_0x4695da(0x213)]===_0x4695da(0x216)){const _0x4eee3a=_0x560150[_0x4695da(0x1ad)]['embeds'][0x0],_0x5a170a=_0x4eee3a[_0x4695da(0x1a3)][_0x4695da(0x20b)](_0x44c80e=>_0x44c80e[_0x4695da(0x1eb)]===_0x4695da(0x1ba)),_0xf28560=parseInt(_0x5a170a[_0x4695da(0x204)][_0x4695da(0x1c0)]('\x20')[0x1]);_0x5a170a[_0x4695da(0x204)]='┕`👍\x20'+(_0xf28560+0x1)+'`';const _0x282614=_0x560150[_0x4695da(0x21a)][_0x4695da(0x1f4)];let _0x5024b2=new Date();const _0x42a1b1=_0x560150[_0x4695da(0x1ad)];_0x5024b2[_0x4695da(0x1a8)](_0x5024b2['getHours']()+0x1);const _0x1323eb=Math[_0x4695da(0x20a)](Date['now']()/0x3e8)-0x20,_0x1237d9=new Date()[_0x4695da(0x1a9)](_0x4695da(0x1e3),{'timeZone':_0x4695da(0x20d)}),_0x28722f=_0x5024b2[_0x4695da(0x1ea)](_0x4695da(0x1e8),{'timeZone':_0x4695da(0x20d),'hour12':!![],'hour':_0x4695da(0x219),'minute':_0x4695da(0x219)}),_0x50cb8a=new MessageEmbed()[_0x4695da(0x1f8)](_0x4695da(0x205))['setTitle'](_0x4695da(0x1e0))['setThumbnail'](_0x560150['user']['displayAvatarURL']({'dynamic':!![],'size':0x1000}))[_0x4695da(0x1f0)]({'name':_0x560150[_0x4695da(0x21a)][_0x4695da(0x1c8)],'iconURL':_0x560150[_0x4695da(0x21a)]['displayAvatarURL']({'dynamic':!![]})})['addFields']({'name':'\u2003','value':'\u2003','inline':![]},{'name':_0x4695da(0x1df),'value':'┕'+_0x282614,'inline':!![]},{'name':'تاريخ\x20التفاعل\x20مع\x20الإقتراح','value':'┕`'+_0x28722f+','+_0x1237d9+'`','inline':!![]},{'name':'\u2003','value':'\u2003','inline':![]},{'name':'\u2003','value':_0x4695da(0x1c6)+(_0xf28560+0x1)+_0x4695da(0x212),'inline':![]},{'name':'\u2003','value':'\u2003','inline':![]},{'name':_0x4695da(0x207),'value':_0x4695da(0x1da)+_0x1323eb+':R>','inline':!![]},{'name':_0x4695da(0x1bc),'value':_0x4695da(0x19e)+_0x42a1b1[_0x4695da(0x1b7)]+')┕','inline':!![]}),_0xa37c54=_0x560150[_0x4695da(0x1af)]['channels'][_0x4695da(0x21c)][_0x4695da(0x1db)](_0x4e6d0f);_0xa37c54?await _0xa37c54[_0x4695da(0x1f5)]({'embeds':[_0x50cb8a]}):console['log'](_0x4695da(0x1fa)),await _0x560150[_0x4695da(0x1bb)]({'embeds':[_0x4eee3a]});}if(_0x560150[_0x4695da(0x213)]===_0x4695da(0x1a4)){const _0x20b2dc=_0x560150['message'][_0x4695da(0x1fe)][0x0],_0x20c2d5=_0x20b2dc[_0x4695da(0x1a3)][_0x4695da(0x20b)](_0xe8ba88=>_0xe8ba88[_0x4695da(0x1eb)]===_0x4695da(0x21f)),_0xd753f1=parseInt(_0x20c2d5[_0x4695da(0x204)][_0x4695da(0x1c0)]('\x20')[0x1]);_0x20c2d5['value']=_0x4695da(0x1a0)+(_0xd753f1+0x1)+'`';const _0x2dea86=_0x560150['user'][_0x4695da(0x1f4)];let _0x117b5f=new Date();const _0x100544=_0x560150['message'];_0x117b5f[_0x4695da(0x1a8)](_0x117b5f[_0x4695da(0x1ae)]()+0x1);const _0x5e15c2=Math[_0x4695da(0x20a)](Date[_0x4695da(0x1f7)]()/0x3e8)-0x20,_0x1a75fe=new Date()['toLocaleDateString'](_0x4695da(0x1e3),{'timeZone':_0x4695da(0x20d)}),_0x19d9c2=_0x117b5f[_0x4695da(0x1ea)]('en-EG',{'timeZone':_0x4695da(0x20d),'hour12':!![],'hour':_0x4695da(0x219),'minute':_0x4695da(0x219)}),_0x2b6a4b=new MessageEmbed()[_0x4695da(0x1f8)](_0x4695da(0x1d7))[_0x4695da(0x21e)]('>\x20تم\x20التفاعل\x20مع\x20هذا\x20اقتراح')[_0x4695da(0x1d1)](_0x560150['user'][_0x4695da(0x1ab)]({'dynamic':!![],'size':0x1000}))[_0x4695da(0x1f0)]({'name':_0x560150[_0x4695da(0x21a)][_0x4695da(0x1c8)],'iconURL':_0x560150['user']['displayAvatarURL']({'dynamic':!![]})})[_0x4695da(0x1e6)]({'name':'\u2003','value':'\u2003','inline':![]},{'name':_0x4695da(0x1df),'value':'┕'+_0x2dea86,'inline':!![]},{'name':_0x4695da(0x1ca),'value':'┕`'+_0x19d9c2+','+_0x1a75fe+'`','inline':!![]},{'name':'\u2003','value':'\u2003','inline':![]},{'name':'\u2003','value':_0x4695da(0x1c7)+(_0xd753f1+0x1)+'\x20عدد\x20التفاعلات\x20الحاليه```','inline':![]},{'name':'\u2003','value':'\u2003','inline':![]},{'name':_0x4695da(0x207),'value':_0x4695da(0x1da)+_0x5e15c2+_0x4695da(0x20c),'inline':!![]},{'name':_0x4695da(0x1bc),'value':'[رابط\x20الإقتراح]('+_0x100544['url']+')┕','inline':!![]}),_0x1d208f=_0x560150[_0x4695da(0x1af)][_0x4695da(0x215)][_0x4695da(0x21c)][_0x4695da(0x1db)](_0x4e6d0f);_0x1d208f?await _0x1d208f['send']({'embeds':[_0x2b6a4b]}):console[_0x4695da(0x1a2)](_0x4695da(0x1fa)),await _0x560150['update']({'embeds':[_0x20b2dc]});}if(_0x560150['customId']===_0x4695da(0x21b)){const _0x42130e=new Modal()[_0x4695da(0x1b6)](_0x4695da(0x21b))['setTitle'](_0x4695da(0x223))[_0x4695da(0x1c9)]([new MessageActionRow()['addComponents'](new TextInputComponent()[_0x4695da(0x1b6)]('suggestions-input')['setLabel'](_0x4695da(0x1ff))[_0x4695da(0x1f1)]('SHORT')['setMinLength'](0x1)[_0x4695da(0x1cc)](0xc8)['setPlaceholder'](_0x4695da(0x1f3))['setRequired'](!![])),new MessageActionRow()[_0x4695da(0x1c9)](new TextInputComponent()[_0x4695da(0x1b6)](_0x4695da(0x1c5))[_0x4695da(0x1a6)]('ما\x20هي\x20فكرة\x20الإقتراح\x20؟')[_0x4695da(0x1f1)](_0x4695da(0x1e5))['setMinLength'](0x1)[_0x4695da(0x1cc)](0xfa0)['setPlaceholder'](_0x4695da(0x1b8))[_0x4695da(0x1b5)](!![]))]);await _0x560150[_0x4695da(0x200)](_0x42130e);}}if(_0x560150['isModalSubmit']()){if(_0x560150[_0x4695da(0x213)]==='suggestions-modal'){const _0x500bb7=_0x560150[_0x4695da(0x1a3)][_0x4695da(0x1cf)](_0x4695da(0x1e4)),_0x3efad5=_0x560150[_0x4695da(0x1a3)]['getTextInputValue'](_0x4695da(0x1c5)),_0x551fd8=Math['floor'](Date[_0x4695da(0x1f7)]()/0x3e8)-0x20;let _0x51d00d=new Date();_0x51d00d[_0x4695da(0x1a8)](_0x51d00d[_0x4695da(0x1ae)]()+0x1);const _0x29a1d9=_0x560150[_0x4695da(0x21a)]['id'],_0x538181=new Date()[_0x4695da(0x1a9)](_0x4695da(0x1e3),{'timeZone':_0x4695da(0x20d)}),_0x5d8d65=_0x51d00d[_0x4695da(0x1ea)](_0x4695da(0x1e8),{'timeZone':_0x4695da(0x20d),'hour12':!![],'hour':_0x4695da(0x219),'minute':_0x4695da(0x219)}),_0x48b007=new MessageEmbed()[_0x4695da(0x1f8)]('#2c2c34')[_0x4695da(0x1f0)]({'name':_0x560150['user'][_0x4695da(0x1c8)],'iconURL':_0x560150['user']['displayAvatarURL']({'dynamic':!![]})})[_0x4695da(0x21e)](_0x4695da(0x1c3))[_0x4695da(0x1b1)](_0x4695da(0x1d0)+_0x500bb7+'```\x20\x0a**فكرة\x20الإقتراح**\x20```'+_0x3efad5+_0x4695da(0x1d8))[_0x4695da(0x1e6)]({'name':_0x4695da(0x1a5),'value':'⏳\x20قيد\x20المراجعة','inline':!![]},{'name':_0x4695da(0x20f),'value':'┕`'+_0x5d8d65+','+_0x538181+'`','inline':!![]},{'name':_0x4695da(0x201),'value':'<@'+_0x29a1d9+'>','inline':!![]},{'name':_0x4695da(0x214),'value':_0x4695da(0x1da)+_0x551fd8+_0x4695da(0x20c),'inline':!![]},{'name':_0x4695da(0x1ba),'value':'┕`👍\x200`','inline':!![]},{'name':'لم\x20يعجبني','value':_0x4695da(0x1d6),'inline':!![]}),_0x46a959=new MessageButton()[_0x4695da(0x1b6)](_0x4695da(0x1d5))[_0x4695da(0x1a6)](_0x4695da(0x1ef))[_0x4695da(0x1f1)](_0x4695da(0x209)),_0x4af1b9=new MessageButton()[_0x4695da(0x1b6)](_0x4695da(0x1fc))[_0x4695da(0x1a6)](_0x4695da(0x1ce))['setStyle']('DANGER'),_0x5dcb02=new MessageButton()[_0x4695da(0x1b6)](_0x4695da(0x216))[_0x4695da(0x1a6)]('👍')[_0x4695da(0x1f1)](_0x4695da(0x1fb)),_0x7c75e9=new MessageButton()[_0x4695da(0x1b6)](_0x4695da(0x1a4))[_0x4695da(0x1a6)]('👎')[_0x4695da(0x1f1)](_0x4695da(0x1be)),_0x5cae28=new MessageButton()[_0x4695da(0x1b6)](_0x4695da(0x1d3))['setLabel'](_0x4695da(0x19d))[_0x4695da(0x1f1)](_0x4695da(0x1f6)),_0x1fbb13=new MessageActionRow()[_0x4695da(0x1c9)](_0x46a959,_0x4af1b9,_0x5dcb02,_0x7c75e9,_0x5cae28),_0x356734=new MessageEmbed()[_0x4695da(0x1f8)](_0x4695da(0x1ed))['setTitle'](_0x4695da(0x1f9));_0x560150[_0x4695da(0x1d4)]({'embeds':[_0x356734],'ephemeral':!![]})[_0x4695da(0x1ac)](()=>{const _0x2c619b=_0x4695da,_0x4d66f1=_0x560150['client'][_0x2c619b(0x215)][_0x2c619b(0x21c)]['get']('1225142999651061770');_0x4d66f1&&_0x4d66f1[_0x2c619b(0x1b4)]()?_0x4d66f1['send']({'embeds':[_0x48b007],'components':[_0x1fbb13]}):console[_0x2c619b(0x208)](_0x2c619b(0x1bf));})[_0x4695da(0x1d9)](_0x2f3e8f=>console[_0x4695da(0x208)](_0x4695da(0x19f),_0x2f3e8f));}}}));function _0x5a9e(_0x30e7b0,_0x52765b){const _0x19316c=_0x1931();return _0x5a9e=function(_0x5a9e53,_0x10a925){_0x5a9e53=_0x5a9e53-0x19d;let _0x1da90f=_0x19316c[_0x5a9e53];return _0x1da90f;},_0x5a9e(_0x30e7b0,_0x52765b);}function _0x1931(){const _0x28d522=['component','2suggestions-input','```diff\x0a+👍\x20','```diff\x0a-👎\x20','username','addComponents','تاريخ\x20التفاعل\x20مع\x20الإقتراح','❌\x20مرفوض','setMaxLength','2AxkkCw','رفض','getTextInputValue','**عنوان\x20الإقتراح**\x20```','setThumbnail','has','report-modal22','reply','accept_sug22','┕`👎\x200`','#FF0000','```','catch','┕<t:','get','1219468300334137504','360PjVoKm','>\x20تم\x20قبول\x20هذا\x20اقتراح','تم\x20التفاعل\x20بواسطة','>\x20تم\x20التفاعل\x20مع\x20هذا\x20اقتراح','1799360qJCbTW','166572QlCJJp','en-US','suggestions-input','PARAGRAPH','addFields','32PuLzwN','en-EG','permissions','toLocaleTimeString','name','>\x20تم\x20رفض\x20هذا\x20اقتراح','#2c2c34','137569FKqvmx','قبول','setAuthor','setStyle','24080XaUvQa','قم\x20بكتابة\x20عنوان\x20الأقتراح\x20هنا','tag','send','DANGER','now','setColor','>\x20<#1225142999651061770>\x20تم\x20إرسال\x20اقتراحك\x20بنجاح','Unable\x20to\x20find\x20log\x20channel.','PRIMARY','unaccept_sug22','add','embeds','ما\x20هو\x20عنوان\x20التوضيحي\x20للأقتراح','showModal','تم\x20ارسال\x20الإقتراح\x20بواسطة','setDisabled','281574TjrpBm','value','#00FF00','تاريخ\x20قبول\x20الإقتراح','تمت\x20العملية\x20منذ','error','SUCCESS','floor','find',':R>','Africa/Cairo','1239118031733395558','تاريخ\x20ارسال\x20الإقتراح','member','تم\x20قبول\x20الإقتراح\x20بواسطة','\x20عدد\x20التفاعلات\x20الحاليه```','customId','الإقتراح\x20منذ','channels','like_sug','ADMINISTRATOR','1198041642368778273','numeric','user','suggestions-modal','cache','MessageEmbed','setTitle','لم\x20يعجبني','✅\x20مقبول','isButton','الإقتراح\x20الذي\x20تم\x20قبولة','إرسال\x20أقتراح\x20او\x20ملاحظة\x20؟','ليس\x20لديك\x20صلحية\x20للقيام\x20بـ\x20هذا\x20الاجراء.','الإبلاغ\x20عن\x20الإقتراح','[رابط\x20الإقتراح](','حدث\x20خطأ\x20في\x20الرد:','┕`👎\x20','some','log','fields','dis_sug','الحالة','setLabel','3tKOZED','setHours','toLocaleDateString','الإقتراح\x20الذي\x20تم\x20رفضة','displayAvatarURL','then','message','getHours','guild','roles','setDescription','306852UyrWjS','77CeibEI','isText','setRequired','setCustomId','url','قم\x20بكتابة\x20فكرة\x20الإقتراح\x20هنا','493770GpfXRZ','أعجبني','update','الإقتراح\x20الذي\x20تم\x20التفاعل\x20معه','1184800280198533131','SECONDARY','لا\x20يمكن\x20العثور\x20على\x20القناة\x20أو\x20القناة\x20غير\x20صالحة.','split','components','1239118065954848813','>\x20📝\x20اقتراح\x20جديد'];_0x1931=function(){return _0x28d522;};return _0x1931();}
//sug report
(function(_0x19b8cf,_0x1e0c36){const _0x9e1ac3=_0x4412,_0x13af83=_0x19b8cf();while(!![]){try{const _0x233e1a=-parseInt(_0x9e1ac3(0xef))/0x1*(parseInt(_0x9e1ac3(0xd4))/0x2)+-parseInt(_0x9e1ac3(0xe3))/0x3+parseInt(_0x9e1ac3(0xf4))/0x4+parseInt(_0x9e1ac3(0xf2))/0x5+-parseInt(_0x9e1ac3(0x109))/0x6+-parseInt(_0x9e1ac3(0xde))/0x7*(-parseInt(_0x9e1ac3(0xc3))/0x8)+parseInt(_0x9e1ac3(0xdb))/0x9;if(_0x233e1a===_0x1e0c36)break;else _0x13af83['push'](_0x13af83['shift']());}catch(_0x16fdb){_0x13af83['push'](_0x13af83['shift']());}}}(_0x29a3,0x7e316),client['on']('interactionCreate',async _0x4c9b59=>{const _0x3a9845=_0x4412;if(_0x4c9b59['isButton']()){if(_0x4c9b59['customId']==='accept_sug'){if(!_0x4c9b59[_0x3a9845(0xf7)][_0x3a9845(0xcc)]['cache'][_0x3a9845(0xe9)](_0x3a9845(0xe2)))return _0x4c9b59[_0x3a9845(0x101)]({'content':'You\x20do\x20not\x20have\x20permission\x20to\x20do\x20that.','ephemeral':!![]});const _0x2fcfa0=_0x4c9b59[_0x3a9845(0xdd)][_0x3a9845(0xc0)][0x0];_0x2fcfa0[_0x3a9845(0xcd)]['find'](_0xe184a8=>_0xe184a8[_0x3a9845(0xf8)]===_0x3a9845(0xf3))[_0x3a9845(0xd1)]=_0x3a9845(0x103),_0x4c9b59[_0x3a9845(0xbe)]['setDisabled'](!![]),await _0x4c9b59[_0x3a9845(0xea)]({'embeds':[_0x2fcfa0],'components':[_0x4c9b59[_0x3a9845(0xdd)]['components'][0x0]]});}if(_0x4c9b59[_0x3a9845(0xc5)]==='unaccept_sug'){if(!_0x4c9b59[_0x3a9845(0xf7)][_0x3a9845(0xcc)][_0x3a9845(0xc8)][_0x3a9845(0xe9)](_0x3a9845(0xe2)))return _0x4c9b59[_0x3a9845(0x101)]({'content':_0x3a9845(0xcb),'ephemeral':!![]});const _0x4e2c30=_0x4c9b59[_0x3a9845(0xdd)]['embeds'][0x0];_0x4e2c30['fields']['find'](_0x1dcc7c=>_0x1dcc7c['name']===_0x3a9845(0xf3))[_0x3a9845(0xd1)]=_0x3a9845(0xf6),_0x4c9b59[_0x3a9845(0xbe)][_0x3a9845(0xd5)](!![]),await _0x4c9b59[_0x3a9845(0xea)]({'embeds':[_0x4e2c30],'components':[_0x4c9b59[_0x3a9845(0xdd)][_0x3a9845(0x104)][0x0]]});}if(_0x4c9b59[_0x3a9845(0xc5)]===_0x3a9845(0xdc)){const _0x156fe5=new Modal()[_0x3a9845(0xee)]('report-modal22')[_0x3a9845(0xce)]('الإبلاغ\x20عن\x20الإقتراح')[_0x3a9845(0x108)]([new MessageActionRow()[_0x3a9845(0x108)](new TextInputComponent()[_0x3a9845(0xee)](_0x3a9845(0xd6))[_0x3a9845(0xfd)]('ما\x20هو\x20سبب\x20أبلاغك\x20عن\x20الإقتراح\x20بإختصار')[_0x3a9845(0x105)](_0x3a9845(0xfc))[_0x3a9845(0xe0)](0x1)[_0x3a9845(0xc2)](0xc8)[_0x3a9845(0xed)](_0x3a9845(0xdf))[_0x3a9845(0xda)](!![])),new MessageActionRow()[_0x3a9845(0x108)](new TextInputComponent()[_0x3a9845(0xee)](_0x3a9845(0xc4))['setLabel'](_0x3a9845(0xfe))[_0x3a9845(0x105)]('PARAGRAPH')[_0x3a9845(0xe0)](0x1)[_0x3a9845(0xc2)](0xfa0)['setPlaceholder'](_0x3a9845(0xd7))[_0x3a9845(0xda)](!![]))]);await _0x4c9b59['showModal'](_0x156fe5);}}if(_0x4c9b59[_0x3a9845(0xd8)]()){if(_0x4c9b59[_0x3a9845(0xc5)]==='report-modal22'){const _0x32a6a4=_0x4c9b59[_0x3a9845(0xcd)][_0x3a9845(0xc9)](_0x3a9845(0xd6)),_0x1b4b02=_0x4c9b59[_0x3a9845(0xcd)][_0x3a9845(0xc9)](_0x3a9845(0xc4)),_0x14ed6d=Math[_0x3a9845(0xe6)](Date[_0x3a9845(0xe8)]()/0x3e8)-0x1b;let _0x3c81fe=new Date();_0x3c81fe[_0x3a9845(0x10a)](_0x3c81fe['getHours']()+0x1);const _0x19bc38=_0x4c9b59[_0x3a9845(0xbf)]['id'],_0x569dc8=new Date()[_0x3a9845(0xe4)](_0x3a9845(0xcf),{'timeZone':_0x3a9845(0xd2)}),_0x32ffab=_0x3c81fe['toLocaleTimeString'](_0x3a9845(0xe5),{'timeZone':_0x3a9845(0xd2),'hour12':!![],'hour':_0x3a9845(0xfa),'minute':'numeric'}),_0x23994e=new MessageEmbed()[_0x3a9845(0xe1)](_0x3a9845(0xd3))['setTitle']('>\x20📝\x20أبلاغ\x20جديد')[_0x3a9845(0xc1)](_0x3a9845(0x100)+_0x32a6a4+'```\x20\x0a**سبب\x20الإبلاغ**\x20```'+_0x1b4b02+'```')['addFields']({'name':'\u2003','value':'\u2003','inline':![]},{'name':_0x3a9845(0x106),'value':_0x3a9845(0xf9)+_0x32ffab+','+_0x569dc8+'`','inline':!![]},{'name':'تم\x20الإبلاغ\x20بواسطة','value':'<@'+_0x19bc38+'>','inline':!![]},{'name':'\u2003','value':'\u2003','inline':![]},{'name':_0x3a9845(0xc7),'value':_0x3a9845(0x102)+_0x14ed6d+_0x3a9845(0xeb),'inline':!![]},{'name':_0x3a9845(0xc6),'value':_0x3a9845(0xd0)+_0x4c9b59[_0x3a9845(0xdd)][_0x3a9845(0xf0)]+')','inline':!![]}),_0x3b2b3c=new MessageEmbed()[_0x3a9845(0xe1)](_0x3a9845(0xd3))[_0x3a9845(0xc1)](_0x3a9845(0x107));_0x4c9b59['reply']({'embeds':[_0x3b2b3c],'ephemeral':!![]})[_0x3a9845(0xec)](()=>{const _0x547419=_0x3a9845,_0x11ad42=_0x4c9b59[_0x547419(0xf1)]['channels'][_0x547419(0xc8)]['get'](_0x547419(0xd9));_0x11ad42&&_0x11ad42['isText']()?_0x11ad42[_0x547419(0xf5)]({'embeds':[_0x23994e]}):console[_0x547419(0xff)](_0x547419(0xe7));})[_0x3a9845(0xfb)](_0x5924de=>console[_0x3a9845(0xff)](_0x3a9845(0xca),_0x5924de));}}}));function _0x4412(_0x430128,_0x7dfedd){const _0x29a334=_0x29a3();return _0x4412=function(_0x4412ae,_0x548b91){_0x4412ae=_0x4412ae-0xbe;let _0x161749=_0x29a334[_0x4412ae];return _0x161749;},_0x4412(_0x430128,_0x7dfedd);}function _0x29a3(){const _0x3b9e9e=['addComponents','888828USjipN','setHours','component','user','embeds','setDescription','setMaxLength','8JfrwJX','2report-input','customId','الاقتراح\x20الذي\x20تم\x20الإبلاغ\x20عنه','الابلاغ\x20منذ','cache','getTextInputValue','حدث\x20خطأ\x20في\x20الرد:','You\x20do\x20not\x20have\x20permission\x20to\x20do\x20that.','roles','fields','setTitle','en-US','┕[Link\x20Here](','value','Africa/Cairo','#2c2c34','694fqRMPK','setDisabled','report-input','قم\x20بكتابة\x20بالتفصيل','isModalSubmit','1239106585738084352','setRequired','11484324zDxRMj','report-modal22','message','3241882KClYPL','قم\x20بكتابة\x20السبب\x20بإختصار','setMinLength','setColor','1218308274852728932','2018145LwERqX','toLocaleDateString','en-EG','floor','لا\x20يمكن\x20العثور\x20على\x20القناة\x20أو\x20القناة\x20غير\x20صالحة.','now','has','update',':R>','then','setPlaceholder','setCustomId','2622PDUGtF','url','client','1239885FAAGtw','Status','1041736hoLkQL','send','❌\x20Reject','member','name','┕`\x20','numeric','catch','SHORT','setLabel','ما\x20هو\x20السبب\x20بالتفصيل','error','**عنوان\x20الإبلاغ**\x20```','reply','┕<t:','✅\x20Accepted','components','setStyle','تاريخ\x20الإبلاغ','>\x20**تم\x20إرسال\x20بلاغك\x20للمسؤولين\x20وجاري\x20مراجعة\x20بلاغك**'];_0x29a3=function(){return _0x3b9e9e;};return _0x29a3();}
//ticket report
client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'accept_sug22') {
      // Checking if the user has the required permission
      if (!interaction.member.permissions.has('ADMINISTRATOR')) {
          return interaction.reply({ content: 'You do not have permission to do that.', ephemeral: true });
      }

      // Modifying the Embed
      const embed = interaction.message.embeds[0];
      embed.fields.find(field => field.name === '> Status').value = '┕✅ Accepted';
      
      // Disabling the button after clicking
      interaction.component.setDisabled(true);

      // Resending the message with modifications and updating the button
      await interaction.update({ embeds: [embed], components: [interaction.message.components[0]] });
    }
    if (interaction.customId === 'unaccept_sug22') {
      // Checking if the user has the required permission
      if (!interaction.member.permissions.has('ADMINISTRATOR')) {
          return interaction.reply({ content: 'You do not have permission to do that.', ephemeral: true });
      }

      // Modifying the Embed
      const embed = interaction.message.embeds[0];
      embed.fields.find(field => field.name === '> Status').value = '┕❌ Rejected';
      
      // Disabling the button after clicking
      interaction.component.setDisabled(true);

      // Resending the message with modifications and updating the button
      await interaction.update({ embeds: [embed], components: [interaction.message.components[0]] });
    }
    // Checking if the member has already voted

    // Check if the button is part of the voting system
    if (interaction.customId === 'ticket_rep') {
      const modal = new Modal()
        .setCustomId('ticket_rep')
        .setTitle('Send a Report to Administrators')
        .addComponents([
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('report-input')
              .setLabel('Report Title')
              .setStyle('SHORT')
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Write the reason for the report here')
              .setRequired(true),
          ),
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('2report-input')
              .setLabel('Please elaborate on the report')
              .setStyle('PARAGRAPH')
              .setMinLength(1)
              .setMaxLength(4000)
              .setPlaceholder('Write the report details here')
              .setRequired(true),
          ),
        ]);

      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'ticket_rep') {
      const response = interaction.fields.getTextInputValue('report-input');
      const response2 = interaction.fields.getTextInputValue('2report-input');
      const startTimestamp = Math.floor(Date.now() / 1000) - 27;
      let currentTime = new Date();
      currentTime.setHours(currentTime.getHours() + 1);
      const userId = interaction.user.id;
      const egyptianDate = new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' });
      const egyptianDate2 = currentTime.toLocaleTimeString('en-EG', { timeZone: 'Africa/Cairo', hour12: true, hour: 'numeric', minute: 'numeric' });
      
      const embed2 = new MessageEmbed()
        .setColor('#2c2c34')
        .setTitle('> 📝 New Report')
        .addFields(
            { name: '> Reason for Report', value: `\`\`\`${response}\`\`\``, inline: false },
            { name: '> Detailed Report', value: `\`\`\`${response2}\`\`\``, inline: false },
            { name: '> Status', value: `Pending Review ⏳┕`, inline: true },
            { name: '> Report Source', value: `┕[Link Here](${interaction.message.url})`, inline: true },
            { name: '> Submitted by', value: `┕<@${userId}>`, inline: true },
            { name: '> Report Submitted Since', value: `┕<t:${startTimestamp}:R>`, inline: true },
            { name: '> Report Submission Date', value: `┕\`${egyptianDate}\``, inline: true },
            { name: '> Report Submission Time', value: `┕\`${egyptianDate2}\``, inline: true },
        );
      
      const accept_sug = new MessageButton()
          .setCustomId('accept_sug22')
          .setLabel('Accept')
          .setStyle('SUCCESS')

      const unaccept_sug = new MessageButton()
          .setCustomId('unaccept_sug22')
          .setLabel('Reject')
          .setStyle('DANGER');
      
      const row1 = new MessageActionRow()
      .addComponents(accept_sug, unaccept_sug);

      // Sending a message in Embed format
      const embed = new MessageEmbed()
        .setColor('#2c2c34')
        .setTitle('> Your report has been successfully submitted to the administrators \n> Your report is under review')

      interaction.reply({ embeds: [embed], ephemeral: true })
        .then(() => {
          // Sending a message to the specified channel in Embed format
          const channel = interaction.client.channels.cache.get('1240119300044619817');
          if (channel && channel.isText()) {
            channel.send({ embeds: [embed2], components: [row1] });
          } else {
            console.error('Channel not found or invalid channel.');
          }
        })
        .catch(error => console.error('Error in response:', error));
    }
  }
});

//send msg embed
function _0x3843(_0x2070fc,_0x1c16a2){const _0x4bc53e=_0x4bc5();return _0x3843=function(_0x3843c2,_0x32e8a0){_0x3843c2=_0x3843c2-0x122;let _0x3e0c07=_0x4bc53e[_0x3843c2];return _0x3e0c07;},_0x3843(_0x2070fc,_0x1c16a2);}(function(_0x1b10f0,_0x4f4e6d){const _0x2b9e74=_0x3843,_0x1ec6fb=_0x1b10f0();while(!![]){try{const _0x43e330=parseInt(_0x2b9e74(0x143))/0x1*(parseInt(_0x2b9e74(0x13d))/0x2)+-parseInt(_0x2b9e74(0x133))/0x3+-parseInt(_0x2b9e74(0x136))/0x4*(-parseInt(_0x2b9e74(0x13c))/0x5)+parseInt(_0x2b9e74(0x149))/0x6+-parseInt(_0x2b9e74(0x12c))/0x7*(parseInt(_0x2b9e74(0x123))/0x8)+-parseInt(_0x2b9e74(0x137))/0x9+parseInt(_0x2b9e74(0x128))/0xa*(-parseInt(_0x2b9e74(0x13e))/0xb);if(_0x43e330===_0x4f4e6d)break;else _0x1ec6fb['push'](_0x1ec6fb['shift']());}catch(_0x574951){_0x1ec6fb['push'](_0x1ec6fb['shift']());}}}(_0x4bc5,0xbfebc),client['on']('interactionCreate',async _0x59fafb=>{const _0x1079a3=_0x3843;if(_0x59fafb['isButton']()){if(_0x59fafb[_0x1079a3(0x124)]===_0x1079a3(0x12e)){const _0x91a892=new Modal()['setCustomId'](_0x1079a3(0x12b))[_0x1079a3(0x139)](_0x1079a3(0x12f))[_0x1079a3(0x144)]([new MessageActionRow()[_0x1079a3(0x144)](new TextInputComponent()[_0x1079a3(0x141)](_0x1079a3(0x125))[_0x1079a3(0x122)](_0x1079a3(0x146))[_0x1079a3(0x145)](_0x1079a3(0x12d))[_0x1079a3(0x127)](0x1)['setMaxLength'](0xc8)['setPlaceholder'](_0x1079a3(0x148))[_0x1079a3(0x126)](![])),new MessageActionRow()[_0x1079a3(0x144)](new TextInputComponent()[_0x1079a3(0x141)](_0x1079a3(0x131))[_0x1079a3(0x122)](_0x1079a3(0x132))[_0x1079a3(0x145)](_0x1079a3(0x13b))[_0x1079a3(0x127)](0x1)['setMaxLength'](0xfa0)[_0x1079a3(0x135)](_0x1079a3(0x13a))[_0x1079a3(0x126)](!![]))]);await _0x59fafb[_0x1079a3(0x140)](_0x91a892);}}if(_0x59fafb['isModalSubmit']()){if(_0x59fafb[_0x1079a3(0x124)]===_0x1079a3(0x12b)){const _0x2a0097=_0x59fafb[_0x1079a3(0x13f)]['getTextInputValue'](_0x1079a3(0x125)),_0xb7bb4e=_0x59fafb[_0x1079a3(0x13f)][_0x1079a3(0x12a)](_0x1079a3(0x131));_0x59fafb[_0x1079a3(0x134)]({'content':_0x1079a3(0x142),'ephemeral':!![]})['then'](()=>{const _0x562c8b=_0x1079a3,_0x51fc97=new MessageEmbed()['setColor'](_0x562c8b(0x129))[_0x562c8b(0x139)](''+_0x2a0097)['setDescription'](''+_0xb7bb4e);_0x59fafb['channel'][_0x562c8b(0x147)]({'embeds':[_0x51fc97]});})[_0x1079a3(0x138)](_0x11faa8=>console['error'](_0x1079a3(0x130),_0x11faa8));}}}));function _0x4bc5(){const _0x525b97=['Send\x20Message\x20Embed','حدث\x20خطأ\x20في\x20الرد:','2send-msg-input','Add\x20Title\x20/\x20Yes\x20Required','2567406LgNAqZ','reply','setPlaceholder','103492SwWFLu','10116549DpnZmh','catch','setTitle','Enter\x20Description\x20Here','PARAGRAPH','300CPvslT','2989612fJLgPt','3086237KMXazW','fields','showModal','setCustomId','Message\x20Has\x20Been\x20Sent\x20Successfully','1gJbpuh','addComponents','setStyle','Add\x20Title\x20/\x20Not\x20Required','send','Enter\x20Title\x20Here','6205986vHWuLw','setLabel','257704mMwtkO','customId','send-msg-input','setRequired','setMinLength','40wKzgGb','#2c2c34','getTextInputValue','send-msg-modal','42UkLlQg','SHORT','sendmsgembed'];_0x4bc5=function(){return _0x525b97;};return _0x4bc5();}
//send msg post
const _0x304bcd=_0x14ac;function _0x85de(){const _0x562e73=['error','catch','Send\x20Message\x20Post','setMaxLength','getTextInputValue','isButton','setTitle','4046903DJkBjV','setStyle','230675rKiwXu','180BJeqSq','send-msg-input','3157mdeRPB','1069208evpRMC','3260AbQQHJ','setLabel','customId','Answer','setRequired','sendmsgpost','52076mgTWaL','setPlaceholder','Enter\x20Message\x20Here','channel','ERORR:','addComponents','send','interactionCreate','60900QvEXpX','92zviMyz','6joUoEj','setCustomId','SHORT','2307429tdCigS','then','setMinLength','send-msg-modal'];_0x85de=function(){return _0x562e73;};return _0x85de();}function _0x14ac(_0x104a6f,_0xb1c1ee){const _0x85de1c=_0x85de();return _0x14ac=function(_0x14ac86,_0x557e93){_0x14ac86=_0x14ac86-0x112;let _0x5e597f=_0x85de1c[_0x14ac86];return _0x5e597f;},_0x14ac(_0x104a6f,_0xb1c1ee);}(function(_0x2bfcba,_0x5d552b){const _0x5e92e6=_0x14ac,_0x401acd=_0x2bfcba();while(!![]){try{const _0x3cfbf3=parseInt(_0x5e92e6(0x112))/0x1*(-parseInt(_0x5e92e6(0x121))/0x2)+-parseInt(_0x5e92e6(0x133))/0x3*(parseInt(_0x5e92e6(0x118))/0x4)+-parseInt(_0x5e92e6(0x132))/0x5*(-parseInt(_0x5e92e6(0x122))/0x6)+-parseInt(_0x5e92e6(0x130))/0x7+-parseInt(_0x5e92e6(0x136))/0x8+parseInt(_0x5e92e6(0x125))/0x9+parseInt(_0x5e92e6(0x120))/0xa*(parseInt(_0x5e92e6(0x135))/0xb);if(_0x3cfbf3===_0x5d552b)break;else _0x401acd['push'](_0x401acd['shift']());}catch(_0x524918){_0x401acd['push'](_0x401acd['shift']());}}}(_0x85de,0x637aa),client['on'](_0x304bcd(0x11f),async _0x85e582=>{const _0x5c7b95=_0x304bcd;if(_0x85e582[_0x5c7b95(0x12e)]()){if(_0x85e582['customId']===_0x5c7b95(0x117)){const _0x24945d=new Modal()[_0x5c7b95(0x123)](_0x5c7b95(0x128))[_0x5c7b95(0x12f)](_0x5c7b95(0x12b))[_0x5c7b95(0x11d)]([new MessageActionRow()['addComponents'](new TextInputComponent()[_0x5c7b95(0x123)](_0x5c7b95(0x134))[_0x5c7b95(0x113)](_0x5c7b95(0x115))[_0x5c7b95(0x131)](_0x5c7b95(0x124))[_0x5c7b95(0x127)](0x1)[_0x5c7b95(0x12c)](0x7d0)[_0x5c7b95(0x119)](_0x5c7b95(0x11a))[_0x5c7b95(0x116)](!![]))]);await _0x85e582['showModal'](_0x24945d);}}if(_0x85e582['isModalSubmit']()){if(_0x85e582[_0x5c7b95(0x114)]===_0x5c7b95(0x128)){const _0x466fdc=_0x85e582['fields'][_0x5c7b95(0x12d)](_0x5c7b95(0x134));_0x85e582['reply']({'content':'Message\x20Has\x20Been\x20Sent\x20Successfully','ephemeral':!![]})[_0x5c7b95(0x126)](()=>{const _0x211083=_0x5c7b95;_0x85e582[_0x211083(0x11b)][_0x211083(0x11e)](''+_0x466fdc);})[_0x5c7b95(0x12a)](_0x153ee5=>console[_0x5c7b95(0x129)](_0x5c7b95(0x11c),_0x153ee5));}}}));
//remove member form the ticket
const _0x470a9b=_0x4c87;(function(_0x529ac2,_0x1a4b8d){const _0x1c9ac4=_0x4c87,_0x46d5ad=_0x529ac2();while(!![]){try{const _0x120299=parseInt(_0x1c9ac4(0x1e8))/0x1+parseInt(_0x1c9ac4(0x20d))/0x2+-parseInt(_0x1c9ac4(0x1fc))/0x3*(parseInt(_0x1c9ac4(0x212))/0x4)+-parseInt(_0x1c9ac4(0x209))/0x5*(parseInt(_0x1c9ac4(0x20e))/0x6)+parseInt(_0x1c9ac4(0x1db))/0x7+parseInt(_0x1c9ac4(0x1ee))/0x8+parseInt(_0x1c9ac4(0x213))/0x9*(parseInt(_0x1c9ac4(0x1f9))/0xa);if(_0x120299===_0x1a4b8d)break;else _0x46d5ad['push'](_0x46d5ad['shift']());}catch(_0x3007a5){_0x46d5ad['push'](_0x46d5ad['shift']());}}}(_0x438b,0xe41ce),client['on'](_0x470a9b(0x1e0),async _0x167061=>{const _0x1bcf0=_0x470a9b;if(_0x167061[_0x1bcf0(0x218)]()){if(_0x167061[_0x1bcf0(0x1e9)]==='remove-mem-button'){const _0x204ef3=new Modal()[_0x1bcf0(0x1ff)](_0x1bcf0(0x207))[_0x1bcf0(0x20f)](_0x1bcf0(0x1f7))[_0x1bcf0(0x1fb)]([new MessageActionRow()[_0x1bcf0(0x1fb)](new TextInputComponent()[_0x1bcf0(0x1ff)](_0x1bcf0(0x20a))[_0x1bcf0(0x1f2)](_0x1bcf0(0x1e4))[_0x1bcf0(0x208)]('SHORT')[_0x1bcf0(0x204)](0x4)[_0x1bcf0(0x1e3)](0x1e)[_0x1bcf0(0x216)](_0x1bcf0(0x1e7))[_0x1bcf0(0x1ec)](!![]))]);await _0x167061['showModal'](_0x204ef3);}}if(_0x167061[_0x1bcf0(0x205)]()){if(_0x167061[_0x1bcf0(0x1e9)]===_0x1bcf0(0x207)){const _0x56a694=_0x167061['fields'][_0x1bcf0(0x21a)](_0x1bcf0(0x20a)),_0x282f48=_0x167061['channel'];try{await _0x282f48[_0x1bcf0(0x1fa)][_0x1bcf0(0x217)](_0x56a694);const _0x3289f7=await _0x167061[_0x1bcf0(0x20b)][_0x1bcf0(0x214)][_0x1bcf0(0x203)](_0x56a694),_0x587aeb=Math[_0x1bcf0(0x1f8)](Date['now']()/0x3e8)-0x20,_0x77e19a=new Date()[_0x1bcf0(0x1da)](_0x1bcf0(0x211),{'timeZone':_0x1bcf0(0x1f1)}),_0x3cc0cc=new Date()[_0x1bcf0(0x20c)](_0x1bcf0(0x211),{'timeZone':_0x1bcf0(0x1f1)}),_0x55ef37=new MessageEmbed()[_0x1bcf0(0x215)](_0x1bcf0(0x1de))[_0x1bcf0(0x20f)](_0x1bcf0(0x1d9))[_0x1bcf0(0x201)](_0x3289f7['user'][_0x1bcf0(0x1f4)]({'dynamic':!![],'size':0x1000}))[_0x1bcf0(0x1ed)]({'name':_0x1bcf0(0x219),'value':_0x1bcf0(0x1fe)+_0x56a694+_0x1bcf0(0x206),'inline':!![]},{'name':_0x1bcf0(0x1f3),'value':_0x1bcf0(0x1f6)+_0x56a694+_0x1bcf0(0x1dc),'inline':!![]},{'name':_0x1bcf0(0x1f5),'value':_0x1bcf0(0x1fe)+_0x167061[_0x1bcf0(0x1e6)]['id']+_0x1bcf0(0x206),'inline':!![]},{'name':'The\x20Date','value':_0x1bcf0(0x1f0)+_0x77e19a+_0x1bcf0(0x200),'inline':!![]},{'name':'The\x20Time','value':_0x1bcf0(0x1f0)+_0x3cc0cc+_0x1bcf0(0x200),'inline':!![]},{'name':_0x1bcf0(0x1dd),'value':_0x1bcf0(0x210)+_0x587aeb+_0x1bcf0(0x1ea),'inline':!![]});_0x167061[_0x1bcf0(0x1df)]({'content':_0x1bcf0(0x1e2)+_0x56a694+'>\x20-\x20<@'+_0x167061['user']['id']+_0x1bcf0(0x1fd),'embeds':[_0x55ef37]});}catch(_0x55c6c0){const _0x2f79b2=_0x167061[_0x1bcf0(0x1e5)][_0x1bcf0(0x21a)](_0x1bcf0(0x20a)),_0x293dc6=new MessageEmbed()[_0x1bcf0(0x215)]('#2c2c34')[_0x1bcf0(0x20f)](_0x1bcf0(0x1eb))['addFields']({'name':_0x1bcf0(0x202),'value':_0x1bcf0(0x1ef)+_0x2f79b2+_0x1bcf0(0x1e1),'inline':!![]});_0x167061['reply']({'embeds':[_0x293dc6],'ephemeral':!![]});}}}}));function _0x4c87(_0x25d91b,_0x58fb6c){const _0x438be9=_0x438b();return _0x4c87=function(_0x4c877c,_0xb166f6){_0x4c877c=_0x4c877c-0x1d9;let _0x37c3e6=_0x438be9[_0x4c877c];return _0x37c3e6;},_0x4c87(_0x25d91b,_0x58fb6c);}function _0x438b(){const _0x4df8a3=['setThumbnail','Erorr\x20ID\x20-\x20Member\x20Not\x20Found','fetch','setMinLength','isModalSubmit','>**','remove-mem-modal','setStyle','25330csDvOP','remove-mem-input','guild','toLocaleTimeString','100418laicQQ','936ZpnBfT','setTitle','**┕<t:','en-EG','5644CuiLNk','1935KcXrrV','members','setColor','setPlaceholder','delete','isButton','Remove\x20Member','getTextInputValue','>\x20Ticket\x20Member\x20Remove\x20Successfully.','toLocaleDateString','11138022ObzBdn','`**','Remove\x20Since','#2c2c34','reply','interactionCreate','```','||<@','setMaxLength','Enter\x20the\x20ID\x20to\x20remove\x20member\x20from\x20the\x20ticket','fields','user','Enter\x20The\x20Member\x20ID\x20Here','815880RwNKtk','customId',':R>**','>\x20There\x20Is\x20An\x20Error\x20In\x20The\x20Member\x20ID','setRequired','addFields','2474840QklCbJ','```diff\x0a-\x20','**┕``','Africa/Cairo','setLabel','ID\x20Member','displayAvatarURL','Remove\x20Member\x20By','**`','Remove\x20Member\x20From\x20The\x20Ticket','floor','22350bORCkI','permissionOverwrites','addComponents','3237vtHbma','>||','**<@','setCustomId','``**'];_0x438b=function(){return _0x4df8a3;};return _0x438b();}
//add member in the ticket
const _0x5a05e4=_0x4d93;(function(_0x2d69f4,_0x126cd2){const _0x53c6f9=_0x4d93,_0x531825=_0x2d69f4();while(!![]){try{const _0x2648d2=-parseInt(_0x53c6f9(0x1b2))/0x1+-parseInt(_0x53c6f9(0x1df))/0x2*(-parseInt(_0x53c6f9(0x1ac))/0x3)+parseInt(_0x53c6f9(0x1dc))/0x4*(parseInt(_0x53c6f9(0x1cc))/0x5)+-parseInt(_0x53c6f9(0x1d3))/0x6*(parseInt(_0x53c6f9(0x1ef))/0x7)+-parseInt(_0x53c6f9(0x1f2))/0x8+-parseInt(_0x53c6f9(0x1b7))/0x9*(-parseInt(_0x53c6f9(0x1eb))/0xa)+-parseInt(_0x53c6f9(0x1c7))/0xb*(-parseInt(_0x53c6f9(0x1cb))/0xc);if(_0x2648d2===_0x126cd2)break;else _0x531825['push'](_0x531825['shift']());}catch(_0x5e615d){_0x531825['push'](_0x531825['shift']());}}}(_0x5e3b,0x88a77),client['on'](_0x5a05e4(0x1e1),async _0x5d5ff6=>{const _0x2c175e=_0x5a05e4;try{if(_0x5d5ff6[_0x2c175e(0x1b5)]()){if(_0x5d5ff6[_0x2c175e(0x1b8)]===_0x2c175e(0x1be)){const _0x2bcf44=new Modal()[_0x2c175e(0x1f0)]('add-modal')[_0x2c175e(0x1c1)](_0x2c175e(0x1b6))[_0x2c175e(0x1c4)]([new MessageActionRow()['addComponents'](new TextInputComponent()[_0x2c175e(0x1f0)](_0x2c175e(0x1d5))[_0x2c175e(0x1b1)](_0x2c175e(0x1ec))[_0x2c175e(0x1e8)]('SHORT')[_0x2c175e(0x1de)](0x4)[_0x2c175e(0x1ca)](0x1e)[_0x2c175e(0x1e9)](_0x2c175e(0x1d4))['setRequired'](!![]))]);await _0x5d5ff6[_0x2c175e(0x1e6)](_0x2bcf44);}}if(_0x5d5ff6['isModalSubmit']()){if(_0x5d5ff6[_0x2c175e(0x1b8)]==='add-modal'){const _0x44900a=_0x5d5ff6[_0x2c175e(0x1bd)][_0x2c175e(0x1c9)](_0x2c175e(0x1d5)),_0x39cb9a=_0x5d5ff6[_0x2c175e(0x1d8)],_0xdfb307=_0x39cb9a['members']['some'](_0x15e09e=>_0x15e09e['id']===_0x44900a);if(_0xdfb307){const _0x2096c8=new MessageEmbed()[_0x2c175e(0x1ce)](_0x2c175e(0x1cd))[_0x2c175e(0x1c1)](_0x2c175e(0x1e0))[_0x2c175e(0x1f1)]({'name':_0x2c175e(0x1c6),'value':_0x2c175e(0x1e7)+_0x44900a+'``**','inline':!![]},{'name':'The\x20Member','value':_0x2c175e(0x1db)+_0x44900a+_0x2c175e(0x1f3),'inline':!![]});_0x5d5ff6[_0x2c175e(0x1c0)]({'embeds':[_0x2096c8],'ephemeral':!![]});return;}const _0x354e28=await _0x5d5ff6[_0x2c175e(0x1da)]['members']['fetch'](_0x44900a),_0xadc03d=Math[_0x2c175e(0x1c2)](Date[_0x2c175e(0x1d1)]()/0x3e8)-0x20,_0x3f1788=new Date()[_0x2c175e(0x1b0)]('en-EG',{'timeZone':_0x2c175e(0x1c5)}),_0x586a64=new Date()['toLocaleTimeString'](_0x2c175e(0x1d0),{'timeZone':'Africa/Cairo'});if(_0x354e28){const _0xb6690d=new Permissions(['VIEW_CHANNEL','SEND_MESSAGES',_0x2c175e(0x1e2)]);await _0x39cb9a[_0x2c175e(0x1d2)][_0x2c175e(0x1bb)](_0x354e28,{'VIEW_CHANNEL':!![],'SEND_MESSAGES':!![],'ADD_REACTIONS':!![]});const _0x2a5081=new MessageEmbed()['setColor'](_0x2c175e(0x1cd))[_0x2c175e(0x1c1)]('>\x20The\x20person\x20has\x20been\x20successfully\x20added\x20to\x20the\x20ticket')[_0x2c175e(0x1d9)](_0x354e28[_0x2c175e(0x1e5)][_0x2c175e(0x1bc)]({'dynamic':!![],'size':0x1000}))[_0x2c175e(0x1f1)]({'name':_0x2c175e(0x1ee),'value':_0x2c175e(0x1cf)+_0x44900a+'>**','inline':!![]},{'name':'Person\x20ID','value':_0x2c175e(0x1dd)+_0x44900a+'`**','inline':!![]},{'name':_0x2c175e(0x1ba),'value':_0x2c175e(0x1cf)+_0x5d5ff6[_0x2c175e(0x1e5)]['id']+_0x2c175e(0x1f3),'inline':!![]},{'name':_0x2c175e(0x1d7),'value':_0x2c175e(0x1e7)+_0x3f1788+_0x2c175e(0x1bf),'inline':!![]},{'name':_0x2c175e(0x1b3),'value':_0x2c175e(0x1e7)+_0x586a64+'``**','inline':!![]},{'name':_0x2c175e(0x1e3),'value':_0x2c175e(0x1ea)+_0xadc03d+_0x2c175e(0x1af),'inline':!![]});_0x5d5ff6[_0x2c175e(0x1c0)]({'content':_0x2c175e(0x1c3)+_0x44900a+_0x2c175e(0x1e4)+_0x5d5ff6[_0x2c175e(0x1e5)]['id']+_0x2c175e(0x1ae),'embeds':[_0x2a5081]}),await _0x5d5ff6[_0x2c175e(0x1b9)]({'components':[]});}else _0x5d5ff6['reply']({'content':_0x2c175e(0x1d6),'ephemeral':!![]});}}}catch(_0x1c075a){const _0x398bc1=_0x5d5ff6[_0x2c175e(0x1bd)]['getTextInputValue'](_0x2c175e(0x1d5)),_0x15310f=new MessageEmbed()['setColor'](_0x2c175e(0x1cd))[_0x2c175e(0x1c1)](_0x2c175e(0x1ed))[_0x2c175e(0x1f1)]({'name':_0x2c175e(0x1c8),'value':_0x2c175e(0x1ad)+_0x398bc1+_0x2c175e(0x1b4),'inline':!![]});_0x5d5ff6[_0x2c175e(0x1c0)]({'embeds':[_0x15310f],'ephemeral':!![]});}}));function _0x4d93(_0x2a5d99,_0x4b5c27){const _0x5e3b31=_0x5e3b();return _0x4d93=function(_0x4d939a,_0x2bcdcf){_0x4d939a=_0x4d939a-0x1ac;let _0x13a496=_0x5e3b31[_0x4d939a];return _0x13a496;},_0x4d93(_0x2a5d99,_0x4b5c27);}function _0x5e3b(){const _0x644102=['153896nHsljU','**`','setMinLength','118AgehIC','>\x20Error','interactionCreate','ADD_REACTIONS','Added\x20ago','>\x20-\x20<@','user','showModal','**┕``','setStyle','setPlaceholder','**┕<t:','2652570CgKyib','enter\x20the\x20ID\x20to\x20add\x20member\x20to\x20the\x20ticket','>\x20There\x20is\x20an\x20error\x20in\x20the\x20person\x20identifier','Person\x20added\x20to\x20the\x20ticket','2968fZiXSR','setCustomId','addFields','5379952toCSNr','>**','44319GEooau','```diff\x0a-\x20','>||',':R>**','toLocaleDateString','setLabel','1071953CDzAdk','Time\x20added','```','isButton','Add\x20Member\x20In\x20The\x20Ticket','9SgLdoB','customId','update','Added\x20by','edit','displayAvatarURL','fields','add_member','``**','reply','setTitle','floor','||<@','addComponents','Africa/Cairo','This\x20Nember\x20Is\x20Already\x20On\x20The\x20Ticket','352FdDbLf','Error\x20Identifier\x20-\x20Person\x20not\x20found','getTextInputValue','setMaxLength','651252GpQzAj','35bVsgeI','#2c2c34','setColor','**<@','en-EG','now','permissionOverwrites','11868noRjCm','Enter\x20The\x20Member\x20ID\x20Here','add-input1','Person\x20not\x20found','Date\x20added','channel','setThumbnail','guild','**┕<@'];_0x5e3b=function(){return _0x644102;};return _0x5e3b();}
//rename ticket
function _0x48fa(_0x4dace4,_0x78dc44){const _0x108984=_0x1089();return _0x48fa=function(_0x48fa54,_0x529088){_0x48fa54=_0x48fa54-0x11b;let _0x3d4933=_0x108984[_0x48fa54];return _0x3d4933;},_0x48fa(_0x4dace4,_0x78dc44);}function _0x1089(){const _0x187a23=['isModalSubmit','35jxNbVp','setStyle','1296798tvrcve','addComponents','customId','has','edit','330606DtjTCP','setRequired','Enter\x20the\x20new\x20ticket\x20name','fields','setMinLength','2648936dQIiAr','error','setPlaceholder','setMaxLength','isButton','18402AUScpZ','message','#2c2c34','5942394iHXJPW','```','New\x20ticket\x20name','12280928OqkRsk','Rename\x20Ticket','SHORT','permissions','components','channel','rename-ticket-button','```diff\x0a+\x20','setCustomId','rename-ticket-input','reply','Old\x20ticket\x20name','interactionCreate','214gvnvNp','10949988aKRJJh','member','An\x20error\x20occurred:','forEach','```diff\x0a-\x20','name','showModal','I\x20don\x27t\x20have\x20permission\x20to\x20rename\x20channels!','rename-ticket-modal','setDisabled','MANAGE_CHANNELS'];_0x1089=function(){return _0x187a23;};return _0x1089();}const _0x476db2=_0x48fa;(function(_0xd9aecf,_0x1afcaf){const _0x16a1bd=_0x48fa,_0x51ae14=_0xd9aecf();while(!![]){try{const _0x25d346=parseInt(_0x16a1bd(0x149))/0x1+-parseInt(_0x16a1bd(0x135))/0x2*(-parseInt(_0x16a1bd(0x122))/0x3)+parseInt(_0x16a1bd(0x11d))/0x4+parseInt(_0x16a1bd(0x142))/0x5*(-parseInt(_0x16a1bd(0x144))/0x6)+parseInt(_0x16a1bd(0x136))/0x7+-parseInt(_0x16a1bd(0x128))/0x8+parseInt(_0x16a1bd(0x125))/0x9;if(_0x25d346===_0x1afcaf)break;else _0x51ae14['push'](_0x51ae14['shift']());}catch(_0x34ab56){_0x51ae14['push'](_0x51ae14['shift']());}}}(_0x1089,0xc9951),client['on'](_0x476db2(0x134),async _0x5eaf11=>{const _0x468c5e=_0x476db2;try{if(_0x5eaf11[_0x468c5e(0x121)]()){if(_0x5eaf11[_0x468c5e(0x146)]==='rename-ticket-button'){if(!hasClaimPermission(_0x5eaf11[_0x468c5e(0x137)])){await _0x5eaf11[_0x468c5e(0x132)]({'content':'You\x20do\x20not\x20have\x20permission\x20to\x20perform\x20this\x20action','ephemeral':!![]});return;}_0x5eaf11[_0x468c5e(0x123)]['components'][_0x468c5e(0x139)](_0x4db543=>{const _0x4bd5a5=_0x468c5e;_0x4db543[_0x4bd5a5(0x12c)][_0x4bd5a5(0x139)](_0x8e4268=>{const _0xebdda2=_0x4bd5a5;_0x8e4268[_0xebdda2(0x146)]===_0xebdda2(0x12e)&&_0x8e4268[_0xebdda2(0x13f)](!![]);});}),await _0x5eaf11[_0x468c5e(0x123)][_0x468c5e(0x148)]({'components':_0x5eaf11[_0x468c5e(0x123)][_0x468c5e(0x12c)]});const _0x2e2748=new Modal()['setCustomId']('rename-ticket-modal')['setTitle'](_0x468c5e(0x129))[_0x468c5e(0x145)]([new MessageActionRow()[_0x468c5e(0x145)](new TextInputComponent()[_0x468c5e(0x130)](_0x468c5e(0x131))['setLabel'](_0x468c5e(0x14b))[_0x468c5e(0x143)](_0x468c5e(0x12a))[_0x468c5e(0x11c)](0x1)[_0x468c5e(0x120)](0xf)[_0x468c5e(0x11f)]('Type\x20the\x20name\x20here')[_0x468c5e(0x14a)](!![]))]);await _0x5eaf11[_0x468c5e(0x13c)](_0x2e2748);}}if(_0x5eaf11[_0x468c5e(0x141)]()){if(_0x5eaf11[_0x468c5e(0x146)]===_0x468c5e(0x13e)){const _0xc848e4=_0x5eaf11[_0x468c5e(0x11b)]['getTextInputValue'](_0x468c5e(0x131));if(_0x5eaf11[_0x468c5e(0x137)][_0x468c5e(0x12b)][_0x468c5e(0x147)](_0x468c5e(0x140))){const _0x4a637c=_0x5eaf11[_0x468c5e(0x12d)][_0x468c5e(0x13b)];await _0x5eaf11[_0x468c5e(0x12d)]['setName'](_0xc848e4);const _0x30e2fb=new MessageEmbed()['setColor'](_0x468c5e(0x124))['setTitle']('>\x20Ticket\x20name\x20changed\x20successfully')['addFields']({'name':_0x468c5e(0x133),'value':_0x468c5e(0x13a)+_0x4a637c+_0x468c5e(0x126),'inline':!![]},{'name':_0x468c5e(0x127),'value':_0x468c5e(0x12f)+_0xc848e4+_0x468c5e(0x126),'inline':!![]});_0x5eaf11['reply']({'embeds':[_0x30e2fb],'ephemeral':!![]});}else _0x5eaf11[_0x468c5e(0x132)]({'content':_0x468c5e(0x13d),'ephemeral':!![]});}}}catch(_0x5383b){console[_0x468c5e(0x11e)](_0x468c5e(0x138),_0x5383b),_0x5eaf11[_0x468c5e(0x132)]({'content':'An\x20error\x20occurred\x20while\x20processing\x20your\x20request.\x20Please\x20try\x20again\x20later.','ephemeral':!![]});}}));













const _0x32288f=_0x1bbc;function _0x1bbc(_0x35413c,_0x2b53ae){const _0x259bf4=_0x259b();return _0x1bbc=function(_0x1bbce1,_0x20c904){_0x1bbce1=_0x1bbce1-0x1ad;let _0x337f06=_0x259bf4[_0x1bbce1];return _0x337f06;},_0x1bbc(_0x35413c,_0x2b53ae);}function _0x259b(){const _0xb6f970=['317655oqUrXy','You\x20do\x20not\x20have\x20permission\x20to\x20perform\x20this\x20action','setMaxLength','update','message','reply','3162502vsIsWS','interactionCreate','Note\x20added','setRequired','isModalSubmit','Please\x20enter\x20your\x20note',':R>\x20]┓**\x0a```','fields','embeds','getTextInputValue','setLabel','setTitle','addComponents','customId','An\x20error\x20occurred\x20while\x20processing\x20your\x20request.\x20Please\x20try\x20again\x20later.','1214869ZxFVuo','member','>\x20]\x20-\x20[\x20<t:','Type\x20your\x20note\x20here','setPlaceholder','6517644SaNkGF','addFields','240852hnmiZq','setMinLength','4045254PLgjkC','permissions','1425650yYwbqR','Add\x20Note','showModal','now','followUp','error','432oOdqKK','addnote-ticket-input','has','**┕[\x20<@','setCustomId','I\x20don\x27t\x20have\x20permission\x20to\x20add\x20a\x20note!','isButton','205KQPIrx'];_0x259b=function(){return _0xb6f970;};return _0x259b();}(function(_0x6956b6,_0x59ee48){const _0x599158=_0x1bbc,_0x2cb77a=_0x6956b6();while(!![]){try{const _0x153868=parseInt(_0x599158(0x1b0))/0x1+parseInt(_0x599158(0x1bb))/0x2+parseInt(_0x599158(0x1b9))/0x3+parseInt(_0x599158(0x1b5))/0x4+-parseInt(_0x599158(0x1c8))/0x5*(parseInt(_0x599158(0x1b7))/0x6)+-parseInt(_0x599158(0x1cf))/0x7+-parseInt(_0x599158(0x1c1))/0x8*(parseInt(_0x599158(0x1c9))/0x9);if(_0x153868===_0x59ee48)break;else _0x2cb77a['push'](_0x2cb77a['shift']());}catch(_0x458a54){_0x2cb77a['push'](_0x2cb77a['shift']());}}}(_0x259b,0xdc361),client['on'](_0x32288f(0x1d0),async _0x5405af=>{const _0x423dcd=_0x32288f;try{if(_0x5405af[_0x423dcd(0x1c7)]()){if(_0x5405af[_0x423dcd(0x1ae)]==='addnote-ticket-button'){if(!hasClaimPermission(_0x5405af[_0x423dcd(0x1b1)])){await _0x5405af[_0x423dcd(0x1ce)]({'content':_0x423dcd(0x1ca),'ephemeral':!![]});return;}const _0x9df028=new Modal()[_0x423dcd(0x1c5)]('addnote-ticket-modal')[_0x423dcd(0x1da)](_0x423dcd(0x1bc))[_0x423dcd(0x1ad)]([new MessageActionRow()[_0x423dcd(0x1ad)](new TextInputComponent()['setCustomId'](_0x423dcd(0x1c2))[_0x423dcd(0x1d9)](_0x423dcd(0x1d4))['setStyle']('PARAGRAPH')[_0x423dcd(0x1b8)](0x1)[_0x423dcd(0x1cb)](0x384)[_0x423dcd(0x1b4)](_0x423dcd(0x1b3))[_0x423dcd(0x1d2)](!![]))]);await _0x5405af[_0x423dcd(0x1bd)](_0x9df028);}}if(_0x5405af[_0x423dcd(0x1d3)]()){if(_0x5405af[_0x423dcd(0x1ae)]==='addnote-ticket-modal'){const _0xd9d1b6=_0x5405af[_0x423dcd(0x1d6)][_0x423dcd(0x1d8)](_0x423dcd(0x1c2));if(_0x5405af[_0x423dcd(0x1b1)][_0x423dcd(0x1ba)][_0x423dcd(0x1c3)]('MANAGE_CHANNELS')){const _0x4207b3=_0x5405af[_0x423dcd(0x1cd)][_0x423dcd(0x1d7)][0x0],_0x248b73=Math['floor'](Date[_0x423dcd(0x1be)]()/0x3e8)-0x2a;_0x4207b3[_0x423dcd(0x1b6)]({'name':_0x423dcd(0x1d1),'value':_0x423dcd(0x1c4)+_0x5405af[_0x423dcd(0x1b1)]['id']+_0x423dcd(0x1b2)+_0x248b73+_0x423dcd(0x1d5)+_0xd9d1b6+'```'}),await _0x5405af[_0x423dcd(0x1cc)]({'embeds':[_0x4207b3]}),await _0x5405af[_0x423dcd(0x1bf)]({'content':'Note\x20added\x20successfully','ephemeral':!![]});}else await _0x5405af['followUp']({'content':_0x423dcd(0x1c6),'ephemeral':!![]});}}}catch(_0x21fc4a){console[_0x423dcd(0x1c0)]('An\x20error\x20occurred:',_0x21fc4a),await _0x5405af[_0x423dcd(0x1bf)]({'content':_0x423dcd(0x1af),'ephemeral':!![]});}}));




















function _0x20bc(_0x325bb7,_0x49ccc9){const _0x62a078=_0x62a0();return _0x20bc=function(_0x20bc43,_0x1bb68c){_0x20bc43=_0x20bc43-0x99;let _0x591775=_0x62a078[_0x20bc43];return _0x591775;},_0x20bc(_0x325bb7,_0x49ccc9);}const _0x2c831d=_0x20bc;function _0x62a0(){const _0x431ca9=['showModal','send-msg-modal','setRequired','Send\x20Message\x20in\x20Ticket\x20by\x20Bot','34zAejFM','790pfcSin','send','SHORT','setTitle','getTextInputValue','setMaxLength','4403uUPvxH','addComponents','2916210wjPdes','20647IrItoV','setStyle','54157SWuAlk','setMinLength','reply','customId','Type\x20your\x20message\x20here','1314HdYEdC','11708HLGsJs','isModalSubmit','sendmsgpost','Please\x20enter\x20the\x20message\x20for\x20the\x20bot\x20to\x20send','interactionCreate','4083867mcXIby','2691848jdlXZt','setLabel','send-msg-input','isButton','setPlaceholder','catch','444uuIekJ','channel','setCustomId','An\x20error\x20occurred\x20while\x20responding:'];_0x62a0=function(){return _0x431ca9;};return _0x62a0();}(function(_0x1bc256,_0x372113){const _0x5ee644=_0x20bc,_0x5705d1=_0x1bc256();while(!![]){try{const _0x1a5859=-parseInt(_0x5ee644(0xb0))/0x1*(-parseInt(_0x5ee644(0xa4))/0x2)+-parseInt(_0x5ee644(0x9c))/0x3*(parseInt(_0x5ee644(0xb6))/0x4)+-parseInt(_0x5ee644(0xad))/0x5+parseInt(_0x5ee644(0xb5))/0x6*(parseInt(_0x5ee644(0xab))/0x7)+parseInt(_0x5ee644(0xbc))/0x8+parseInt(_0x5ee644(0xbb))/0x9+-parseInt(_0x5ee644(0xa5))/0xa*(parseInt(_0x5ee644(0xae))/0xb);if(_0x1a5859===_0x372113)break;else _0x5705d1['push'](_0x5705d1['shift']());}catch(_0xe4ca3b){_0x5705d1['push'](_0x5705d1['shift']());}}}(_0x62a0,0xa6fa7),client['on'](_0x2c831d(0xba),async _0xc2168=>{const _0x31fc04=_0x2c831d;if(_0xc2168[_0x31fc04(0x99)]()){if(_0xc2168[_0x31fc04(0xb3)]===_0x31fc04(0xb8)){const _0x51c6dc=new Modal()[_0x31fc04(0x9e)](_0x31fc04(0xa1))[_0x31fc04(0xa8)](_0x31fc04(0xa3))[_0x31fc04(0xac)]([new MessageActionRow()[_0x31fc04(0xac)](new TextInputComponent()[_0x31fc04(0x9e)](_0x31fc04(0xbe))[_0x31fc04(0xbd)](_0x31fc04(0xb9))[_0x31fc04(0xaf)](_0x31fc04(0xa7))[_0x31fc04(0xb1)](0x1)[_0x31fc04(0xaa)](0x7d0)[_0x31fc04(0x9a)](_0x31fc04(0xb4))[_0x31fc04(0xa2)](!![]))]);await _0xc2168[_0x31fc04(0xa0)](_0x51c6dc);}}if(_0xc2168[_0x31fc04(0xb7)]()){if(_0xc2168[_0x31fc04(0xb3)]===_0x31fc04(0xa1)){const _0x23bfe0=_0xc2168['fields'][_0x31fc04(0xa9)](_0x31fc04(0xbe));_0xc2168[_0x31fc04(0xb2)]({'content':'Message\x20sent\x20successfully','ephemeral':!![]})['then'](()=>{const _0x4d83e8=_0x31fc04;_0xc2168[_0x4d83e8(0x9d)][_0x4d83e8(0xa6)](''+_0x23bfe0);})[_0x31fc04(0x9b)](_0x34b73f=>console['error'](_0x31fc04(0x9f),_0x34b73f));}}}));



let ticketOpenerId;
client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ticketpanel') {
        const ticketOpenerId = message.author.id;   
        const selectMenuOptions = [
            {
                label: 'Support',
                value: 'ticket_1',
                description: 'Server Support Team',
                emoji: '<:icons8discordmoderatorprogramalu:1229007155089244160>'
            },
            {
                label: 'Conten・creator',
                value: 'ticket_2',
                description: 'To Apply for Content Creator',
                emoji: '<:yescheck:1228616254194061365>'
            },
            {
                label: 'staff',
                value: 'ticket_3',
                description: 'Ensuring Order and Support',
                emoji: '<:7697charm:1229651489757331617>'
            }
        ];
        const selectMenu = new MessageSelectMenu()
            .setCustomId('ticket_panel')
            .setPlaceholder('🎫 Please Choose The Specialty You Desire')
            .addOptions(selectMenuOptions);

        const row = new MessageActionRow().addComponents(selectMenu);

        const embed = new MessageEmbed()
            .setColor("#ff0808")
            .setThumbnail("https://cdn.discordapp.com/attachments/1239739793408266320/1240087533619118131/7957-aqua-mad.gif?ex=66454903&is=6643f783&hm=7f96dc53e4a60354318a9f53d2a13d4f2685956429df296aef5a85753fce2c12&")
            .setImage("https://cdn.discordapp.com/attachments/1239739793408266320/1240073630277304410/EvoBot-GeMk8pYiA.gif?ex=66453c10&is=6643ea90&hm=4bf60d70ffdd3440c572ce0f28a80cb37c6a8b770738ba422ac1fbec9878a334&")
            .setTitle(`Welcome To Server __${message.guild.name}__ Q U`)
            .setDescription(`Please choose the section you want \n God willing, Your desired content available on server.`);

        message.channel.send({ embeds: [embed], components: [row] });
    }
});





// Counter for ticket numbers
let ticketCounter = 1;
const userTickets = new Map();

// Define a set to store roles with permission to claim
const claimPermissions = new Set();

// Function to check if a member has permission to claim
function hasClaimPermission(member) {
    return member.roles.cache.some(role => claimPermissions.has(role.id));
}

// Add roles with permission to claim
// Replace 'role_id_1', 'role_id_2', etc. with the actual r
// هنا هيبقي الرولات اللي هتكون عندها صلحية انها تستخدم الازرار
claimPermissions.add('1240111350865465385');
claimPermissions.add('role_id');
claimPermissions.add('role_id');
claimPermissions.add('role_id');
claimPermissions.add('role_id');
// Add more roles as needed



// Map to store user ticket count
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu() && !interaction.isButton()) return;

    const { member, guild } = interaction;

   // استدعاء الدالة المناسبة بناءً على customId
    switch (interaction.customId) {
        /*
        case 'delete_ticket':
            await handleDeleteTicket(interaction, hasClaimPermission);
            break;
        case 'close_ticket2':
            await handleCloseMinu(interaction, hasClaimPermission);
            break;
        case 'confirm_close':
            await handleCloseTicket(interaction, hasClaimPermission);
            break;
            */
        case 'msg_control':
            await handleMsgControl(interaction, hasClaimPermission);
            break;
        case 'addmem_kikmem':
            await handleAddMemKikMem(interaction, hasClaimPermission);
            break;
        case 'msg_sendcontrol':
            await handleMsgSendControl(interaction, hasClaimPermission);
            break;
        case 'sendmemberid':
            await handleSendMemberId(interaction, hasClaimPermission);
            break;
        case 'sendmsgembed':
            await handleSendMsgEmbed(interaction, hasClaimPermission);
            break;
        case 'sendmsgdisabled':
            await handleSendMsgDisabled(interaction, hasClaimPermission);
            break;
        case 'sendmsgpost':
            await handleSendMsgPost(interaction, hasClaimPermission); // استدعاء دالة لإرسال رسالة عادية
            break;
        case 'msgdeleted':
            await handleMsgDeleted(interaction, hasClaimPermission);
            break;
            /*
        case 'rename-ticket':
            await handleRenameTicket(interaction, hasClaimPermission);
            break;
            */
        case 'add_note':
            await handleAddNote(interaction, hasClaimPermission); // تأكد من تمرير دالة التحقق من الصلاحية هنا
            break;
        case 'sendowntick':
            await handleSendOwnTick(interaction, hasClaimPermission); // Call the function for handling sendowntick interaction
            break;
        case 'claim_ticket':
            await handleClaimTicket(interaction, hasClaimPermission);
            break;
        case 'add_member':
            await handleAddMember(interaction, guild); // قم بتمرير ال guild الخاص بك هنا
            break;
        case 'remove_member':
            await handleRemoveMember(interaction, guild); // قم بتمرير ال guild الخاص بك هنا
            break;
        case 'transscript':
            await handleTranscript(interaction, guild); // قم بتمرير ال guild الخاص بك هنا
            break;
    }
  


// دالة لإرسال رسالة بـ Embed
async function sendEmbedMessage(interaction, content) {
    // إنشاء الـ Embed بناءً على النص المستلم
    const embed = {
        description: content,
        color: "#2c2c34", // يمكنك تعيين اللون كما تشاء
    };
    await interaction.channel.send({ embeds: [embed] });
}

// دالة لإرسال رسالة عادية
async function sendMessage(interaction, content) {
    await interaction.followUp({ content: content, ephemeral: true });
}


// التحقق من الضغط على زر "cancel_close"
function _0x4718(_0xed286f,_0x2bd6fb){var _0x543247=_0x5432();return _0x4718=function(_0x471837,_0x23df5d){_0x471837=_0x471837-0xd9;var _0x457a33=_0x543247[_0x471837];return _0x457a33;},_0x4718(_0xed286f,_0x2bd6fb);}function _0x5432(){var _0x42867d=['213390SRzltF','74310tRFpLm','65QbrDLA','10264KPhyNQ','60003PaRBlL','3720NNTMot','374VHfWMy','cancel_close','4248643DApbLP','customId','176vlaNeN','321hZVvsU','1894900aFuoLK'];_0x5432=function(){return _0x42867d;};return _0x5432();}var _0x268c44=_0x4718;(function(_0x287bf4,_0x7ae40a){var _0x26767a=_0x4718,_0x1b0f78=_0x287bf4();while(!![]){try{var _0x36d897=parseInt(_0x26767a(0xdf))/0x1+-parseInt(_0x26767a(0xde))/0x2*(-parseInt(_0x26767a(0xd9))/0x3)+-parseInt(_0x26767a(0xda))/0x4+parseInt(_0x26767a(0xdd))/0x5*(parseInt(_0x26767a(0xe0))/0x6)+-parseInt(_0x26767a(0xe3))/0x7+-parseInt(_0x26767a(0xe5))/0x8*(-parseInt(_0x26767a(0xdb))/0x9)+parseInt(_0x26767a(0xdc))/0xa*(parseInt(_0x26767a(0xe1))/0xb);if(_0x36d897===_0x7ae40a)break;else _0x1b0f78['push'](_0x1b0f78['shift']());}catch(_0x472738){_0x1b0f78['push'](_0x1b0f78['shift']());}}}(_0x5432,0x4be03));if(interaction[_0x268c44(0xe4)]===_0x268c44(0xe2)){await interaction['deleteReply']();return;}

// إذا كان الضغط على زر "close_id_note" ولم يكن "cancel_close"
function _0x5d72(_0x3092c6,_0x3940bb){const _0x3b4c95=_0x3b4c();return _0x5d72=function(_0x5d72e2,_0x51c7cc){_0x5d72e2=_0x5d72e2-0x19a;let _0x59a07a=_0x3b4c95[_0x5d72e2];return _0x59a07a;},_0x5d72(_0x3092c6,_0x3940bb);}const _0x289a2a=_0x5d72;function _0x3b4c(){const _0x1f8444=['cache','setName','setTitle','Cancel','createMessageComponentCollector','has','customId','values','confirm_close','\x0a\x20The\x20person\x20who\x20opened\x20the\x20ticket\x20closed\x20it.\x20Do\x20you\x20want\x20to\x20delete\x20it?\x0a\x0aTicket\x20hidden\x20from:\x0a','followUp','join','setLabel','930136RrmDDK','push','DANGER','permissions','3061976rYqrzy','addComponents','delete','member','132ppbHkf','**:\x20Ticket\x20closed\x20by','setDescription','Error\x20handling\x20confirm_close\x20button:','301000qAqxcl','30969UfpAbI','fetch','guild','setColor','delete_ticket','collect','Close','channel','Failed\x20to\x20process\x20the\x20request.','deferUpdate','deleted','**Loading...\x20Please\x20wait**','668538ZyBYij','name','message','3785049eTSFPf','11000stwLbm','end','setStyle','-closed','error','cancel_close','Are\x20you\x20sure\x20you\x20want\x20to\x20close\x20this\x20ticket?','SECONDARY','setCustomId','permissionOverwrites','close_id_note','35WYOykL','catch','1309MVuTDb'];_0x3b4c=function(){return _0x1f8444;};return _0x3b4c();}(function(_0x40b94c,_0x2f2dee){const _0x2feecf=_0x5d72,_0x3b82f0=_0x40b94c();while(!![]){try{const _0x1bbf75=-parseInt(_0x2feecf(0x19b))/0x1+-parseInt(_0x2feecf(0x1a3))/0x2*(parseInt(_0x2feecf(0x1a8))/0x3)+parseInt(_0x2feecf(0x19f))/0x4+parseInt(_0x2feecf(0x1c3))/0x5*(parseInt(_0x2feecf(0x1b4))/0x6)+-parseInt(_0x2feecf(0x1c5))/0x7*(-parseInt(_0x2feecf(0x1b8))/0x8)+parseInt(_0x2feecf(0x1b7))/0x9+-parseInt(_0x2feecf(0x1a7))/0xa;if(_0x1bbf75===_0x2f2dee)break;else _0x3b82f0['push'](_0x3b82f0['shift']());}catch(_0x133a13){_0x3b82f0['push'](_0x3b82f0['shift']());}}}(_0x3b4c,0x8dfd3));if(interaction[_0x289a2a(0x1cc)]===_0x289a2a(0x1c2)){const message=await interaction['reply']({'content':_0x289a2a(0x1be),'ephemeral':!![],'components':[new MessageActionRow()[_0x289a2a(0x1a0)](new MessageButton()[_0x289a2a(0x1c0)](_0x289a2a(0x1ce))[_0x289a2a(0x19a)](_0x289a2a(0x1ae))[_0x289a2a(0x1ba)]('DANGER'),new MessageButton()[_0x289a2a(0x1c0)](_0x289a2a(0x1bd))['setLabel'](_0x289a2a(0x1c9))[_0x289a2a(0x1ba)](_0x289a2a(0x1bf)))]}),filter=_0x100a07=>_0x100a07['customId']===_0x289a2a(0x1bd),collector=interaction['channel'][_0x289a2a(0x1ca)]({'filter':filter,'time':0x3a98});collector['on'](_0x289a2a(0x1ad),async _0xb89400=>{await _0xb89400['deferUpdate'](),await interaction['deleteReply']();}),collector['on'](_0x289a2a(0x1b9),async()=>{const _0x3d8d84=_0x289a2a;if(!message[_0x3d8d84(0x1b2)])await message[_0x3d8d84(0x1a1)]()[_0x3d8d84(0x1c4)](console[_0x3d8d84(0x1bc)]);});}else{if(interaction['customId']===_0x289a2a(0x1ce))try{await interaction[_0x289a2a(0x1b1)]();const loadingMessage=await interaction[_0x289a2a(0x1d0)]({'embeds':[new MessageEmbed()[_0x289a2a(0x1a5)](_0x289a2a(0x1b3))[_0x289a2a(0x1ab)]('#2c2c34')]});setTimeout(async()=>{const _0x2a79cd=_0x289a2a;await loadingMessage['delete']();const _0x1057d1=interaction[_0x2a79cd(0x1af)],_0x5aa375=_0x1057d1[_0x2a79cd(0x1c1)][_0x2a79cd(0x1c6)]['filter'](_0x2d62ba=>_0x2d62ba['type']===_0x2a79cd(0x1a2)),_0x448796=[];for(const _0x168800 of _0x5aa375[_0x2a79cd(0x1cd)]()){const _0x533968=await _0x1057d1[_0x2a79cd(0x1aa)]['members'][_0x2a79cd(0x1a9)](_0x168800['id']);!_0x533968[_0x2a79cd(0x19e)][_0x2a79cd(0x1cb)]('ADMINISTRATOR')&&(await _0x168800[_0x2a79cd(0x1a1)](),_0x448796[_0x2a79cd(0x19c)]('<@'+_0x533968['id']+'>'));}const _0x34739b=_0x448796['map']((_0x4cbbe5,_0x2bde21)=>_0x2bde21+0x1+'.\x20'+_0x4cbbe5),_0x3e46b5=_0x34739b[_0x2a79cd(0x1d1)]('\x0a'),_0x400fe1=new MessageEmbed()[_0x2a79cd(0x1ab)]('#2c2c34')[_0x2a79cd(0x1c8)]('>\x20🔒\x20This\x20ticket\x20is\x20closed')[_0x2a79cd(0x1a5)]('This\x20ticket\x20has\x20been\x20closed\x20by:\x20'+interaction[_0x2a79cd(0x1a2)]+_0x2a79cd(0x1cf)+_0x3e46b5),_0x3d58a8=new MessageButton()[_0x2a79cd(0x1c0)](_0x2a79cd(0x1ac))[_0x2a79cd(0x19a)]('🗑\x20Delete\x20Ticket')[_0x2a79cd(0x1ba)](_0x2a79cd(0x19d)),_0x43edda=new MessageActionRow()[_0x2a79cd(0x1a0)](_0x3d58a8);await _0x1057d1['send']({'embeds':[_0x400fe1],'components':[_0x43edda]}),!_0x1057d1[_0x2a79cd(0x1b5)]['includes'](_0x2a79cd(0x1bb))&&await _0x1057d1[_0x2a79cd(0x1c7)](_0x1057d1[_0x2a79cd(0x1b5)]+_0x2a79cd(0x1bb));},0x3e8),await interaction['followUp']({'content':'>\x20**Ticket\x20closed**\x20\x0a\x20>\x20**'+interaction[_0x289a2a(0x1a2)]+_0x289a2a(0x1a4),'ephemeral':!![]});}catch(_0x328954){console[_0x289a2a(0x1bc)](_0x289a2a(0x1a6),_0x328954[_0x289a2a(0x1b6)]),await interaction[_0x289a2a(0x1d0)]({'content':_0x289a2a(0x1b0),'ephemeral':!![]});}}

  const mentionList = [];
function _0x446b(){const _0x333a96=['6750096IWXPkw','delete_ticket','1163366QfmVWw','4355742axDwIJ','26943921DnCGnA','2203100EsGvMm','message','2734005tBwvcs','customId','Error\x20deleting\x20ticket:','9715608BSyBWj','1PPFAqC','4alaRrJ'];_0x446b=function(){return _0x333a96;};return _0x446b();}function _0x6ea1(_0x534685,_0x60d775){const _0x446bd5=_0x446b();return _0x6ea1=function(_0x6ea147,_0x33e3e4){_0x6ea147=_0x6ea147-0x83;let _0xd41f7d=_0x446bd5[_0x6ea147];return _0xd41f7d;},_0x6ea1(_0x534685,_0x60d775);}const _0xe441d6=_0x6ea1;(function(_0x510b48,_0x233885){const _0x469958=_0x6ea1,_0x13e529=_0x510b48();while(!![]){try{const _0x4d7500=-parseInt(_0x469958(0x8a))/0x1*(parseInt(_0x469958(0x8e))/0x2)+-parseInt(_0x469958(0x86))/0x3*(parseInt(_0x469958(0x8b))/0x4)+-parseInt(_0x469958(0x84))/0x5+-parseInt(_0x469958(0x8f))/0x6+parseInt(_0x469958(0x89))/0x7+-parseInt(_0x469958(0x8c))/0x8+parseInt(_0x469958(0x83))/0x9;if(_0x4d7500===_0x233885)break;else _0x13e529['push'](_0x13e529['shift']());}catch(_0xebc83d){_0x13e529['push'](_0x13e529['shift']());}}}(_0x446b,0xd6714));if(interaction[_0xe441d6(0x87)]===_0xe441d6(0x8d)){const channel=interaction['channel'];try{await channel['delete']();}catch(_0x3246b1){console['error'](_0xe441d6(0x88),_0x3246b1[_0xe441d6(0x85)]);}}

  
  

  
    const selectedOption = interaction.values[0]; // القيمة المحددة من القائمة

    // ابحث عن الخيار المحدد في selectMenuOptions
    const selectedDepartment = selectMenuOptions.find(option => option.value === selectedOption);

    if (!selectedDepartment) return;




  
  

const ticketType = selectedOption.split('_')[1]; // يستخرج نوع التذكرة من القيمة المحددة في القائمة المنسدلة
const categoryID = categoryIDs[selectedOption]; // يحدد معرف الفئة بناءً على القيمة المحددة في القائمة المنسدلة

/*/
if (userTickets.has(member.id) && userTickets.get(member.id) >= 3) {
    await interaction.reply({ content: 'You have already opened three tickets.', ephemeral: true });
    return;
}
/*/
const ticket_open_member = member.id;
const _0x1ef196=_0x5705;(function(_0x52d0dc,_0x51d3cc){const _0x1097ff=_0x5705,_0x5cc41b=_0x52d0dc();while(!![]){try{const _0xab526=parseInt(_0x1097ff(0x1fb))/0x1+-parseInt(_0x1097ff(0x1f6))/0x2+parseInt(_0x1097ff(0x1f1))/0x3+-parseInt(_0x1097ff(0x1ed))/0x4+-parseInt(_0x1097ff(0x1ee))/0x5*(parseInt(_0x1097ff(0x1ef))/0x6)+-parseInt(_0x1097ff(0x1f0))/0x7*(parseInt(_0x1097ff(0x1f9))/0x8)+-parseInt(_0x1097ff(0x1f2))/0x9*(-parseInt(_0x1097ff(0x1fc))/0xa);if(_0xab526===_0x51d3cc)break;else _0x5cc41b['push'](_0x5cc41b['shift']());}catch(_0x13ed9c){_0x5cc41b['push'](_0x5cc41b['shift']());}}}(_0x5bf5,0xdd206));function _0x5705(_0x3c9013,_0x43bcf6){const _0x5bf5f4=_0x5bf5();return _0x5705=function(_0x57055d,_0x1c233e){_0x57055d=_0x57055d-0x1eb;let _0x4dbed6=_0x5bf5f4[_0x57055d];return _0x4dbed6;},_0x5705(_0x3c9013,_0x43bcf6);}const channel=await guild[_0x1ef196(0x1f3)]['create'](selectedDepartment[_0x1ef196(0x1f4)]+'-'+ticketCounter,{'type':_0x1ef196(0x1fa),'permissionOverwrites':[{'id':guild[_0x1ef196(0x1fd)][_0x1ef196(0x1f8)],'deny':[_0x1ef196(0x1f5)]},{'id':member['id'],'allow':[_0x1ef196(0x1f5),'SEND_MESSAGES','ADD_REACTIONS']},{'id':client[_0x1ef196(0x1ec)]['id'],'allow':[_0x1ef196(0x1f5),'SEND_MESSAGES',_0x1ef196(0x1eb)]},{'id':selectedDepartment[_0x1ef196(0x1f7)],'allow':['VIEW_CHANNEL','SEND_MESSAGES',_0x1ef196(0x1eb)]}],'parent':categoryID});function _0x5bf5(){const _0x39f651=['3501242vEqPwu','roleticketid','everyone','5906008SHQRwv','text','126083dejLme','370HlNssy','roles','ADD_REACTIONS','user','3832260eczDAq','10YUlheW','3169494MKwmnn','7FUGGrb','2038860mUjsXr','1119762gevICC','channels','label','VIEW_CHANNEL'];_0x5bf5=function(){return _0x39f651;};return _0x5bf5();}

// قم بتعديل الرسالة الراجعة لتحتوي على الزر
// قم بتعديل الرسالة الراجعة لتحتوي على الزر
const replyMessage = `✔ Ticket Created <#${channel.id}> Ticket Number \`${ticketCounter}\``;

// قم بإنشاء صف واحد يحتوي على زر واحد
const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setLabel('Ticket Link')
			.setStyle('LINK') // يجعل الزر يفتح رابطًا
			.setURL(`https://discord.com/channels/${client.guilds.cache.first().id}/${channel.id}`)
	)
// قم بإنشاء صف واحد يحتوي على زر واحد
// قم بإنشاء صف واحد يحتوي على زر واحد
// ده الكلام اللي هيكون جوة التيكت من جوا
let currentTime = new Date();
currentTime.setHours(currentTime.getHours() + 1);
const egyptianDate = new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' });
const egyptianDate2 = currentTime.toLocaleTimeString('en-EG', { timeZone: 'Africa/Cairo', hour12: true, hour: 'numeric', minute: 'numeric' });
const startTimestamp = Math.floor(Date.now() / 1000) - 42;
let count = channelCounts.get(channel.parentId) || 0;
count++;
const user = member.user;
await interaction.reply({ content: replyMessage, components: [row], ephemeral: true });
const embed = new MessageEmbed()
    .setTitle(`> Welcome to ${member.guild.name} server`)
    .setImage("https://cdn.discordapp.com/attachments/1239739793408266320/1240073630893871196/EvoBot-VpcligOZh.gif?ex=66453c11&is=6643ea91&hm=de414f12d1c5d5e8156db6291c01f6d7b7932df349bb32774dd197879e92b433&")
    .setColor('#1c1c24')
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .addFields(
        { name: 'Q U E E N', value: `<@${ticket_open_member}>`, inline: true },
        { name: 'Claimed Ticket', value: `__Not Found__`, inline: true },
    );
  
    const closeButton = new MessageButton()
        .setCustomId('close_id_note')
        .setLabel('🔒 Close')
        .setStyle('DANGER')

    const renameButton = new MessageButton()
        .setCustomId('rename-ticket-button')
        .setLabel('🔄 Rename')
        .setStyle('PRIMARY');

    const addMemberButton = new MessageButton()
        .setCustomId('addmem_kikmem')
        .setLabel('👥 Member Control')
        .setStyle('PRIMARY');
  
    const transcButton = new MessageButton()
        .setCustomId('transscript')
        .setLabel('📜 Trancscript')
        .setStyle('PRIMARY');

    const claimButton = new MessageButton()
        .setCustomId('claim_ticket')
        .setLabel('🔖 Claim')
        .setStyle('SUCCESS');

    const noteButton = new MessageButton()
        .setCustomId('addnote-ticket-button')
        .setLabel('📌 Add Note')
        .setStyle('PRIMARY');
  
    const sendNotificationButton = new MessageButton()
        .setCustomId('msg_sendcontrol')
        .setLabel('✉️ Messgae Control')
        .setStyle('PRIMARY');
  
    const msgcontrolButton = new MessageButton()
        .setCustomId('msg_control')
        .setLabel('🛠️ Message Control')
        .setStyle('PRIMARY');
  
    const tikrepButton = new MessageButton()
        .setCustomId('ticket_rep')
        .setLabel('📝 Report')
        .setStyle('PRIMARY');
  
    const row1 = new MessageActionRow()
    .addComponents(closeButton, tikrepButton, msgcontrolButton, addMemberButton, claimButton);
    const row2 = new MessageActionRow()
    .addComponents(noteButton, renameButton, sendNotificationButton, transcButton);
    channel.send({ content: `||${member} - <@&${selectedDepartment.rolesupport}>||`, embeds: [embed], components: [row1, row2] });

    ticketCounter++;

    if (userTickets.has(member.id)) {
        userTickets.set(member.id, userTickets.get(member.id) + 1);
    } else {
        userTickets.set(member.id, 1);
    }
});
const channelCounts = new Map();















client.on('interactionCreate', async (interaction) => {
  if (interaction.isSelectMenu()) {
    const rule = rules.find(r => r.id === interaction.values[0]);
    const text = fs.readFileSync(rule.description, 'utf-8');
    const ruleEmbed = new MessageEmbed()
      .setColor(`#2c2c34`)
      .setTitle(`> ${rule.title}`)
      .setDescription(text)
    const message = await interaction.reply({ embeds: [ruleEmbed], ephemeral: true });
    
    // Add reaction directly to the replied message
  }
});



client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'bot') {
        const duration = moment.duration(message.client.uptime).format(" D[d], H[h], m[m]");
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Stats from \`${client.user.username}\``)
            .setDescription(``)
            .addFields(
                { name: ':ping_pong: Ping', value: `┕\`${Math.round(client.ws.ping)}ms\``, inline: true },
                { name: ':file_cabinet: Memory', value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``, inline: true },
                { name: ':homes: Servers', value: `┕\`${client.guilds.cache.size}\``, inline: true },
                { name: ':busts_in_silhouette: Users', value: `┕\`${client.users.cache.size}\``, inline: true },
                { name: ':robot: Version', value: `┕\`v${require("./package.json").version}\``, inline: true },
                { name: ':blue_book: Discord.js', value: `┕\`v${version}\``, inline: true },
                { name: ':green_book: Node', value: `┕\`${process.version}\``, inline: true },
                { name: ':clock1: Uptime', value: `┕\`${duration}\``, inline: true },
                { name: ':control_knobs: API Latency', value: `┕\`${(message.client.ws.ping)}ms\``, inline: true }
            );
        message.reply({ embeds: [embed] });
    }
});


client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "say")) {
    const args = message.content.slice(prefix.length + "say".length).trim();
    const user = message.author;
    if (!args) return message.reply("Please provide me a message! ⚠️");
    message.channel.send(args);
  }
});
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "edit")) {
    const args = message.content.slice(prefix.length + "edit".length).trim().split(' ');
    const messageId = args.shift(); // يستخرج معرف الرسالة من الوسائط
    const newContent = args.join(' '); // يجمع الباقي من الوسائط للحصول على النص الجديد
    if (!messageId || !newContent) return message.reply("Please provide a message ID and the new content to edit! ⚠️");
    
    try {
      const fetchedMessage = await message.channel.messages.fetch(messageId);
      
      if (fetchedMessage) {
        await fetchedMessage.edit(newContent);
        message.reply("Message edited successfully! ✅");
      } else {
        message.reply("Message not found or unable to edit! ⚠️");
      }
    } catch (error) {
      console.error("Error editing message:", error);
      message.reply("An error occurred while editing the message! ⚠️");
    }
  }
});


  /* Client when detects a message 
  then execute the code */
// إنشاء متغير global لتخزين الأعضاء الذين استخدموا الأمر مؤخرًا
const cooldowns = new Map();

client.on('messageCreate', async message => {
    // تأكد من أن الرسالة ليست من البوت
    if (message.author.bot) return;


    // فحص ما إذا كانت الرسالة تطلب الأمر 4help
    if (message.content === '!help') {
      
      await message.channel.sendTyping();
        // فحص ما إذا كان الشخص قد استخدم الأمر مؤخرًا
        if (cooldowns.has(message.author.id)) {
            const expirationTime = cooldowns.get(message.author.id);
            // فحص ما إذا كانت الفترة الزمنية المحددة للتأخير قد انتهت
            if (Date.now() < expirationTime) {
                const timeLeft = (expirationTime - Date.now()) / 1000;
                const replyMessage = await message.reply(`Please wait ${timeLeft.toFixed(1)} seconds before using the command again.`);
                
                // تعيين وقت لحذف الرسالة بعد انتهاء فترة الانتظار
                setTimeout(() => {
                    replyMessage.delete();
                }, timeLeft * 1000);

                return;
            }
        }

        // إذا كان بإمكان الشخص استخدام الأمر، قم بتعيين التأخير
        cooldowns.set(message.author.id, Date.now() + 5000); // تأخير لمدة 5 ثواني

        const embed = new MessageEmbed()
            .setColor('#2c2c34')
            .setTitle(`The \`BOT\` Is Under Development`)

        message.reply({ embeds: [embed] });
    }
});


/* Client when detects 
a new member join */
let tracker = "10";
  tracker = new inviteTracker(client);
	// "guildMemberAdd"  event to get full invite data
/*
tracker.on("guildMemberAdd", async (member, inviter, invite, error) => {
  const startTimestamp = Math.floor(Date.now() / 1000) - 28;
  const memberCount = member.guild.memberCount;
  // return when get error
  if(error) return console.error(error);
  // get the channel
  let channel = member.guild.channels.cache.get("1226361031060623400"),
Msg = (`
1. ${member.user} **- A new person has been invited to the server**
2. <@!${inviter.id}> **- Invited by**
3. **Number of invites -** **__${invite.count}__**
4. **Member count -** **__${memberCount}__**
5. **<t:${startTimestamp}:R> -** **Joined the server since**`);
// change welcome message when the member is a bot
if (member.user.bot)
        Msg = (`
1. ${member.user} **- A new bot has been invited to the server**
2. <@!${inviter.id}> **- Invited by**
3. **Number of invites -** **__${invite.count}__**
4. **Member count -** **__${memberCount}__**
5. **<t:${startTimestamp}:R> -** **Joined the server since**`);
// send welcome message
channel.send(Msg);
});
const welcomeRoomId = '1140455744098009148';
tracker = new inviteTracker(client);

// "guildMemberAdd"  event to get full invite data
tracker.on('guildMemberAdd', async (member, inviter, invite, error) => {
  let channelwelc = await db.get(`${member.guild.id}`)
  if(error) return console.error(error);
  if(!channelwelc) return;
  let channel = member.guild.channels.cache.get(channelwelc)
  let buffer_attach =  await generareCanvas(member)
  const attachment = new MessageAttachment(buffer_attach, 'welcome.png')
  const startTimestamp = Math.floor(Date.now() / 1000) - 42;
  const memberCount = member.guild.memberCount;

  // Fetch the description from the database
  let description = await db.get(`description_${member.guild.id}`);
const _0x2b58d6=_0x5383;function _0x5776(){const _0x55acac=['setImage','7mzyKus','3615gPqMab','210eEhAqT','user','108syyQrE','User\x20ID','get','Rules','guild','8pzZjRx','<@!','setTitle','47864sQjEiJ','floor','addFields','Member\x20Count','Welcome','send','count','error','__\x20Server','9YPgSvV','1956270WqMqHN','1037155WYKaqU','Joined\x20Discord','Dev\x20Instagram','cache','Dev2\x20Instagram','username','317801MmAOvg','4120232pUwazK','1219470XjWGLa','Invite\x20Number','channels','<t:','[Click\x20Here](https://www.instagram.com/ahm.depression/reels)',':R>','name','createdAt'];_0x5776=function(){return _0x55acac;};return _0x5776();}(function(_0x1bb3b2,_0x1e960c){const _0x11367f=_0x5383,_0x5ba258=_0x1bb3b2();while(!![]){try{const _0x57ee06=-parseInt(_0x11367f(0x1de))/0x1+parseInt(_0x11367f(0x1d4))/0x2*(parseInt(_0x11367f(0x1d3))/0x3)+parseInt(_0x11367f(0x1db))/0x4*(-parseInt(_0x11367f(0x1e9))/0x5)+parseInt(_0x11367f(0x1c9))/0x6*(parseInt(_0x11367f(0x1d2))/0x7)+-parseInt(_0x11367f(0x1c8))/0x8*(-parseInt(_0x11367f(0x1e7))/0x9)+-parseInt(_0x11367f(0x1e8))/0xa+-parseInt(_0x11367f(0x1c7))/0xb*(-parseInt(_0x11367f(0x1d6))/0xc);if(_0x57ee06===_0x1e960c)break;else _0x5ba258['push'](_0x5ba258['shift']());}catch(_0x21f281){_0x5ba258['push'](_0x5ba258['shift']());}}}(_0x5776,0x6d001));let embed=new MessageEmbed()[_0x2b58d6(0x1dd)]('>\x20<:TAG:1230615422852796566>\x20Welcome\x20to\x20__'+member[_0x2b58d6(0x1da)][_0x2b58d6(0x1cf)]+_0x2b58d6(0x1e6))[_0x2b58d6(0x1e0)]({'name':_0x2b58d6(0x1e2),'value':''+member[_0x2b58d6(0x1d5)],'inline':!![]},{'name':'Invited\x20By','value':_0x2b58d6(0x1dc)+inviter['id']+'>','inline':!![]},{'name':_0x2b58d6(0x1d9),'value':'<#1026875367740407929>','inline':!![]},{'name':_0x2b58d6(0x1d7),'value':'``'+member[_0x2b58d6(0x1d5)]['id']+'``','inline':!![]},{'name':_0x2b58d6(0x1e1),'value':'``'+memberCount+'``','inline':!![]},{'name':_0x2b58d6(0x1ca),'value':'``'+invite[_0x2b58d6(0x1e4)]+'``','inline':!![]},{'name':'Message\x20Since','value':_0x2b58d6(0x1cc)+startTimestamp+_0x2b58d6(0x1ce),'inline':!![]},{'name':_0x2b58d6(0x1c2),'value':_0x2b58d6(0x1cc)+Math[_0x2b58d6(0x1df)](member[_0x2b58d6(0x1d5)][_0x2b58d6(0x1d0)]/0x3e8)+_0x2b58d6(0x1ce),'inline':!![]},{'name':'Member\x20User','value':'``'+member[_0x2b58d6(0x1d5)][_0x2b58d6(0x1c6)]+'``','inline':!![]},{'name':'Website\x204\x20Season','value':'[Click\x20Here](https://bit.ly/4Season-Rp)','inline':!![]},{'name':_0x2b58d6(0x1c3),'value':_0x2b58d6(0x1cd),'inline':!![]},{'name':_0x2b58d6(0x1c5),'value':'[Click\x20Here](https://www.instagram.com/luffy_el_masry)','inline':!![]})['setColor']('#2F3136')[_0x2b58d6(0x1d1)]('attachment://welcome.png');function _0x5383(_0x1cf666,_0x497df4){const _0x5776d8=_0x5776();return _0x5383=function(_0x538399,_0x20f8a1){_0x538399=_0x538399-0x1c2;let _0x56e6e7=_0x5776d8[_0x538399];return _0x56e6e7;},_0x5383(_0x1cf666,_0x497df4);}const welcomeChannel=member['guild'][_0x2b58d6(0x1cb)][_0x2b58d6(0x1c4)][_0x2b58d6(0x1d8)](welcomeRoomId);welcomeChannel?welcomeChannel[_0x2b58d6(0x1e3)]({'content':'||'+member[_0x2b58d6(0x1d5)]+'||','embeds':[embed],'files':[attachment]}):console[_0x2b58d6(0x1e5)]('Welcome\x20channel\x20not\x20found\x20with\x20ID:\x20'+welcomeRoomId);
});


(function(_0x173414,_0x524ab2){const _0x4b3ec4=_0x1ca4,_0x1cc704=_0x173414();while(!![]){try{const _0x9047d0=-parseInt(_0x4b3ec4(0x1ee))/0x1*(-parseInt(_0x4b3ec4(0x1df))/0x2)+parseInt(_0x4b3ec4(0x1e9))/0x3*(-parseInt(_0x4b3ec4(0x1e6))/0x4)+-parseInt(_0x4b3ec4(0x1e5))/0x5*(-parseInt(_0x4b3ec4(0x1e3))/0x6)+-parseInt(_0x4b3ec4(0x1d9))/0x7+parseInt(_0x4b3ec4(0x1e0))/0x8*(-parseInt(_0x4b3ec4(0x1e4))/0x9)+-parseInt(_0x4b3ec4(0x1e8))/0xa+parseInt(_0x4b3ec4(0x1d8))/0xb*(parseInt(_0x4b3ec4(0x1ef))/0xc);if(_0x9047d0===_0x524ab2)break;else _0x1cc704['push'](_0x1cc704['shift']());}catch(_0x39c080){_0x1cc704['push'](_0x1cc704['shift']());}}}(_0x2483,0xf21b6));async function generareCanvas(_0x402aae){const _0x50ae2d=_0x1ca4,_0x507db0=await resolveImage(_0x402aae[_0x50ae2d(0x1d7)]['displayAvatarURL']({'size':0x800,'format':_0x50ae2d(0x1f2)})),_0x24623a=await resolveImage(_0x50ae2d(0x1e7)),{weirdToNormalChars:_0xc5a309}=require(_0x50ae2d(0x1ea)),_0x18672b=_0xc5a309(_0x402aae[_0x50ae2d(0x1d7)][_0x50ae2d(0x1eb)]);let _0x37da8b=new Canvas(0x400,0x1c2)[_0x50ae2d(0x1f1)](_0x24623a,0x0,0x0,0x400,0x1c2)['setColor']('#FFFFFF')[_0x50ae2d(0x1f3)](0x200,0x9b,0x78)['printCircularImage'](_0x507db0,0x200,0x9b,0x73)[_0x50ae2d(0x1e2)]('center')[_0x50ae2d(0x1f0)]('70px\x20Discord')[_0x50ae2d(0x1ec)]('Welcome',0x200,0x163)[_0x50ae2d(0x1e2)](_0x50ae2d(0x1e1))[_0x50ae2d(0x1dc)](_0x50ae2d(0x1ed))[_0x50ae2d(0x1f0)](_0x50ae2d(0x1dd))[_0x50ae2d(0x1ec)](''+_0x18672b,0x200,0x18b)['setTextAlign'](_0x50ae2d(0x1e1))[_0x50ae2d(0x1dc)](_0x50ae2d(0x1ed))[_0x50ae2d(0x1f0)](_0x50ae2d(0x1de))['printText'](_0x50ae2d(0x1da),0x200,0x1ae);return _0x37da8b[_0x50ae2d(0x1db)]();}function _0x1ca4(_0x372dab,_0x2765d8){const _0x2483db=_0x2483();return _0x1ca4=function(_0x1ca4a6,_0x424d1e){_0x1ca4a6=_0x1ca4a6-0x1d7;let _0x242649=_0x2483db[_0x1ca4a6];return _0x242649;},_0x1ca4(_0x372dab,_0x2765d8);}function _0x2483(){const _0x14fac2=['By\x20:\x20Ahmed\x20Clipper\x20|\x20dsc.gg/clipper-tv','toBufferAsync','setColor','45px\x20Discordx','30px\x20Discord','978mVFxlP','8kczvxp','center','setTextAlign','372AxZlmt','7476687aEGOhr','49275rGLtbn','20bkVVOn','welcome.png','6369240AhdxlP','307677KCHlYq','weird-to-normal-chars','username','printText','#FFFFFF','1303IZmAJG','12SlIxrQ','setTextFont','printImage','png','printCircle','user','38785758tMPgiW','12614161xtuPEe'];_0x2483=function(){return _0x14fac2;};return _0x2483();}
*/
//ترحيب بالعضو بالخاص عند دخوله السيرفر
/*
client.on('guildMemberAdd', member => {
    const egyptianDate = new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' });
    const startTimestamp = Math.floor(Date.now() / 1000) - 27;

    const rulesButton = new MessageButton()
        .setStyle('LINK')
        .setLabel('قوانين السيرفر')
        .setURL('https://discord.com/channels/740299333697536061/1026875367740407929');
  
    const fourSeasonButton = new MessageButton()
        .setStyle('LINK')
        .setLabel('4 SEASON موقع الـ')
        .setURL('https://bit.ly/4Season-Rp'); // رابط موقع الـ 4 SEASON

    const instaButton = new MessageButton()
        .setStyle('LINK')
        .setLabel('الانستقرام')
        .setURL('https://www.instagram.com/luffy_el_masry'); // رابط موقع الـ 4 SEASON


    const buttonRow = new MessageActionRow()
        .addComponents([instaButton, fourSeasonButton, rulesButton]);

    const embed = new MessageEmbed()
        .setColor('#2c2c34')
        .setTitle('> #~ THE 4 SEASON اهلا بكم في سيرفر')
        .setDescription(`**نحن سعداء بوجودك معنا في السيرفر نتمنى لكم يوما سعيدا \n\n**`)
        .addFields(
            { name: '**1. يرجى قراءة القوانين لتجنب المشاكل في السيرفر**', value: `**<#1026875367740407929>**`, inline: false },
            { name: '**3. دخلت السيرفر منذ**', value: `**<t:${startTimestamp}:R>**`, inline: true },
            { name: '**2. تاريخ دخولك للسيرفر**', value: `**\`\`${egyptianDate}\`\`**`, inline: true }
          )    
        .setImage('https://media.discordapp.net/attachments/1144066420922138757/1223814208253067425/0211.png?ex=6636e84c&is=6624734c&hm=0af1c37910c115fb21490834ca311061320e69140f1018b913f21292051b7c43&format=webp&quality=lossless&width=1151&height=195&')
        .setThumbnail(member.user.displayAvatarURL({ size: 4096 }));

    member.send({ embeds: [embed], components: [buttonRow] })
        .then(() => console.log('Sent welcome message with buttons to', member.user.tag))
        .catch(console.error);
});
*/
client.login(process.env.TOKEN);
