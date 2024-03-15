<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink>
    <br />
    <h3>About Page</h3>
    <h1 style="color: blue">Search Results is:</h1>

    <!-- Display search results -->
    <!-- <ul v-if="searchResults.length">
      <li v-for="result in searchResults" :key="result.id">
   {{ result.origin }}
      </li>
    </ul>
    <p v-else>No search results found.</p> -->

    <b>origin is: </b>{{ origin }} <br />
    <b>destination is : </b>{{ destination }}<br />
    <b>date is:</b> {{ date }}<br />
    <b>tripType: </b>{{ tripType }}<br />
    <b>cabin: </b>{{ cabin }}
    <h4>Travellers</h4>
    <b>Adult</b>{{ adults }} <b>children</b>{{ children }} <b>infants</b
    >{{ infants }}
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

    // const title = route.params.title;
    console.log("title is:", title);

    //------  {{host}}/v1/search/flight

    // const searchFlights = async () => {
    //   try {
    //     const response = await axios.post('https://marketplace.beta.luxota.network/v1/search/flight', {
    //       params: {
    //         origin:7909,
    //         destination:4168,
    //         departure:"2021-08-31",
    //         adults:1,
    //         children:0,
    //         infants:0,
    //         cabin:"economy",
    //         tripType:"oneWay"

    //       }
    //     });
    //      console.log("response.data:" , response.data);
    //      searchResults.value = response.data;
    //   } catch (error) {
    //     console.error('Error searching flights:', error);
    //   }
    // };

    // onMounted(() => {
    //     searchFlights();

    // });
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
    };
  },
  head() {
    return {
      link: [{ rel: "stylesheet", href: "~/assets/css/fly-search.css" }],
    };
  },
};
</script>