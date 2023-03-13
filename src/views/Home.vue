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
          :responsive="{
            0: { items: 3 },
            450: { items: 4 },
            600: { items: 5 },
            1000: { items: 6 },
            1400: { items: 8 },
          }"
        >
          <div
            class="category-icon"
            v-for="(cat, c_index) in only_categories"
            :key="c_index"
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

      <!-- category wise product -->
      <div
        v-if="landing_sub_categories.length > 0"
        class="__category_wise_product"
      >
        <div
          class="row category-sec"
          v-for="(item, ctx) in landing_sub_categories"
          :key="ctx"
        >
          <!-- category title and sub menu -->
          <div class="col-lg-12">
            <div class="category-heading">
              <h3 class="section-title section-title__full mb-0 pb-2 font-size-22">{{ item.name }}</h3>
              <ul
                class="landing_sub_c_list"
                :id="'landing_sub_category_' + item.id"
                v-if="item.sub_sub_category.length > 0"
              >
                <li
                  v-for="(sub_sub_c, sbx) in item.sub_sub_category"
                  :key="sbx"
                  style="cursor:pointer;"
                >
         
                  <router-link
                    v-if="sbx < 7"
                    :to="{
                      name: 'SubSubCategoryProduct',
                      params: {
                        category: item.category.slug,
                        subcategory: item.slug,
                        slug: sub_sub_c.slug,
                      },
                    }"
                  >
                    {{ sub_sub_c.name }}
                  </router-link>
                </li>
              </ul>
              <button
                @click="toggleSubCategories(item.id)"
                class="btn btn-sm landing_sub_c "
              >
                <i class="fa fa-list"></i>
              </button>
              <router-link
                class="d-block view_all_category_link"
                :to="{
                  name: 'SubCategoryProduct',
                  params: { category: item.category.slug, slug: item.slug },
                }"
                >VIEW ALL
              </router-link>
            </div>
          </div>

          <!-- product container -->
          <div class="col-lg-12 col-xl-12 col-md-12">
            <div class="row">
              <div class="col-lg-12 col-md-12" style="justify-content: space-between;">
                <div class="row" style="justify-content: space-between;" v-if="item.products.length > 0">
                  <!-- product card -->
                  <div
                    class="width-20"
                    v-for="product in item.products"
                    :key="product.id"
                  >
                    <!-- product card start -->
                    <div class="__product_card">
                      <!-- product Image -->
                      <div class="__product_card_img">
                        <router-link
                          :to="{
                            name: 'single_product',
                            params: { slug: product.slug },
                          }"
                          class="d-block text-center"
                        >
                          <img
                            :alt="product.thumbnail_img"
                            :src="$imageBaseUrl2 + product.thumbnail_img"
                          />
                        </router-link>
                      </div>
                      <!-- product name and details -->
                      <div class="__product_details">
                        <!-- product name -->
                        <router-link
                          :to="{
                            name: 'single_product',
                            params: { slug: product.slug },
                          }"
                          class="d-block"
                        >
                          <h4>
                            {{ product.name.substring(0, 18) }}
                            <span v-if="product.name.length > 18">.. </span>
                          </h4>
                        </router-link>
                        <!-- product price -->
                        <p class="price">
                          <span
                            ><del>৳{{ product.price }}</del></span
                          >
                          ৳{{ product.sale_price }}
                        </p>
                      </div>
                      <!-- order Now Button -->
                      <div class="__product_order_btn">
                        <router-link
                          :to="{
                            name: 'single_product',
                            params: { slug: product.slug },
                          }"
                          class="d-block text-center"
                        >
                          <button>Order Now</button>
                        </router-link>
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
      landing_sub_categories: [],
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
        .get("/landing/category/wise/products?page=" + this.page)
        .then((resp) => {
          // console.log(resp);
          if (
            resp.data.success == true &&
            resp.data.sub_categories.data.length > 0
          ) {
            this.page += 1;
            this.landing_sub_categories.push(...resp.data.sub_categories.data);
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
  width: 100px !important;
  height: 100px;
  border: 1.5px dashed;
  margin: auto;
}
.category-icon {
  height: 142px;
}
@media (max-width: 768px) {
  #content {
    margin-top: 4px;
  }
  .facebook_link_btn {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .category-icon img {
    width: 80px !important;
    height: 80px;
    border: 1.5px dashed;
    margin: auto;
  }
  .category-icon {
    height: 130px;
  }
}
</style>
