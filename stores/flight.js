import { defineStore } from "pinia";

export const useFlight = defineStore("flightFields", {
  state: () => {
    return {
      cityId: "",
      destCityId: "",
      selectedCityTitle: "",
      selectedDestCityTitle: "",
      tripType: "",
      selectedDateFromStore: "",
      selectedReturnDateFromStore: "",
      itemsDataValue:{}
    };
  },
  actions: {
    updateCityTitle(selectedCityTitle) {
      this.selectedCityTitle = selectedCityTitle;
    },
    updateCityId(value) {
      this.cityId = value;
    },

    updateDestCity(selectedDestCityTitle) {
      this.selectedDestCityTitle = selectedDestCityTitle;
    },

    updateTypeTrip(typeTripValue) {
      this.tripType = typeTripValue;
    },
    updateSelectedDate(value) {
      this.selectedDateFromStore = value;
    },
    updateSelectedReturnDate(value) {
      this.selectedReturnDateFromStore = value;
    },

    updateItemsData(value){ // in fly-search.vue
        this.itemsDataValue = value
    },


  },
});
