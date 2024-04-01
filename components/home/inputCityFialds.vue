<template>
  <!--------- Source  ------>
  <div style="margin-right: 15px" class="dropdown">
    <input
      class="home-textinput input"
      type="text"
      id="selectedOption"
      name="selectedOption"
      @input="handleCityInput"
      placeholder="From"
      v-model="city"
      required
    />
    <ul id="myUL" v-if="listVisible" class="dropdown-content">
      <div id="title">Search by city or airport</div>
      <li
        id="li"
        v-for="(airport, i) in airports"
        :key="i"
        :value="airport.id"
        @click="selectCity(airport.id, airport.title)"
        style="cursor: pointer"
      >
        <span>{{ airport.title }}</span>
      </li>
    </ul>
  </div>
  <!------------------ destination ----->
  <div class="dropdown">
    <input
      class="home-textinput input"
      type="text"
      id="selectedOptionDest"
      name="selectedOptionDest"
      @input="handleDestCityInput"
      placeholder="To"
      v-model="destCity"
      required
    />
    <input
      type="hidden"
      class="home-textinput input"
      id="selectedAirportId"
      v-model="hiddenInputValue"
    />
    <ul id="myUL" v-if="listVisibleDest" class="dropdown-content">
      <div id="title">Search by city or airport</div>
      <li
        id="liDest"
        v-for="(airport, i) in destAirports"
        :key="i"
        :value="airport.id"
        @click="selectDestCity(airport.id, airport.title)"
      >
        <span>{{ airport.title }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, computed,defineEmits    } from "vue";
import axios from "axios";

const selectedOption = ref("");
const selectedOptionDest = ref("");
const hiddenInputValue = ref("");
const selectedDestAirportId = ref("");
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


const emits = defineEmits(["citySelected", "destCitySelected"]);
const city = ref("");
const selectedOriginAirport = ref("");
const airports = ref([]);
const showAirports = ref(false);
const airport = city.value.trim();
const showSelectedAirport = ref(false);

const filter = ref("");
// const names = ref([
//   "Al Najaf Intl (NJF): Iraq, Al Najaf",
//   "Mashad (MHD): Iran, Mashhad",
//   "Baghdad Intl (BGW): Iraq, Baghdad",
//   "All airports in Tehran:Iran",
//   "Damascus (DAM): Syrian Arab Republic, Damas",
// ]);

const handleCityInput = async () => {
  if (city.value.trim().length >= 2) {
    const airport = city.value.trim();
    axios
      .get(
        `https://marketplace.beta.luxota.network/v1/search/airports?q=${airport}&lang=en`
      )
      .then((res) => {
        airports.value = res.data.data;
        listVisible.value = true;
        emits("citySelected", city.value);
      })
      .catch((error) => {
        console.log("error");
      });
  } else {
    showAirports = false;
    airports = ref([]);
    console.log("error dare line 40");
  }
};


//------------------ destination--------------------
const destCity = ref("");
const selectedDestAirport = ref("");
const destAirports = ref([]);
const showDestAirports = ref(false);

const handleDestCityInput = async () => {
  if (destCity.value.trim().length >= 2) {
    const destAirport = destCity.value.trim();
    axios
      .get(
        `https://marketplace.beta.luxota.network/v1/search/airports?q=${destAirport}&lang=en`
      )
      .then((res) => {
        destAirports.value = res.data.data;
        listVisibleDest.value = true;
        // emits("destCitySelected", destCity.value);
      })
      .catch((error) => {
        console.log("error");
      });
  } else {
    showDestAirports = false;
    destAirports = ref([]);
    console.log("error dare line 40");
  }
  emits('destCitySelected', destCity.value);
};
const selectDestAirport = (id, title) => {
  destCity.value = title;
  destCity.id = id;
};
// const filteredNames = ref([]);
// const updateFilteredNames = () => {
//   filteredNames.value = names.value.filter((name) => name !== "");
// };

// updateFilteredNames();

const listVisible = ref(false);
const listVisibleDest = ref(false);

// Function to emit selected city to parent
const selectCity = (id,title) => {
  city.value = title;
  city.id = id;
  emits('citySelected', city.id);
};

// Function to emit selected destination city to parent
const selectDestCity = (id,title) => {
  destCity.value = title;
  destCity.id = id;
  emits('destCitySelected', destCity.id);
};


</script>

<style scoped>
#myUL {
  position: absolute;
  z-index: 999;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#myUL #title {
  border: 1px solid #ddd;
  background-color: #f6f6f6;
  padding: 12px;
  font-size: 18px;
  color: black;
  display: block;
}
#myUL li span {
  border: 1px solid #ddd;
  margin-top: -1px;
  background-color: #f6f6f6;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  color: black;
  display: block;
}

#myUL li span:hover:not(.header) {
  background-color: #eee;
  cursor: pointer;
}

/*------start3--------*/
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
/*------flex--------*/
.home-container017 {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1fr;
}
</style>
