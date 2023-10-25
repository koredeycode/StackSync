<template>
  <div>Integration</div>
  <div>{{ data.status }}</div>
</template>

<script>
import { useApi } from '@directus/extensions-sdk';
import { ref, onMounted } from 'vue';

export default {
  setup(props) {
    const api = useApi();
    const data = ref(null);

    const fetchData = async () => {
      const response = await api.get('stacksync-endpoint/status');
      data.value = response.data;
    };
    onMounted(() => {
      fetchData();
    });
    return { data };
  },
};
</script>

<style scoped>
div {
  color: purple;
}
</style>
