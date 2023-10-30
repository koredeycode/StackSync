import api from '../api';

/**
 * Retrieves a list of customers from the API and sends it as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const getCustomers = async (req, res) => {
  try {
    const { data } = await api.get('/customer');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Retrieves a customer by email or code from the API and sends it as a JSON response.
 * If the customer is not found, it responds with a 404 error.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const getCustomerByEmailOrCode = async (req, res) => {
  try {
    const { email_or_code } = req.params;
    const { data } = await api.get(`/customer/${email_or_code}`);
    res.status(200).json(data);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.status(500).json(error);
    }
  }
};

/**
 * Creates a new customer using the provided data from the request body and sends
 * the created customer object as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const createCustomer = async (req, res) => {
  try {
    const { data } = await api.post('/customer', req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Updates an existing customer identified by the provided code with the data from
 * the request body and sends the updated customer object as a JSON response.
 * If the customer is not found, it responds with a 404 error.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const updateCustomer = async (req, res) => {
  try {
    const { code } = req.params;
    const updatedData = req.body;

    const { data } = await api.put(`/customer/${code}`, updatedData);
    res.status(200).json(data);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.status(500).json(error);
    }
  }
};

/**
 * Sets a risk action for a specific customer identified by the provided code and
 * sends the updated customer object as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const setRiskAction = async (req, res) => {
  try {
    const { code } = req.params;
    const { risk_action } = req.body;
    const payload = {
      customer: code,
      risk_action,
    };
    const { data } = await api.post('/customer/set_risk_action', payload);
    res.status(200).json(data);
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
