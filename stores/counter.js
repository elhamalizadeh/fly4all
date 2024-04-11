import { defineStore } from "pinia";

export const useCounter = defineStore("counter", {
  state: () => {
    return {
      adultsCount: 1,
      childrenCount: 0,
      infantsCount: 0

        };
  },
  actions: {
    incrementAdults(){
        this.adultsCount++
    },
    decrementAdults(){
        if (this.adultsCount > 1) {
            this.adultsCount--;
        }
    },


    incrementChildren(){
        this.childrenCount++
    },
    decrementChildren(){
        if (this.childrenCount > 0) {
            this.childrenCount--;
        }
    },


    incrementInfants(){
        this.infantsCount++
    },
    decrementInfants(){
        if (this.infantsCount > 0) {
        this.infantsCount--
        }
    }

  },
});
