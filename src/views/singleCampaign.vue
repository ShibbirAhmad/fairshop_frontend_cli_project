<template>
  <main id="content" role="main" class="height">
    <!-- Slider & Banner Section -->

    <div class="" v-if="Object.keys(campaign).length <= 0">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="mb-4" v-else>
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol
            class="
              breadcrumb
              flex-nowrap flex-xl-wrap
              overflow-auto overflow-xl-visble
            "
          >
            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
              <router-link to="/">Home </router-link>
            </li>

            <li>
              <img class="custom_angle_right_icon" src="../../assets/images/product_details_angle_right_icon.png" alt="">
            </li>

            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
              <router-link
                :to="{
                  name: 'campaign',
                }"
                >campaign
              </router-link>
            </li>

            <li>
              <img class="custom_angle_right_icon" src="../../assets/images/product_details_angle_right_icon.png" alt="">
            </li>

            <li
              v-if="campaign.campaign.campaign_name"
              class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"
            >
              {{ campaign.campaign.campaign_name }}
            </li>
          </ol>
        </nav>
      </div>
      <div class="container overflow-hidden">
        <div
          class="
            d-flex
            justify-content-between
            border-bottom border-color-1
            flex-lg-nowrap flex-wrap
            border-md-down-top-0 border-md-down-bottView
            om-
            mb-3
            mt-2
          "
        >
          <h3
            v-if="campaign.campaign.end_date"
            class="section-title section-title__full mb-0 pb-2 font-size-22"
          >
            <Countdown :deadline="campaign.campaign.end_date"></Countdown>
          </h3>
          <a
            class="d-block campallprdc"
            href="#"
            @click.prevent="
              show_terms_and_condition = !show_terms_and_condition
            "
            id="togle"
            style="cursor: pointer"
            aria-expanded="true"
          >
            Terms &amp; Conditions
            <span id="up-down">
              <i class="fa fa-angle-up"></i>
            </span>
          </a>
        </div>
        <transition
          enter-active-class="animate__animated animate__slideInDown"
          leave-active-class="animate__animated animate__fadeOutUp"
        >
          <div
            v-if="show_terms_and_condition"
            id="demo"
            class="collapse show"
            style="
              background: rgb(255, 255, 255);
              padding: 1rem;
              border-radius: 0.5rem;
            "
            v-html="campaign.campaign.terms_and_condition"
          ></div>
        </transition>

        <div></div>

        <!-- <div class="row">
         <div class="col-lg-2" v-for="(campaign,cpidx) in campaign.products" :key="cpidx">
           <h4>{{campaign.name}}</h4>
         </div>
       </div> -->

        <products
          v-if="campaign.products"
          :products="campaign.products"
        ></products>
      </div>
    </div>
  </main>
</template>

<script>
import products from "../components/products";
import Countdown from "vuejs-countdown";

export default {
  created() {
    this.$store.dispatch("campaign", this.$route.params.slug);
  },

  data() {
    return {
      show_terms_and_condition: false,
    };
  },
  components: {
    products,
    Countdown,
  },
  computed: {
    campaign() {
      return this.$store.state.campaign;
    },
  },
};
</script>

<style scoped>
.vuejs-countdown .digit {
  font-size: 18px !important;
}
  .breadcrumb-item+.breadcrumb-item::before {
    display: inline-block;
    padding-right: 1rem;
    color: #333e48;
    content: ">";
    padding-right: 5px;
    }
    .breadcrumb-item+.breadcrumb-item a {
        background-color: transparent;
        border-radius: 0.313rem;
        margin-top: 3px;
    }
    .breadcrumb-item+.breadcrumb-item {
        padding-left: 5px;
    }
</style>