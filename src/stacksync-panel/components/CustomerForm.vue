<template>
  <div class="customer-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          v-model="customer.first_name"
          required
        />
      </div>
      <div class="form-group">
        <label for="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          v-model="customer.last_name"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="customer.email" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="customer.phone" />
      </div>
      <div class="form-group">
        <button class="btn" type="submit">
          {{ isUpdate ? 'Update' : 'Create' }} Customer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    customerData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      customer: { ...this.customerData },
    };
  },
  computed: {
    isUpdate() {
      return !!this.customer.id;
    },
  },
  methods: {
    handleSubmit() {
      // Validate form data here if necessary

      // Emit event to parent component with the customer data
      this.$emit('form-submit', {
        data: this.customer,
        isUpdate: this.isUpdate,
      });

      // Optionally, reset the form after submission
      this.customer = { first_name: '', last_name: '', email: '', phone: '' };
    },
  },
};
</script>

<style scoped>
.customer-form {
  max-width: 300px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 14px;
}

.btn {
  padding: 0.5rem;
  width: 100%;

  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
}

.btn:hover {
  background-color: #f1f1f1;
}
</style>
