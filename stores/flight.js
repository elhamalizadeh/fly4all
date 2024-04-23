import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { useFlightResults } from "./flightResults"; 

export const useFlight = defineStore("flightFields", {
  state: () => {
    return {
      cityId: "",
      destCityId: "",
      selectedCityTitle: "",
      selectedDestCityTitle: "",
      tripType: "oneWay",
      selectedDateFromStore: "",
      selectedReturnDateFromStore: "",
      itemsDataValue:{}
    };
  },

  //--------------------------------------- actions ----
  actions: {
    //-------set inputValues in fly-search page the comes from index
    searchInfo(){
      const route = useRoute(); 
      const flightResults = useFlightResults(); 
      // const originIdFromSearchResult = ref("");
      // const originTitleFromSearchResult = ref("");
      const sessionId = route.query.sessionId;


      $fetch("https://marketplace.beta.luxota.network/v1/search/info", {
        method: "GET",
        params: {
          sessionId: sessionId,
          currency: 158,
          lang: "en",
        },
      })
        .then((response) => {
          console.log("response 64:", response.legs); ///------
          // itemsData.value = response.legs;
          this.updateItemsData(response.legs);
          console.log("itemsDataValue 299 is:", this.itemsDataValue);
    
          // originIdFromSearchResult.value = response.legs[0].origin.buffer.id;
          // originTitleFromSearchResult.value = response.legs[0].origin.buffer.title;
    
          flightResults.updateOriginAirportTitle(response.legs[0].origin.buffer.title);
          flightResults.updateOriginAirportId(response.legs[0].origin.buffer.id);
    
          flightResults.updateDestAirportTitle(response.legs[0].destination.buffer.title);
          flightResults.updateDestAirportId(response.legs[0].destination.buffer.id);
          flightResults.updateDepartureDate(response.legs[0].departure);
          flightResults.updateDepartureDateToSend(response.legs[0].departure);

          if (this.tripType == "roundTrip") {
            flightResults.updateDepartureDateReturn(response.legs[1].departure);
            flightResults.updateDepartureDateReturnToSend(response.legs[1].departure);
          }
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

    updateItemsData(value){ // in fly-search.vue
        this.itemsDataValue = value
    },


  },
});
