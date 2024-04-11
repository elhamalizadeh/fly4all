import { defineStore } from "pinia";

export const useCounter = defineStore("recommended", {
  state: () => {
    return {
      recomendedOrigin: "",
      recomendedDest: "",
      city:""
    };
  },
  actions: {
    updateSelectRecommended(origin, dest) {
      this.recomendedOrigin = origin;
      this.recomendedDest = dest;
    },

    // async handleCityInput(city) {
    //   console.log("city.value is:", city);
    //   if (city.value.trim().length >= 2) {
    //     const airport = city.value.trim();
    //     axios
    //       .get(
    //         `https://marketplace.beta.luxota.network/v1/search/airports?q=${airport}&lang=en`
    //       )
    //       .then((res) => {
    //         airports.value = res.data.data;
    //         listVisible.value = true;
    //         emits("citySelected", city.value);
    //       })
    //       .catch((error) => {
    //         console.log("error");
    //       });
    //   } else {
    //     showAirports = false;
    //     airports = ref([]);
    //     console.log("error dare line 40");
    //   }
    // },
  },
});
