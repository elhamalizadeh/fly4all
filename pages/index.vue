<template>
  <div>
    <section class="home-container003">
      <div class="home-image10">
        <div class="slider-one">
          <div class="slider-one-image">
            <div class="slider-text" id="all-test-slide">
              <h1 id="text-slide">
                Istanbul: a jewel of culture and a bridge between continents
              </h1>
              <p id="text-small-slide">
                Explore the beauty of East and West at the heart of Istanbul's
                history, a city that embodies luxury and diversity.
              </p>
              <br />

              <button type="button" class="home-button03 button">
                Destination Now →
              </button>
            </div>
          </div>
        </div>
        <div class="slider-two">
          <div class="slider-two-image">
            <div class="slider-text" id="all-test-slide">
              <h1 id="text-slide">
                Dubai: More wonderful experiences await you in UAE!
              </h1>
              <p id="text-small-slide">
                Enjoy a unique experience in the Emirates, where history meets
                modernity and nature meets luxury!
              </p>
              <br />

              <button type="button" class="home-button03 button">
                Destination Now →
              </button>
            </div>
          </div>
        </div>
        <div class="slider-three">
          <div class="slider-three-image">
            <div class="slider-text" id="all-test-slide">
              <h1 id="text-slide">
                Istanbul: a jewel of culture and a bridge between continents
              </h1>
              <p id="text-small-slide">
                Explore the beauty of East and West at the heart of Istanbul's
                history, a city that embodies luxury and diversity.
              </p>
              <br />

              <button type="button" class="home-button03 button">
                Destination Now →
              </button>
            </div>
          </div>
        </div>
        <div class="slider-four">
          <div class="slider-four-image">
            <div class="slider-text" id="all-test-slide">
              <h1 id="text-slide">
                France: Experience the pleasure of seeing the natural landscapes
                of Europe
              </h1>
              <p id="text-small-slide">
                France is a country with a diverse range of natural beauty, from
                the rugged coastlines of Brittany to the majestic ...
              </p>
              <br />

              <button type="button" class="home-button03 button">
                Destination Now →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="home-container004">
        <div class="home-container005">
          <div class="home-container006">
            <span class="home-text">FLIGHT</span>
          </div>
          <NuxtLink to="./fly4all-hotel" class="home-link1">
            <div class="home-container007">
              <span class="home-text001">HOTEL</span>
            </div>
          </NuxtLink>
          <NuxtLink to="./fly4all-package" class="home-link1">
            <div class="home-container008">
              <span class="home-text002">Package</span>
            </div>
          </NuxtLink>
          <NuxtLink to="./fly4all-visa" class="home-link1">
            <div class="home-container009">
              <span class="home-text003">VISA</span>
            </div></NuxtLink
          >
          <div class="home-container010">
            <div class="home-container011">
              <input
                type="radio"
                name="radio"
                class="home-radiobutton"
                checked
              />
              <span class="home-text004">One-Way</span>
            </div>
            <div class="home-container012">
              <input type="radio" name="radio" class="home-radiobutton1" />
              <span class="home-text005">Round-Trip</span>
            </div>

            <div class="home-container014"></div>
            <div class="home-container015"></div>
            <div class="home-container016"></div>
          </div>
          <div class="home-select">
            <input type="radio" name="radio" class="home-radiobutton1" />
            <span class="home-text005">Multi-destination</span>
          </div>
          <select class="home-select1">
            <option value="Option 1">Economy</option>
            <option value="Option 1">Business</option>
            <option value="Option 2">First</option>
          </select>

          <div class="home-container017">
            <div class="home-container018">
              <select class="home-textinput input" v-model="selectedSource">
                <option disabled value="">Search by city or airport</option>
                <option value="dubai">
                  All airports in dubai: United Arab Emirates
                </option>
                <option value="istanbul">
                  All airports in Istanbul: Turkey
                </option>
                <option value="tehran">All airports in Iran: Tehran</option>
              </select>
            </div>
            <div class="home-container022">
              <select
                class="home-textinput1 input"
                v-model="selectedDestination"
              >
                <option disabled value="">Search by city or airport</option>
                <option value="dubai">
                  All airports in dubai: United Arab Emirates
                </option>
                <option value="istanbul">
                  All airports in Istanbul: Turkey
                </option>
                <option value="tehran">All airports in Iran: Tehran</option>
              </select>
            </div>
            <div class="home-container024">
              <input
                type="date"
                class="home-textinput2 input"
                v-model="selectedDate"
              />
            </div>
            <div class="home-container025">
              <input
                type="text"
                placeholder="Travelers "
                class="home-textinput3 input"
              />
            </div>
          </div>
          <!-- <h3>Source is : {{ selectedSource }}</h3>
            <h3>Destination is : {{ selectedDestination }}</h3>
            <h3>Date is : {{ selectedDate }}</h3> -->

          <div class="home-container027">
            <!-- <NuxtLink to="fly-search" rel="noreferrer noopener" class="home-button02 button">Search →</NuxtLink> -->
            <router-link
              :to="{
                name: 'fly-search',
                query: {
                  source: selectedSource,
                  destination: selectedDestination,
                  date: selectedDate,
                },
              }"
              class="home-button02 button"
            >
              Destination Now →
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <!---------->
    <div class="home-container028">
      <div class="home-container029">
        <h1 class="home-text006"></h1>
        <span class="home-text007"></span>
        <span class="home-text008"> </span>
      </div>
    </div>
    <!---------->
    <HomeRecomended />
    <HomePlan />
    <HomeServices />
  </div>
</template>
  
  <script>
import { ref } from "vue";

export default {
  setup() {
    const selectedSource = ref("");
    const selectedDestination = ref("");
    const selectedDate = ref("");

    return {
      selectedSource,
      selectedDestination,
      selectedDate,
    };
  },
};
</script>
  