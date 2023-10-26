<template>
  <div class="integration">
    <div class="top-div">
      <button class="refresh" @click="fetchData">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"
          />
        </svg>
      </button>
    </div>
    <div class="loading-overlay" v-if="isLoading || error">
      <div v-if="isLoading">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
      <div v-if="error">
        <p class="error-message">{{ error }}</p>
      </div>
      <div><button @click="closeOverlay">Close</button></div>
    </div>
    <form @submit.prevent="handleFormSubmit">
      <div class="form-group">
        <label for="payment_session_timeout">Payment Session Timeout:</label>
        <input
          type="number"
          id="payment_session_timeout"
          v-model="payment_session_timeout"
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
import { useApi } from '@directus/extensions-sdk';
import { ref, onMounted } from 'vue';

export default {
  setup(props) {
    const api = useApi();
    const payment_session_timeout = ref(0);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchData = async () => {
      isLoading.value = true;
      try {
        const { data } = await api.get(
          'stacksync-endpoint/integration/payment_session_timeout',
        );
        payment_session_timeout.value = data.data.payment_session_timeout;
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
      }
    };

    const handleFormSubmit = async () => {
      isLoading.value = true;
      try {
        await api.put(
          'stacksync-endpoint/integration/payment_session_timeout',
          {
            timeout: payment_session_timeout.value,
          },
        );
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
      }
    };

    const closeOverlay = () => {
      error.value = null;
      isLoading.value = false;
    };

    onMounted(fetchData);
    return {
      payment_session_timeout,
      isLoading,
      error,
      handleFormSubmit,
      fetchData,
      closeOverlay,
    };
  },
};
</script>

<style scoped>
form {
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

.top-div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.refresh {
  border-radius: 999px;

  padding: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.9);
  z-index: 100;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3); /* Light border */
  border-top: 4px solid #3498db; /* Blue border for spinner */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite; /* Rotation animation */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  color: red;
}
</style>
