<template>
  <div class="home-container" style="color:white">
    <NuxtLink to="/"> Go Home</NuxtLink>
   
    <h1 style="margin:3rem">Flight Search Results :</h1>

    <!-- Display search results -->
    <!-- <ul v-if="searchResults.length">
      <li v-for="result in searchResults" :key="result.id">
   {{ result.origin }}
      </li>
    </ul>
    <p v-else>No search results found.</p> -->

    <table style="font-size: 18px;">
      <tr>
        <td>origin :</td>
        <td>{{ origin }}</td>
      </tr>
      <tr>
        <td>destination:</td>
        <td>{{ destination }}</td>
      </tr>
      <tr>
        <td>date:</td>
        <td>{{ date }}</td>
      </tr>
      <tr>
        <td>tripType:</td>
        <td>{{ tripType }}</td>
      </tr>
      <tr>
        <td>cabin:</td>
        <td>{{ cabin }}</td>
      </tr>
      <tr>
        <td>Adult</td>
        <td>{{ adults }}</td>
      </tr>
      <tr>
        <td>children</td>
        <td>{{ children }}</td>
      </tr>
      <tr>
        <td>infants</td>
        <td>{{ infants }}</td>
      </tr>
    </table>
    <!-- <ul>
      <li v-for="flight in flights" :key="flight.id" style="color: green">
        {{ flight.title }}
      </li>
    </ul> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "About",
  setup() {
    const route = useRoute();
    // const flights = ref([]);
    // const searchResults = ref([]);
    const title = ref(route.query.title);
    const origin = ref(route.query.origin);
    const destination = ref(route.query.destination);
    const date = ref(route.query.date);
    const travellers = ref(route.query.travellers);
    const tripType = ref(route.query.tripType);
    const cabin = ref(route.query.cabin);
    const adults = ref(route.query.adults);
    const children = ref(route.query.children);
    const infants = ref(route.query.infants);
    const searcherIdentity = ref('test');

    // const title = route.params.title;
    console.log("title is:", title);

    //------  https://marketplace.beta.luxota.network/v1/search/flight

    const searchFlights = async () => {
      try {
        const response = await axios.post('https://marketplace.beta.luxota.network/v1/search/flight', {
            origin:255,
            destination:7280,
            departure:"2024-08-31",
            adults:2,
            children:1,
            infants:0,
            cabin:"economy",
            tripType:"oneWay",
            searcherIdentity:'test',
        });
         console.log("response.data:" , response.data);
         searchResults.value = response.data;
      } catch (error) {
        console.error('Error searching flights:', error);
      }
    };

    onMounted(() => {
        searchFlights();

    });
    //--------------- exrea--------
    // onMounted(() => {
    //   if (route.params.flights) {
    //     flights.value = route.params.flights;
    //     console.log("flight is:", route.params.flights);
    //   } else {
    //     console.log("no param:", route.value);
    //   }
    // });

    // return { searchResults };
    return {
      origin,
      destination,
      date,
      travellers,
      tripType,
      cabin,
      adults,
      children,
      infants,
      searcherIdentity
    };
  },
  head() {
    return {
      link: [{ rel: "stylesheet", href: "~/assets/css/fly-search.css" }],
    };
  },
};
</script>