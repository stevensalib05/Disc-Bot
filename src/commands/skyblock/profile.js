const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const hypixel = require('hypixel-api-reborn');
const { apiKey } = require('../../../config.json');
const hClient = new hypixel.Client(apiKey);
let fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription(`Gets the user's basic info of his Hypixel Skyblock Profile.`)
    .addStringOption((option) => option
    .setName('name')
        .setDescription('The name of the profile you want to search.')
        .setRequired(true)),
    
        
    async execute(interaction) {

            const playerName = await interaction.options.getString('name');
            await hClient.getPlayer(playerName);

            const allProfiles = await hClient.getSkyblockProfiles(playerName);
            const rawFilteredProfile = allProfiles.filter(SkyblockProfile => SkyblockProfile.selected);
            const filteredProfile = JSON.stringify(rawFilteredProfile);
            const fixedProfileJSON = filteredProfile.substring(1, filteredProfile.length -1);

            let obj = JSON.parse(fixedProfileJSON);

            // All variables that will be used inside the embed later on.
            let playerLevel = obj.me.level.toString();
            let playerSA = (Math.ceil((obj.me.skills.average) * 100)/100).toString();
            let playerCata = `${(Math.ceil((obj.me.dungeons.experience.level) * 100)/100).toString()}, ${obj.me.dungeons.secrets} Secrets`;
            let playerMP = obj.me.highestMagicalPower.toString();
            let playerBank = obj.banking.balance.toString();
            let playerSlayers = `${obj.me.slayer.zombie.level}/${obj.me.slayer.spider.level}/${obj.me.slayer.wolf.level}/${obj.me.slayer.enderman.level}/${obj.me.slayer.blaze.level}/${obj.me.slayer.vampire.level}`;

            let playerProfile = obj.me.profileName;
            let playerProfileType = obj.me.gameMode.charAt(0).toUpperCase() + obj.me.gameMode.slice(1);

            console.log(obj.me);

            const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${playerName}'s Profile Overview`)
            .setDescription(`Profile: **${playerProfile}**\nProfile Type: **${playerProfileType}**`)
            .addFields(
                { name: "Level:", value:  playerLevel },
                { name: "Skill Average:", value:  playerSA },
                { name: "Dungeon Level + Secrets:", value:  playerCata },
                { name: "Magical Power:", value:  playerMP },
                { name: "Current Bank:", value:  playerBank },
                { name: "Slayer Levels:", value: playerSlayers }
            )
            
            await interaction.reply({ embeds: [embed] });
        }
    
}