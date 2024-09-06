const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const hypixel = require('hypixel-api-reborn');
const { apiKey } = require('../../../config.json');
const hClient = new hypixel.Client(apiKey);

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
                {playerCata = `5${((obj.me.dungeons.experience.xp - 569800000)/200000000).toFixed(3)}`} else {
                    playerCata = `${(Math.ceil((obj.me.dungeons.experience.level) * 100)/100).toString()}.${(playerCataDecimal)}`
                };
            let playerSecrets =  `${obj.me.dungeons.secrets} Secrets`;

            let playerMP = obj.me.highestMagicalPower.toString();

            // Banking Variables. The switch statement allows the formatting of the numbers for aesthetic reasons,
            let playerBank; 
            if(obj.banking == undefined) {playerBank = 'Bank API Off'} else {playerBank = Math.round(obj.banking.balance).toString();}

            switch(playerBank.length) {
                case (10, 11, 12):
                    playerBank = `${(playerBank/1000000000)}B`;
                    if(obj.banking == undefined) {playerBank = 'Bank API Off'}
                    break;
                case (7, 8, 9):
                    playerBank = `${(playerBank/1000000)}M`;
                    if(obj.banking == undefined) {playerBank = 'Bank API Off'}
                    break;
                case (4, 5, 6):
                    playerBank = `${(playerBank/1000)}K`;
                    if(obj.banking == undefined) {playerBank = 'Bank API Off'}
                    break;
            }

            let playerSlayers = `${obj.me.slayer.zombie.level}/${obj.me.slayer.spider.level}/${obj.me.slayer.wolf.level}/${obj.me.slayer.enderman.level}/${obj.me.slayer.blaze.level}/${obj.me.slayer.vampire.level}`;

            let playerProfile = obj.me.profileName;
            let playerProfileType;
            if (obj.me.gameMode == null) { playerProfileType = 'Normal' } else
            { playerProfileType = obj.me.gameMode.charAt(0).toUpperCase() + obj.me.gameMode.slice(1) };

            console.log(obj.me.dungeons)

            // Embed being prepared for interaction.
            const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${playerName}'s Profile Overview`)
            .setDescription(`Profile: **${playerProfile}**\nProfile Type: **${playerProfileType}**`)
            .addFields(
                { name: "Level:", value:  playerLevel },
                { name: "Skill Average:", value:  playerSA },
                { name: "Dungeon Level:", value:  playerCata },
                { name: "Total Secrets:", value: playerSecrets },
                { name: "Magical Power:", value:  playerMP },
                { name: "Current Bank:", value:  playerBank },
                { name: "Slayer Levels:", value: playerSlayers }
            )
            
            await interaction.reply({ embeds: [embed] });
        }
    
}