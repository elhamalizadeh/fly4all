<template>
  <div class="fly-search-container">
    <div class="fly-search-main">
      <flySearchMenu />
      <div class="home-container038">
        <HomeFlySrearchForm />
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
          <div v-for="flight in itemsData" :key="flight">
            <div class="fly-search-container115" style="margin-top: 3rem">
              <div class="fly-search-container116">
                <img
                  alt="image"
                  src="~/public/images/fly-search/iraqi_airways_logo1-500w.png"
                  loading="lazy"
                  class="home-image15"
                />
              </div>
              <div class="fly-search-container117">
                <span class="fly-search-text067">
                  <span>One</span>
                  <br />
                  <span>way</span>
                  <br />
                  <span>trip</span>
                </span>
              </div>
              <div class="fly-search-container118">
                <span class="fly-search-text073">
                  flight.legs[0].departure.time
                </span>
                <span class="home-text074">
                  flight.legs[0].departure.airport.abb
                </span>
              </div>
              <div class="fly-search-container119">
                <img
                  alt="image"
                  src="~/public/images/fly-search/plane-departure-200h.png"
                  class="home-image16"
                />
              </div>
              <div class="fly-search-container120">
                <span class="home-text075"> flight.legs[0].duration </span>
                <span class="home-text076">---------------</span>
                <span class="home-text077">non stop</span>
              </div>
              <div class="fly-search-container121">
                <div class="fly-search-container122">
                  <img
                    alt="image"
                    src="~/public/images/fly-search/plane-arrical-200h.png"
                    class="home-image17"
                  />
                </div>
              </div>
              <div class="fly-search-container123">
                <span class="home-text078"> flight.legs[0].arrival.time</span>
                <span class="home-text079">
                  flight.legs[0].arrival.airport.abb |
                  flight.legs[0].arrival.date_time
                </span>
              </div>
              <div class="fly-search-container124"></div>
              <div class="fly-search-container125">
                <div class="fly-search-container126">
                  <span class="home-text080">193.96$</span>
                </div>
                <div class="home-container127">
                  <span class="home-text081">
                    All travelers are prohibited from traveling
                  </span>
                </div>
                <div class="fly-search-container128">
                  <button class="fly-search-login1 button">Login</button>
                </div>
              </div>
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
                <div class="home-ch01"></div>
                <div class="home-ch02">
                  <span class="home-ch02-text">
                    flight.legs[0].departure.city - flight.legs[0].arrival.city
                  </span>
                </div>
                <div class="home-ch03">
                  <span class="home-ch03-text"> flight.legs[0].duration </span>
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
                  <span class="home-sh01-text">
                    flight.serviceInfo.legs[0].info.departure.time
                  </span>
                </div>
                <div class="home-sh02">
                  <span class="home-sh02-text">
                    flight.serviceInfo.legs[0].info.departure.city
                  </span>
                </div>
                <div class="home-sh03"></div>
                <div class="home-sh04">
                  <span class="home-sh04-text">
                    flight.serviceInfo.legs[0].info.arrival.time
                  </span>
                </div>
                <div class="home-sh05">
                  <span class="home-sh05-text">
                    flight.serviceInfo.legs[0].info.arrival.city
                  </span>
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
                  <span class="home-qh01-text">
                    flight.serviceInfo.legs[0].info.flight_number
                  </span>
                </div>
                <div class="home-qh02">
                  <span class="home-qh02-text">
                    flight.serviceInfo.legs[0].info.airline.title
                  </span>
                </div>
                <div class="home-qh03">
                  <span class="home-qh03-text">
                    flight.serviceInfo.legs[0].info.airplane
                  </span>
                </div>
                <div class="home-qh04">
                  <span class="home-qh04-text">
                    flight.serviceInfo.legs[0].info.resBookDesigCode
                  </span>
                </div>
                <div class="home-qh05">
                  <span class="home-qh05-text">
                    flight.serviceInfo.legs[0].info.cabin
                  </span>
                </div>
                <div class="home-qh06">
                  <span class="home-qh06-text">
                    flight.serviceInfo.legs[0].info.capacity
                  </span>
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
      <flySearchFooter />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const flightFields = useFlight();

const route = useRoute();
const flightResult = ref([]);
const resultData = ref(null);
const itemsData = ref({});
const cityIdFromSearchResult = ref("");
const cityTitleFromSearchResult = ref("");

const searchResults = () => {
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
      console.log("response", response.legs); ///------
      // itemsData.value = response.legs;
      flightFields.updateItemsData(response.legs);
      console.log("itemsDataValue 299 is:", flightFields.itemsDataValue);
      cityIdFromSearchResult.value = response.legs[0].origin.city.id;
      cityTitleFromSearchResult.value = response.legs[0].origin.city.title;
    })
    .catch((error) => {
      console.error("Error fetching flight results:", error);
    });
};

console.log("cityTitleFromSearchResult", cityTitleFromSearchResult.value);

onMounted(() => {
  // flightFields.updateCity(cityIdFromSearchResult.value);
  if (route.query.sessionId) {
    searchResults();
    localStorage.setItem("sessionId", route.query.sessionId);
  }
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
