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
            value="oneway"
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
            value="roundWay"
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
      </div>
      <!-- cabin -->
      <select class="home-select1" v-model="params.cabin">
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>

      <div class="home-container017">
        <!-- InputCityFialds -->
       <homeInputCityFialds @citySelected="handleCitySelected" @destCitySelected="handleDestCitySelected" />
        <!-- Date -->
        <homeDateForm 
        @sendEmitCurrentMonthYear="CurrentMonthYearFunction" 
        @sendEmitCurrentMonthYearReturn="CurrentMonthYearFunctionReturn"
        :tripType="params.tripType"/>
        <!-- Travellers -->
        <homeTravellers />
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

    const router = useRouter();
    const selectedTripType = ref("oneway"); // Default trip type is "One-Way"
    const tripType = ref("");
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
              // return: selectedDateReturn.value.value,
              adults: 2,
              children: 1,
              infants: 0,
              cabin: "economy",
              tripType: "oneWay",
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
    console.log("selectedDateReturn is here: ", selectedDateReturn.value);
    const handleTripTypeChange = () => {
  tripType.value= params.tripType
};
</script>

<style scoped>
/*------flex--------*/
.home-container017{
display: grid;
grid-template-columns: 1fr 1fr 3fr 1fr;
}
</style>
