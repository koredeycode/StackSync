import api from '../api';

const createProduct = async (req, res) => {
  try {
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

    const response = await api.post('/product', productData);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const listProducts = async (req, res) => {
  try {
    const response = await api.get('/product');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await api.get(`/product/${id}`);
    res.status(200).json(response.data);
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

    const response = await api.put(`/product/${id}`, productData);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createProduct, listProducts, fetchProduct, updateProduct };
