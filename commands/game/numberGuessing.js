const { SlashCommandBuilder } = require("discord.js");
const { category } = require("../commandControl/resetCommand");


const numberGuessingCommand = new SlashCommandBuilder()
    .setName('numberguessing')
    .setDescription('A game where you need to guess the right number between 0 and 50')
    .addIntegerOption(option =>
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

    const numRange = interaction.options.getInteger('range');
    const secretNumber = Math.floor(Math.random() * numRange);

    console.log(`The range is ${numRange}, with a secret number of ${secretNumber}`);

    interaction.reply(`Choose a number between 0 and ${numRange}`).then(() => {
        const filter = m => {
            console.log(m);
            return interaction.user.id === m.author.id;
        };

        interaction.channel.awaitMessages({filter: filter, time: 60_000, max: 1, errors: ['time']}).then(collected => {
            console.log(collected.first());
            const userAnswer = Number(collected.first().content);
            if (userAnswer < 0 || userAnswer > numRange) interaction.followUp(' my guy.... you chose the range... why did you put a number outside of it..?');
            if (userAnswer === secretNumber) interaction.followUp('You got it right!! Good job, mister detective.');
            if (userAnswer !== secretNumber) interaction.followUp('Unfortunatly, you are wronggggggggg. The number was ${secretNumber}. Better luck next time');
        }).catch(() => {
            interaction.followUp('You did not answer fast enough');
        });
    });
}

module.exports = {
    category: 'game',
    cooldown: 15,
    data: numberGuessingCommand,
    execute
}