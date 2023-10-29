<template>
  <div class="integration">
    <div class="top-div">
      <span
        >Payment Timeout:
        <span
          >{{ payment_session_timeout.payment_session_timeout }} seconds</span
        ></span
      >
      <button class="btn" @click="openDrawer">Set Timeout</button>

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
    <div
      class="overlay"
      :class="{ open: isDrawerOpen }"
      @click="closeDrawer"
    ></div>
    <!-- Drawer for the form -->
    <div v-if="isDrawerOpen" class="drawer" :class="{ open: isDrawerOpen }">
      <div class="cancel-btn-div">
        <button @click="closeDrawer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            />
          </svg>
        </button>
      </div>

      <SetTimeoutForm
        @timeout-form-submit="handleFormSubmit"
        :timeoutData="payment_session_timeout"
      />
    </div>
    <div class="totals">
      <h3>Transaction Totals ({{ transactionTotals.total_transactions }})</h3>
      <div class="totals__div">
        <div>
          <span>Total Volume: </span
          ><span>{{
            (transactionTotals.total_volume / 100).toLocaleString()
          }}</span>
        </div>
        <div>
          <span>Pending Transfers: </span
          ><span>{{
            (transactionTotals.pending_transfers / 100).toLocaleString()
          }}</span>
        </div>
      </div>
    </div>
    <h3>Transaction Performance</h3>
    <div class="performance">
      <Donut :pieData="transactionPerformance.count" title="Count" />
      <Donut
        v-if="transactionPerformance.errors"
        :pieData="transactionPerformance.errors"
        title="Errors"
      />
    </div>
  </div>
</template>

<script>
import { useApi } from '@directus/extensions-sdk';
import { ref, onMounted } from 'vue';
import { SetTimeoutForm, Donut } from '../components';
export default {
  components: {
    SetTimeoutForm,
    Donut,
  },
  setup(props) {
    const api = useApi();
    const payment_session_timeout = ref({});
    const transactionTotals = ref({});
    const transactionPerformance = ref({});
    const isLoading = ref(false);
    const error = ref(null);
    const isDrawerOpen = ref(false);

    const fetchData = async () => {
      isLoading.value = true;
      try {
        const { data: timeoutData } = await api.get(
          'stacksync-endpoint/integration/payment_session_timeout',
        );
        payment_session_timeout.value = timeoutData.data;

        const { data: totalsData } = await api.get(
          'stacksync-endpoint/integration/totals',
        );
        transactionTotals.value = totalsData.data;

        const { data: performanceData } = await api.get(
          'stacksync-endpoint/integration/performance',
        );
        transactionPerformance.value = performanceData.data;
        console.log(transactionPerformance.value);
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
      }
    };

    const handleFormSubmit = async ({ data }) => {
      isLoading.value = true;
      try {
        await api.put(
          'stacksync-endpoint/integration/payment_session_timeout',
          {
            timeout: data.payment_session_timeout,
          },
        );
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
        closeDrawer();
      }
    };

    const openDrawer = () => {
      isDrawerOpen.value = true;
    };
    const closeDrawer = () => {
      isDrawerOpen.value = false;
    };

    const closeOverlay = () => {
      error.value = null;
      isLoading.value = false;
    };

    onMounted(fetchData);
    return {
      payment_session_timeout,
      transactionTotals,
      transactionPerformance,
      isLoading,
      error,
      isDrawerOpen,
      handleFormSubmit,
      openDrawer,
      fetchData,
      closeOverlay,
      closeDrawer,
    };
  },
};
</script>
<style scoped>
.integration {
  margin-top: 0px;
}

.error {
  color: red;
  margin-top: 10px;
}

.drawer {
  background-color: white;
  position: absolute;
  top: 0;
  right: -30%;
  width: 50%;
  height: 100%;
  padding: 1rem;

  box-shadow: -2px 0 5px 0 rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease;

  overflow-y: scroll;
}
.drawer.open {
  right: 0;
  z-index: 99;
}

.overlay {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(46, 4, 49);
  opacity: 0.5;
  z-index: 98;
}

.overlay.open {
  display: block;
}

.top-div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.top-div .btn {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
}

.top-div input {
  padding: 0.5rem;
}

.cancel-btn-div {
  display: flex;
  justify-content: flex-end;
}

.cancel-btn-div button,
.refresh {
  border-radius: 999px;

  padding: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
}
.cancel-btn-div button:hover,
.refresh:hover,
.top-div .btn:hover {
  background-color: #f1f1f1;
}
h3 {
  font-size: large;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.totals__div {
  display: flex;
  gap: 2rem;
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
.totals {
  margin-bottom: 1rem;
}
.performance {
  display: flex;
  gap: 0.5rem;
}
</style>
