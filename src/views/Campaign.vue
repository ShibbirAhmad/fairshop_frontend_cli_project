<template>
  <main id="content" role="main" class="height">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol
          class="breadcrumb flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble"
        >
          <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
            <a href="/">Home</a>
          </li>

          <li>
              <img class="custom_angle_right_icon" src="../../assets/images/product_details_angle_right_icon.png" alt="">
          </li>

          <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
            <a href="#">Campaign</a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="content">
      <div class="container">
        <div v-if="campaign_page.length <= 0">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-lg-12">
              <carousel
                :items="1"
                :nav="false"
                :autoplay="true"
                :autoplayTimeout="2000"
                v-if="campaign_page.length > 0"
              >
                <a
                  v-for="(campaign_p, i) in campain_slider"
                  :key="i"
                  :href="campaign_p.link"
                  target="_blank"
                >
                  <img
                    :src="$imageBaseUrl + campaign_p.image"
                    alt="image"
                    class="slider-img"
                    width="100%"
                  />
                </a>
              </carousel>
            </div>
          </div>
          <div class="row mt-5 mb-5">
            <div

              v-for="(item, idx) in campain_image"
              :key="idx"
              :class="`${item.image_width=='50%' ? 'cmpposter' : 'cmpposter_full_width'}`"
              :width="item.image_width"
            >
                <a :href="item.link">
                  <img :src="$imageBaseUrl + item.image" alt="" />
                  <div class="cmpoverlay"></div>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  created() {
    this.getCampaigeContent();
  },
  data() {
    return {
      campaign_page: [],
    };
  },
  methods: {
    getCampaigeContent() {
      this.$axios
        .get("get/campaign/page/content", {
          headers: this.$apiHeader,
        })
        .then((resp) => {
          if (resp.data.length > 0) {
            this.campaign_page = resp.data;
          }
        });
    },
  },
  components: {
    carousel,
  },

  computed: {
    campain_image() {
      let image = [];
      this.campaign_page.forEach((element) => {
        if (element.position == 2) {
          image.push(element);
        }
      });

      return image;
    },
    campain_slider() {
      let image = [];
      this.campaign_page.forEach((element) => {
        if (element.position == 1) {
          image.push(element);
        }
      });

      return image;
    },
  },
};
</script>

<style scoped>
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