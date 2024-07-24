const { SlashCommandBuilder, GuildMember } = require("discord.js");

const simjoin = new SlashCommandBuilder()
    .setName('simjoin')
    .setDescription('Will simulate a member joining')

const execute = async interaction => {
    console.log(interaction.member);
    interaction.client.emit('guildMemberAdd', interaction.member);
    interaction.reply('Emitted a member add');
}

module.exports = {
    category: 'commandControl',
    data: simjoin,
    execute
}