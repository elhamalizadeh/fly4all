<template>
   
   <div class="home-container">
        <div class="home-main">
            <flySearchMenu />

    <div class="home-container038">
            <div class="home-container039">
              <div class="home-container040">
                <flySearchForm />

              </div>
            </div>
          </div>
          <div class="home-container060">
           <flySearchSidebar />


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
              <!----------->
            </div>
          </div>
          <div class="home-margin-info"></div>
         <!-- <flySearchFooter /> -->
        </div>
      </div>
    

</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const source = route.query.source;
    const destination = route.query.destination;
    const date = route.query.date;

    // Implement your search function here using the retrieved data

        // Function to perform search
        const performSearch = () => {
      // Array of flights (sample data for demonstration)
      const flights = [
        { id: 1, source: 'Dubai', destination: 'Istanbul', date: '2024-03-15', price: 300 },
        { id: 2, source: 'Istanbul', destination: 'Dubai', date: '2024-03-16', price: 320 },
        { id: 3, source: 'Istanbul', destination: 'Tehran', date: '2024-03-17', price: 250 },
        { id: 4, source: 'Istanbul', destination: 'Tehran', date: '2024-03-17', price: 250 },
        { id: 5, source: 'Tehran', destination: 'Istanbul', date: '2024-03-18', price: 280 },
        // Add more flights as needed
      ];

      // Perform search based on source, destination, and date
      const searchResults = flights.filter(flight => {
        return flight.source.toLowerCase() === source.toLowerCase() &&
               flight.destination.toLowerCase() === destination.toLowerCase() &&
               flight.date === date;
      });

      // Display search results
      return searchResults;
      console.log('Search results:', searchResults);
    };

    // Call the search function when component is mounted
    const searchResults = ref([]);
    onMounted(() => {
      searchResults.value = performSearch();
    });

    return {
      searchResults
    };
  }
};
</script>


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