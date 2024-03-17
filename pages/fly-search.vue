<template>
  <!-- <div>
    <h3>Flight results:</h3>
           <ul>
      <li v-for="flight in flightResult" :key="flight.flightBufferReferenceId">
        departure :{{ flight.serviceInfo.legs[0].info.departure.city }} <br/> arrival:{{ flight.serviceInfo.legs[0].info.arrival.city }} - date time :{{ flight.serviceInfo.legs[0].info.arrival.date_time }} - time:{{ flight.serviceInfo.legs[0].info.arrival.time }}
      </li>
    </ul>
  </div> -->

  <div class="home-container">
    <div class="home-main">
      <flySearchMenu />
      <div class="home-container038">
        <div class="home-container039">
          <div class="home-container040">
            <!-- <flySearchForm /> -->
          </div>
        </div>
      </div>
      <div class="home-container060">
        <!-- <flySearchSidebar /> -->
        <div class="home-container095">
          <!-- <flySearchBannerCosts /> -->

          <div class="home-container112">
            <span class="home-text066">Sort by : Best Suggestions</span>
            <div class="home-container113">
              <svg viewBox="0 0 1024 1024" class="home-icon40">
                <path
                  d="M316 366l196 196 196-196 60 60-256 256-256-256z"
                ></path>
              </svg>
            </div>
          </div>
          <!-------------------------------------------->
          <!-------------------------------------------->
          <!-- <FlySearchResultSearch /> -->
          <div class="home-container114"></div>
          <div
            v-for="flight in flightResult"
            :key="flight.flightBufferReferenceId"
          >
            <div class="home-container115" style="margin-top: 3rem">
              <div class="home-container116">
                <img
                  alt="image"
                  src="~/public/images/fly-search/iraqi_airways_logo1-500w.png"
                  loading="lazy"
                  class="home-image15"
                />
              </div>
              <div class="home-container117">
                <span class="home-text067">
                  <span>One</span>
                  <br />
                  <span>way</span>
                  <br />
                  <span>trip</span>
                </span>
              </div>
              <div class="home-container118">
                <span class="home-text073">{{
                  flight.serviceInfo.legs[0].info.departure.time
                }}</span>
                <span class="home-text074"
                  >{{ flight.serviceInfo.legs[0].info.departure.airport.abb }} |
                  {{
                    flight.serviceInfo.legs[0].info.departure.date_time
                  }}</span
                >
              </div>
              <div class="home-container119">
                <img
                  alt="image"
                  src="~/public/images/fly-search/plane-departure-200h.png"
                  class="home-image16"
                />
              </div>
              <div class="home-container120">
                <span class="home-text075">{{
                  flight.serviceInfo.legs[0].info.duration
                }}</span>
                <span class="home-text076">---------------</span>
                <span class="home-text077">non stop</span>
              </div>
              <div class="home-container121">
                <div class="home-container122">
                  <img
                    alt="image"
                    src="~/public/images/fly-search/plane-arrical-200h.png"
                    class="home-image17"
                  />
                </div>
              </div>
              <div class="home-container123">
                <span class="home-text078">{{
                  flight.serviceInfo.legs[0].info.arrival.time
                }}</span>
                <span class="home-text079"
                  >{{ flight.serviceInfo.legs[0].info.arrival.airport.abb }} |
                  {{ flight.serviceInfo.legs[0].info.arrival.date_time }}</span
                >
              </div>
              <div class="home-container124"></div>
              <!-- <div class="home-container125">
                  <div class="home-container126">
                    <span class="home-text080">193.96$</span>
                  </div>
                  <div class="home-container127">
                    <span class="home-text081">
                      All travelers are prohibited from traveling
                    </span>
                  </div>
                  <div class="home-container128">
                    <button class="home-login1 button">Login</button>
                  </div>
                </div> -->
            </div>
            <div class="home-info">
              <div class="home-dh02">
                <span>
                  <span>|</span>
                  <br />
                  <span>|</span>
                  <br />
                  <span>|</span>
                  <br />
                  <span>|</span>
                  <br />
                </span>
              </div>
              <div class="home-inf01">
                <div class="home-ch01">
                  <span class="home-ch01-text">{{
                    flight.serviceInfo.legs[0].info.departure.date_time
                  }}</span>
                </div>
                <div class="home-ch02">
                  <span class="home-ch02-text"
                    >{{ flight.serviceInfo.legs[0].info.departure.city }} -
                    {{ flight.serviceInfo.legs[0].info.arrival.city }}</span
                  >
                </div>
                <div class="home-ch03">
                  <span class="home-ch03-text">{{
                    flight.serviceInfo.legs[0].info.duration
                  }}</span>
                </div>
                <div class="home-ch04">
                  <span class="home-ch04-text">non stop</span>
                </div>
                <div class="home-ch05">
                  <img
                    alt="image"
                    src="~/public/images/fly-search/iraqi_airways_logo1-500w.png"
                    loading="lazy"
                    class="home-ch05-image"
                  />
                </div>
              </div>
              <div class="home-inf02">
                <div class="home-dh01">
                  <img
                    alt="image"
                    src="~/public/images/fly-search/plane-departure-200h.png"
                    class="home-dh01-image"
                  />
                </div>
                <div class="home-dh03">
                  <img
                    alt="image"
                    src="~/public/images/fly-search/plane-arrical-200h.png"
                    class="home-dh-03-image"
                  />
                </div>
              </div>
              <div class="home-info03">
                <div class="home-sh01">
                  <span class="home-sh01-text">{{
                    flight.serviceInfo.legs[0].info.departure.time
                  }}</span>
                </div>
                <div class="home-sh02">
                  <span class="home-sh02-text">{{
                    flight.serviceInfo.legs[0].info.departure.city
                  }}</span>
                </div>
                <div class="home-sh03"></div>
                <div class="home-sh04">
                  <span class="home-sh04-text">{{
                    flight.serviceInfo.legs[0].info.arrival.time
                  }}</span>
                </div>
                <div class="home-sh05">
                  <span class="home-sh05-text">{{
                    flight.serviceInfo.legs[0].info.arrival.city
                  }}</span>
                </div>
              </div>
              <div class="home-info04">
                <div class="home-ah01">
                  <span class="home-ah01-text">Flight Number :</span>
                </div>
                <div class="home-ah02">
                  <span class="home-ah02-text">Airline :</span>
                </div>
                <div class="home-ah03">
                  <span class="home-ah03-text">Airplane :</span>
                </div>
                <div class="home-ah04">
                  <span class="home-ah04-text">Class :</span>
                </div>
                <div class="home-ah05">
                  <span class="home-ah05-text">Cabin :</span>
                </div>
                <div class="home-ah06">
                  <span class="home-ah06-text">Empty Seats :</span>
                </div>
              </div>
              <div class="home-info05">
                <div class="home-qh01">
                  <span class="home-qh01-text">{{
                    flight.serviceInfo.legs[0].info.flight_number
                  }}</span>
                </div>
                <div class="home-qh02">
                  <span class="home-qh02-text">{{
                    flight.serviceInfo.legs[0].info.airline.title
                  }}</span>
                </div>
                <div class="home-qh03">
                  <span class="home-qh03-text">{{
                    flight.serviceInfo.legs[0].info.airplane
                  }}</span>
                </div>
                <div class="home-qh04">
                  <span class="home-qh04-text">{{
                    flight.serviceInfo.legs[0].info.resBookDesigCode
                  }}</span>
                </div>
                <div class="home-qh05">
                  <span class="home-qh05-text">{{
                    flight.serviceInfo.legs[0].info.cabin
                  }}</span>
                </div>
                <div class="home-qh06">
                  <span class="home-qh06-text">{{
                    flight.serviceInfo.legs[0].info.capacity
                  }}</span>
                </div>
              </div>
              <div class="home-info06">
                <div class="home-wh01">
                  <span class="home-wh01-text">BAGGAGE</span>
                </div>
                <div class="home-wh02">
                  <span class="home-wh02-text">RULE</span>
                </div>
                <div class="home-wh03">
                  <span class="home-wh03-text">Break Down</span>
                </div>

                <div class="home-wh04">
                  <NuxtLink to="../book-fly"
                    ><span class="home-wh04-text">Book Now</span></NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
          <!-------------------------------------------->
          <!-------------------------------------------->
        </div>
      </div>
      <div class="home-margin-info"></div>
      <!-- <flySearchFooter /> -->
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "fly-search",
  setup() {
    const route = useRoute();
    // const flights = ref([]);
    const flightResult = ref([]);

    const searchResults = async () => {
      try {
        const sessionId = route.query.sessionId;
        // console.log("sessionId is: line 52" , sessionId);

        const response = await axios.get(
          "https://marketplace.beta.luxota.network/v1/search/results",
          {
            params: {
              sessionId: sessionId,
              page: 1,
              currency: 158,
              lang: "en",
            },
          }
        );
        console.log("flight result is 81:", response.data.data);
        flightResult.value = response.data.data;
      } catch (error) {
        console.error("Error searching flights:", error);
      }
    };
    onMounted(() => {
      if (route.query.sessionId) {
        searchResults();
      }

      // if (route.params.flights) {
      //   flights.value = route.params.flights;
      //   console.log("flight is:", route.params.flights);
      // } else {
      //   console.log("no param:", route.value);
      // }
    });

    return { searchResults, flightResult };
  },
};
</script>
<style scoped>
@import url("~/assets/css/fly-search.css");
@import url("~/assets/css/style-fly-search.css");
/* @import url("~/assets/css/flySearch/index.css"); */

@import url("https://unpkg.com/animate.css@4.1.1/animate.css");
@import url("https://unpkg.com/@teleporthq/teleport-custom-scripts/dist/style.css");

html {
  font-family: Inter;
  font-size: 16px;
}

body {
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  text-transform: none;
  letter-spacing: normal;
  line-height: 1.15;
  color: var(--dl-color-gray-black);
  background-color: var(--dl-color-gray-white);
}
</style>

<!-- <script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const source = route.query.source;
    const destination = route.query.destination;
    const date = route.query.date;

    const state = reactive({
      pokemons: [],
      filteredPokemon: computed(() => updatePokemon()),
      title: "facere",
      urlIdLookup: {},
    });


    const fetchPokemon = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          state.pokemons = response.data.results; // 👈 get just results
        });
    };

    fetchPokemon();

      const performSearch = () => {
      const flights = [
        { id: 1, source: 'Dubai', destination: 'Istanbul', date: '2024-03-15', price: 300 },
        { id: 2, source: 'Istanbul', destination: 'Dubai', date: '2024-03-16', price: 320 },
        { id: 3, source: 'Istanbul', destination: 'Tehran', date: '2024-03-17', price: 250 },
        { id: 4, source: 'Istanbul', destination: 'Tehran', date: '2024-03-17', price: 250 },
        { id: 5, source: 'Tehran', destination: 'Istanbul', date: '2024-03-18', price: 280 },
      ];

      // Perform search based on source, destination, and date
      const searchResults = flights.filter(flight => {
        return flight.source.toLowerCase() === source.toLowerCase() &&
               flight.destination.toLowerCase() === destination.toLowerCase() &&
               flight.date === date;
      });

      return { searchResults , fetchPokemon, updatePokemon , state };

      console.log('Search results:', searchResults);
    };

    const searchResults = ref([]);
    onMounted(() => {
      searchResults.value = performSearch();
    });

    return {
      searchResults
    };
  }
};
</script> -->


  <!------------------------->
  <!-- <div v-if="searchResults.length > 0">
    <ul>
      <li v-for="flight in searchResults" :key="flight.id">
        Flight from {{ flight.source }} to {{ flight.destination }} on {{ flight.date }} for ${{ flight.price }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No flights found for the selected criteria.</p>
  </div>
</div> -->