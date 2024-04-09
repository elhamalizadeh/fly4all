<template>
  <div class="home-container">
    <HomeHeader />
    <section class="home-container003">
      <homeSlider />
      <homeFlySrearchForm :recommendeDestination="recommendedDestinationValue" />
    </section>
    <div class="home-container028">
      <div class="home-container029">
        <h1 class="home-text006"></h1>
        <span class="home-text007"></span>
        <span class="home-text008"> </span>
      </div>
    </div>
    <homeRecomended @sendEmitSelectedDestination="SelectedRecommendedDestination"/>
    <h2>{{ selectedRecommendedDest }}</h2>
    <homePlan />
    <homeServices/>
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
<script>

export default {
  props: ["recommendeDestination"],

setup(){
  const receiveDataFromB = (data) => {
      // Capture the emitted event and store the data
      this.dataFromB = data;
    }

    const selectedRecommendedDest = ref("");
    const SelectedRecommendedDestination = (dest) => {
      selectedRecommendedDest.value = dest;
};


    return {
      SelectedRecommendedDestination,
      selectedRecommendedDest,
      recommendedDestinationValue : selectedRecommendedDest

    };
}
};
</script>