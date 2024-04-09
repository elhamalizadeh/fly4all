import { defineStore } from 'pinia';

export const useCounter = defineStore('recommended',{
    state:()=>{
        return {
            recomendedOrigin:'',
            recomendedDest:''
        }
    },
    actions: {
        updateSelectRecommended(origin,dest) {
            this.recomendedOrigin = origin;
            this.recomendedDest = dest
        },
    }
});
