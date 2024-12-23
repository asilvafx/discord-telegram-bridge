require('dotenv').config(); // Load environment variables from .env file
const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
const TelegramBot = require('node-telegram-bot-api');

// Get credentials from environment variables
const discordToken = process.env.DISCORD_TOKEN;
const telegramToken = process.env.TELEGRAM_TOKEN;
const chatId = process.env.CHAT_ID;

// Set up the Discord bot
const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
const telegramBot = new TelegramBot(telegramToken, { polling: true });

// Listen for messages
discordClient.on('messageCreate', async (message) => {
    // Check if the message is from a bot or if it doesn't start with the command
    if (message.author.bot || !message.content.startsWith('?telesend')) return;

    // Check if the user has admin permissions
    const member = await message.guild.members.fetch(message.author.id);
    if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
        return message.reply("You do not have permission to use this command.");
    }

    // Check if the message is a reply
    if (message.reference) {
        try {
            // Fetch the message being replied to
            const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);
            const textToSend = referencedMessage.content;

            // Send the message to Telegram
            await telegramBot.sendMessage(chatId, textToSend);
            await message.reply("Message forwarded to Telegram!");
        } catch (error) {
            console.error(`Failed to forward message: ${error}`);
            await message.reply("Failed to forward message.");
        }
    } else {
        await message.reply("Please reply to a message to forward it to Telegram.");
    }
});

// Log in to Discord
discordClient.login(discordToken);
