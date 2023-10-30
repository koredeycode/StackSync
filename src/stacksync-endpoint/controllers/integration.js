import api from '../api';

/**
 * Fetches the payment session timeout from the API and sends it as a JSON response.
 * 
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const fetchPaymentSessionTimeout = async (req, res) => {
  try {
    const { data } = await api.get('/integration/payment_session_timeout');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Updates the payment session timeout on the API using data from the request body
 * and sends the updated timeout as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const updatePaymentSessionTimeout = async (req, res) => {
  try {
    const { timeout } = req.body;
    const { data } = await api.put('/integration/payment_session_timeout', {
      timeout,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Fetches transaction totals from the API and sends them as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const fetchTransactionTotals = async (req, res) => {
  try {
    const { data } = await api.get('/transaction/totals');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Fetches transaction performance data from the API and sends it as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const fetchTransactionPerformance = async (req, res) => {
  try {
    const { data } = await api.get('/transaction/performance');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  fetchPaymentSessionTimeout,
  updatePaymentSessionTimeout,
  fetchTransactionTotals,
  fetchTransactionPerformance,
};
