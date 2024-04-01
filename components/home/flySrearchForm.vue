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
      <!--------------- cabin-------------------->
      <select class="home-select1" v-model="params.cabin">
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>

      <div class="home-container017">
        <!--------- Source  ------>
        <div style="margin-right: 15px" class="dropdown">
          <input
            class="home-textinput input"
            type="text"
            id="selectedOption"
            name="selectedOption"
            @input="handleCityInput();"
            placeholder="From"
            v-model="city"
            required
          />
          <ul
            id="myUL"
            v-if="listVisible"
            class="dropdown-content"
          >
            <div id="title">Search by city or airport</div>
            <li
              id="li"
              v-for="(airport,i) in airports"
              :key="i"
              :value="airport.id"
              @click="selectOriginAirport(airport.id,airport.title)"
              style="cursor:pointer"
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
            @input="handleDestCityInput();"
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
          <ul
            id="myUL"
            v-if="listVisibleDest"
            class="dropdown-content"
          >
            <div id="title">Search by city or airport</div>
            <li
              id="liDest"
              v-for="(airport,i) in destAirports"
              :key="i"
              :value="airport.id"
              @click="selectDestAirport(airport.id,airport.title)"
            >
              <span>{{ airport.title }}</span>
            </li>
          </ul>
        </div>
        <!------------------ Date ------>
        <homeDateForm @sendEmitCurrentMonthYear="CurrentMonthYearFunction" :tripType="params.tripType"/>
        <!------------- Travellers ------->
        <FlySearchTravellers />
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
import { ref, watch, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

    const router = useRouter();
    const selectedTripType = ref("oneway"); // Default trip type is "One-Way"
    const selectedOption = ref("");
    const tripType = ref("");
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
    //---------------------------------
    const city = ref("");
    const selectedOriginAirport = ref("");
    const airports = ref([]);
    const showAirports = ref(false);
    const airport = city.value.trim();
    const showSelectedAirport = ref(false);

    const filter = ref("");
    const names = ref([
      "Al Najaf Intl (NJF): Iraq, Al Najaf",
      "Mashad (MHD): Iran, Mashhad",
      "Baghdad Intl (BGW): Iraq, Baghdad",
      "All airports in Tehran:Iran",
      "Damascus (DAM): Syrian Arab Republic, Damas",
    ]);

    const handleCityInput = async () => {
      if (city.value.trim().length >= 2) {
        const airport = city.value.trim();
        axios.get(
            `https://marketplace.beta.luxota.network/v1/search/airports?q=${airport}&lang=en`
          ).then(res=>{
            airports.value = res.data.data;
            listVisible.value = true;
          })
          .catch(error => {
            console.log("error")
          })
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
        axios.get(
            `https://marketplace.beta.luxota.network/v1/search/airports?q=${destAirport}&lang=en`
          ).then(res=>{
            destAirports.value = res.data.data;
            listVisibleDest.value = true;
          })
          .catch(error => {
            console.log("error")
          })
      } else {
        showDestAirports = false;
        destAirports = ref([]);
        console.log("error dare line 40");
      }
    };
    //--- search flights by input fields -----
    const searchFlights = async () => {
      // Check if the required fields are filled
      if (!city.value) {
        Swal.fire({
          icon: "error",
          text: "city is required fields.",
        });
        return;
      } else if (!destCity.value) {
        Swal.fire({
          icon: "error",
          text: "DestCity is required fields.",
        });
        return;
      }

      try {
        const response = await $fetch(
          "https://marketplace.beta.luxota.network/v1/search/flight",
          {
            method: "POST",
            body: JSON.stringify({
              origin: document.getElementById("li").value,
              destination: document.getElementById("liDest").value,
              // departure: "2024-08-31",
              departure: selectedDate.value.value,
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

    const selectOriginAirport = (id,title) =>{
      city.value = title;
      city.id = id;
    }
    const selectDestAirport = (id,title) =>{
      destCity.value = title;
      destCity.id = id;
    }
    const filteredNames = ref([]);
    const updateFilteredNames = () => {
      filteredNames.value = names.value.filter((name) => name !== "");
    };

    updateFilteredNames();

    const listVisible = ref(false);
    const listVisibleDest = ref(false);

    //-----------------------send data from dateForm to this page
    const selectedDate = ref("");
    const CurrentMonthYearFunction = (MonthYear) => {
      selectedDate.value = MonthYear;
      // console.log("currentMonthYearEmit in parent is: ", selectedDate.value);
    };

    const handleTripTypeChange = () => {
  // Emit the selected trip type
  // console.log("tripType is" , params.tripType);
  tripType.value= params.tripType
};

</script>

<style scoped>
#myUL {
  /* Remove default list styling */
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
.home-container017{
display: grid;
grid-template-columns: 1fr 1fr 3fr 1fr;
}
</style>
