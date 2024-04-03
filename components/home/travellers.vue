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
        placeholder="Travelers"
        style="height: 50px"
        v-model="selectedOption"
        class="home-textinput3 input"
        @click="showOptions = true"
      />

      <div v-if="showOptions" class="options-box">
        <div class="options-box-item">
          <button @click="incrementAdult" class="travellersBtn">+</button>
          <div style="display:grid">
          <div>Adult</div>
          <span style="text-align: center;">{{ countAdult }}</span>
        </div>
          <button @click="decrementAdult" class="travellersBtn">-</button>
        </div>

        <div class="options-box-item">
          <button @click="incrementChildren" class="travellersBtn">+</button>
          <div style="display:grid">
          <div>Children</div>
          <span style="text-align: center;">{{ countChildren }}</span>
        </div>
          <button @click="decrementChildren" class="travellersBtn">-</button>
        </div>

        <div class="options-box-item">
          <button @click="incrementInfant" class="travellersBtn">+</button>
          <div style="display:grid">
          <div>Infants</div>
          <span style="text-align: center;">{{ countInfant }}</span>
        </div>
          <button @click="decrementInfant" class="travellersBtn">-</button>
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
      tripType: "oneWay",
      cabin: "economy",
      adults: 0,
      children: 0,
      infants: 0,
    });

    return {
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
