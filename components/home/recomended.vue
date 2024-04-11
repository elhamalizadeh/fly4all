<template>
  <div>
  <div class="home-container030">
      <span class="home-text009">More Recommended Destination</span>
      <span class="home-text010">
        <span>Book Domestic and International Holiday Packages</span>
        <br />
      </span>
    </div>
    <div class="home-container031">
      <div class="d" v-for="flight in popularFlights" :key="flight.id">
        <!-- <a href="#"> -->
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
                    <span class="home-text013"> {{flight.destination.city_en}}</span>
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
                    <span class="home-text014">
                     {{ flight.origin.city_en }}</span>
                  </div>
                </div>
                <div class="home-container040">
                  <button type="button" class="home-button04 button" @click="recommended.updateSelectRecommended(flight.origin.city_en,flight.destination.city_en );recommended.handleCityInput(flight.origin.city_en)">
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
        <!-- </a> -->
      </div>
    </div> 
  </div>
</template>
<script>
import { ref } from 'vue';
import axios from "axios";

export default {

  setup(props, { emit }) {
    const popularFlights = ref([]);
    const  recommended  = useRecommendDest();

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
      popularFlights,
      recommended
    };
  },

};
</script>