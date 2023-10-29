<template>
  <div class="chart">
    <apexchart :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    pieData: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
    },
  },
  computed: {
    // Prepare the chart data
    chartSeries() {
      if (this.pieData) {
        return Object.values(this.pieData);
      }
      return [];
    },

    chartOptions() {
      return {
        chart: {
          width: '100%',
          height: '100%',
          type: 'donut',
        },
        labels: Object.keys(this.pieData || {}),
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                },
              },
            },
          },
        },
        title: {
          text: this.title,
        },
        dataLabels: {
          enabled: true,
          formatter(val, opts) {
            // const name = opts.w.globals.labels[opts.seriesIndex];
            // return [name, val.toFixed(1) + '%'];
            return val.toFixed(1) + '%';
          },
        },
        legend: { show: true },
      };
    },
  },
};
</script>

<style scoped>
.chart {
  padding: 0.5rem;
  background: #f1f1f1;
  flex: 1;
  width: 200px;
  height: 200px;
}
</style>
