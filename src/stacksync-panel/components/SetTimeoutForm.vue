<template>
  <div class="timeout-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="payment_session_timeout">Payment Session Timeout:</label>
        <input
          type="number"
          id="payment_session_timeout"
          v-model="timeout.payment_session_timeout"
          required
        />
      </div>
      <div class="form-group">
        <button class="btn" type="submit">Set Payment Session Timeout</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    timeoutData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      timeout: { ...this.timeoutData },
    };
  },
  methods: {
    handleSubmit() {
      // Validate form data here if necessary

      this.$emit('timeout-form-submit', {
        data: this.timeout,
      });
    },
  },
};
</script>

<style scoped>
.timeout-form {
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
