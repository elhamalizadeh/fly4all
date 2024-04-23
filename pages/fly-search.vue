<template>
  <div class="fly-search-container">
    <div class="fly-search-main">
      <flySearchMenu />
      <div class="home-container038">
        <HomeFlySrearchForm :paddingRL="80"/>
      </div>
      <div class="fly-search-container060">
        <flySearchSidebar />
        <div class="fly-search-container095">
          <flySearchBannerCosts />

          <div class="fly-search-container112">
            <span class="fly-search-text066">Sort by : Best Suggestions</span>
            <div class="home-container113">
              <svg viewBox="0 0 1024 1024" class="home-icon40">
                <path
                  d="M316 366l196 196 196-196 60 60-256 256-256-256z"
                ></path>
              </svg>
            </div>
          </div>

          <!---------------------flightResult----------------------->
          <div v-for="flight in flightsData" :key="flight.flightBufferReferenceId">
            <!---------- Info --------->
            <FlySearchShowResultsInfo :flightLeg = "flight" style="margin-top: 3rem"/>
            <!---------- segments ----->
           <FlySearchShowResultsSegments :flightSegment = "flight"/>
          </div>
        </div>
      </div>
      <div class="home-margin-info"></div>
      <flySearchFooter />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted , watch } from "vue";
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


//--- show the inputs data that has been sent to this page
const searchInfo = () => {
  const sessionId = route.query.sessionId;
  $fetch("https://marketplace.beta.luxota.network/v1/search/info", {
    method: "GET",
    params: {
      sessionId: sessionId,
      currency: 158,
      lang: "en",
    },
  })
    .then((response) => {
      console.log("response 64:", response.legs); ///------
      // itemsData.value = response.legs;
      flightFields.updateItemsData(response.legs);
      console.log("itemsDataValue 299 is:", flightFields.itemsDataValue);

      originIdFromSearchResult.value = response.legs[0].origin.buffer.id;
      originTitleFromSearchResult.value = response.legs[0].origin.buffer.title;
      // console.log("cityIdFromSearchResult in 70:", originTitleFromSearchResult.value);

      flightResults.updateOriginAirportTitle(response.legs[0].origin.buffer.title);
      flightResults.updateOriginAirportId(response.legs[0].origin.buffer.id);

      flightResults.updateDestAirportTitle(response.legs[0].destination.buffer.title);
      flightResults.updateDestAirportId(response.legs[0].destination.buffer.id);
      flightResults.updateDepartureDate(response.legs[0].departure);
      flightResults.updateDepartureDateToSend(response.legs[0].departure);
      flightResults.setPage("flySearch")

    })
    .catch((error) => {
      console.error("Error fetching flight results:", error);
    });
};

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
        searchResults();
      } else if(progress.percent === 100){
        clearInterval(intervalValue.value);
        searchResults();

      }
    })
    .catch((error) => {
      console.error("Error fetching flight results:", error);
    });
};


const searchResults = () => {
  const sessionId = route.query.sessionId;
  $fetch("https://marketplace.beta.luxota.network/v1/search/results", {
    method: "GET",
    params: {
      sessionId: sessionId,
      page: 1,
      currency: 158,
      lang: "en",
    },
  })
    .then((response) => {
      console.log("response Flight in 327:", response);
      flightsData.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching flight results:", error);
    });
};

const intervalValue = ref(null);
onMounted(() => {
  flightResults.setPage("flySearch");
  searchInfo();
  if (route.query.sessionId) {
    localStorage.setItem("sessionId", route.query.sessionId);
    intervalValue.value = setInterval(searchProgress, 3000);
  }
});

//---- to change the results by entering new input values
watch(() => route.query.sessionId, (newValue) => {
  searchInfo();
    localStorage.setItem("sessionId", route.query.sessionId);
    intervalValue.value = setInterval(searchProgress, 3000);
  // searchResults();
});


</script>
<style scoped>
@import url("../assets/css/fly-search.css");
@import url("../assets/css/style-fly-search.css");

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
html {
  line-height: 1.15;
}
body {
  margin: 0;
}
* {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
}
p,
li,
ul,
pre,
div,
h1,
h2,
h3,
h4,
h5,
h6,
figure,
blockquote,
figcaption {
  margin: 0;
  padding: 0;
}
button {
  background-color: transparent;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button,
select {
  text-transform: none;
}
button,
[type="button"],
[type="reset"],
[type="submit"] {
  appearance: button;
  /* -webkit-appearance: button; */
}
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
button:-moz-focus,
[type="button"]:-moz-focus,
[type="reset"]:-moz-focus,
[type="submit"]:-moz-focus {
  outline: 1px dotted ButtonText;
}
a {
  color: inherit;
  text-decoration: inherit;
}
input {
  padding: 2px 4px;
}
img {
  display: block;
}
html {
  scroll-behavior: smooth;
}
</style>
