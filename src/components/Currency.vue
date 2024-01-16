<template lang="">
  <div class="currency_wrapper">
    <h2 class="cell-header">Currency Converter</h2>
    <div class="currency-main">
      <div class="usd-group">
        <p class="currency-label">USD</p>
        <input type="text" class="dollar-input" v-model="dollars" />
      </div>
      <p class="equal-sign">=</p>
      <div class="euro-group">
        <p class="currency-label">EURO</p>
        <input type="text" class="dollar-input" v-model="euros" />
      </div>
    </div>
  </div>
</template>
<script>
import { useFetch } from "@vueuse/core";
export default {
  data() {
    return {
      dollars: 0,
      euros: 0,
      conversionRate: null,
    };
  },
  async mounted() {
    await useFetch(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_CURRENCY_API_KEY}/latest/USD`).then((response) => {
      let parsedResponse = JSON.parse(response.data.value);
      this.conversionRate = parsedResponse.conversion_rates.EUR;
    });
  },
  watch: {
    dollars(newValue, oldValue) {
      this.euros = Math.round(newValue * this.conversionRate);
    },
    euros(newValue, oldValue) {
      this.dollars = Math.round(newValue / this.conversionRate);
    },
  },
};
</script>
<style lang="scss">
.currency_wrapper {
  background-color: #8f95d3;
  .currency-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .usd-group,
    .euro-group {
      display: flex;
      flex-direction: column;
      text-align: center;
      .currency-label {
        font-weight: bold;
      }
      .dollar-input {
        width: 4em;
        padding: 8px;
        border-radius: 12px;
        outline: none;
      }
    }
    .equal-sign {
      font-size: 2em;
    }
  }
}
</style>
