
**Step 1: Set Up Your Discord Bot**
1. Create a Discord Application:
    * Visit the Discord Developer Portal.
    * Click on "New Application" and provide a name for your application.
2. Create a Bot:
    * Navigate to the "Bot" tab in your application settings.
    * Click "Add Bot" and confirm the action.
3. Get Your Bot Token:
    * Under the "Bot" tab, find the "Token" section and click "Copy" to save your bot token. Keep this token confidential!
4. Invite Your Bot to a Server:
    * Go to the "OAuth2" tab.
    * Under "Scopes", select bot.
    * Under "Bot Permissions", select the necessary permissions (e.g., Send Messages, Read Message History).
    * Enable Privileged Gateway Intents:
    * Scroll down to the "Privileged Gateway Intents" section.
    * Enable the intents you need:
        * Presence Intent: If your bot needs to track user presence.
        * Server Members Intent: If your bot needs to access member data.
        * Message Content Intent: If your bot needs to read message content.
    * Copy the generated URL and open it in your browser to invite your bot to your server.

**Step 2: Set Up Your Telegram Bot**
1. Create a Telegram Bot:
    * Open Telegram and search for "BotFather".
    * Start a chat with BotFather and use the command /newbot to create a new bot.
    * Follow the prompts to name your bot and obtain your bot token. Keep this token confidential!
    * Invite your Bot to your channel/group.
2. Get Your Chat ID:
    * Send any message to channel/group.
    * Go to: https://api.telegram.org/bot(YourTokenHere)/getUpdates
    * Look for the chat object in the JSON response to find your chat ID.
    * For group chats and channels, the chatId will typically start with a negative sign (e.g., -1001234567890).

* Permissions: Ensure your bot has the necessary permissions to read messages in groups or channels.
* Updates: If you do not see the chat ID, try removing the bot from the channel/group and adding it back, then send a message again.


**Step 3: Run Node Application**
   * Update the .env-sample file with your Discord App Token & Telegram Bot Token & ChatId
   * Rename to .env
   * run in your terminal, node bot.js

(Alternatively, you can use render.com (or any other web service provider, like AWS, Google Cloud, ...) to run your Node application, don't forget to update the app environment with your tokens & chatId (.env)

**Explanation of the Code**
* The bot listens for messages in Discord.
* When a message starts with ?telesend and is a reply to another message, it fetches the original message being replied to.
* It then sends the content of that original message to the specified Telegram chat.
* If the message is successfully sent, it replies in Discord to confirm the action; otherwise, it sends an error message.
* (UPDATED) Only Discord Admins can use the command ?telesend

