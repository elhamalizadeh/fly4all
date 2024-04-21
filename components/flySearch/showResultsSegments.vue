<template>
  <div
    style="
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      background-color: #ffffff;
      margin-top: 5px;
      padding-top: 10px;
    "
  >
    <!-- class="home-info" -->
    <div style="display: flex; flex-direction: column">
      <div
        class="home-info"
        v-for="(segment, i) in flightSegment.serviceInfo.legs"
        :key="i"
      >
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
        <div
          class="home-inf01"
          v-for="(segmentItem, j) in segment.segments"
          :key="j"
        >
          <div class="home-ch01"></div>
          <div class="home-ch02">
            <span class="home-ch02-text">
              {{ segmentItem.departure.city }} - {{ segmentItem.arrival.city }}
            </span>
          </div>
          <div class="home-ch03">
            <span class="home-ch03-text"> {{ segmentItem.duration }}</span>
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
        <div
          class="home-info03"
          v-for="(segmentItem, j) in segment.segments"
          :key="j"
        >
          <div class="home-sh01">
            <span class="home-sh01-text">
              {{ segmentItem.departure.time }}
            </span>
          </div>
          <div class="home-sh02">
            <span class="home-sh02-text">
              {{ segmentItem.departure.city }}
            </span>
          </div>
          <div class="home-sh03"></div>
          <div class="home-sh04">
            <span class="home-sh04-text">
              {{ segmentItem.arrival.time }}
            </span>
          </div>
          <div class="home-sh05">
            <span class="home-sh05-text">
              {{ segmentItem.arrival.city }}
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
        <div
          class="home-info05"
          v-for="(segmentItem, j) in segment.segments"
          :key="j"
        >
          <div class="home-qh01">
            <span class="home-qh01-text">
              {{ segmentItem.flight_number }}
            </span>
          </div>
          <div class="home-qh02">
            <span class="home-qh02-text">
              {{ segmentItem.airline.title }}
            </span>
          </div>
          <div class="home-qh03">
            <span class="home-qh03-text">
              {{ segmentItem.airplane }}
            </span>
          </div>
          <div class="home-qh04">
            <span class="home-qh04-text">
              {{ segmentItem.resBookDesigCode }}
            </span>
          </div>
          <div class="home-qh05">
            <span class="home-qh05-text">
              {{ segmentItem.cabin }}
            </span>
          </div>
          <div class="home-qh06">
            <span class="home-qh06-text">
              {{ segmentItem.capacity }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="home-info06" style="background-color: bisque">
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
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  flightSegment: Object,
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
