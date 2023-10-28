<template>
  <div class="product-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="product.description"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="product.price" required />
      </div>
      <div class="form-group">
        <label for="unlimited">Unlimited:</label>
        <input type="checkbox" id="unlimited" v-model="product.unlimited" />
      </div>
      <div class="form-group" v-if="!product.unlimited">
        <label for="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          v-model="product.quantity"
          required
          :disabled="product.unlimited"
        />
      </div>
      <div class="form-group">
        <button class="btn" type="submit">
          {{ isUpdate ? 'Update' : 'Create' }} Product
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    productData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      product: { ...this.productData },
    };
  },
  computed: {
    isUpdate() {
      return !!this.product.id;
    },
  },
  methods: {
    handleSubmit() {
      // Validate form data here if necessary

      this.$emit('form-submit', {
        data: this.product,
        isUpdate: this.isUpdate,
      });

      this.product = {
        name: '',
        description: '',
        price: 0,
        unlimited: false,
        quantity: 0,
      };
    },
  },
};
</script>

<style scoped>
.product-form {
  max-width: 300px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

input[type='number'],
input[type='text'],
textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 14px;
}

input[type='checkbox'] {
  width: 10%;
}

.btn {
  padding: 0.5rem;
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}

.btn:hover {
  background-color: #f1f1f1;
}
</style>
