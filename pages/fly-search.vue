<template>
   
   <div class="home-container">
        <div class="home-main">
            <!-- <flySearchMenu /> -->
    <div class="home-container038">
            <div class="home-container039">
              <div class="home-container040">
                <!-- <flySearchForm /> -->

              </div>
            </div>
          </div>
          <div class="home-container060">
           <!-- <flySearchSidebar /> -->

<!--------------->
<!-- <div>
    <h1 style="color:white">Search Results is:</h1>
    <ul>
      <li v-for="flight in flights" :key="flight.id" style="color:white">
        {{ flight.title }}
      </li>
    </ul>
  </div> -->
  <!----------------------->
            <div class="home-container095">
                <flySearchBannerCosts />
              
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
              <!------------ show search result -------->
             <flySearchResultSearch />

             <!----     --> 
             <!-- <div v-if="state.pokemons.length > 0">
    <ul>
      <li v-for="flight in state.pokemons" :key="flight.id">
        Flight from {{ flight.title }} to {{ flight.body }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No flights found for the selected criteria.</p>
  </div> -->

              <!----------->
            </div>
          </div>
          <div class="home-margin-info"></div>
         <flySearchFooter />
        </div>
      </div>
    

</template>
<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


export default {
  name: 'FlySearch',
  setup() {
    const route = useRoute();
    const flights = ref([]);

    onMounted(() => {
      if (route.params.flights) {
        flights.value = route.params.flights;
        console.log("flight is:" ,route.params.flights )
      }
      else {
        console.log("no param:" , route.value)
      }
    });

    return { flights };
  },
  // head() {
  //   return {
  //     link: [
  //       { rel: 'stylesheet', href: '~/assets/css/fly-search.css' }
  //     ]
  //   };
  // }
}
</script>
<style scoped>
@import url("~/assets/css/fly-search.css");
@import url("~/assets/css/style-fly-search.css");

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