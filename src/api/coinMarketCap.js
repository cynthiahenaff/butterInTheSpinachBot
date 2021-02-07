import axios from 'axios';
import { decamelizeKeys } from 'humps';
import { errorHandling } from 'utils';

const formatConfig = ({ params, ...opts } = {}) => ({
  ...opts,
  params: decamelizeKeys(params),
});

const get = async (uri, config = {}) => {
  const apiKeys = [
    process.env.CMC_API_KEY_1,
    process.env.CMC_API_KEY_2,
    process.env.CMC_API_KEY_3,
  ];
  const apiKeyIndex = Math.floor(Math.random() * 3);

  const api = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1',
    headers: {
      'X-CMC_PRO_API_KEY': apiKeys[apiKeyIndex],
    },
  });

  try {
    const response = await api.get(uri, formatConfig(config));
    return response;
  } catch (err) {
    // console.error(err);
    errorHandling({
      title: `API ERROR - ${apiKeys[apiKeyIndex].slice(-5)}`,
      body: `${uri} - ${err?.config?.params?.symbol} / ${
        err?.config?.params?.convert
      }\n 
      ${JSON.stringify(err?.response?.data, null, 2)}
      `,
    });
  }
};

export const getQuotesLatest = params =>
  get('/cryptocurrency/quotes/latest', {
    params: { convert: 'USD', ...params },
  });

export const getAllCryptocurrencies = params =>
  get('/cryptocurrency/listings/latest', {
    params: { convert: 'USD', ...params },
  });

export const getCryptocurrency = (currency, convert) =>
  get('/cryptocurrency/quotes/latest', {
    params: { symbol: currency, convert: convert },
  });

export const getCryptocurrencyMeta = currency =>
  get('/cryptocurrency/info', {
    params: {
      symbol: currency,
    },
  });

export const getAllCryptocurrenciesMeta = params =>
  get('/cryptocurrency/info', { params });
