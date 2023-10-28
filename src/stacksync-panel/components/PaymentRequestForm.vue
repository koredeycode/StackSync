<template>
  <div class="request-payment-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="customer">Cutomer Id:</label>
        <input
          type="number"
          id="customer"
          v-model="requestData.customer"
          :disabled="isDisabled"
          required
        />
      </div>
      <div class="form-group">
        <label for="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          v-model="requestData.amount"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="requestData.description"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="due-date">Due Date:</label>
        <input
          type="date"
          id="due-date"
          v-model="requestData['due-date']"
          required
        />
      </div>
      <div class="form-group">
        <button class="btn" type="submit">Request Payment</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    request: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      requestData: {
        ...this.request,
        customer: this.request?.customer?.id || '',
      },
    };
  },
  computed: {
    isDisabled() {
      return !!this.request?.customer?.id;
    },
  },
  methods: {
    handleSubmit() {
      // Validate form data here if necessary

      this.$emit('request-form-submit', {
        data: this.requestData,
      });

      this.requestData = {
        amount: 0,
        description: '',
        'due-date': '',
        customer: '',
      };
    },
  },
};
</script>

<style scoped>
.request-payment-form {
  max-width: 300px;
  margin: 0 auto;
}
h2 {
  margin-bottom: 1rem;
}
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

input,
textarea {
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
