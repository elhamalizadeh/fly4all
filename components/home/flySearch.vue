<template>
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

          <!----------------tripType---------------->
          <div class="home-container010">
            <div class="home-container011">
              <input
                type="radio"
                name="radio"
                class="home-radiobutton"
                v-model="params.tripType"
                value="oneway"
              />
              <span class="home-text004">One-Way</span>
            </div>
            <div class="home-container012">
              <input
                type="radio"
                name="radio"
                class="home-radiobutton1"
                v-model="params.tripType"
                value="roundWay"
              />
              <span class="home-text005">Round-Trip</span>
            </div>
            <div class="home-container012">
              <input
                type="radio"
                name="radio"
                class="home-radiobutton1"
                v-model="params.tripType"
                value="multi"
              />
              <span class="home-text005">Multi-destination</span>
            </div>
            <div class="home-container014"></div>
            <div class="home-container015"></div>
            <div class="home-container016"></div>
          </div>
          <!-------------------------------->
          <!--------------- cabin-------------------->
          <select class="home-select1" v-model="params.cabin">
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>

          <!--------- Source  ------>
          <div class="home-container017">
            <div class="home-container018">
              <select class="home-textinput input" v-model="params.origin">
                <option disabled value="">Search by city or airport</option>
                <option value="Dubai">
                  All airports in Dubai: United Arab Emirates
                </option>
                <option value="Istanbul">
                  All airports in Istanbul: Turkey
                </option>
                <option value="Tehran">All airports in Tehran: Iran</option>
              </select>
            </div>

            <!------------------ destination ----->
            <div class="home-container022">
              <select class="home-textinput1 input" v-model="params.destination">
                <option disabled value="">Search by city or airport</option>
                <option value="Dubai">
                  All airports in dubai: United Arab Emirates
                </option>
                <option value="Istanbul">
                  All airports in Istanbul: Turkey
                </option>
                <option value="Tehran">All airports in Tehran: Iran</option>
              </select>
            </div>

            <!------------------ Date ------>
            <div class="home-container024">
              <input type="date" class="home-textinput2 input" v-model="params.date" />
            </div>

            <!------------- Travellers ------->
            <div class="home-container025">
              <!-- <input
                type="text"
                placeholder="Travelers "
                class="home-textinput3 input"
                v-model="travellers"
              /> -->
              <div>
                <input
                  type="text"
                  v-model="selectedOption"
                  class="home-textinput3 input"
                  @click="showOptions = true"
                />

                <!-- <div v-if="showOptions" class="options-box">
                  <div v-for="(option, index) in options" :key="index">
                    <div>{{ option.name }}</div>
                    <button @click="increment">+</button>
                    <span>{{ count }}</span>
                    <button @click="decrement">-</button>
                  </div>
                  <button @click="done">Done</button>
                </div> -->

                <div v-if="showOptions" class="options-box">
                  <div>
                  <div>Adult</div>
                  <!-- <p>{{ option.subTitle }}</p> -->
                  <button @click="incrementAdult">+</button>
                  <span>{{ countAdult }}</span>
                  <button @click="decrementAdult">-</button>
                </div>

                <div>
                  <div>Children</div>
                  <!-- <p>{{ option.subTitle }}</p> -->
                  <button @click="incrementChildren">+</button>
                  <span>{{ countChildren }}</span>
                  <button @click="decrementChildren">-</button>
                </div>

                <div>
                  <div>Infants</div>
                  <!-- <p>{{ option.subTitle }}</p> -->
                  <button @click="incrementInfant">+</button>
                  <span>{{ countInfant }}</span>
                  <button @click="decrementInfant">-</button>
                </div>
                <button @click="done">Done</button>
                </div>
              </div>
            </div>
          </div>

          <div class="home-container027">
            <!-- <NuxtLink to="fly-search" rel="noreferrer noopener" class="home-button02 button">Search →</NuxtLink> -->
            <router-link
              :to="{
                name: 'about',
                query: {
                  params:params,
                  origin: params.origin,
                  destination: params.destination,
                  date: params.date,
                  tripType: params.tripType,
                  cabin: params.cabin,
                  adults:countAdult,
                  children:countChildren,
                  infants:countInfant
                },
                // params: {
                //   origin: origin,
                //   destination: destination,
                //   date: date,
                //   travellers: travellers,
                //   tripType: tripType,
                //   cabin: cabin,
                //   adults:countAdult,
                //   children:countChildren,
                //   infants:countInfant
                // },
              }"
              class="home-button02 button"
            >
              Search →
            </router-link>

            <!-- <button @click="goToSearch" class="home-button02 button">Search Flights</button> -->
            <!--------------->
            <section>
              <div>
                <h6>Source is :</h6>
                <p style="color: red">{{ params.origin }}</p>
                <h6>Destination is :</h6>
                <p style="color: red">{{ params.destination }}</p>
                <h6>Date is :</h6>
                <p style="color: red">{{ params.date }}</p>
                <h6>Adults:</h6>
                <p style="color: red">{{ countAdult }}</p>
                <h6>Children:</h6>
                <p style="color: red">{{ countChildren }}</p>
                <h6>Infant:</h6>
                <p style="color: red">{{ countInfant }}</p>
                <h6>tripType is:</h6>
                <p style="color: red">{{ params.tripType }}</p>
                <h6>cabin is:</h6>
                <p style="color: red">{{ params.cabin }}</p>
              </div>
            </section>
            <!--------------->
          </div>
        </div>
      </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Home",

  setup() {
    // const options = [
    //   { name: "Adults", quantity: 0 },
    //   { name: "Children", subTitle:"Ages 2 to 12" , quantity: 0 },
    //   { name: "Infants", subTitle:"Younger than 2" , quantity: 0 },
    // ];

    // const title = ref("");

    const params = reactive({
      origin:'',
      destination:'',
      date:'',
      tripType:'oneway',
      cabin:'economy',
      adults:0,
      children:0,
      infants:0
    })

    const router = useRouter();

    const { countAdult, incrementAdult, decrementAdult ,countChildren, incrementChildren, decrementChildren , countInfant, incrementInfant, decrementInfant} = useCounter();
    // const { countChildren, incrementChildren, decrementChildren } =
    //   useCounter();
    // const { countInfant, incrementInfant, decrementInfant } = useCounter();
    //----------------
    const selectedOption = ref("");
    const showOptions = ref(false);

    const done = () => {
      showOptions.value = false;
    };

    //---------------------
    // const goToSearch = () => {
    //   router.push({
    //             // path: '/about',
    //               name: 'About',
    //               query: { title: title.value }
    //             });
    // }

    return {
      params,
      selectedOption,
      showOptions,
      countAdult,
      incrementAdult,
      decrementAdult,
      done,
      countInfant,
      incrementInfant,
      decrementInfant,
      countChildren,
      incrementChildren,
      decrementChildren,
    };
  },
};
</script>
<style>
@import url("../../assets/css/style.css");
@import url("../../assets/css/index.css");
</style>