const { SlashCommandBuilder } = require("discord.js");


const resetCommand = new SlashCommandBuilder()
    .setName('reset')
    .setDescription('Will update the slash commands')
    .addStringOption(option => 
        option.setName('command')
        .setDescription('command to reset')
        .setRequired(true)
    );


const execute = async (interaction) => {
    const commandName = interaction.options.getString('command', true).toLowerCase();
    const command = interaction.client.commands.get(commandName);

    if (!command) return interaction.reply(`There is no command with the name ${commandName}.`);

    delete require.cache[require.resolve(`./${command.data.name}.js`)];

    try {
        const newCommand = require(`./${command.data.name}`);
        interaction.client.command.set(newCommand.data.name, newCommand);
        interaction.reply(`The /${newCommand.data.name} has been reloaded`);
    } catch (e) {
        console.log(e);
        await interaction.reply(`There was an error reloading the command /${command.data.name}\n${e.message}`);
    }
}

module.exports = {
    data: resetCommand,
    execute
}