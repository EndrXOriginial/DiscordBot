const { SlashCommandBuilder } = require('discord.js');

const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

const execute = async (interaction) => {
    await interaction.reply(`Pong!`);
    await interaction.followUp({content: 'secret Pong!', ephemeral: true});
}

module.exports = {
    category: 'utility',
    cooldown: 5,
    data: pingCommand,
    execute
}