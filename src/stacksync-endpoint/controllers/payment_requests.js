import api from '../api';

const createPaymentRequest = async (req, res) => {
  try {
    const { customer, amount, due_date, description } = req.body;

    const response = await api.post('/paymentrequest', {
      customer,
      amount: amount * 100,
      due_date,
      description,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.response.data);
  }
};

const listPaymentRequests = async (req, res) => {
  try {
    const response = await api.get('/paymentrequest');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.response.data);
  }
};

const updatePaymentRequest = async (req, res) => {
  try {
    const { id_or_code } = req.params;
    const { customer, amount, description, due_date } = req.body;

    const response = await api.put(`/paymentrequest/${id_or_code}`, {
      customer,
      amount: amount * 100,
      due_date,
      description,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.response.data);
  }
};

const fetchPaymentRequest = async (req, res) => {
  try {
    const { id_or_code } = req.params;

    const response = await api.get(`/paymentrequest/${id_or_code}`);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.response.data);
  }
};

const archivePaymentRequest = async (req, res) => {
  try {
    const { id_or_code } = req.params;

    const response = await api.post(`/paymentrequest/${id_or_code}/archive`);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.response.data);
  }
};

const sendNotification = async (req, res) => {
  try {
    const { id_or_code } = req.params;

    const response = await api.post(`/paymentrequest/${id_or_code}/notify`);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.response.data);
  }
};

export {
  createPaymentRequest,
  listPaymentRequests,
  updatePaymentRequest,
  fetchPaymentRequest,
  archivePaymentRequest,
  sendNotification,
};
