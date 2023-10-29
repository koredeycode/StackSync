<template>
  <div class="stacksync-panel-container">
    <component :is="componentMap[type]" />
  </div>
</template>

<script>
import { Customer, Product, PaymentRequest, Integration } from './screens';

export default {
  components: { Customer, Product, PaymentRequest, Integration },
  props: {
    showHeader: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'integration',
    },
  },
  data() {
    return {
      componentMap: {
        customers: 'Customer',
        products: 'Product',
        payment_requests: 'PaymentRequest',
        integration: 'Integration',
      },
    };
  },
};
</script>

<style scoped>
.stacksync-panel-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  /* display: flex;
	flex-direction: column;
	justify-content: center; */
}
</style>
