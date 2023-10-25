<template>
  <div class="customer-list">
    <div class="top-div">
      <div>
        <input type="email" v-model="searchTerm" placeholder="Search..." />
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
    <table v-if="!isLoading && totalCustomers.length > 0">
      <!-- Table headers -->
      <thead>
        <!-- ... -->
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <!-- Add more table headers based on your customer data structure -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in totalCustomers" :key="customer.id">
          <td>{{ `${customer.first_name} ${customer.last_name}` }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <!-- Menu button for update and black/whitelist options -->
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
    <!-- ... Loading and error messages ... -->
    <div class="loading-overlay" v-if="isLoading || error">
      <div v-if="isLoading">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
      <div v-if="error">
        <p class="error-message">{{ error }}</p>
      </div>
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
      <!-- Form component for creating/updating customer -->
      <CustomerForm
        v-if="isCreateFormVisible || isUpdateFormVisible"
        @form-submit="handleFormSubmit"
        :customerData="customerData"
      />
      <PaymentRequestForm
        v-else
        @request-form-submit="handleRequestFormSubmit"
        :customerData="customerData"
      />
    </div>
  </div>
</template>

<script>
import { useApi } from '@directus/extensions-sdk';
import { ref, onMounted } from 'vue';
import { CustomerForm, PaymentRequestForm } from '../components'; // Import the form component

export default {
  components: { CustomerForm, PaymentRequestForm },
  methods: {
    async handleFormSubmit({ data, isUpdate }) {
      console.log(data);
      console.log(isUpdate);
      // ... existing code ...
      try {
        if (isUpdate) {
          // Handle update logic using data object
          await this.updateCustomer(data);
        } else {
          // Handle create logic using data object
          await this.createCustomer(data);
        }
        // Handle success or any other necessary operations
      } catch (error) {
        console.error(error);
        // Handle error
      } finally {
        this.closeDrawer();
      }
    },
    async createCustomer(customerData) {
      // API call to create a new customer
      // Example API call: await api.post('/customers', customerData);
    },
    async updateCustomer(customerData) {
      // API call to update an existing customer
      // Example API call: await api.put(`/customers/${customerData.id}`, customerData);
    },
    async handleRequestFormSubmit({ data }) {
      //do something with the data
      console.log(data);
      this.closeDrawer();
    },
  },
  setup(props) {
    // ... existing setup code ...
    const api = useApi();
    const totalCustomers = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const isDrawerOpen = ref(false);
    const isCreateFormVisible = ref(false);
    const isUpdateFormVisible = ref(false);
    const isPaymentRequestFormVisible = ref(false);
    const customerData = ref({}); // Data for the form
    const searchTerm = ref('');

    const openCreateForm = () => {
      isCreateFormVisible.value = true;
      isDrawerOpen.value = true;
      customerData.value = {}; // Clear form data for new customer
    };

    const openCustomerOptions = (customer) => {
      // Set form data for updating customer
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
      customerData.value = {}; // Clear form data when closing drawer
    };

    // ... existing methods ...
    const fetchData = async () => {
      isLoading.value = true;
      try {
        const response = await api.get('/stacksync-endpoint/customers');
        console.log(response.data);
        totalCustomers.value = response.data.data;
      } catch (e) {
        error.value = e;
      } finally {
        isLoading.value = false;
      }
    };

    const handleSearch = async () => {
      console.log(searchTerm);
    };

    const handleRiskAction = async (customer) => {
      try {
        const risk_action = customer.risk_action === 'deny' ? 'allow' : 'deny';
        const action = risk_action === 'allow' ? 'Whitelist' : 'Blacklist';
        if (confirm(`Are you sure you want to ${action} this customer?`)) {
          const response = await api.put(
            `/stacksync-endpoint/${customer.id}/set_risk_action`,
            { risk_action },
          );
          console.log(response.data);
        } else {
          return;
        }
      } catch (e) {
        error.value = e;
      }
    };
    onMounted(fetchData);
    // watch(props.type, fetchData);

    return {
      // ... existing return values ...
      totalCustomers,
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

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
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
