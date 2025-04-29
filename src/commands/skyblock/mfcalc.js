const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mfcalc")
    .setDescription("Calculates drop rates using the user's magic find and looting.")
    .addNumberOption((option) => option
        .setName("dropchance")
        .setDescription("Drop chance of the item (TYPE THE %)")
        .setRequired(true))
    .addNumberOption((option) => option
        .setName("magicfind")
        .setDescription("User's magic find.")
        .setRequired(true))
    .addNumberOption((option) => option
        .setName("lootinglevel")
        .setDescription("Killer's looting level")
        .setRequired(true))
    .addNumberOption((option) => option
        .setName("petluck")
        .setDescription("Calculates drop rates if it's a pet.")
        .setRequired(false)),
    async execute(interaction) {
        const dropChance = await interaction.options.getNumber("dropchance");
        const magicFind = await interaction.options.getNumber("magicfind");
        const lootingLevel = await interaction.options.getNumber("lootinglevel");
        const petLuck = interaction.options.getNumber("petluck");

        let dropChanceDecimal = dropChance / 100;
        let lootingRate = 1 + (0.15 * lootingLevel);
        
        // what the calculations is going on here
        let nonLootingDropRate = (dropChanceDecimal * (1 + (magicFind / 100)));
        let petLuckDropRate = (dropChanceDecimal * (1 + ((magicFind + petLuck) / 100)));
        let finalDropRate = nonLootingDropRate * lootingRate;
        let finalPetDropRate = petLuckDropRate * lootingRate;
        let finalDropRatePercent = finalDropRate * 100;
        let finalPetDropRatePercent = finalPetDropRate * 100;

        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Magic Find Calculator")
        .addFields(
            { name: "Final Drop Chance:", value: `${finalDropRatePercent}% (1 in ${(1/finalDropRate).toFixed(2)})` },
            {name: "Final Pet Drop Rate (If Applicable):", value: `${finalPetDropRatePercent}% (1 in ${(1/finalPetDropRate).toFixed(2)})` }
        )
        .setTimestamp()
        .setFooter({ text: 'Created by woqh and Unreal5trength. '});

        if (petLuck == null) {
            embed
            .setFields(
                { name: "Final Drop Chance:", value: `${finalDropRatePercent}% (1 in ${(1/finalDropRate).toFixed(2)})` }
            )
        }
        await interaction.reply({ embeds: [embed]} );
    }
}