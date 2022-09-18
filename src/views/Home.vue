<template>
  <main id="content" role="main" class="height">
    <Slider />
    <div class="container">
      <!-- <div class="browse-by-category">browse by category</div> -->
      <h4 class="text-center">Categories</h4>
      <div class="category-icon-box">
        <carousel
          :nav="false"
          :autoplay="true"
          :autoplayTimeout="4000"
          v-if="only_categories.length > 0"
          :responsive="{ 0: { items: 3 }, 600: { items: 8 } }"
        >
          <div
            class="category-icon"
            v-for="(cat, ocidx) in only_categories"
            :key="ocidx"
          >
            <router-link
              :to="{
                name: 'categoryProducts',
                params: { slug: cat.slug },
              }"
            >
              <img :src="$imageBaseUrl + cat.icon_image" alt="men_items" />
              <p>{{ cat.name }}</p>
            </router-link>
          </div>
        </carousel>
      </div>

      <!-- start feature product section  -->
      <FeatureProduct />
      <!-- end feature product section  -->

      <!-- start flash deals here -->
      <!-- <FlashSale /> -->
      <!-- end flash deals here -->

      <!-- start trending products here  -->

      <div v-if="home_data.length > 0" class="__category_wise_product">
        <div
          class="row category-sec"
          v-for="(data, ctx) in home_data"
          :key="ctx"
        >
          <div class="col-lg-12">
            <div class="category-heading">
              <h3>{{ data.category.name }}</h3>
              <!-- <ul
                  class="landing_sub_c_list" :id="'landing_sub_category_'+data.category.id"
                  v-if="category.sub_categories.length > 0"
                >
                  <li
                    v-for="(sub_category, sbx) in category.sub_categories"
                    :key="sbx"
                  >
                    <router-link v-if="sbx < 5"
                      :to="{
                        name: 'SubCategoryProduct',
                        params: {
                          categortSlug: category.slug,
                          slug: sub_category.slug,
                        },
                      }"
                    >
                      {{ sub_category.name }}

                    </router-link>
                  </li>
                </ul>
                <button @click="toggleSubCategories(category.id)" class="btn btn-sm landing_sub_c "> <i class="fa fa-list"></i> </button>
              <router-link
                class="d-block viewallcatlink"
                :to="{
                  name: 'categoryProducts',
                  params: { slug: category.slug },
                }"
                >VIEW ALL
              </router-link> -->
            </div>
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="row" v-if="data.products.length > 0">
                  <div
                    class="width-20"
                    v-for="product in data.products"
                    :key="product.id"
                  >
                    <div class="__product_card">
                      <div class="__product_card_img">
                         <router-link
                          :to="{name:'single_product',params:{slug:product.slug},} "
                          class="d-block text-center"
                        >
                          <img
                            :alt="product.thumbnail_img"
                            :src="$imageBaseUrl2 + product.thumbnail_img"
                          />
                         </router-link>
                      </div>
                      <div class="__product_details">
                        <router-link
                          :to="{name:'single_product',params:{slug:product.slug},} "
                          class="d-block text-center"
                        >
                          <h4>
                            {{ product.name.substring(0, 15) }}
                            <span v-if="product.name.length > 15"> ... </span>
                          </h4>
                        </router-link>
                        <p class="price">
                          <span
                            ><del>৳{{ product.price }}</del></span
                          >
                          ৳{{ product.sale_price }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfiniteLoading
        spinner="waveDots"
        @distance="0.5"
        @infinite="getCategoryProducts"
      >
        <div slot="no-more"></div>
      </InfiniteLoading>
    </div>
  </main>
</template>
<script>
import Slider from "../components/Slider";
import FeatureProduct from "../components/FeatureProduct";
// import FlashSale from "../components/FlashSale";
import InfiniteLoading from "vue-infinite-loading";
import carousel from "vue-owl-carousel";

export default {
  name: "welcome",

  data() {
    return {
      home_data: [],
      page: 1,
    };
  },

  methods: {
    toggleSubCategories(id) {
      document
        .getElementById("landing_sub_category_" + id)
        .classList.toggle("landing_sub_c_list_toggle");
    },

    getCategoryProducts($state) {
      this.$axios
        .get("/products?page=" + this.page)
        .then((resp) => {
          console.log(resp);
          if (resp.data.success ==true &&  resp.data.sub_categories.data.length > 0) {
            this.page += 1;
            this.home_data = resp.data.sub_categories.data;
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch((error) => {
          this.$toastr.e(error.response.data.message);
        });
    },
  },

  components: {
    Slider,
    FeatureProduct,
    // FlashSale,
    // VueHorizontalList,
    InfiniteLoading,
    carousel,
  },
  computed: {
    only_categories() {
      return this.$store.state.categories;
    },
  },
};
</script>

<style scoped>
#content {
  background: #f7f8fa !important;
  padding-top: 0px !important;
}
.category-icon img {
  width: 75px !important;
  height: 75px;
  border-radius: 50%;
  border: 1.5px dashed;
  margin: auto;
}
.category-icon {
  height: 130px;
}
@media (max-width: 768px) {
  #content {
    margin-top: 15px;
  }
  .facebook_link_btn {
    display: none;
  }
}
</style>
