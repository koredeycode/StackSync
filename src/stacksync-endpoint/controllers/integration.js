import api from '../api';

const fetchPaymentSessionTimeout = async (req, res) => {
  try {
    const { data } = await api.get('/integration/payment_session_timeout');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

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

// https://api.paystack.co/transaction/totals
const fetchTransactionTotals = async (req, res) => {
  try {
    const { data } = await api.get('/transaction/totals');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
// https://api.paystack.co/transaction/performance
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
