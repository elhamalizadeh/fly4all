<template>
  <div class="home-container">
    <HomeHeader />
    <section class="home-container003">
      <!------- slider ------>
      <homeSlider />
      <!------- FlySearch Section ------>
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
              />
              <span class="home-text005">Multi-destination</span>
            </div>
            <div class="home-container014"></div>
            <div class="home-container015"></div>
            <div class="home-container016"></div>
          </div>
          <!-------------------------------->
          <!--------------- cabin-------------------->
          <select class="home-select1" v-model="params.cabin">
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>

          <!--------- Source  ------>
          <div class="home-container017">
            <div class="home-container018" style="margin-right: 15px">
              <input
                class="home-textinput input"
                type="text"
                v-model="city"
                @keydown="handleCityInput($event)"
                placeholder="From"
              />
              <select
                v-if="showAirports"
                class="home-textinput input"
                v-model="selectedOriginAirport"
              >
                <option disabled value="">Select an airport</option>
                <option
                  v-for="airport in airports"
                  :value="airport.id"
                  :key="airport.id"
                >
                  {{ airport.title }}
                </option>
              </select>
            </div>

            <!------------------ destination ----->
            <div class="home-container022">
              <input
                class="home-textinput input"
                type="text"
                v-model="destCity"
                @keydown="handleDestCityInput($event)"
                placeholder="To"
              />
              <select
                v-if="showDestAirports"
                class="home-textinput input"
                v-model="selectedDestAirport"
              >
                <option disabled value="">Select an airport</option>
                <option
                  v-for="airport in destAirports"
                  :value="airport.id"
                  :key="airport.id"
                >
                  {{ airport.title }}
                </option>
              </select>
            </div>

            <!------------------ Date ------>
            <div class="home-container024">
              <input
                type="date"
                class="home-textinput2 input"
                v-model="params.date"
              />
            </div>

            <!------------- Travellers ------->
            <div class="home-container025">
              <!-- <input
                type="text"
                placeholder="Travelers "
                class="home-textinput3 input"
                v-model="travellers"
              /> -->
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
                    <!-- <p>{{ option.subTitle }}</p> -->
                    <button @click="incrementAdult">+</button>
                    <span>{{ countAdult }}</span>
                    <button @click="decrementAdult">-</button>
                  </div>

                  <div class="options-box-item">
                    <div>Children</div>
                    <!-- <p>{{ option.subTitle }}</p> -->
                    <button @click="incrementChildren">+</button>
                    <span>{{ countChildren }}</span>
                    <button @click="decrementChildren">-</button>
                  </div>

                  <div class="options-box-item">
                    <div>Infants</div>
                    <!-- <p>{{ option.subTitle }}</p> -->
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
          </div>

          <div class="home-container027">
            <!-- <NuxtLink to="fly-search" rel="noreferrer noopener" class="home-button02 button">Search →</NuxtLink> -->
            <!-- <router-link
              :to="{
                name: 'about',
                query: {
                  params: params,
                  origin: selectedOriginAirport,
                  destination: selectedDestAirport,
                  date: params.date,
                  tripType: params.tripType,
                  cabin: params.cabin,
                  // adults: countAdult,
                  // children: countChildren,
                  // infants: countInfant,
                },
              }"
              class="home-button02 button"
            >
              Destination Now →
            </router-link> -->
            <button @click="searchFlights" class="home-button02 button">
              Destination Now →
            </button>
          </div>
        </div>
      </div>
    </section>
    <!--------------------------->
    <div class="home-container028">
      <div class="home-container029">
        <h1 class="home-text006"></h1>
        <span class="home-text007"></span>
        <span class="home-text008"> </span>
      </div>
    </div>
    <!--------More Recommended Destination  -->
    <!-- <homeRecomended :popularFlights="popularFlights"/> -->

    <div class="home-container030">
      <span class="home-text009">More Recommended Destination</span>
      <span class="home-text010">
        <span>Book Domestic and International Holiday Packages</span>
        <br />
      </span>
    </div>
    <div class="home-container031">
      <div class="d" v-for="flight in popularFlights" :key="flight.id">
        <a href="#">
          <div class="home-container050">
            <div class="hover01 column">
              <figure>
                <img
                  alt="image"
                  src="~/public/images/external/new-baner-03-1400w.jpg"
                  class="home-image11"
                />
              </figure>
            </div>

            <section class="home-container033" id="hide7">
              <div class="home-container034">
                <div class="home-container035">
                  <div class="home-container036">
                    <span class="home-text013">{{
                      flight.origin.city_en
                    }}</span>
                  </div>
                  <div class="home-container037">
                    <div class="home-container038">
                      <img
                        alt="image"
                        src="~/public/images/external/icon-01-200h.png"
                        class="home-image12"
                      />
                    </div>
                  </div>
                  <div class="home-container039">
                    <span class="home-text014">{{
                      flight.destination.city_en
                    }}</span>
                  </div>
                </div>
                <div class="home-container040">
                  <button type="button" class="home-button04 button">
                    <span class="home-text015">Facial services&nbsp;</span>
                    <svg viewBox="0 0 1024 1024" class="home-icon26">
                      <path
                        d="M366 708l196-196-196-196 60-60 256 256-256 256z"
                      ></path>
                    </svg>
                  </button>
                  <button type="button" class="home-button05 button">
                    <span class="home-text016">Search flights</span>
                    <svg viewBox="0 0 1024 1024" class="home-icon28">
                      <path
                        d="M406 598q80 0 136-56t56-136-56-136-136-56-136 56-56 136 56 136 136 56zM662 598l212 212-64 64-212-212v-34l-12-12q-76 66-180 66-116 0-197-80t-81-196 81-197 197-81 196 81 80 197q0 42-20 95t-46 85l12 12h34z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </a>
      </div>
    </div>
    <!---------------homePlan--------------->
    <homePlan />
    <!---------------homeServices--------------->
    <homeServices />
    <!------------ more here-------------->
    <div class="home-container100">
      <button type="button" class="home-button14 button">More Here →</button>
    </div>
    <HomeHolidaysDestination />
    <HomeTravelPackages />
    <HomeBlogNews />
    <HomeFooter />
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
// import homeRecomended from '~/components/home/homeRecomended.vue'

export default {
  name: "Home",

  setup() {
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

    const router = useRouter();

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
    const showOptions = ref(false);
    const done = () => {
      showOptions.value = false;
    };

    //------------------------------------
    const city = ref("");
    const selectedOriginAirport = ref("");
    const airports = ref([]);
    const showAirports = ref(false);
    const showFlights = ref(false);
    const airport = city.value.trim();

    const handleCityInput = async (event) => {
      if (city.value.trim().length >= 3) {
        const airport = city.value.trim();
        try {
          const response = await axios.get(
            `https://marketplace.beta.luxota.network/v1/search/airports?q=${airport}&lang=en`
          );
          airports.value = response.data.data;
          showAirports.value = true;
        } catch (error) {
          console.error("Error fetching airports:", error);
        }
      } else {
        showAirports = false;
        airports = ref([]);
        console.log("error dare line 40");
      }
    };

    const searchFlights = async () => {
      try {
        const response = await axios.post(
          "https://marketplace.beta.luxota.network/v1/search/flight",
          {
            origin: selectedOriginAirport.value,
            destination: selectedDestAirport.value,
            departure: "2024-08-31",
            adults: 2,
            children: 1,
            infants: 0,
            cabin: "economy",
            tripType: "oneWay",
            searcherIdentity: "test",
          }
        );
        const sessionId = response.data.sessionId;
        const status = response.data.status;

        await router.push({
          name: "fly-search",
          query: { status, sessionId, lang: "EN" },
        });
      } catch (error) {
        console.error("Error searching flights:", error);
      }
    };

    watch(selectedOriginAirport, () => {
      if (selectedOriginAirport.value !== "") {
        showFlights.value = true;
      }
    });

    //------------------ destination--------------------
    const destCity = ref("");
    const selectedDestAirport = ref("");
    const destAirports = ref([]);
    const showDestAirports = ref(false);
    const destAirport = destCity.value.trim();
    const popularFlights = ref([]);
    const handleDestCityInput = async (event) => {
      if (destCity.value.trim().length >= 3) {
        const destAirport = destCity.value.trim();
        try {
          const response = await axios.get(
            `https://marketplace.beta.luxota.network/v1/search/airports?q=${destAirport}&lang=en`
          );
          destAirports.value = response.data.data;
          showDestAirports.value = true;
        } catch (error) {
          console.error("Error fetching airports:", error);
        }
      } else {
        showDestAirports = false;
        destAirports = ref([]);
        console.log("error");
      }
    };

    watch(selectedOriginAirport, () => {
      if (selectedOriginAirport.value !== "") {
        showFlights.value = true;
      }
    });

    const populatFlights = async () => {
      try {
        const response = await axios.get(
          "https://marketplace.beta.luxota.network/v1/popularroutes/flight?lang=en&currency=158"
        );
        popularFlights.value = response.data.data.slice(0, 3);
      } catch (error) {
        console.error("Error searching flights:", error);
      }
    };
    onMounted(() => {
      populatFlights();
    });
    return {
      params,
      selectedOption,
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
      city,
      selectedOriginAirport,
      airports,
      showAirports,
      handleCityInput,
      destCity,
      selectedDestAirport,
      destAirports,
      showDestAirports,
      handleDestCityInput,
      popularFlights,
      searchFlights,
    };
  },
};
</script>
<style scoped>
.options-box {
  border: 1px solid gray;
  padding: 10px;
  margin-top: 5px;
  background-color: white;
  z-index: 1000;
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
}
.sub-title {
  display: block;
}
.options-box button {
  margin: 0 5px;
}
</style>