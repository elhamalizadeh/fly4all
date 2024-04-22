import { defineStore } from "pinia";

export const useFlightResults = defineStore("flightResults", {
  state: () => {
    return {
      originAirportTitle: "",
      originAirportId: "",
      destAirportTitle: "",
      destAirportId: "",
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
  },
});
