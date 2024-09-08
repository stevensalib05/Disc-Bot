const { SlashCommandBuilder, EmbedBuilder, TimestampStyles } = require("discord.js");
const hypixel = require('hypixel-api-reborn');
const { apiKey } = require('../../../config.json');
const hClient = new hypixel.Client(apiKey);
const fs = require('fs');
const { time } = require("console");

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
            let playerSA = ((obj.me.skills.combat.level + obj.me.skills.farming.level + obj.me.skills.fishing.level + obj.me.skills.mining.level + obj.me.skills.foraging.level + obj.me.skills.enchanting.level + obj.me.skills.alchemy.level + obj.me.skills.carpentry.level + obj.me.skills.taming.level)/9).toFixed(3).toString();
            
            // Catacombs Variables: Had to be arranged this way to avoid issues such as progress = Infinity or not showing at all.
            let playerCata;
            let playerCataDecimal = ((obj.me.dungeons.experience.progress)/100).toString().slice(2,5);
            if(obj.me.dungeons.experience.progress == null) {playerCataDecimal = 0 };
            if(obj.me.dungeons.experience.level >= 55) 
                {playerCata = `55+`} else {
                    playerCata = `${(Math.ceil((obj.me.dungeons.experience.level) * 100)/100).toString()}.${(playerCataDecimal)}`
                };
            let playerSecrets =  obj.me.dungeons.secrets.toString();

            let playerMP = obj.me.highestMagicalPower.toString();

            // Banking Variables. The switch statement allows the formatting of the numbers for aesthetic reasons,
            let playerBank; 
            if(obj.banking == undefined) {playerBank = 'Bank API Off'} else {playerBank = Math.round(obj.banking.balance).toString();}

            switch(playerBank.length) {
                case 10:
                case 11:
                case 12:
                    playerBank = `${(playerBank/1000000000).toFixed(2)}B`;
                    if(obj.banking == undefined) {playerBank = 'Bank API Off'}
                    break;
                case 7:
                case 8:
                case 9:
                    playerBank = `${(playerBank/1000000).toFixed(2)}M`;
                    if(obj.banking == undefined) {playerBank = 'Bank API Off'}
                    break;
                case 4:
                case 5:
                case 6:
                    playerBank = `${(playerBank/1000).toFixed(2)}K`;
                    if(obj.banking == undefined) {playerBank = 'Bank API Off'}
                    break;
            }

            let playerSlayers = `${obj.me.slayer.zombie.level}/${obj.me.slayer.spider.level}/${obj.me.slayer.wolf.level}/${obj.me.slayer.enderman.level}/${obj.me.slayer.blaze.level}/${obj.me.slayer.vampire.level}`;

            let playerProfile = obj.me.profileName;
            let playerProfileType;
            if (obj.me.gameMode == null) { 
                playerProfileType = 'Normal' 
            } else { 
                playerProfileType = obj.me.gameMode.charAt(0).toUpperCase() + obj.me.gameMode.slice(1) 
            };
            let timeStamp = obj.me.firstJoinTimestamp.toString();
            let formattedTimestamp = `<t:${timeStamp.substring(0, timeStamp.length - 3)}>`

            // Pet Variables. This required way too damn much filtering and vars oml.
            let activePetInfo = obj.me.pets.filter(pets => pets.active);
            let activePetInfoJSON = JSON.stringify(activePetInfo)
            let activePetInfoJSONFixed = activePetInfoJSON.substring(1, JSON.stringify(activePetInfo).length - 1);
            let petObj = JSON.parse(activePetInfoJSONFixed)
            let activePet = petObj.type;
            if (activePet.includes('_')) {
                activePet = activePet.replace('_', ' ')
            }

            let hotmLevel = obj.me.hotm.experience.level.toString();

            console.log(obj.me);
            // Embed being prepared for interaction.
            const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${playerName}'s Profile Overview`)
            .setDescription(`Profile: **${playerProfile}**\nProfile Type: **${playerProfileType}**\nCreated at: **${formattedTimestamp}**`)
            .addFields(
                { name: "Level:", value:  playerLevel, inline: true },
                { name: "Skill Average:", value:  playerSA, inline: true },
                { name: "Dungeon Level:", value:  playerCata, inline: true },
                { name: "\t", value: "\t" },
                { name: "Total Secrets:", value: playerSecrets, inline: true },
                { name: "Highest MP:", value:  playerMP, inline: true },
                { name: "Current Bank:", value:  playerBank, inline: true },
                { name: "\t", value: "\t" },
                { name: "Slayer Levels:", value: playerSlayers, inline: true },
                { name: "Active Pet:", value: activePet, inline: true },
                { name: "HOTM Level:", value: hotmLevel, inline: true }


            )
            
            await interaction.reply({ embeds: [embed] });
        }
    
}