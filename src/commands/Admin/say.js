const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { userPermissions, botPermissions } = require('./purge');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Sends the user input as a message sent by the bot instead.')
    .addStringOption((option) => option
        .setName('string')
        .setDescription('The input you want the bot to send.')),
        userPermissions: [PermissionFlagsBits.Administrator],
        botPermissions: [PermissionFlagsBits.Administrator],
        async execute(interaction) {
            const input = await interaction.options.getString('string');
            await interaction.channel.send(input);
            await interaction.reply({ content: 'Message has been sent.', ephemeral: true});
        }
}