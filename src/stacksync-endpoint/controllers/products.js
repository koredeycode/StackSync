import api from '../api';

/**
 * Creates a new product using the provided data from the request body
 * and sends the created product object as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object containing product data.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, unlimited, quantity } = req.body;
    const productData = {
      name,
      description,
      price: price * 100,
      unlimited,
      quantity,
    };

    productData.currency = process.env.PAYSTACK_INTEGRATION_CURRENCY;

    const { data } = await api.post('/product', productData);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Fetches a list of products from the API and sends it as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const listProducts = async (req, res) => {
  try {
    const { data } = await api.get('/product');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Fetches a product by ID from the API and sends it as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object containing product ID.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const fetchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await api.get(`/product/${id}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Updates an existing product identified by the provided ID with the data from
 * the request body and sends the updated product object as a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express.js request object containing product ID and updated data.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, currency, unlimited, quantity } =
      req.body;
    const productData = {
      name,
      description,
      price,
      currency,
      unlimited,
      quantity,
    };

    const { data } = await api.put(`/product/${id}`, productData);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createProduct, listProducts, fetchProduct, updateProduct };
