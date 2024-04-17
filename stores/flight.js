import { defineStore } from "pinia";

export const useFlight = defineStore("flightFields", {
  state: () => {
    return {
      city: "",
      destCity: "",
      cityId: "",
      destCityId: "",
      selectedCityId: "",
      selectedDestCityId: "",

      tripType: "oneWay",
      selectedDateFromStore: "",
      selectedReturnDateFromStore:""
    };
  },
  actions: {
    updateCity(cityValue, cityId, selectedCityTitle) {
      //   this.city = cityValue;
      //   this.cityId = cityId;
      this.selectedCityId = selectedCityTitle;
    },

    updateDestCity(destCityValue, destCityId, selectedDestCityTitle) {
      // this.destCity = destCityValue;
      // this.destCityId = destCityId;
      this.selectedDestCityId = selectedDestCityTitle;
    },

    updateTypeTrip(typeTripValue) {
      this.tripType = typeTripValue;
      console.log("this.typeTrip in store:",this.tripType);
    },
    updateSelectedDate(value) {
      this.selectedDateFromStore = value;
      console.log("this.selectedDateFromStore in store:" , this.selectedDateFromStore)
    },
    updateSelectedReturnDate(value){
        this.selectedReturnDateFromStore = value;
    }
  },
});
