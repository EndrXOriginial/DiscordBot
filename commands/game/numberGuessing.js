const { SlashCommandBuilder } = require("discord.js");
const { category } = require("../commandControl/resetCommand");


const numberGuessingCommand = new SlashCommandBuilder()
    .setName('numberguessing')
    .setDescription('A game where you need to guess the right number between 0 and 50');

const execute = async (interaction) => {
    await interaction.reply(`You have guessed this number: 00`);
}

module.exports = {
    category: 'game',
    cooldown: 5,
    data: numberGuessingCommand,
    execute
}