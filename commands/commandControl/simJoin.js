const { SlashCommandBuilder } = require("discord.js");

const simJoin = new SlashCommandBuilder()
    .setName('simjoin')
    .setDescription('Will simulate a member joining the server')

const execute = async interaction => {
    interaction.client.emit('guildMemberAdd', interaction.member);
    interaction.reply('Simulated a new member joining');
}

module.exports = {
    category: 'commandContol',
    data: simJoin,
    execute
}