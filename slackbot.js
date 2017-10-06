const Botkit = require('botkit');

if (!process.env.SLACK_CLIENT_ID || !process.env.SLACK_CLIENT_SECRET || !process.env.PORT || !process.env.SLACK_VERIFICATION_TOKEN) {
      console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
      process.exit(1);
}

const bot_options = {
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    scopes: ['bot','commands'],
};

if (process.env.REDIS_URL) {
    const redisStorage = require('botkit-storage-redis')({url: process.env.REDIS_URL});
    bot_options.storage = redisStorage;
} else {
    bot_options.json_file_store = './db_slackbutton_slash_command/';
}

module.exports = Botkit.slackbot(bot_options);
