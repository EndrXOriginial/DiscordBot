const { SlashCommandBuilder } = require('discord.js');

const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

const execute = async (interaction) => {
    await interaction.reply(`Pong!`);
}

module.exports = {
    cooldown: 5,
    data: pingCommand,
    execute
}