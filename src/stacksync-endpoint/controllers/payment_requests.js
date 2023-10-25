import api from '../api';

const createPaymentRequest = async (req, res) => {
  try {
    const { customer, amount, due_date, description } = req.body;

    const response = await api.post('/paymentrequest', {
      customer,
      amount,
      due_date,
      description,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response.status || 500).json(error.response.data);
  }
};

const listPaymentRequest = async (req, res) => {
  try {
    const response = await api.get('/paymentrequest');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response.status || 500).json(error.response.data);
  }
};

const updatePaymentRequest = async (req, res) => {
  try {
    const { id_or_code } = req.params;
    const { description, due_date } = req.body;

    const response = await api.put(`/paymentrequest/${id_or_code}`, {
      description,
      due_date,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response.status || 500).json(error.response.data);
  }
};

export { createPaymentRequest, listPaymentRequest, updatePaymentRequest };
