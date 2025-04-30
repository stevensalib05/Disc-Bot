const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Deletes a series of messages')
    .addNumberOption((option) => option
        .setName('number')
        .setDescription('The number of messages you want to delete.')
        .setRequired(true))
    .addUserOption((option) => option
        .setName('username')
        .setDescription('The user of which to purge messages.')
        .setRequired(false)),
    userPermissions: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.ManageMessages],
    async execute(interaction) {
        const { options, channel } = interaction;
        const username = interaction.options.getUser('username');
        const numMessages = interaction.options.getNumber('number');
        const channelMessages = await channel.messages.fetch();

        if(channelMessages.size === 0) {
            await interaction.reply('There are no messages to delete.'); 
            return;
        }
        if(numMessages <= 0) {
            await interaction.reply({content: 'You must input a value greater than 0.', ephemeral: true})
            return;
        }

        if(!interaction.guild.channels.cache.find(channel => channel.name === 'logs') || !interaction.guild.channels.cache.find(channel => channel.name === 'server-logs')) {
            interaction.guild.channels.create({name: 'logs', permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: PermissionFlagsBits.ViewChannel
                }
            ]})
        } else if (!username) {
            await interaction.channel.bulkDelete(numMessages, true);
            await interaction.reply({content: `Deleted ${numMessages} messages.`, ephemeral: true});
            interaction.guild.channels.cache.find(channel => channel.name === 'logs')
            .send(`${interaction.user.username} deleted ${numMessages} messages from ${interaction.channel}!`)   
                
        } else {
            const messages = await channel.messages.fetch();
            const userMessages = messages.filter(msg => msg.author.id === username.id);
            await interaction.channel.bulkDelete(userMessages);
            await interaction.reply({content: `Deleted ${numMessages} messages from ${username}.`, ephemeral: true});    
            interaction.guild.channels.cache.find(channel => channel.name === 'logs')
            .send(`${interaction.user.username} deleted ${numMessages} messages from ${interaction.channel} from the user ${username}!`)    
        }
    }    
}