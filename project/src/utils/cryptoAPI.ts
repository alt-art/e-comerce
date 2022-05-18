import axios from 'axios';

const cryptoAPI = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/',
  headers: {
    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
  },
});

export default cryptoAPI;
