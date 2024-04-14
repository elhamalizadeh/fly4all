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
            value="multiTrip"
            @change="handleTripTypeChange"
          />
          <span class="home-text005">Multi-destination</span>
        </div>
        <div class="home-container014"></div>
        <div class="home-container015"></div>
        <div class="home-container016"></div>
      </div>
      <!-- cabin -->
      <select class="home-select1" v-model="params.cabin">
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>

      <div class=" home-container017 multiInputDiv" v-for="(item, index) in trips" :key="index">
                <!-----  v-for  --->
                <template v-if="index === 0 || !trips[index - 1].inputCity">
          <homeInputCityFialds
            @citySelected="handleMultiCitySelected($event, index)"
            @destCitySelected="handleMultiDestCitySelected($event, index)"
            v-model="item.inputCity"
            :tripType="params.tripType"
            v-if="tripType == 'multiTrip'"
          />

          <homeDateForm
            @sendEmitCurrentMonthYear="CurrentMonthYearFunction"
            @sendEmitCurrentMonthYearReturn="CurrentMonthYearFunctionReturn"
            v-model="item.date"
            :tripType="params.tripType"
            v-if="tripType == 'multiTrip'"
          />

          <div v-if="tripType == 'multiTrip'">
            <button
              class="home-button02 button"
              id="deleteBtn"
              @click="deleteFunction"
            >
              Delete
            </button>
          </div>
        </template>
      </div>

        <div
        class="home-container017"
      >
      <!-- :style="{ height: tripType === 'multi' ? containerHeight : 'auto' }" -->

        <homeInputCityFialds
          @citySelected="handleCitySelected"
          @destCitySelected="handleDestCitySelected"
        />
        <homeDateForm
          @sendEmitCurrentMonthYear="CurrentMonthYearFunction"
          @sendEmitCurrentMonthYearReturn="CurrentMonthYearFunctionReturn"
          :tripType="params.tripType"
        />

        <!-- Travellers -->
        <homeTravellers />
        <div class="home-container026">
                  <svg viewBox="0 0 1097.142857142857 1024" class="home-icon24">
                    <path
                      d="M338.857 512c-59.429 1.714-113.143 27.429-151.429 73.143h-76.571c-57.143 0-110.857-27.429-110.857-90.857 0-46.286-1.714-201.714 70.857-201.714 12 0 71.429 48.571 148.571 48.571 26.286 0 51.429-4.571 76-13.143-1.714 12.571-2.857 25.143-2.857 37.714 0 52 16.571 103.429 46.286 146.286zM950.857 876c0 92.571-61.143 148-152.571 148h-499.429c-91.429 0-152.571-55.429-152.571-148 0-129.143 30.286-327.429 197.714-327.429 19.429 0 90.286 79.429 204.571 79.429s185.143-79.429 204.571-79.429c167.429 0 197.714 198.286 197.714 327.429zM365.714 146.286c0 80.571-65.714 146.286-146.286 146.286s-146.286-65.714-146.286-146.286 65.714-146.286 146.286-146.286 146.286 65.714 146.286 146.286zM768 365.714c0 121.143-98.286 219.429-219.429 219.429s-219.429-98.286-219.429-219.429 98.286-219.429 219.429-219.429 219.429 98.286 219.429 219.429zM1097.143 494.286c0 63.429-53.714 90.857-110.857 90.857h-76.571c-38.286-45.714-92-71.429-151.429-73.143 29.714-42.857 46.286-94.286 46.286-146.286 0-12.571-1.143-25.143-2.857-37.714 24.571 8.571 49.714 13.143 76 13.143 77.143 0 136.571-48.571 148.571-48.571 72.571 0 70.857 155.429 70.857 201.714zM1024 146.286c0 80.571-65.714 146.286-146.286 146.286s-146.286-65.714-146.286-146.286 65.714-146.286 146.286-146.286 146.286 65.714 146.286 146.286z"
                    ></path>
                  </svg>
                </div>
        <!-- </div> -->
      </div><!-------- end home-container017-->

      <button
          class="home-button02 button"
          id="addBtn"
          v-if="tripType == 'multiTrip'"
          @click="addInputFunction"
        >
          Add trip
        </button>
      <div class="home-container027">
        
        <!-- <button @click="searchFlights" class="home-button02 button">
          Destination Now →
        </button> -->
        <button v-if="tripType === 'multiTrip'" @click="searchMultiFlights(index)" class="home-button02 button">
    Destination Now →
</button>
<button v-else @click="searchFlights" class="home-button02 button">
    Destination Now →
</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch,defineProps, reactive   } from "vue";
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

// const cityId = ref("");
const cityId = ref([]);
const destCityId = ref([]);
const cityIdByIndex = ref([]);
const destCityIdByIndex = ref([])

const handleCitySelected = (selectCity) => {
    cityId.value = selectCity;
};

//------------------------handleDestCitySelected ------
const handleDestCitySelected = (selectDestCity) => {
  destCityId.value = selectDestCity;
};

//------------------------handleMultiCitySelected ------********
const handleMultiCitySelected = (selectCity, index) => {

  if (!cityId[index]) {
        cityId[index] = {}; // Initialize object if not present
    }
    cityId[index] = selectCity;
    console.log("index is:",index);
    console.log("selectCity is 183:",selectCity)
    console.log("cityId[index].value:",cityId[index]);
    cityIdByIndex.value = cityId[index];
    
};

//------------------------handleMultiDestCitySelected ------********
const handleMultiDestCitySelected = (selectDestCity, index) => {

if (!destCityId[index]) {
  destCityId[index] = {}; // Initialize object if not present
  }
  destCityId[index] = selectDestCity;
  // console.log("index is:",index);
  // console.log("selectCity is 183:",selectCity)
  // console.log("cityId[index].value:",cityId[index]);
  destCityIdByIndex.value = destCityId[index];
  
};


//-------------------------- search flights by input fields -----
const searchFlights = async () => {
  // Check if the required fields are filled
  if (!cityId.value) {
    Swal.fire({
      icon: "error",
      text: "Origin City is required.",
    });
    return;
  } else if (!destCityId.value) {
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
          origin: cityId.value,
          destination: destCityId.value,
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


//------------------------searchMultiFlights ------*********
const searchMultiFlights = async (index) => {
  const data = reactive({});
  data['legs[0][origin]'] = cityIdByIndex.value;
  data['legs[0][destination]'] = destCityIdByIndex.value;

  if (!cityIdByIndex.value) {
    Swal.fire({
      icon: "error",
      text: "Origin City is required.",
    });
    return;
  } 
  else if (!destCityIdByIndex.value) {
    Swal.fire({
      icon: "error",
      text: "Destination City is required.",
    });
    return;
  }
  try {
    const response = await $fetch(
      "https://marketplace.beta.luxota.network/v2/search/flight",
      {
        method: "POST",
        body: JSON.stringify({
          "legs[0][origin]": data['legs[0][origin]'],
          "legs[0][destination]": data['legs[0][destination]'],
          "legs[0][departure]": selectedDate.value.value,
          adults: travelersCounter.adultsCount,
          children: travelersCounter.childrenCount,
          infants: travelersCounter.infantsCount,
          cabin: "economy",
          tripType: 'multiDestination',
          searcherIdentity: "test",
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization":'Bearer 11aup4zzwj2nol1zguv34dxt7661a75910dbd852f2574c'

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
// const containerHeight = ref("18vh");

//-----------deleteBtn---
// const tripTypeValue = ref(props.tripType);
const deleteFunction = (index) => {
  trips.value.splice(index, 1);
  // containerHeight.value = `calc(${containerHeight.value} - 18vh)`;
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
  if (tripType.value === "multiTrip") {
    trips.value.push({
      inputCity: "",
      date: "",
    });
    // containerHeight.value = `calc(30vh + ${20 * (trips.value.length - 1)}vh)`;
  }
};
</script>

<style scoped>
.home-container017 {
  display: grid;
  grid-template-columns:1fr 0.5fr 1fr 3fr 1fr;
  background-color: #ffffff;
  border-radius: 20px;
}
.input-city-fields {
  margin-bottom: 10px;
}
#deleteBtn:hover {
  cursor: pointer;
}
#addBtn:hover {
  cursor: pointer;
}
.multiInputDiv{
  display:grid;
  /* grid-template-columns: 1fr 0.5fr 1fr 1fr 1fr; */
  /* grid-template-rows:1fr 1fr */
}
</style>
