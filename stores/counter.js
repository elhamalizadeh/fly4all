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
    increment(value){
        switch(value){
            case 'adults':
                if (this.adultsCount < 6) {
                this.adultsCount++
                }
            break;

            case 'children':
                if (this.childrenCount < 4) {
                this.childrenCount++
                }
            break;

            case 'infants':
                if (this.infantsCount < 4) {
                this.infantsCount++
                }
                break;

            default :
                break;

        }
    },
    decrement(value){
        switch(value){
            case 'adults':
                if (this.adultsCount > 1) {
                    this.adultsCount--;
                }
            break;

            case 'children':
                if (this.childrenCount > 0) {
                    this.childrenCount--;
                }
            break;

            case 'infants':
                if (this.infantsCount > 0) {
                    this.infantsCount--
                    }
                break;

            default :
                break;

        }

},

  },
});
