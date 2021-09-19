<template>
  <div class="mb-4">
    <div class="container-fluid overflow-hidden">
      <div class="row mb-4">
        <!-- slider -->
        <!-- Slider -->

        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
          <carousel
            :items="1"
            :nav="false"
            :autoplay="true"
            :autoplayTimeout="2000"
            v-if="sliders.sliders"
          >
            <a
              v-for="(slider, i) in sliders.sliders"
              :key="i"
              :href="slider.url"
            >
              <img
                v-if="slider.image"
                :src="$imageBaseUrl + slider.image"
                class="slider-img"
              />
            </a>
          </carousel>
        </div>

    

        <!-- End Banner -->
      </div>

     
    </div>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
// import VLazyImage from "v-lazy-image";

export default {
  created() {
    this.$store.dispatch("sliders");
  },
  components: {
    carousel,
  },

  computed: {
    sliders() {
      return this.$store.state.sliders;
    },
  },
};
</script>
<style scoped>
</style>