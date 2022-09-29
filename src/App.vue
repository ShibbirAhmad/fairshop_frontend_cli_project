<template>
  <div id="app">
    <!-- <button @click.prevent="storeData" class="btn btn-primary">click me</button> -->
    <Header />
    <!-- <transition mode="out-in" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" > -->
    <router-view :key="$route.fullPath" />
    <!-- </transition > -->

    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },

};
</script>
<style>
@import "./assets/css/theme.css";
@import "./assets/css/customize.css";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.js";
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap");


.v-toast__item .v-toast__text {
  color: #fff !important;
  font-weight: 600 !important;
}
</style>

