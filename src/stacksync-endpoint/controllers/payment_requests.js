import api from '../api';

const createPaymentRequest = async (req, res) => {
  try {
    const { customer, amount, due_date, description } = req.body;

    const { data } = await api.post('/paymentrequest', {
      customer,
      amount: amount * 100,
      due_date,
      description,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const listPaymentRequests = async (req, res) => {
  try {
    const { data } = await api.get('/paymentrequest');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePaymentRequest = async (req, res) => {
  try {
    const { id_or_code } = req.params;
    const { customer, amount, description, due_date } = req.body;

    const { data } = await api.put(`/paymentrequest/${id_or_code}`, {
      customer,
      amount: amount * 100,
      due_date,
      description,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchPaymentRequest = async (req, res) => {
  try {
    const { id_or_code } = req.params;

    const { data } = await api.get(`/paymentrequest/${id_or_code}`);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const archivePaymentRequest = async (req, res) => {
  try {
    const { code } = req.params;

    const { data } = await api.post(`/paymentrequest/archive/${code}`);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const sendNotification = async (req, res) => {
  try {
    const { code } = req.params;

    const { data } = await api.post(`/paymentrequest/notify/${code}`);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
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
