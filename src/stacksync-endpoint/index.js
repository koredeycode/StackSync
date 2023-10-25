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
      updatePaymentSessionTimeout,
    );

    //Customer endpoints
    router.get('/customers', getCustomers);
    router.post('/customers', createCustomer);
    router.put('/customers/:id', updateCustomer);
    router.get('/customers/:id', getCustomerById);
    router.post('/customers/:id/set_risk_action', setRiskAction);

    //Product endpoints
    router.post('/products', createProduct);
    router.get('/products', listProducts);
    router.get('/products/:id', fetchProduct);
    router.put('/products/:id', updateProduct);

    //Payment Request endpoints
    router.post('/paymentrequests', createPaymentRequest);
    router.get('/paymentrequests', listPaymentRequest);
    router.put('/paymentrequests/:id_or_code', updatePaymentRequest);
  },
};
