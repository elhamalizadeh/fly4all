import { defineStore } from "pinia";

export const useRecommendDest = defineStore("recommendDest", {
  state: () => {
    return {
      recomendedOrigin: "",
      recomendedDest: "",

        };
  },
  actions: {
    updateSelectRecommended(origin, dest) {
      this.recomendedOrigin = origin;
      this.recomendedDest = dest;
    },

  },
});
