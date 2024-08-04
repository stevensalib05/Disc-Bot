const { SlashCommandBuilder, PermissionFlagsBits, GuildMember } = require('discord.js');
const { userPermissions, botPermissions } = require('./purge');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a specified user')
    .addUserOption((option) => option
        .setName('username')
        .setDescription('The designated user to ban.')
        .setRequired(true))
    .addStringOption((option) => option
        .setName('reasoning')
        .setDescription("Reason for the user's ban.")
        .setRequired(true)),
        userPermissions: [PermissionFlagsBits.BanMembers],
        botPermissions: [PermissionFlagsBits.BanMembers],
        async execute(interaction) {
            const username = interaction.options.getMember('username');
            const reasoning = interaction.options.getString('reasoning');

            if(!interaction.guild.channels.cache.find(channel => channel.name === 'logs')) {
                interaction.guild.channels.create({name: 'logs', permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: PermissionFlagsBits.ViewChannel
                    }
                ]})
            }

            await username.send(`**You have been banned**. Reasoning: ${reasoning}.`);
            interaction.guild.channels.cache.find(channel => channel.name === 'logs')
            .send(`${username} has been banned permanently by ${interaction.user.username}! Reason: ${reasoning}.`)  

            await interaction.reply({ content: `${username} has been banned successfully.`, ephemeral: true });
            await username.ban({ user: username, deleteMessageSeconds: 60 * 60 * 24 * 7, reason: reasoning });
    }
}