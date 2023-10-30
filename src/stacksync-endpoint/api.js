/**
 * Axios instance configured to make requests to the Paystack API.
 * Uses the provided Paystack secret key for authentication.
 * Base URL: 'https://api.paystack.co'
 *
 * @module api
 * @type {Object}
 */
import axios from 'axios';

const { PAYSTACK_SECRET_KEY } = process.env;

const api = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  },
});

export default api;
