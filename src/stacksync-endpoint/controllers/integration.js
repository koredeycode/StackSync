import api from '../api';

const fetchPaymentSessionTimeout = async (req, res) => {
  try {
    const response = await api.get('/integration/payment_session_timeout');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePaymentSessionTimeout = async (req, res) => {
  try {
    const { timeout } = req.body;
    const response = await api.put('/integration/payment_session_timeout', {
      timeout,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { fetchPaymentSessionTimeout, updatePaymentSessionTimeout };
