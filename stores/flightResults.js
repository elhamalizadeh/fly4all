import { defineStore } from "pinia";
import { useRoute } from "vue-router";
// import { useFlight } from "./flight"; 


export const useFlightResults = defineStore("flightResults", {
  
  state: () => {
    return {
      flightsData:{},
      originAirportTitle: "",
      originAirportId: "",
      destAirportTitle: "",
      destAirportId: "",
      departureDate:"",
      departureDateToSend:"",
      departureDateReturn:"",
      departureDateReturnToSend:"",
      arriveDate:"",
      page:"Home"
    };
  },
  actions: {

    //-----------------
searchResults(){
  const route = useRoute(); 
  // const flightResults = useFlightResults(); 
  const sessionId = route.query.sessionId;
  $fetch("https://marketplace.beta.luxota.network/v1/search/results", {
    method: "GET",
    params: {
      sessionId: sessionId,
      page: 1,
      currency: 158,
      lang: "en",
    },
  })
    .then((response) => {
      console.log("response Flight in 327:", response);
      this.flightsData = response.data;
    })
    .catch((error) => {
      console.error("Error fetching flight results:", error);
    });
},

//---------------------------
    setPage(pageTitle){
        this.page = pageTitle
    },
    updateOriginAirportTitle(originTitle) {
      this.originAirportTitle = originTitle;
    },
    updateOriginAirportId(originId) {
      this.originAirportId = originId;
    },

    updateDestAirportTitle(destTitle) {
      this.destAirportTitle = destTitle;
    },
    updateDestAirportId(destId) {
      this.destAirportId = destId;
    },
    updateDepartureDate(date){
        this.departureDate = date
    },
  
    updateDepartureDateToSend(date){
        this.departureDateToSend = date
    },

    updateDepartureDateReturn(date){
      this.departureDateReturn = date;
  },

  updateDepartureDateReturnToSend(date){
    this.departureDateReturnToSend = date;
},
  },
});
