<template>
    <!-- <div class="fly-search-container115" v-for="(leg , i) in flightLeg.serviceInfo.legs" :key="i">
{{ leg.info.departure.city }}
    </div> -->
    <div>
<div class="fly-search-container115" v-for="(leg , i) in flightLeg.serviceInfo.legs" :key="i">
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
                  {{ leg.info.departure.time }}
                </span>
                <span class="home-text074">
                  {{ leg.info.departure.airport.abb }}
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
                <span class="home-text075"> {{ leg.duration }}</span>
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
                <span class="home-text078"> {{ leg.info.arrival.time }}</span>
                <span class="home-text079">
                  {{ leg.info.arrival.airport.abb }}  |
                  {{ leg.info.arrival.date_time }}
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
        </div>
</template>
<script setup>

import { defineProps } from "vue";

const props = defineProps({
    flightLeg: Object,
//   legs: Array,
});
</script>
<style scoped>
@import url("../../assets/css/fly-search.css");
@import url("../../assets/css/style-fly-search.css");

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
