import { getAllCryptocurrencies } from 'api/coinMarketCap';
import { parseValue } from 'utils/ticker';
import { ERROR } from 'utils/messages';
import { errorHandling } from 'utils';

export default bot => {
  bot.command('best24h', async ctx => {
    ctx.reply('I’m searching…');

    try {
      const { data } = await getAllCryptocurrencies({
        sort: 'percent_change_24h',
        sortDir: 'desc',
        limit: 10,
      });

      const currencies = (data?.data ?? [])
        .filter(t => Boolean(t?.quote?.USD?.percent_change_24h))
        .slice(0, 5);

      const currenciesMessage = (currencies || []).map(
        ({ symbol, name, quote }) => {
          const { changeOver24h } = parseValue(quote, true);
          return `/${symbol} - ${name}\n\t*${changeOver24h}*%\n`;
        },
      );

      const message = [
        ...currenciesMessage,
        '/help to see the others commands!',
      ].join('\n');

      ctx.replyWithMarkdown(message);
    } catch (err) {
      ctx.reply(ERROR);
      errorHandling({
        title: `Best 24h Error`,
        body: JSON.stringify(err?.response?.data, null, 2),
      });
    }
  });
};
