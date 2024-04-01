<template>
           <div class="home-container025">
          <input
            type="text"
            placeholder="Travelers "
            class="home-textinput3 input"
            v-model="travellers"
          />
          <div>
            <input
              type="text"
              placeholder="Travelers"
              style="height: 50px"
              v-model="selectedOption"
              class="home-textinput3 input"
              @click="showOptions = true"
            />

            <div v-if="showOptions" class="options-box">
              <div class="options-box-item">
                <div>Adult</div>
                <button @click="incrementAdult">+</button>
                <span>{{ countAdult }}</span>
                <button @click="decrementAdult">-</button>
              </div>

              <div class="options-box-item">
                <div>Children</div>
                <button @click="incrementChildren">+</button>
                <span>{{ countChildren }}</span>
                <button @click="decrementChildren">-</button>
              </div>

              <div class="options-box-item">
                <div>Infants</div>
                <button @click="incrementInfant">+</button>
                <span>{{ countInfant }}</span>
                <button @click="decrementInfant">-</button>
              </div>
              <button
                @click="done"
                style="background-color: #003eb3; width: 90%; color: white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
</template>

<script>
import { ref, watch, onMounted , computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const {
      countAdult,
      incrementAdult,
      decrementAdult,
      countChildren,
      incrementChildren,
      decrementChildren,
      countInfant,
      incrementInfant,
      decrementInfant,
    } = useCounter();

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
      tripType: "oneway",
      cabin: "economy",
      adults: 0,
      children: 0,
      infants: 0,
    });



    return{
        params,
        showOptions,
      countAdult,
      incrementAdult,
      decrementAdult,
      done,
      countInfant,
      incrementInfant,
      decrementInfant,
      countChildren,
      incrementChildren,
      decrementChildren,  
    }
  },
}
</script>
<style scoped>
.home-container025 {
  color: rgb(18, 18, 20);
  display: flex-end;
}

.options-box {
  border: 1px solid gray;
  padding: 10px;
  margin-top: 5px;
  background-color: white;
  z-index: 1000;
  position: absolute; /* ---- */
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
  top:0;
}
.sub-title {
  display: block;
}
.options-box button {
  margin: 0 5px;
}
</style>