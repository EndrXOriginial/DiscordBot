const { SlashCommandBuilder } = require("discord.js");
const { category } = require("../commandControl/resetCommand");


const numberGuessingCommand = new SlashCommandBuilder()
    .setName('numberguessing')
    .setDescription('A game where you need to guess the right number between 0 and 50')
    .addNumberOptions(option =>
        option.setName('range')
            .setDescription('The range in which the secret number can be located')
            .setRequired(true)
            .addChoices(
                {name: '10', value: 10},
                {name: '50', value: 50},
                {name: '100', value: 100},
            )
    )

const execute = async (interaction) => {
    if (interaction.channel.name !== 'bot-commands') {
        interaction.reply({content: 'Please use the command in the "bot-commands" channels. Thank you!', ephemeral: true});
        return;
    }

    const numRange = interaction.options.getNumber('range');
    const secretNumber = Math.floor(Math.random() * numRange);

    interaction.reply(`Choose a number between 0 and ${numRange}`);
}

module.exports = {
    category: 'game',
    cooldown: 5,
    data: numberGuessingCommand,
    execute
}