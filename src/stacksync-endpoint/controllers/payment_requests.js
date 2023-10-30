import api from '../api';

/**
 * Creates a new payment request using the provided data from the request body
 * and sends the created payment request object as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
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

/**
 * Fetches a list of payment requests from the API and sends it as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const listPaymentRequests = async (req, res) => {
  try {
    const { data } = await api.get('/paymentrequest');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Updates an existing payment request identified by the provided ID or code
 * with the data from the request body and sends the updated payment request
 * object as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
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

/**
 * Fetches a payment request by ID or code from the API and sends it as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const fetchPaymentRequest = async (req, res) => {
  try {
    const { id_or_code } = req.params;

    const { data } = await api.get(`/paymentrequest/${id_or_code}`);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Archives a payment request identified by the provided code and sends
 * the archived payment request object as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const archivePaymentRequest = async (req, res) => {
  try {
    const { code } = req.params;

    const { data } = await api.post(`/paymentrequest/archive/${code}`);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Sends a notification for a payment request identified by the provided code
 * and sends the notification response as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
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
