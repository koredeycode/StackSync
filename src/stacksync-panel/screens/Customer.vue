<template>
  <div class="customer-list">
    <div class="top-div">
      <div>
        <input
          type="email"
          v-model="searchTerm"
          placeholder="Search by email or customer code"
        />
        <button class="btn" @click="handleSearch">Search</button>
      </div>

      <button class="btn" @click="openCreateForm">New Customer</button>
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
    <div class="filter-options">
      <label>
        <input
          type="checkbox"
          v-model="selectedFilters.blacklist"
          @change="applyFilters"
        />
        Blacklisted
      </label>
      <label>
        <input
          type="checkbox"
          v-model="selectedFilters.whitelist"
          @change="applyFilters"
        />
        Whitelisted
      </label>
    </div>

    <table v-if="!isLoading && filteredCustomers.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in filteredCustomers"
          :key="customer.id"
          :class="{ 'text-red': customer.risk_action === 'deny' }"
        >
          <td>{{ customer.id }}</td>
          <td>{{ `${customer.first_name} ${customer.last_name}` }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <div class="dropdown">
            <button class="dropbtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                />
              </svg>
            </button>
            <div class="dropdown-content">
              <div @click="openCustomerOptions(customer)">Edit</div>
              <div @click="openRequestCustomer(customer)">Request Payment</div>
              <div @click="handleRiskAction(customer)">
                {{
                  customer.risk_action === 'deny' ? 'Whitelist' : 'Blacklist'
                }}
              </div>
            </div>
          </div>
        </tr>
      </tbody>
    </table>
    <p v-else-if="!isLoading && filteredCustomers.length === 0">
      No customers found
    </p>
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
      <CustomerForm
        v-if="isCreateFormVisible || isUpdateFormVisible"
        @form-submit="handleFormSubmit"
        :customerData="customerData"
      />
      <PaymentRequestForm
        v-else
        @request-form-submit="handleRequestFormSubmit"
        :request="{ customer: { id: customerData.id } }"
      />
    </div>
  </div>
</template>

<script>
import { useApi } from '@directus/extensions-sdk';
import { ref, onMounted, reactive } from 'vue';
import { CustomerForm, PaymentRequestForm } from '../components';

export default {
  components: { CustomerForm, PaymentRequestForm },

  setup(props) {
    const api = useApi();
    const totalCustomers = ref([]);
    const filteredCustomers = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const isDrawerOpen = ref(false);
    const isCreateFormVisible = ref(false);
    const isUpdateFormVisible = ref(false);
    const isPaymentRequestFormVisible = ref(false);
    const customerData = ref({});
    const searchTerm = ref('');

    const selectedFilters = reactive({
      blacklist: true,
      whitelist: true,
    });

    const openCreateForm = () => {
      isCreateFormVisible.value = true;
      isDrawerOpen.value = true;
      customerData.value = {};
    };

    const openCustomerOptions = (customer) => {
      customerData.value = { ...customer };
      isUpdateFormVisible.value = true;
      isDrawerOpen.value = true;
    };
    const openRequestCustomer = (customer) => {
      customerData.value = { ...customer };
      isPaymentRequestFormVisible.value = true;
      isDrawerOpen.value = true;
    };

    const closeDrawer = () => {
      isCreateFormVisible.value = false;
      isUpdateFormVisible.value = false;
      isPaymentRequestFormVisible.value = false;
      isDrawerOpen.value = false;
      customerData.value = {};
    };

    const handleFormSubmit = async ({ data, isUpdate }) => {
      isLoading.value = true;

      try {
        if (isUpdate) {
          const { data: updatedData } = await api.put(
            `/stacksync-endpoint/customers/${data.customer_code}`,
            data,
          );
          const index = totalCustomers.value.findIndex(
            (customer) => customer.id === updatedData.data.id,
          );
          if (index !== -1) {
            totalCustomers.value[index] = updatedData.data;
          }
        } else {
          const { data: newData } = await api.post(
            '/stacksync-endpoint/customers',
            data,
          );
          totalCustomers.value.unshift(newData.data);
        }

        applyFilters();
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
        closeDrawer();
      }
    };

    const handleRequestFormSubmit = async ({ data }) => {
      isLoading.value = true;

      try {
        await api.post('/stacksync-endpoint/paymentrequests', data);
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
        closeDrawer();
      }
    };

    const fetchData = async () => {
      isLoading.value = true;
      try {
        const response = await api.get('/stacksync-endpoint/customers');
        totalCustomers.value = response.data.data;
        applyFilters();
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
      }
    };

    const handleSearch = async () => {
      isLoading.value = true;
      try {
        const { data } = await api.get(
          `/stacksync-endpoint/customers/${searchTerm.value}`,
        );
        if (data?.data) {
          totalCustomers.value = [data.data];
        }
        applyFilters();
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
      }
    };

    const handleRiskAction = async (customer) => {
      isLoading.value = true;
      try {
        const risk_action =
          customer.risk_action === 'deny' ? 'default' : 'deny';
        const action = risk_action === 'default' ? 'Whitelist' : 'Blacklist';
        if (confirm(`Are you sure you want to ${action} this customer?`)) {
          const { data } = await api.post(
            `/stacksync-endpoint/customers/${customer.customer_code}/set_risk_action`,
            { risk_action },
          );
          const index = totalCustomers.value.findIndex(
            (customer) => customer.id === data.data.id,
          );
          if (index !== -1) {
            totalCustomers.value[index] = data.data;
          }
        } else {
          return;
        }
        applyFilters();
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
      }
    };
    onMounted(fetchData);

    const closeOverlay = () => {
      error.value = null;
      isLoading.value = false;
    };

    const applyFilters = () => {
      const filteredData = totalCustomers.value.filter((customer) => {
        if (selectedFilters.blacklist && selectedFilters.whitelist) {
          return true;
        } else if (selectedFilters.blacklist) {
          return customer.risk_action === 'deny';
        } else if (selectedFilters.whitelist) {
          return customer.risk_action !== 'deny';
        }
        return false;
      });
      filteredCustomers.value = filteredData;
    };

    return {
      filteredCustomers,
      selectedFilters,
      isLoading,
      error,
      isDrawerOpen,
      isCreateFormVisible,
      isUpdateFormVisible,
      customerData,
      searchTerm,
      openCreateForm,
      openCustomerOptions,
      openRequestCustomer,
      closeDrawer,
      handleSearch,
      handleRiskAction,
      fetchData,
      handleFormSubmit,
      handleRequestFormSubmit,
      closeOverlay,
      applyFilters,
    };
  },
};
</script>

<style scoped>
.customer-list {
  margin-top: 0px;
}

table {
  width: 100%;
  border-collapse: collapse;
  /* margin-bottom: 20px; */
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
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

.dropdown {
  position: relative;
  display: inline-block;

  margin-top: 10px;
  margin-left: 10px;
}

.dropdown-content {
  display: none;
  position: absolute;
  left: -700%;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 0.5rem;
}

.dropdown-content div {
  cursor: pointer;
  flex: 1;
  padding: 0.5rem;
  width: 100%;
}
.dropdown-content div:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
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
.filter-options {
  display: flex;
  gap: 1rem;
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

.error-message,
.text-red td {
  color: red;
}
</style>
