const fetchTickers = require('./fetchTickers');

module.exports = (bot) => {
  bot.command('help', async (ctx) => {
    const tickers = await fetchTickers();
    let message = '/howMuch - Query the market\n\n*Top 10 currencies by market cap*\n';
    for (const ticker of tickers.slice(0, 10)) {
      message = message + `/${ticker.symbol} - Value of ${ticker.name} in EUR/USD\n`;
    }
    message += '\n*Best performing currencies*\n/best1h - Top 5 performing currencies in the last hour\n/best24h - Top 5 performing currencies in the last 24h\n/best7d - Top 5 performing currencies in the last week';
    ctx.replyWithMarkdown(message);
  });
};
