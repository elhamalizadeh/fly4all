<template>     
    <div class="home-container005">
      <!----------------tripType---------------->
      <div class="home-container010">
        <!-- <span>{{ props.itemsData.legs[0].origin.city.title }} ---</span>
      <span>{{ props.itemsData.legs[0].destination.city.title }}</span> -->
      <!-- <span>{{ props.itemsData.adults }}</span> -->
        <!-- <span>{{ props.itemsData.legs[0].destination.city.title }}</span> -->
        <div class="home-container011">
          <input
            type="radio"
            class="home-radiobutton"
            v-model="params.tripType"
            :value="typeTripProps"
            @change="handleTripTypeChange"
          />
          <!-- value="oneWay" -->
          <span class="home-text004">One-Way</span>
        </div>
        <div class="home-container012">
          <input
            type="radio"
            class="home-radiobutton1"
            v-model="params.tripType"
            :value="typeTripProps"
            @change="handleTripTypeChange"
          />
          <!-- value="roundTrip" -->
          <span class="home-text005">Round-Trip</span>
        </div>
        <div>
          <input
            type="radio"
            class="home-radiobutton1"
            :v-model="params.tripType"
            :value="typeTripProps"
            @change="handleTripTypeChange"
          />
          <!-- value="multiDestination" -->
          <span class="home-text005">Multi-destination</span>
        </div>
        <div class="home-container014"></div>
        <div class="home-container015"></div>
        <div class="home-container016"></div>
      </div> 
      <!-- cabin -->
      <select class="home-select1" v-model="itemsData.cabin">
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>
        <!-----  v-for for inputCityFields --->
        <div
        class="home-container017 multiInputDiv"
        v-for="(item, index) in trips"
        :key="index"
      >
        <template v-if="index === 0 || !trips[index - 1].inputCity">
          <homeInputCityFialds
            @citySelected="handleMultiCitySelected($event, index)"
            @destCitySelected="handleMultiDestCitySelected($event, index)"
            :index="index + 2"
            v-model="item.inputCity"
            :tripType="params.tripType"
            v-if="tripType == 'multiDestination'"
            id="inputCityFields"
            :required="false"
          />
          <!-- :destCityDefaultFlySearch = props.itemsData.legs[0].destination.city.title -->

          <homeDateForm
            @sendEmitCurrentMonthYear="CurrentMonthYearFunction"
            @sendEmitCurrentMonthYearReturn="CurrentMonthYearFunctionReturn"
            v-model="item.date"
            :index="index + 2"
            :tripType="params.tripType"
            v-if="tripType == 'multiDestination'"
          /> 

          <div v-if="tripType == 'multiDestination'">
            <button
              class="home-button02 button"
              id="deleteBtn"
              @click="deleteFunction"
            >
              Delete
            </button>
          </div> 
        </template>
      </div>

            <!-----  end v-for  --->
      <!-------- first inputFields ----->
      <div class="home-container017" v-if="tripType == 'multiDestination'">
        <homeInputCityFialds
          @citySelected="handleCitySelected"
          @destCitySelected="handleDestCitySelected"
          :index="1"
          :required="true"
        />
        <homeDateForm
          @sendEmitCurrentMonthYear="CurrentMonthYearFunction"
          @sendEmitCurrentMonthYearReturn="CurrentMonthYearFunctionReturn"
          :tripType="params.tripType"
          :index="1"
        />
      </div>
      <!----------  end inputFields  ------------>
      <div class="home-container017">
        <homeInputCityFialds
          @citySelected="handleCitySelected"
          @destCitySelected="handleDestCitySelected"
          :index="0"
          :required="true"
        />
        <homeDateForm
          @sendEmitCurrentMonthYear="CurrentMonthYearFunction"
          @sendEmitCurrentMonthYearReturn="CurrentMonthYearFunctionReturn"
          :tripType="params.tripType"
          :index="0"
        />

        <!-- Travellers -->
        <homeTravellers />
        <div class="home-container026">
          <svg viewBox="0 0 1097.142857142857 1024" class="home-icon24">
            <path
              d="M338.857 512c-59.429 1.714-113.143 27.429-151.429 73.143h-76.571c-57.143 0-110.857-27.429-110.857-90.857 0-46.286-1.714-201.714 70.857-201.714 12 0 71.429 48.571 148.571 48.571 26.286 0 51.429-4.571 76-13.143-1.714 12.571-2.857 25.143-2.857 37.714 0 52 16.571 103.429 46.286 146.286zM950.857 876c0 92.571-61.143 148-152.571 148h-499.429c-91.429 0-152.571-55.429-152.571-148 0-129.143 30.286-327.429 197.714-327.429 19.429 0 90.286 79.429 204.571 79.429s185.143-79.429 204.571-79.429c167.429 0 197.714 198.286 197.714 327.429zM365.714 146.286c0 80.571-65.714 146.286-146.286 146.286s-146.286-65.714-146.286-146.286 65.714-146.286 146.286-146.286 146.286 65.714 146.286 146.286zM768 365.714c0 121.143-98.286 219.429-219.429 219.429s-219.429-98.286-219.429-219.429 98.286-219.429 219.429-219.429 219.429 98.286 219.429 219.429zM1097.143 494.286c0 63.429-53.714 90.857-110.857 90.857h-76.571c-38.286-45.714-92-71.429-151.429-73.143 29.714-42.857 46.286-94.286 46.286-146.286 0-12.571-1.143-25.143-2.857-37.714 24.571 8.571 49.714 13.143 76 13.143 77.143 0 136.571-48.571 148.571-48.571 72.571 0 70.857 155.429 70.857 201.714zM1024 146.286c0 80.571-65.714 146.286-146.286 146.286s-146.286-65.714-146.286-146.286 65.714-146.286 146.286-146.286 146.286 65.714 146.286 146.286z"
            ></path>
          </svg>
        </div>
      </div>
   <!-------- end home-container017-->
   <button
        class="home-button02 button"
        id="addBtn"
        v-if="tripType == 'multiDestination'"
        @click="addInputFunction"
      >
        Add trip
      </button>
      <div class="home-container027">
        <button @click="searchMultiFlights()" class="home-button02 button">
          Destination Now →
        </button>
      </div>

</div>

</template>
<script setup>
import {
  ref,
  onMounted,
  watch,
  defineProps,
  reactive,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const props = defineProps({
  itemsData: Object,
});

const tripType = ref("oneWay");
const params = reactive({
  origin: "",
  destination: "",
  date: "",
  tripType: "",
  cabin: "economy",
  adults: 0,
  children: 0,
  infants: 0,
});

const tripTypeProps = ref(props.itemsData.tripType);
console.log("tripTypeProps" , tripTypeProps.value);

const self = getCurrentInstance();
const travelersCounter = useCounter();

const router = useRouter();
const cityId = ref([]);
const destCityId = ref([]);
const cityIdByIndex = ref([]);
const destCityIdByIndex = ref([]);

const handleCitySelected = (selectCity) => {
  cityId.value = selectCity;
};

//------------------------handleDestCitySelected ------
const handleDestCitySelected = (selectDestCity) => {
  destCityId.value = selectDestCity;
};

//------------------------handleMultiCitySelected ------********
const handleMultiCitySelected = (selectCity, index) => {
  if (!cityId[index]) {
    cityId[index] = {}; // Initialize object if not present
  }
  cityId[index] = selectCity;
  console.log("index is:", index);
  console.log("selectCity is 183:", selectCity);
  console.log("cityId[index].value:", cityId[index]);
  cityIdByIndex.value = cityId[index];
};

//------------------------handleMultiDestCitySelected ------********
const handleMultiDestCitySelected = (selectDestCity, index) => {
  if (!destCityId[index]) {
    destCityId[index] = {}; 
  }
  destCityId[index] = selectDestCity;
  destCityIdByIndex.value = destCityId[index];
};

//------------------------searchMultiFlights ------*********
const searchMultiFlights = async () => {
  let dataInputs = {};
  // console.log("self:", self);

  const inputs = self.vnode.el.querySelectorAll("[name]");
  console.log("inputs", inputs);

  inputs.forEach((input) => {
    const name = input.name;
    dataInputs[name] = input.value;
  });

  console.log("dataInputs", dataInputs);
  const data = reactive({});

  try {
    const url = new URL(
      "https://marketplace.beta.luxota.network/v2/search/flight"
    );
    //-----urlSearchParams------
    const params = new URLSearchParams();
    for (const key in dataInputs) {
      if (dataInputs[key]) {
        const value = dataInputs[key];
        params.append(key, value);
      } else {
        console.log("dataInputs[key] 359:", key);
        Swal.fire({
          icon: "error",
          text: "Fields are required.",
        });
        return;
      }
    }
    if (tripType.value === "roundTrip") {
    if(!selectedDateReturn.value.value){
      Swal.fire({
          icon: "error",
          text: "Fields are required.",
        });
        return;
    }
  }
    if (tripType.value === "roundTrip") {
      params.append("legs[1][origin]", destCityId.value);
      params.append("legs[1][destination]", cityId.value);
      params.append("legs[1][departure]", selectedDateReturn.value.value);
    }

    params.append("adults", travelersCounter.adultsCount);
    params.append("children", travelersCounter.childrenCount);
    params.append("infants", travelersCounter.infantsCount);
    params.append("cabin", "economy");
    params.append("tripType", tripType.value);
    params.append("searcherIdentity", "test");

    const response = await $fetch(url, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer 11aup4zzwj2nol1zguv34dxt7661a75910dbd852f2574c",
      },
    });
    const sessionId = response.sessionId;
    const status = response.status;
    // console.log("response 295" , response);
    await router.push({
      name: "fly-search",
      query: { status, sessionId, lang: "EN" },
    });
  } catch {
    console.error("Error searching flights:", error);
  }
};
//-----------------------send data from dateForm to this page
const selectedDate = ref("");
const CurrentMonthYearFunction = (MonthYear) => {
  selectedDate.value = MonthYear;
};

const selectedDateReturn = ref("");
const CurrentMonthYearFunctionReturn = (MonthYear) => {
  selectedDateReturn.value = MonthYear;
};
const handleTripTypeChange = () => {
  tripType.value = params.tripType;
};

const trips = ref([]);

//-----------deleteBtn---
const deleteFunction = (index) => {
  trips.value.splice(index, 1);
};

const addInputFunction = () => {
  if (tripType.value === "multiDestination") {
    trips.value.push({
      inputCity: "",
      date: "",
    });
  }
};
</script>
<!-- <style scoped>
@import url("~/assets/css/fly-search.css");
@import url("~/assets/css/style-fly-search.css");


</style> -->
<style scoped>
.home-container017 {
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr 3fr 1fr;
  background-color: #ffffff;
  border-radius: 20px;
}
.input-city-fields {
  margin-bottom: 10px;
}
#deleteBtn:hover {
  cursor: pointer;
}
#addBtn:hover {
  cursor: pointer;
}
.multiInputDiv {
  display: grid;
}
</style>