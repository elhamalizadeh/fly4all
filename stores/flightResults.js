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
    updateArriveDate(date){
        this.arriveDate = date;
    },
    updateDepartureDateToSend(date){
        this.departureDateToSend = date
    }
  },
});
