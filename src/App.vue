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
  // created() {
  //   this.getData();
  // },
  // data() {
  //   return {
  //     abc: "",
  //   };
  // },
  components: {
    Header,
    Footer,
  },
  // methods: {
  //   getData() {
  //     this.$axios
  //       .get("get/data", {
  //         headers: this.$apiHeader,
  //       })
  //       .then((resp) => {
  //      console.log('resp.data')
  //         console.log(resp.data);
  //         this.abc = resp.data;
  //       });
  //   },
  //   storeData() {
  //     this.$axios
  //       .post("store/data", {
  //         headers: this.$apiHeader,
  //         abc: this.abc,
  //       })
  //       .then((resp) => {
  //         console.log(resp);
  //       });
  //   },
  // },
};
</script>
<style>
@import "./assets/css/theme.css";
@import "./assets/css/customize.css";
/* @import "./assets/css/font-electro.css";
@import "./assets/css/font-awesome/css/fontawesome-all.min.css"; */

@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap");
/* @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"); */

.v-toast__item .v-toast__text {
  color: #fff !important;
  font-weight: 600 !important;
}
</style>

