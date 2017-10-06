const Botkit = require('botkit');
const join = require('./lunch_join.js');
const start = require('./lunch_start.js');

if (!process.env.SLACK_CLIENT_ID || !process.env.SLACK_CLIENT_SECRET || !process.env.PORT || !process.env.SLACK_VERIFICATION_TOKEN) {
      console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
      process.exit(1);
}

var controller = Botkit.slackbot({
  json_file_store: './db_slackbutton_slash_command/',
}).configureSlackApp({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  scopes: process.env.SLACK_OAUTH_SCOPE,
});

controller.setupWebserver(process.env.PORT, function (err, webserver) {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver, function (err, req, res) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });
});

controller.on('slash_command', function (slashCommand, message) {
  if (message.token !== process.env.SLACK_VERIFICATION_TOKEN) return; //just ignore it.

  switch (message.command) {
    case '/lunch_join':
      join(message, slashCommand);
      return
    case '/lunch_start':
      start(message, slashCommand);
      return;
    default:
      slashCommand.replyPublic(message, "I'm afraid I don't know how to " + message.command + " yet.");
  }
});