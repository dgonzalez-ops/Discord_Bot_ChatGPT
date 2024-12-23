// Command to start the bot -->  npm run dev
// discord.js and openai libreries required (npm install discord.js || npm install openai)

const {Client, Events, GatewayIntentBits, SlashCommandBuilder} = require('discord.js');
const { prompt } = require('./gpt');

const client = new Client ({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.on(Events.ClientReady, c => {
    console.log("Bot connected successfully.");

    c.user.setActivity("AI stuff...");

    const exampleCommand = new SlashCommandBuilder() // Creating the /example command
        .setName('example')
        .setDescription('this is an example command');
    c.application.commands.create(exampleCommand);
});

client.on (Events.InteractionCreate, async interaction => { // Function of the command
    if(!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'example') {
        await interaction.deferReply();
        const example = await prompt();
        await interaction.editReply(example);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN); 

