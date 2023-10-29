import { status } from './controllers';
import {
  fetchPaymentSessionTimeout,
  updatePaymentSessionTimeout,
  fetchTransactionTotals,
  fetchTransactionPerformance,
} from './controllers/integration';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  getCustomerByEmailOrCode,
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
  listPaymentRequests,
  updatePaymentRequest,
  fetchPaymentRequest,
  archivePaymentRequest,
  sendNotification,
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
    router.get('/integration/totals', fetchTransactionTotals);
    router.get('/integration/performance', fetchTransactionPerformance);

    //Customer endpoints
    router.get('/customers', getCustomers);
    router.get('/customers/:email_or_code', getCustomerByEmailOrCode);

    router.post('/customers', auth, createCustomer);
    router.post('/customers/:code/set_risk_action', auth, setRiskAction);

    router.put('/customers/:code', auth, updateCustomer);

    //Product endpoints
    router.get('/products', listProducts);
    router.get('/products/:id', fetchProduct);

    router.post('/products', auth, createProduct);

    router.put('/products/:id', auth, updateProduct);

    //Payment Request endpoints
    router.get('/paymentrequests', listPaymentRequests);
    router.get('/paymentrequests/:id_or_code', fetchPaymentRequest);

    router.post('/paymentrequests', auth, createPaymentRequest);
    router.post('/paymentrequests/:code/archive', auth, archivePaymentRequest);
    router.post('/paymentrequests/:code/notify', auth, sendNotification);

    router.put('/paymentrequests/:id_or_code', auth, updatePaymentRequest);
  },
};
