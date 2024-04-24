import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { useFlightResults } from "./flightResults";

export const useFlight = defineStore("flightFields", {
  state: () => {
    return {
      infoResult: null,
      legsCount: null,
      cityId: "",
      destCityId: "",
      selectedCityTitle: "",
      selectedDestCityTitle: "",
      tripType: "oneWay",
      selectedDateFromStore: "",
      selectedReturnDateFromStore: "",
      itemsDataValue: {},
      sessionIdStore: "",
    };
  },

  //--------------------------------------- actions ----
  actions: {
    updateSessionIdStore(value) {
      this.sessionIdStore = value;
    },

    //-------set inputValues in fly-search page the comes from index
    searchInfo() {
      const route = useRoute();
      const flightResults = useFlightResults();

      console.log("sessionId in flight.js-----", this.sessionIdStore);

      $fetch("https://marketplace.beta.luxota.network/v1/search/info", {
        method: "GET",
        params: {
          sessionId: this.sessionIdStore,
          currency: 158,
          lang: "en",
        },
      })
        .then((response) => {
          console.log("response 64:------", response.legs); ///------
          // itemsData.value = response.legs;
          this.updateItemsData(response.legs);
          this.infoResult = response.legs;

          const keys = Object.keys(response.legs);
          // Calculate the length based on the number of keys
          this.legsCount = keys.length;
          console.log("infoResult 46 is:----", this.infoResult);
          console.log("legsCount 47 is:", this.legsCount);

          //-------for oneWay- roundTrip -multiDest//
          for (let i = 0; i < response.legs.length; i++) {
            const leg = response.legs[i];
            flightResults.updateOriginAirportTitle(leg.origin.buffer.title);
            flightResults.updateOriginAirportId(leg.origin.buffer.id);
            flightResults.updateDestAirportTitle(leg.destination.buffer.title);
            flightResults.updateDestAirportId(leg.destination.buffer.id);
            flightResults.updateDepartureDate(leg.departure);
            flightResults.updateDepartureDateToSend(leg.departure);
          }
          // flightResults.updateOriginAirportTitle(response.legs[0].origin.buffer.title);
          // flightResults.updateOriginAirportId(response.legs[0].origin.buffer.id);
          // flightResults.updateDestAirportTitle(response.legs[0].destination.buffer.title);
          // flightResults.updateDestAirportId(response.legs[0].destination.buffer.id);
          // flightResults.updateDepartureDate(response.legs[0].departure);
          // flightResults.updateDepartureDateToSend(response.legs[0].departure);

          // if (this.tripType == "roundTrip") {
          //   flightResults.updateDepartureDateReturn(response.legs[1].departure);
          //   flightResults.updateDepartureDate(response.legs[1].destination);
          //   // flightResults.updateDepartureDateReturnToSend(response.legs[1].departure);
          // }
          flightResults.setPage("flySearch");
        })
        .catch((error) => {
          console.error("Error fetching flight results:", error);
        });
    },

    //------------------
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

    updateItemsData(value) {
      // in fly-search.vue
      this.itemsDataValue = value;
    },
  },
});
