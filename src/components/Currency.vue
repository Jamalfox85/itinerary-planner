<template lang="">
  <div class="currency_wrapper">
    <div class="currency-main">
      <div class="usd-group">
        <n-select class="currency-select" v-model:value="startingCurrency" :options="currencies" />
        <n-input-number class="currency-input" v-model:value="startingValue" clearable />
      </div>
      <p class="equal-sign">=</p>
      <div class="euro-group">
        <n-select class="currency-select" v-model:value="targetCurrency" :options="currencies" />
        <n-input-number class="currency-input" v-model:value="targetValue" clearable />
      </div>
    </div>
  </div>
</template>
<script>
import { useFetch } from "@vueuse/core";
import { NInputNumber, NSelect } from "naive-ui";
export default {
  components: { NInputNumber, NSelect },
  data() {
    return {
      startingCurrency: "USD",
      targetCurrency: "EUR",
      startingValue: 0,
      targetValue: 0,
      conversionRate: null,
    };
  },
  computed: {
    currencies() {
      return [
        {
          label: "USD",
          value: "USD",
        },
        {
          label: "EUR",
          value: "EUR",
        },
        {
          label: "JPY",
          value: "JPY",
        },
        {
          label: "GBP",
          value: "GBP",
        },
        {
          label: "AUD",
          value: "AUD",
        },
        {
          label: "CAD",
          value: "CAD",
        },
        {
          label: "CHF",
          value: "CHF",
        },
        {
          label: "CNY",
          value: "CNY",
        },
        {
          label: "SEK",
          value: "SEK",
        },
        {
          label: "NZD",
          value: "NZD",
        },
      ];
    },
  },
  async mounted() {
    await useFetch(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_CURRENCY_API_KEY}/latest/${this.startingCurrency}`).then((response) => {
      let parsedResponse = JSON.parse(response.data.value);
      this.conversionRate = parsedResponse.conversion_rates[this.targetCurrency];
      console.log("CONVERSION: ", parsedResponse);
    });
  },
  watch: {
    startingValue(newValue, oldValue) {
      this.targetValue = (newValue * this.conversionRate).toFixed(2);
    },
    targetValue(newValue, oldValue) {
      this.startingValue = (newValue / this.conversionRate).toFixed(2);
    },
    async startingCurrency(newValue, oldValue) {
      await useFetch(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_CURRENCY_API_KEY}/latest/${this.startingCurrency}`).then((response) => {
        let parsedResponse = JSON.parse(response.data.value);
        this.conversionRate = parsedResponse.conversion_rates[this.targetCurrency];
        this.startingValue = (this.targetValue / this.conversionRate).toFixed(2);
      });
    },
    async targetCurrency(newValue, oldValue) {
      await useFetch(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_CURRENCY_API_KEY}/latest/${this.startingCurrency}`).then((response) => {
        let parsedResponse = JSON.parse(response.data.value);
        this.conversionRate = parsedResponse.conversion_rates[this.targetCurrency];
        this.targetValue = (this.startingValue * this.conversionRate).toFixed(2);
      });
    },
  },
};
</script>
<style lang="scss">
.currency_wrapper {
  .currency-main {
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    .usd-group,
    .euro-group {
      display: flex;
      // flex-direction: column;
      align-items: center;
      text-align: center;
      .currency-select {
        width: fit-content;
      }
      .currency-input {
        width: fit-content;
      }
    }
    .equal-sign {
      font-size: 2em;
      margin: 0 0.5em;
    }
  }
}
</style>
