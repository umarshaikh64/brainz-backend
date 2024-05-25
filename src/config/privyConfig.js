const { PrivyClient } = require('@privy-io/server-auth');

const privy = new PrivyClient({
  appId: process.env.PRIVY_APP_ID,
  apiKey: process.env.PRIVY_API_KEY
});

module.exports = privy;
