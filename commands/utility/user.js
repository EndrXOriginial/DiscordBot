const { SlashCommandBuilder } = require("discord.js");
const { category } = require("../commandControl/resetCommand");


const userCommand = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides info on the user')

const execute = async (interaction) => {
    await interaction.reply(`${interaction.user.username}, you have join on ${interaction.member.joinedAt}.`)
}


module.exports = {
    category: 'utility',
    cooldown: 10,
    data: userCommand,
    execute
}