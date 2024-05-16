const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'tax',
    description: 'حسابة ضريبة الكريديت الخاصة بالبروبوت',
    options: [
        {
            name: 'amount',
            type: 'STRING',
            description: '[ 1K or 1M or 1B or 1T or 1Q] ادخل المبلغ الذي سيتم حساب الضريبة عليه, هذا مثال',
            required: true,
        },
    ],
    async execute(interaction) {
        const amountString = interaction.options.getString('amount');
        const amount = parseInt(amountString.replace(/[^0-9]/g, ''), 10);

        const args2 = amountString.toLowerCase().replace(/k/g, "000").replace(/m/g, "000000").replace(/b/g, "000000000").replace(/t/g, "000000000000").replace(/q/g, "000000000000000");
        const tax = Math.floor(args2 * (20 / 19) + 1);
        const tax2 = Math.floor(tax - args2);
        const tax3 = Math.floor(tax2 * (20 / 19) + 1);
        const tax4 = Math.floor(tax2 + tax3 + args2);

        if (!amount || isNaN(amount) || amount < 1) {
            const errorEmbed = new MessageEmbed()
                .setColor("#2c2c34")
                .setTitle(`> **❌ حدث خطأ**`)
                .setDescription(`\`\`\`الرجاء إدخال مبلغ صحيح\`\`\``);
            return interaction.reply({ embeds: [errorEmbed] });
        }

        const taxEmbed = new MessageEmbed()
            .setColor("#2c2c34")
            .setTitle(`> **✅ تم التحليل المالي الشامل للكريدت** 💰`)
            .addFields(
        { name: "\n\n1. المبلغ المطلوب", value: `\`\`\`${args2}\`\`\``, inline: true },
        { name: "2. ضريبة المبلغ فقط", value: `\`\`\`${tax2}\`\`\``, inline: true },
        { name: "3. المبلغ الإجمالي مع الضريبة", value: `\`\`\`${tax}\`\`\``, inline: true }
            );
        return interaction.reply({ embeds: [taxEmbed] });
    },
};
