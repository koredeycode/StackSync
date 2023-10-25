import axios from 'axios';

const { PAYSTACK_SECRET_KEY } = process.env;

const api = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  },
});

export default api;
