const { SlashCommandBuilder, EmbedBuilder,  ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("fetchur")
    .setDescription(`Retrieves Fetchur's Daily Item.`),
    async execute(interaction) {
        const fetchur = await cheerio.fromURL('https://hypixel-skyblock.fandom.com/wiki/Fetchur');
        const itemAmount = fetchur('body > div:eq(3) > div:eq(3) > div:eq(2) > main > div:eq(2) > div:eq(1) > div > div > div:eq(1) > div > div > span:eq(0)').contents().toString();
        const item = fetchur('body > div:eq(3) > div:eq(3) > div:eq(2) > main > div:eq(2) > div:eq(1) > div > div > div:eq(1) > div > div > a:eq(1)').contents().toString();
        const itemPNG = fetchur('body > div:eq(3) > div:eq(3) > div:eq(2) > main > div:eq(2) > div:eq(1) > div > div > div:eq(1) > div > div > a:eq(0)').find('img').attr('data-src');
        const dayNumber = new Date().getDay();
        let dayText = '';
        switch(dayNumber) {
            case 0:
            dayText = `Sunday's Item`;
                break;
            case 1:
                dayText = `Monday's Item`;
                break;
            case 2:
                dayText = `Tuesday's Item`;
                break;
            case 3:
                dayText = `Wednesday's Item`;
                break;
            case 4:
                dayText = `Thursday's Item`;
                break;
            case 5:
                dayText = `Friday's Item`;
                break;
            case 6:
                dayText = `Saturday's Item`;
                break;
        }
        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Fetchur's Current Request:`)
        .addFields(
            { name: 'Item Wanted:', value: item },
            { name: 'Amount:', value: itemAmount }
        )
        .setThumbnail(itemPNG);
        interaction.reply({ embeds : [embed] });


    }
}