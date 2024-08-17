const { SlashCommandBuilder, EmbedBuilder,  ButtonBuilder, ButtonStyle, ActionRowBuilder, ThreadAutoArchiveDuration } = require('discord.js');

module.exports = {
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("lfg")
        .setDescription("Creates a Looking for Group Embed.")
        .addStringOption((option) => option
            .setName("note")
            .setDescription("Add a custom message to your LFG Embed.")
            .setRequired(false)),
    async execute(interaction) {
        const note = interaction.options.getString('note');

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
        
        /* Catacombs & Master Mode Buttons */

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

        /* Kuudra Buttons */

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
            
          
             
        const initRow = new ActionRowBuilder()
            .addComponents(cata, kuudra, mineshaft, fishing, events);
        
        // TODO: make the embeds prettier
            
        /* Embed */
        let init = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('What are you looking for:')
            .setFields(
                { name: 'Kuudra', value: 'You will specify your tier after selecting.'},
                { name: 'Catacombs', value: 'You will specify your floor afterwards.'}
            )

        const cataInstructions = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Cata LFG Instructions")
            .setDescription(
                "Send your ign, how many people you already have, and what roles you are looking for."
            )
        const firstResponse = await interaction.reply({embeds: [init], components: [initRow], ephemeral: false})

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
                                
                                const cataPhaseFourNormal = await firstResponse.awaitMessageComponent({ filter: collectorFilter, time: 60_000})
                                
                                switch (cataPhaseFourNormal.customId) {
                                    case 'Floor1':
                                        init
                                            .setTitle('Floor 1')
                                            .setImage()
                                            .setThumbnail('https://wiki.hypixel.net/images/8/80/SkyBlock_items_catacombs_pass_4.png')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                            
                                    
                                        await cataPhaseFourNormal.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Floor 1`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor2':
                                        init
                                            .setTitle('Floor 2')
                                            .setImage()
                                            .setThumbnail('https://wiki.hypixel.net/images/4/4b/SkyBlock_items_catacombs_pass_5.png')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                        
                                        await cataPhaseFourNormal.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Floor 2`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })
    
                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor3':
                                        init
                                            .setTitle('Floor 3')
                                            .setImage()
                                            .setThumbnail('https://wiki.hypixel.net/images/6/69/SkyBlock_items_catacombs_pass_6.png')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                    
                                        await cataPhaseFourNormal.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Floor 3`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor4':
                                        init
                                            .setTitle('Floor 4')
                                            .setImage()
                                            .setThumbnail('https://wiki.hypixel.net/images/2/2f/SkyBlock_items_catacombs_pass_7.png')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                    
                                        await cataPhaseFourNormal.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Floor 4`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor5':
                                        init
                                            .setTitle('Floor 5')
                                            .setImage()
                                            .setThumbnail('https://wiki.hypixel.net/images/3/3a/SkyBlock_items_catacombs_pass_8.png')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                
                                        await cataPhaseFourNormal.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Floor 5`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor6':
                                        init
                                            .setTitle('Floor 6')
                                            .setImage()
                                            .setThumbnail('https://wiki.hypixel.net/images/e/e3/SkyBlock_items_catacombs_pass_9.png')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                            
                                        await cataPhaseFourNormal.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Floor 6`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor7':
                                        init
                                            .setTitle('Floor 7')
                                            .setImage()
                                            .setThumbnail('https://wiki.hypixel.net/images/2/28/SkyBlock_items_catacombs_pass_10.png')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                            
                                        await cataPhaseFourNormal.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Floor 7`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                }
                            case 'master':
                                init
                                    .setTitle('Master Mode Catacombs')
                                    .setImage('https://static.wikia.nocookie.net/hypixel-skyblock/images/4/4d/Higher_Master_Floors.png/revision/latest?cb=20210424083936')
                                    .setFields(
                                        { name: 'Master Mode Floors', value: 'What floor are you looking for?'}
                                    )

                                await cataPhaseThree.update({ embeds: [init], components: [rowCata1, rowCata2], time: 60_000});
                                const cataPhaseFourMaster = await firstResponse.awaitMessageComponent({ filter: collectorFilter, time: 60_000})

                                switch (cataPhaseFourMaster.customId) {
                                    case 'Floor1':
                                        init
                                            .setTitle('Master Mode Floor 1')
                                            .setImage()
                                            .setThumbnail('https://wiki.hypixel.net/images/e/ee/SkyBlock_items_master_catacombs_pass_4.png')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                            
                                    
                                        await cataPhaseFourMaster.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Master Mode Floor 1`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor2':
                                        init
                                            .setTitle('Master Mode Floor 2')
                                            .setImage()
                                            .setThumbnail('https://wiki.hypixel.net/images/2/26/SkyBlock_items_master_catacombs_pass_5.png')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                            
                                    
                                        await cataPhaseFourMaster.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Master Mode Floor 2`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor3':
                                        init
                                            .setTitle('Master Mode Floor 3')
                                            .setImage()
                                            .setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/4/43/Lower_Master_Floors.png/revision/latest?cb=20210424083908')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                            
                                    
                                        await cataPhaseFourMaster.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Master Mode Floor 3`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor4':
                                        init
                                            .setTitle('Master Mode Floor 4')
                                            .setImage()
                                            .setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/4/4d/Higher_Master_Floors.png/revision/latest/scale-to-width-down/284?cb=20210424083936')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                            
                                    
                                        await cataPhaseFourMaster.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Master Mode Floor 4`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor5':
                                        init
                                            .setTitle('Master Mode Floor 5')
                                            .setImage()
                                            .setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/4/4d/Higher_Master_Floors.png/revision/latest/scale-to-width-down/300?cb=20210424083936')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                            
                                    
                                        await cataPhaseFourMaster.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Master Mode Floor 5`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor6':
                                        init
                                            .setTitle('Master Mode Floor 6')
                                            .setImage()
                                            .setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/4/4d/Higher_Master_Floors.png/revision/latest/scale-to-width-down/300?cb=20210424083936')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                            
                                    
                                        await cataPhaseFourMaster.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Master Mode Floor 6`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
                                    case 'Floor7':
                                        init
                                            .setTitle('Master Mode Floor 7')
                                            .setImage()
                                            .setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/4/4d/Higher_Master_Floors.png/revision/latest?cb=20210424083936')
                                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                                            .setFields()
                                            .addFields(
                                                { name: 'LFG Leader', value: interaction.user.username, inline: true },
                                                { name: 'Note', value: note }
                                            )
                                            .setTimestamp()
                                            .setFooter({ text: 'Created by woqh and Unreal5trength. '})
                                            
                                    
                                        await cataPhaseFourMaster.update({ embeds: [init], components: []})
                                        thread = await interaction.channel.threads.create({
                                            name: `${interaction.user.username} Master Mode Floor 7`,
                                            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
                                        })

                                        await thread.send({ embeds: [init, cataInstructions] });
                                        break;
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
            } 
        } catch (e) {
            console.error(e)
        }
    } 
}