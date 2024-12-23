require('dotenv').config(); // Load environment variables from .env file
const { Client, GatewayIntentBits } = require('discord.js');
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
    // Check if the message is a reply and starts with the command ?telesend
    if (message.content.startsWith('?telesend') && message.reference) {
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
    }
});

// Log in to Discord
discordClient.login(discordToken);