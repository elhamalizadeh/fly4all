import { defineStore } from "pinia";

export const useRecommendDest = defineStore("recommendDest", {
  state: () => {
    return {
      recomendedOrigin: "",
      recomendedDest: "",
      recomendedOriginAirportId:"",
      recomendedOriginAirport:"",

      recomendedDestAirportId:"",
      recomendedDestAirport:""

        };
  },
  actions: {
    updateSelectRecommended(origin, dest ,originAirportId,originAirport,destAirportId,destAirport,) {
      this.recomendedOrigin = origin;
      this.recomendedDest = dest;
      this.recomendedOriginAirport = originAirport;
      this.recomendedDestAirport = destAirport;
      this.recomendedOriginAirportId = originAirportId;
      this.recomendedDestAirportId = destAirportId;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
   });
    },

  },
});
