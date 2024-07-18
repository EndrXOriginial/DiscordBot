const { SlashCommandBuilder } = require("discord.js");


const userCommand = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides info on the user')

const execute = async (interaction) => {
    await interaction.reply(`${interaction.user.username}, you have join on ${interaction.member.joinedAt}.`)
}


module.exports = {
    cooldown: 10,
    data: userCommand,
    execute
}