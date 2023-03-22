<template>
  <div class="mb-4">
    <div class="container-fluid overflow-hidden" style="border-radius: 0px !important;">
      <div class="row mb-4">
        <!-- slider -->
        <!-- Slider -->

        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12" style="border-radius: 0px !important;">
          <carousel
            :items="1"
            :nav="false"
            :autoplay="true"
            :autoplayTimeout="5000"
            v-if="sliders"
            style="border-radius: 0px !important;"
          >
            <a
              v-for="(slider, i) in sliders"
              :key="i"
              :href="slider.url"
              style="border-radius: 0px !important;"
            >
              <img
                v-if="slider.image"
                :src="$imageBaseUrl + slider.image"
                class="slider-img"
                style="border-radius: 0px !important;"
              />
            </a>
          </carousel>
        </div>



        <!-- End Banner -->
      </div>


    </div>

    <div class="container">
      <div v-if="after_slider.status == 1" class="row banner_row">

          <div class="col-md-12 col-lg-12 col-xs-12">
               <a :href="after_slider.url">
                 <img  class="advertise_banner_1" :src="$imageBaseUrl+after_slider.banner">
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
    this.getSliderAfterBanner();
  },

  data(){
    return{
      after_slider: '',
    }
  },
  methods:{
    getSliderAfterBanner(){
        this.$axios.get('/slider/after/banner')
        .then((resp)=>{
          // console.log(resp);
            if(resp.data.success == true){
              this.after_slider = resp.data.after_slider;
            }
        })
    },
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