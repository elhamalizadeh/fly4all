<template>
  <div class="home-container004">
    <div class="home-container005">
      <div class="home-container006">
        <span class="home-text">FLIGHT</span>
      </div>
      <NuxtLink to="./fly4all-hotel" class="home-link1">
        <div class="home-container007">
          <span class="home-text001">HOTEL</span>
        </div>
      </NuxtLink>
      <NuxtLink to="./fly4all-package" class="home-link1">
        <div class="home-container008">
          <span class="home-text002">Package</span>
        </div>
      </NuxtLink>
      <NuxtLink to="./fly4all-visa" class="home-link1">
        <div class="home-container009">
          <span class="home-text003">VISA</span>
        </div></NuxtLink
      >
      <!----------------tripType---------------->
      <div class="home-container010">
        <div class="home-container011">
          <input
            type="radio"
            name="radio"
            class="home-radiobutton"
            v-model="params.tripType"
            value="oneWay"
            @change="handleTripTypeChange"
          />
          <span class="home-text004">One-Way</span>
        </div>
        <div class="home-container012">
          <input
            type="radio"
            name="radio"
            class="home-radiobutton1"
            v-model="params.tripType"
            value="roundTrip"
            @change="handleTripTypeChange"
          />
          <span class="home-text005">Round-Trip</span>
        </div>
        <div>
          <input
            type="radio"
            name="radio"
            class="home-radiobutton1"
            v-model="params.tripType"
            value="multi"
            @change="handleTripTypeChange"
          />
          <span class="home-text005">Multi-destination</span>
        </div>
        <div class="home-container014"></div>
        <div class="home-container015"></div>
        <div class="home-container016"></div>
        <button
          class="home-button02 button"
          id="addBtn"
          v-if="tripType == 'multi'"
          @click="addInputFunction"
        >
          Add trip
        </button>
      </div>
      <!-- cabin -->
      <select class="home-select1" v-model="params.cabin">
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>

      <!-- <div class="home-container017"> -->
      <!-- InputCityFialds -->
      <!-- <button class="home-button02 button" id="addBtn" v-if="tripType == 'multi'" @click="addInputFunction">Add trip</button> -->
      <!-------->
      <!-- <div :style="{ height: containerHeight }" class="home-container017"> -->
      <div
        :style="{ height: tripType === 'multi' ? containerHeight : 'auto' }"
        class="home-container017"
      >
        <homeInputCityFialds
          @citySelected="handleCitySelected"
          @destCitySelected="handleDestCitySelected"
        />
        <homeDateForm
          @sendEmitCurrentMonthYear="CurrentMonthYearFunction"
          @sendEmitCurrentMonthYearReturn="CurrentMonthYearFunctionReturn"
          :tripType="params.tripType"
        />

        <!-----  v-for  --->
        <div v-for="(item, index) in trips" :key="index">
          <homeInputCityFialds
            @citySelected="handleCitySelected"
            @destCitySelected="handleDestCitySelected"
            v-model="item.inputCity"
            :tripType="params.tripType"
            v-if="tripType == 'multi'"
          />

          <homeDateForm
            @sendEmitCurrentMonthYear="CurrentMonthYearFunction"
            @sendEmitCurrentMonthYearReturn="CurrentMonthYearFunctionReturn"
            v-model="item.date"
            :tripType="params.tripType"
            v-if="tripType == 'multi'"
          />

          <div v-if="tripType == 'multi'">
            <button
              class="home-button02 button"
              id="deleteBtn"
              @click="deleteFunction"
            >
              Delete
            </button>
          </div>
        </div>
        <!-- Date -->
        <!-- <homeDateForm 
        @sendEmitCurrentMonthYear="CurrentMonthYearFunction" 
        @sendEmitCurrentMonthYearReturn="CurrentMonthYearFunctionReturn"
        :tripType="params.tripType"/> -->
        <!-- Travellers -->
        <homeTravellers />

        <!-- </div> -->
      </div>
      <div class="home-container027">
        <button @click="searchFlights" class="home-button02 button">
          Destination Now →
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch,defineProps  } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";


const  travelersCounter  = useCounter();
const props = defineProps({
  recommendedDestinationValue: String // Define the type of recommendedDestinationValue
});
    
const router = useRouter();
const tripType = ref("oneWay");
const params = reactive({
  origin: "",
  destination: "",
  date: "",
  tripType: "",
  cabin: "economy",
  adults: 0,
  children: 0,
  infants: 0,
});

const city = ref("");
const destCity = ref("");
const selectedOriginAirport = ref("");
const airports = ref([]);
const showAirports = ref(false);
const airport = city.value.trim();
const showSelectedAirport = ref(false);

const filter = ref("");

const handleCitySelected = (selectCity) => {
  // Handle the city value emitted from the child component
  city.value = selectCity;
};

const handleDestCitySelected = (selectDestCity) => {
  // Handle the destination city value emitted from the child component
  destCity.value = selectDestCity;
};

//--- search flights by input fields -----
const searchFlights = async () => {
  // Check if the required fields are filled
  if (!city.value) {
    Swal.fire({
      icon: "error",
      text: "Origin City is required.",
    });
    return;
  } else if (!destCity.value) {
    Swal.fire({
      icon: "error",
      text: "Destination City is required.",
    });
    return;
  }
  try {
    const response = await $fetch(
      "https://marketplace.beta.luxota.network/v1/search/flight",
      {
        method: "POST",
        body: JSON.stringify({
          origin: city.value,
          destination: destCity.value,
          departure: selectedDate.value.value,
          return: selectedDateReturn.value.value,
          adults: travelersCounter.adultsCount,
          children: travelersCounter.childrenCount,
          infants: travelersCounter.infantsCount,
          cabin: "economy",
          tripType: tripType.value,
          searcherIdentity: "test",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const sessionId = response.sessionId;
    const status = response.status;
    await router.push({
      name: "fly-search",
      query: { status, sessionId, lang: "EN" },
    });
  } catch {
    console.error("Error searching flights:", error);
  }
};

//-----------------------send data from dateForm to this page
const selectedDate = ref("");
const CurrentMonthYearFunction = (MonthYear) => {
  selectedDate.value = MonthYear;
};

const selectedDateReturn = ref("");
const CurrentMonthYearFunctionReturn = (MonthYear) => {
  selectedDateReturn.value = MonthYear;
};
const handleTripTypeChange = () => {
  tripType.value = params.tripType;
};

const trips = ref([]);
const containerHeight = ref("18vh");

//-----------deleteBtn---
// const tripTypeValue = ref(props.tripType);
const deleteFunction = (index) => {
  trips.value.splice(index, 1);
  containerHeight.value = `calc(${containerHeight.value} - 18vh)`;
};
// if (tripType.value === "multi") {
//   trips.value.pop({
//     inputCity:"",
//     date:""
//   });
// const deleteBtn = document.getElementById("deleteBtn");
// deleteBtn.addEventListener("click", () => {
//   alert("delete");
// });
// }

const addInputFunction = () => {
  if (tripType.value === "multi") {
    trips.value.push({
      inputCity: "",
      date: "",
    });
    containerHeight.value = `calc(30vh + ${20 * (trips.value.length - 1)}vh)`;
  }
};
</script>

<style scoped>
/*------flex--------*/
.home-container017 {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1fr;
  /* grid-template-columns: 1fr 1fr 3fr 1fr; */
  /* height:30vh; */
  background-color: white;
  /* ----multy---- */
  /* grid-template-rows: repeat(1,1fr); */
}
.input-city-fields {
  margin-bottom: 10px;
  /* border: #ddd solid 2px; */
}
#deleteBtn:hover {
  cursor: pointer;
}
#addBtn:hover {
  cursor: pointer;
}
</style>
