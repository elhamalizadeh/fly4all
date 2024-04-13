<template>
  <div class="home-container025">
    <input
      type="hidden"
      placeholder="Travelers "
      class="home-textinput3 input"
      v-model="travellers"
    />
    <div>
      <input
        type="text"
        :placeholder="placeholderText"
        style="height: 50px"
        v-model="selectedOption"
        class="home-textinput3 input"
        @click="showOptions = true"
      />

      <div v-if="showOptions" class="options-box">
          <div class="options-box-item">
            <button @click="travelersCounter.decrement('adults')" class="travellersBtn">-</button>
            <div style="display:grid">
            <div>Adult</div>
            <span style="text-align: center;">{{ travelersCounter.adultsCount }}</span>
          </div>
            <button @click="travelersCounter.increment('adults')" class="travellersBtn">+</button>
          </div>
  
          <div class="options-box-item">
            <button @click="travelersCounter.decrement('children')" class="travellersBtn">-</button>
            <div style="display:grid">
            <div>Children</div>
            <span style="text-align: center;">{{ travelersCounter.childrenCount }}</span>
          </div>
            <button @click="travelersCounter.increment('children')" class="travellersBtn">+</button>
          </div>
  
          <div class="options-box-item">
          <button @click="travelersCounter.decrement('infants')" class="travellersBtn">-</button>
          <div style="display:grid">
          <div>Infants</div>
          <span style="text-align: center;">{{ travelersCounter.infantsCount }}</span>
        </div>
        <button @click="travelersCounter.increment('infants')" class="travellersBtn">+</button>
        </div>
          <button
            @click="done"
            id="doneBtn"
          >
            Done
          </button>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {

    const  travelersCounter  = useCounter();
    const selectedOption = ref("");
    const selectedOptionDest = ref("");
    const showOptions = ref(false);
    const done = () => {
      showOptions.value = false;
    };

    const params = reactive({
      origin: "",
      destination: "",
      date: "",
      tripType: "oneWay",
      cabin: "economy",
      adults: 0,
      children: 0,
      infants: 0,
    });


    const placeholderText = computed(() => {
      return travelersCounter.adultsCount +" Adulst - " + travelersCounter.childrenCount +" Children - " + travelersCounter.infantsCount +" Infants";
    });

    ///---------------------------
    const closeBoxOnClickOutside = (event) => {
      if (!event.target.closest(".home-container025")) {
        showOptions.value = false;
      }
    };

    // Listen for click events when component is mounted
    onMounted(() => {
      document.addEventListener("click", closeBoxOnClickOutside);
    });

    // Remove event listener when component is unmounted to prevent memory leaks
    onUnmounted(() => {
      document.removeEventListener("click", closeBoxOnClickOutside);
    });



    return {
      params,
      showOptions,
      travelersCounter,
      done,
      placeholderText
    };
  },
};
</script>
<style scoped>
.home-container025 {
  color: rgb(18, 18, 20);
  display: flex-end;
}

.options-box {
  border: 1px solid gray;
  width:250px;
  padding: 40px;
  margin-top: 5px;
  background-color: white;
  z-index: 1000;
  position: absolute; /* ---- */
  bottom: 0.1rem;
  border-radius: 15px;
  display:grid;
  gap:2rem;
}
.options-box-item {
  display: flex;
  flex-wrap: wrap;
  /* gap:3rem; */
  justify-content: space-between;
}
.options-box > div {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  position: relative;
  top: 0;
}
.sub-title {
  display: block;
}
.options-box button {
  margin: 0 5px;
}
#doneBtn{
  background-color: rgb(255, 95, 10);
   width: 90%; 
   padding:0.5rem;
   color: white;
   border-radius: 10px;

}
.travellersBtn{
  background-color: #110140;
  color:white;
  border-radius: 50%;
  padding-top:3px;
  padding-bottom: 3px;
  padding-right:10px;
  padding-left:10px;
  font-size:1.5rem
}
</style>
