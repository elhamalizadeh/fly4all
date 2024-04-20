<template>
  <!--------- Source  ------>
  <div class="dropdown home-container018">
    <div v-if="flightFields.itemsDataValue">

    <!-- <div v-for="(leg, index) in flightFields.itemsDataValue" :key="index" class="mt-5 text-teal-500">
      <p><b>Origin[{{ index }}]</b>: {{ leg.origin.buffer.title }}</p>
      <p><b>Destination[{{ index }}]</b>: {{ leg.destination.buffer.title }}</p>
    </div> -->
   
</div>
    <input
      class="home-textinput input"
      type="text"
      id="selectedOption"
      @input="handleCityInput"
      placeholder="From"
      v-model="city"
      :required = required
    />
    <!-- :placeholder="cityPlaceholderText" -->

    <input 
    type="hidden"
    placeholder="From"
      class="home-textinput input"
      :name="`legs[${index}][origin]`"
      id="selectedAirportId"
    v-model="selectedCityId"
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
  <div class="home-container019">
    <span v-if="city" class="close-icon" @click="clearInputCity">&times;</span>
    <!------- origin icon  ------>
    <svg viewBox="0 0 1024 1024" class="home-icon14">
      <path
        d="M942 412q6 26-7 48t-39 30q-248 66-412 110l-226 60-68 20-112-192 62-16 84 64 212-56-176-306 82-22 294 274 228-60q26-8 49 6t29 40zM106 810h812v86h-812v-86z"
      ></path>
    </svg>
  </div>
  <div class="home-container020">
    <!-------- calendar icon  -->
    <svg viewBox="0 0 1024 1024" class="home-icon16">
      <path
        d="M320 384h128v128h-128zM512 384h128v128h-128zM704 384h128v128h-128zM128 768h128v128h-128zM320 768h128v128h-128zM512 768h128v128h-128zM320 576h128v128h-128zM512 576h128v128h-128zM704 576h128v128h-128zM128 576h128v128h-128zM832 0v64h-128v-64h-448v64h-128v-64h-128v1024h960v-1024h-128zM896 960h-832v-704h832v704z"
      ></path>
    </svg>
  </div>
  <div class="home-container021" style="cursor: pointer" @click="changeCity">
    <!----- change cities icon-->
    <svg viewBox="0 0 1024 1024" class="home-icon18">
      <path
        d="M170.667 384h149.333c31.403 0 59.435 16.683 78.976 42.709 13.867-25.771 31.104-49.621 50.816-70.912-34.261-35.115-79.616-57.131-129.792-57.131h-149.333c-23.595 0-42.667 19.115-42.667 42.667s19.072 42.667 42.667 42.667z"
      ></path>
      <path
        d="M498.56 516.736c23.509-70.699 96.256-132.736 155.691-132.736h78.421l-55.168 55.168c-16.683 16.683-16.683 43.648 0 60.331 8.32 8.32 19.243 12.501 30.165 12.501s21.845-4.181 30.165-12.501l158.165-158.165-158.165-158.165c-16.683-16.683-43.648-16.683-60.331 0s-16.683 43.648 0 60.331l55.168 55.168h-78.421c-97.024 0-201.003 83.925-236.672 191.104l-20.139 60.203c-27.349 82.176-88.405 132.693-120.107 132.693h-106.667c-23.595 0-42.667 19.115-42.667 42.667s19.072 42.667 42.667 42.667h106.667c78.379 0 164.821-82.133 201.088-191.104l20.139-60.16z"
      ></path>
      <path
        d="M677.504 567.168c-16.683 16.683-16.683 43.648 0 60.331l55.168 55.168h-99.755c-54.101 0-99.413-38.016-114.816-89.941-10.923 32-26.752 63.957-46.507 93.227 37.803 49.579 95.701 82.048 161.323 82.048h99.755l-55.168 55.168c-16.683 16.683-16.683 43.648 0 60.331 8.32 8.32 19.243 12.501 30.165 12.501s21.845-4.181 30.165-12.501l158.165-158.165-158.165-158.165c-16.683-16.683-43.648-16.683-60.331 0z"
      ></path>
    </svg>
  </div>
  <!------------------ destination ----->
  <div class="dropdown home-container022">
    <input
      class="home-textinput input"
      type="text"
      id="selectedOptionDest"
      :name="`legs[${index}][destination]`"
      @input="handleDestCityInput"
      placeholder = "To"
      v-model="destCity"
      :required = required
    />
    <!-- :placeholder = "destCityPlaceholderText" -->
    <input 
    type="hidden"
      placeholder="To"
      class="home-textinput input"
      :name="`legs[${index}][destination]`"
      id="selectedDestAirportId"
    v-model="selectedDestCityId"
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
  <div class="home-container023">
    <span v-if="destCity" class="close-icon" @click="clearInputDestCity"
      >&times;</span
    >
    <!-------- destination icon ----->
    <svg viewBox="0 0 1024 1024" class="home-icon22">
      <path
        d="M598 616q-164-46-412-110l-68-20v-220l62 16 40 100 212 56v-352l82 22 118 384 226 60q26 8 39 31t7 49q-8 26-30 38t-48 6zM106 810h812v86h-812v-86z"
      ></path>
    </svg>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, computed, defineEmits,defineProps } from "vue";
import axios from "axios";

const recommended = useRecommendDest();
const selectedOption = ref("");
const selectedOptionDest = ref("");
const hiddenInputValue = ref("");
const selectedCityId = ref("");
const selectedDestCityId = ref("");
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

const props = defineProps({
  index:Number,
  required:Boolean,
  // originFromProps:Number
  // destCityDefaultFlySearch : String
});

const emits = defineEmits(["citySelected", "destCitySelected"]);
const city = ref("");

//---------------------------------------
const selectedOriginAirport = ref("");
const airports = ref([]);
const showAirports = ref(false);
const airport = city.value.trim();
const showSelectedAirport = ref(false);
const listVisible = ref(false);
const listVisibleDest = ref(false);
const  flightFields  = useFlight();

watch(
  () => recommended.recomendedOrigin,
  (newValue) => {
    if (newValue) {
      city.value = recommended.recomendedOrigin;
      handleCityInput();
    }
  }
);

watch(
  () => recommended.recomendedDest,
  (newValue) => {
    if (newValue) {
      destCity.value = recommended.recomendedDest;
      handleDestCityInput();
    }
  }
);

//---------- to set the placeholder value ------
// const cityPlaceholderText = computed(() => {
//         return flightFields.selectedCityTitle;
//       // return flightFields.selectedCityId;
//     });

// const destCityPlaceholderText = computed(() => {
//       return flightFields.selectedDestCityTitle;
//     });

    //--------
const filter = ref("");

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
        // emits("citySelected", city);
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
      })
      .catch((error) => {
        console.log("error");
      });
  } else {
    showDestAirports = false;
    destAirports = ref([]);
    console.log("error dare line 40");
  }
};

// Function to emit selected city to parent
const selectCity = (id, title) => {
  city.value = title;
  city.id = id;
  selectedCityId.value = id;
  // flightFields.updateCityTitle(title); //----- to update the placeholderText
  // flightFields.updateCityId(id);//----- to update the placeholderText
  // flightFields.updateCityTitle(title);//----- to update the placeholderText
  // emits("citySelected",flightFields.cityId);//----- to update the placeholderText
  emits("citySelected",city.id);
  listVisible.value = false;
  // console.log("flightFields.selectedCityId:" , flightFields.cityId)
};

// Function to emit selected destination city to parent
const selectDestCity = (id, title) => {
  destCity.value = title;
  destCity.id = id;
  selectedDestCityId.value = id;
  // flightFields.updateDestCity(title);//----- to update the placeholderText
  emits("destCitySelected", destCity.id);
  listVisibleDest.value = false;
};

const clearInputCity = () => {
  city.value = "";
  flightFields.updateCityTitle("");
  listVisible.value = false;
};
const clearInputDestCity = () => {
  destCity.value = ""; 
  listVisibleDest.value = false;
};

const changeCity = () => {
  const temp = city.value;
  city.value = destCity.value;
  destCity.value = temp;
  const tempId = city.id;
  city.id = destCity.id;
  destCity.id = tempId;
  emits("citySelected", city.id);
  emits("destCitySelected", destCity.id);

  if(listVisible){
    const tempAirport = airports.value;
    airports.value = destAirports.value;
    destAirports.value = tempAirport
  }
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

.close-icon {
  border-radius: 50px;
  padding: 3px;
  color: gray;
  font-size: 25px;
  cursor: pointer;
}
.dropdown-content {
  display: none;
  position: absolute;
  top: 4.5rem;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown-content {
  display: block;
}

</style>
