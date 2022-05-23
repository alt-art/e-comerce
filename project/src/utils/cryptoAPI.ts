import axios from 'axios';

const cryptoAPI = axios.create({
  baseURL: process.env.COINMARKETCAP_API_URL,
  headers: {
    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
  },
});

export default cryptoAPI;
