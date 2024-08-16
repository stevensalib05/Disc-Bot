const { SlashCommandBuilder, EmbedBuilder,  ButtonBuilder, ButtonStyle, ButtonInteraction, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lfg")
        .setDescription("Creates a Looking for Group Embed."),
    async execute(interaction) {
        /* Buttons */
        const cata = new ButtonBuilder()
            .setCustomId('Catacombs')
            .setLabel('Catacombs')
            .setStyle(ButtonStyle.Primary)
        const kuudra = new ButtonBuilder()
            .setCustomId('Kuudra')
            .setLabel('Kuudra')
            .setStyle(ButtonStyle.Primary)
        const mineshaft = new ButtonBuilder()
            .setCustomId('Mineshaft')
            .setLabel('Mineshaft')
            .setStyle(ButtonStyle.Primary)
        const fishing = new ButtonBuilder()
            .setCustomId('Fishing')
            .setLabel('Fishing')
            .setStyle(ButtonStyle.Primary)
        const events = new ButtonBuilder()
            .setCustomId('Events')
            .setLabel('Events')
            .setStyle(ButtonStyle.Primary)  
        
        /* Catacombs & Master Mode Buttons*/

        const normal = new ButtonBuilder()
            .setCustomId('normal')
            .setLabel('Normal Mode')
            .setStyle(ButtonStyle.Secondary)
        const master = new ButtonBuilder()
            .setCustomId('master')
            .setLabel('Master Mode')
            .setStyle(ButtonStyle.Secondary)
        
        const Floor1 = new ButtonBuilder()
            .setCustomId('Floor1')
            .setLabel('Floor 1')
            .setStyle(ButtonStyle.Secondary)
        const Floor2 = new ButtonBuilder()    
            .setCustomId('Floor2')
            .setLabel('Floor 2')
            .setStyle(ButtonStyle.Secondary)
        const Floor3 = new ButtonBuilder()    
            .setCustomId('Floor3')
            .setLabel('Floor 3')
            .setStyle(ButtonStyle.Secondary)
        const Floor4 = new ButtonBuilder()    
            .setCustomId('Floor4')
            .setLabel('Floor 4')
            .setStyle(ButtonStyle.Secondary)
        const Floor5 = new ButtonBuilder()    
            .setCustomId('Floor5')
            .setLabel('Floor 5')
            .setStyle(ButtonStyle.Secondary)
        const Floor6 = new ButtonBuilder()    
            .setCustomId('Floor6')
            .setLabel('Floor 6')
            .setStyle(ButtonStyle.Secondary)
        const Floor7 = new ButtonBuilder()    
            .setCustomId('Floor7')
            .setLabel('Floor 7')
            .setStyle(ButtonStyle.Secondary)

        /* Catacombs & Master Mode Buttons*/

        const basic = new ButtonBuilder()    
            .setCustomId('basic')
            .setLabel('Basic')
            .setStyle(ButtonStyle.Secondary)
        const hot = new ButtonBuilder()    
            .setCustomId('hot')
            .setLabel('Hot')
            .setStyle(ButtonStyle.Secondary)
        const burning = new ButtonBuilder()    
            .setCustomId('burning')
            .setLabel('Burning')
            .setStyle(ButtonStyle.Secondary)
        const fiery = new ButtonBuilder()    
            .setCustomId('fiery')
            .setLabel('Fiery')
            .setStyle(ButtonStyle.Secondary)
        const infernal = new ButtonBuilder()    
            .setCustomId('infernal')
            .setLabel('Infernal')
            .setStyle(ButtonStyle.Secondary)
            
          
             
        const row = new ActionRowBuilder()
            .addComponents(cata, kuudra, mineshaft, fishing, events);
            
        /* Embed */
        let init = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('What are you looking for:')
            .setFields(
                { name: 'Kuudra', value: 'You will specify your tier after selecting.'},
                { name: 'Catacombs', value: 'You will specify your floor afterwards.'}
            )

        const firstResponse = await interaction.reply({embeds: [init], components: [row], ephemeral: true})

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const phaseTwo = await firstResponse.awaitMessageComponent({ filter: collectorFilter, time: 60_000 })
            switch (phaseTwo.customId) {
                case 'Catacombs':
                    init
                        .setTitle('Catacombs')
                        .setImage('https://wiki.hypixel.net/images/2/28/SkyBlock_items_catacombs_pass_10.png')
                        .setFields(
                            { name: 'Catacombs', value: 'Normal or Master Mode?'}
                        )

                        const cataOptions = new ActionRowBuilder()
                            .setComponents(normal, master)

                        const rowCata1 = new ActionRowBuilder()
                            .setComponents(Floor1, Floor2, Floor3, Floor4, Floor5);

                        const rowCata2 = new ActionRowBuilder()
                            .setComponents(Floor6, Floor7);

                        await phaseTwo.update({ embeds: [init], components: [cataOptions], time: 60_000});

                        const cataPhaseThree = await firstResponse.awaitMessageComponent({ filter: collectorFilter, time: 60_000 })

                        switch (cataPhaseThree.customId) {
                            case 'normal':
                                init
                                    .setTitle('Catacombs')
                                    .setImage('https://wiki.hypixel.net/images/2/28/SkyBlock_items_catacombs_pass_10.png')
                                    .setFields(
                                        { name: 'Normal Mode Floors', value: 'What floor are you looking for?'}
                                    )
                                    
                                await cataPhaseThree.update({ embeds: [init], components: [rowCata1, rowCata2], time: 60_000});

                            case 'master':
                                init
                                    .setTitle('Catacombs')
                                    .setImage('https://static.wikia.nocookie.net/hypixel-skyblock/images/4/4d/Higher_Master_Floors.png/revision/latest?cb=20210424083936')
                                    .setFields(
                                        { name: 'Master Mode Floors', value: 'What floor are you looking for?' }
                                    )

                                await cataPhaseThree.update({ embeds: [init], components: [rowCata1, rowCata2], time: 60_000});
                        }

                    break;

                case 'Kuudra':
                    init
                        .setColor(0x0099FF)
                        .setTitle('Kuudra')
                        .setImage('https://wiki.hypixel.net/images/d/db/Minecraft_entities_magma_cube.png')
                        .setFields(
                            { name: 'Kuudra Tiers', value: 'What tier of Kuudra are you looking for?'}
                        )

                        const rowKuudra = new ActionRowBuilder()
                            .setComponents(basic, hot, burning, fiery, infernal)
                        
                    await phaseTwo.update({ embeds: [init], components: [rowKuudra], time: 60_000})

                    break;

                case 'Mineshaft':
                    await phaseTwo.update({ content: 'test'})
                    break;
                case 'Fishing':
                    await phaseTwo.update({ content: 'test'})
                    break;
                case 'Events':
                    await phaseTwo.update({ content: 'test'})
                    break;
            }
        } catch (e) {
            console.error(e)
        }
    } 
}