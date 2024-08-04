const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getavatar")
        .setDescription("Returns the user's avatar")
        .addUserOption((option) => option
            .setName('username')
            .setDescription('The user to grab the avatar of.')
            .setRequired(true)),
    async execute(interaction) {
        const username = interaction.options.getUser('username');
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setImage(username.avatarURL())
        await interaction.reply({ embeds : [embed] });
    }
}
