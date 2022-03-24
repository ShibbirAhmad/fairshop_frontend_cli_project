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
            :autoplayTimeout="5000"
            v-if="sliders"
          >
            <a
              v-for="(slider, i) in sliders"
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

       <div v-if="banner.status == 1" class="row banner_row">

          <div class="col-md-6 col-lg-6 col-xs-6">
               <a :href="banner.url_1">
                 <img  class="advertise_banner_1" :src="$imageBaseUrl+banner.banner_1">
                </a>
          </div>

             <div class="col-md-6 col-lg-6 col-xs-6">
               <a :href="banner.url_2">
                 <img  class="advertise_banner_2" :src="$imageBaseUrl+banner.banner_2">
                </a>
          </div>

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
     banner() {
      return this.$store.state.banner;
    },
  },
};
</script>
<style scoped>
</style>