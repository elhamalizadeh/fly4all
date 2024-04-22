<template>
  <div class="home-container">
    <HomeHeader />
    <section class="home-container003">
      <homeSlider />

          <div style="margin-top: 50px;">
            <HomeBanner />
          <homeFlySrearchForm
          />
          <!-- :recommendeDestination="recommendedDestinationValue" -->

        </div>

    </section>
    <div class="home-container028">
      <div class="home-container029">
        <h1 class="home-text006"></h1>
        <span class="home-text007"></span>
        <span class="home-text008"> </span>
      </div>
    </div>
    <homeRecomended
      @sendEmitSelectedDestination="SelectedRecommendedDestination"
    />
    <h2>{{ selectedRecommendedDest }}</h2>
    <homePlan />
    <homeServices />
    <!---- more here---->
    <div class="home-container100">
      <button type="button" class="home-button14 button">More Here →</button>
    </div>
    <!-------->
    <HomeHolidaysDestination />
    <HomeTravelPackages />
    <HomeBlogNews />
    <HomeFooter />
  </div>
</template>
<script setup>
import { defineProps, onMounted } from "vue";
const  flightFields  = useFlight();
const  travelersCounter  = useCounter();

  const props = defineProps({
    recommendeDestination: Object,
});

    const selectedRecommendedDest = ref("");
    const SelectedRecommendedDestination = (dest) => {
      selectedRecommendedDest.value = dest;
    };

    onMounted(() => {
      flightFields.updateTypeTrip("oneWay");
      
      travelersCounter.adultsCount =  1 ;
      travelersCounter.childrenCount = 0 ;
      travelersCounter.infantsCount = 0;
    });

</script>
