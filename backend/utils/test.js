require('dotenv').config();
const {
  Autohook,
  validateWebhook,
  validateSignature,
} = require('twitter-autohook');

const url = require('url');
const ngrok = require('ngrok');
const http = require('http');

const PORT = 8080;

const startServer = (port, auth) =>
  http
    .createServer((req, res) => {
      const route = url.parse(req.url, true);
      console.log('Log: route', route);

      if (!route.pathname) {
        return;
      }

      if (route.query.crc_token) {
        console.log('Log: route.query.crc_token', route.query.crc_token);
        try {
          console.log('Log: req.method', req.method);
          console.log('Log: req.headers', req.headers);
          console.log('Log: auth', auth);
          console.log(
            'Log:  url.parse(req.url).query)',
            url.parse(req.url).query
          );
          if (!validateSignature(req.headers, auth, url.parse(req.url).query)) {
            console.error('Cannot validate webhook signature');
            return;
          }
        } catch (e) {
          console.error(e);
        }

        const crc = validateWebhook(route.query.crc_token, auth, res);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(crc));
      }

      if (
        req.method === 'POST' &&
        req.headers['content-type'] === 'application/json'
      ) {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            console.log('Log: req.headers', req.headers);
            if (!validateSignature(req.headers, auth, body)) {
              console.error('Cannot validate webhook signature');
              return;
            }
          } catch (e) {
            console.error(e);
          }

          console.log('Event received:', body);
          res.writeHead(200);
          res.end();
        });
      }
    })
    .listen(port, () => console.log('server start on port:', port));

(async () => {
  try {
    const NGROK_AUTH_TOKEN = process.env.NGROK_AUTH_TOKEN;
    if (NGROK_AUTH_TOKEN) {
      await ngrok.authtoken(process.env.NGROK_AUTH_TOKEN);
    }
    // const url = await ngrok.connect(PORT);
    // const webhookURL = `${url}/standalone-server/webhook`;
    const webhookURL = `https://twitter-helpdesk-app.herokuapp.com/auth/twitter/webhook`;

    const config = {
      token: process.env.TWITTER_ACCESS_TOKEN,
      token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      env: process.env.TWITTER_WEBHOOK_ENV,
    };

    // const server = startServer(PORT, config);

    const webhook = new Autohook(config);
    await webhook.removeWebhooks();
    webhook.on('event', (event) => {
      console.log('Something happened:', event);
      if (event.tweet_create_events) {
      }
    });
    await webhook.start(webhookURL);
    await webhook.subscribe({
      oauth_token: config.token,
      oauth_token_secret: config.token_secret,
    });
  } catch (e) {
    console.error(e);
    // process.exit(-1);
  }
})();
