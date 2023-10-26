import PanelComponent from './panel.vue';

export default {
  id: 'stacksync-panel',
  name: 'Stack Sync',
  icon: 'payment',
  description: 'Manage your Paystack Integration from Directus!',
  options: [
    {
      field: 'type',
      name: 'Panel Type',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        width: 'full',
        options: {
          choices: [
            { text: 'Manage Integration', value: 'integration' },
            { text: 'Manage Customers', value: 'customers' },
            { text: 'Manage Products', value: 'products' },
            { text: 'Manage Payment Request', value: 'payment_requests' },
          ],
        },
      },
    },
  ],
  component: PanelComponent,
  // minWidth: 30,
  // minHeight: 20,
};
