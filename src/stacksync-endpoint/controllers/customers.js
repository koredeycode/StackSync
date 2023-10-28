import api from '../api';

const getCustomers = async (req, res) => {
  try {
    const response = await api.get('/customer');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCustomerByEmailOrCode = async (req, res) => {
  try {
    const { email_or_code } = req.params;
    const response = await api.get(`/customer/${email_or_code}`);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
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
    const { code } = req.params;
    const updatedData = req.body;

    const response = await api.put(`/customer/${code}`, updatedData);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.status(500).json(error);
    }
  }
};

const setRiskAction = async (req, res) => {
  try {
    const { code } = req.params;
    const { risk_action } = req.body;
    const payload = {
      customer: code,
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
  getCustomerByEmailOrCode,
  setRiskAction,
};
