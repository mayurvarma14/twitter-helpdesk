const { Autohook } = require('twitter-autohook');
let webhook;
(async () => {
  try {
    webhook = new Autohook({
      env: 'dev',
      port: 5001,
    });
    webhook.setAuth = (auth) => {
      webhook.auth = { ...webhook.auth, ...auth };
    };

    // // Removes existing webhooks
    // await webhook.removeWebhooks();

    // Starts a server and adds a new webhook
    await webhook.start();

    // // Listens to incoming activity
    // webhook.on('event', (event) => {
    //   if (event.tweet_create_events) {
    //     console.log('Something happened:', event);
    //   }
    // });

    // // Subscribes to your own user's activity
    // await webhook.subscribe({
    //   oauth_token: token,
    //   oauth_token_secret: tokenSecret,
    // });
  } catch (e) {
    // Display the error and quit
    console.error(e);
  }
})();

module.exports = webhook;
