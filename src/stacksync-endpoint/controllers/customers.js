import api from '../api';

const getCustomers = async (req, res) => {
  try {
    const response = await api.get('/customer');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const response = await api.get(`/customer/${customerId}`);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle the case where the customer is not found
      res.status(404).json({ error: 'Customer not found' });
    } else {
      // Handle other types of errors
      res.status(500).json(error);
    }
  }
};

const createCustomer = async (req, res) => {
  try {
    const response = await api.post('/customer', req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const updatedData = req.body; // Assuming updated data is sent in the request body

    const response = await api.put(`/customer/${customerId}`, updatedData);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle the case where the customer is not found
      res.status(404).json({ error: 'Customer not found' });
    } else {
      // Handle other types of errors
      res.status(500).json(error);
    }
  }
};

const setRiskAction = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { risk_action } = req.body;
    const payload = {
      customer: customerId,
      risk_action,
    };
    const response = await api.post('/customer/set_risk_action', payload);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getCustomers,
  createCustomer,
  updateCustomer,
  getCustomerById,
  setRiskAction,
};
