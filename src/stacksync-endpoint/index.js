import { status } from './controllers';
import {
  fetchPaymentSessionTimeout,
  updatePaymentSessionTimeout,
} from './controllers/integration';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  getCustomerById,
  setRiskAction,
} from './controllers/customers';

import {
  createProduct,
  listProducts,
  fetchProduct,
  updateProduct,
} from './controllers/products';

import {
  createPaymentRequest,
  listPaymentRequest,
  updatePaymentRequest,
} from './controllers/payment_requests';

import auth from './middleware';

export default {
  id: 'stacksync-endpoint',
  handler: (router) => {
    //Status endpoint
    router.get('/status', status);

    //Integration endpoints
    router.get(
      '/integration/payment_session_timeout',
      fetchPaymentSessionTimeout,
    );
    router.put(
      '/integration/payment_session_timeout',
      auth,
      updatePaymentSessionTimeout,
    );

    //Customer endpoints
    //Id here can be paystack customer code, email or id
    //Named id for convenience, correct format sent from the frontend
    router.get('/customers', getCustomers);
    router.post('/customers', auth, createCustomer);
    router.put('/customers/:id', auth, updateCustomer);
    router.get('/customers/:id', getCustomerById);
    router.post('/customers/:id/set_risk_action', auth, setRiskAction);

    //Product endpoints
    router.post('/products', auth, createProduct);
    router.get('/products', listProducts);
    router.get('/products/:id', fetchProduct);
    router.put('/products/:id', auth, updateProduct);

    //Payment Request endpoints
    router.post('/paymentrequests', auth, createPaymentRequest);
    router.get('/paymentrequests', listPaymentRequest);
    router.put('/paymentrequests/:id_or_code', auth, updatePaymentRequest);
  },
};
