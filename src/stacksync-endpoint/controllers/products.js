import api from '../api';

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

const listProducts = async (req, res) => {
  try {
    const { data } = await api.get('/product');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await api.get(`/product/${id}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

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
