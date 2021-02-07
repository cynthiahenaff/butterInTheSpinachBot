export default (bot, channelId) => {
  const advertiseToChannel = async () => {
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();

    if (!(hour === 18 && minutes === 1)) {
      return;
    }
    const message =
      'Don’t forget, you can also talk to me directly 👉 @cryptoshark\\_bot 🤖 and contact my mom 👉[@monsieur_riz](https://twitter.com/monsieur_riz)';
    bot.telegram.sendMessage(channelId, message, { parse_mode: 'Markdown' });
  };
  setInterval(advertiseToChannel, 60 * 1000);
};
