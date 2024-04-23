import { defineStore } from "pinia";

export const useFlightResults = defineStore("flightResults", {
  
  state: () => {
    return {
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
