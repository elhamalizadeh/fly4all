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
    //   console.log("selectedDestCityTitle 30:" ,selectedDestCityTitle)
    },

    updateTypeTrip(typeTripValue) {
      this.tripType = typeTripValue;
    //   console.log("this.typeTrip in store:", this.tripType);
    },
    updateSelectedDate(value) {
      this.selectedDateFromStore = value;
    //   console.log(
    //     "this.selectedDateFromStore in store:",
    //     this.selectedDateFromStore
    //   );
    },
    updateSelectedReturnDate(value) {
      this.selectedReturnDateFromStore = value;
    },

    updateItemsData(value){ // in fly-search.vue
        this.itemsDataValue = value
    },


  },
});
