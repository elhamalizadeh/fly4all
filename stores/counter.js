import { defineStore } from "pinia";

export const useCounter = defineStore("recommended", {
  state: () => {
    return {
      recomendedOrigin: "",
      recomendedDest: "",
      adultsCount: 1,
      childrenCount: 0,
      infantsCount: 0

        };
  },
  actions: {
    updateSelectRecommended(origin, dest) {
      this.recomendedOrigin = origin;
      this.recomendedDest = dest;
    },

    incrementAdults(){
        this.adultsCount++
    },
    decrementAdults(){
        this.adultsCount--
    },


    incrementChildren(){
        this.childrenCount++
    },
    decrementChildren(){
        this.childrenCount--
    },


    incrementInfants(){
        this.infantsCount++
    },
    decrementInfants(){
        this.infantsCount--
    }

  },
});
