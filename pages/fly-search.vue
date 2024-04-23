<template>
  <div class="fly-search-container">
    <div class="fly-search-main">
      <flySearchMenu />
      <div class="home-container038">
        <HomeFlySrearchForm :paddingRL="80" />
      </div>
      <div v-if="loading" class="flex flex-row justify-center bg-orange-500 my-10">
            <div><h1>Loading ...</h1></div>
            <div
              class="loading-circles grid grid-cols-3 grid-rows-3 gap-2 mb-5"
            >
              <div></div>
              <div></div>
              <div></div>

              <div></div>
              <div></div>
              <div></div>

              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <!------- main content ------>
     <FlySearchMainContent v-else/>
     <!---------------------->
      <div class="home-margin-info"></div>
      <flySearchFooter />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const flightFields = useFlight();
const flightResults = useFlightResults();

const route = useRoute();
const flightResult = ref([]);
const resultData = ref(null);
const flightsData = ref({});
const originIdFromSearchResult = ref("");
const originTitleFromSearchResult = ref("");
const loading = ref(true);

//----- searchInfo function in flight.js store-----
flightFields.searchInfo();
const searchProgressPercent = ref("");

//--- return percent and status---
const searchProgress = () => {
  const sessionIdProgress = route.query.sessionId;
  $fetch("https://marketplace.beta.luxota.network/v1/search/progress", {
    method: "GET",
    params: {
      sessionId: sessionIdProgress,
    },
  })
    .then((progress) => {
      console.log("progress is 297:", progress.percent);
      searchProgressPercent.value = progress.percent;
      if (progress.percent >= 50 && progress.percent < 100) {
        flightResults.searchResults();
      } else if (progress.percent === 100) {
        clearInterval(intervalValue.value);
        loading.value = false;
        flightResults.searchResults();
      }
    })
    .catch((error) => {
      console.error("Error fetching flight results:", error);
      clearInterval(intervalValue.value);
    });
};

//----- searchResults function in flightResults.js store-----
flightResults.searchResults();

const intervalValue = ref(null);
onMounted(() => {
  flightResults.setPage("flySearch");
  flightFields.searchInfo();
  if (route.query.sessionId) {
    localStorage.setItem("sessionId", route.query.sessionId);
    intervalValue.value = setInterval(searchProgress, 3000);
  }
});

//---- to change the results by entering new input values
watch(
  () => route.query.sessionId,
  (newValue) => {
    flightFields.searchInfo();
    localStorage.setItem("sessionId", route.query.sessionId);
    intervalValue.value = setInterval(searchProgress, 3000);
    // searchResults();
  }
);
</script>
<style scoped>
@import url("../assets/css/fly-search.css");
@import url("../assets/css/style-fly-search.css");

@import url("https://unpkg.com/animate.css@4.1.1/animate.css");
@import url("https://unpkg.com/@teleporthq/teleport-custom-scripts/dist/style.css");

/* --------- */
.loading-circles div {
  animation: blink linear 1s infinite;
  background: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.loading-circles div:nth-child(1),
.loading-circles div:nth-child(6),
.loading-circles div:nth-child(8) {
  animation-delay: -0.666s;
}

.loading-circles div:nth-child(2),
.loading-circles div:nth-child(5),
.loading-circles div:nth-child(7) {
  animation-delay: -0.333s;
}

@keyframes blink {
  0% {
    opacity: 1;
    filter: none;
  }
  50% {
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  100% {
    opacity: 1;
    filter: none;
  }
}
</style>
