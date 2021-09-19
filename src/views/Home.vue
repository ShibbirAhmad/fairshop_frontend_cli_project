<template>
  <main id="content" role="main" class="height">
    <Slider />
    <div class="container">
      <!-- <div class="browse-by-category">browse by category</div> -->

      <div class="category-icon-box">
         <carousel

            :nav="false"
            :autoplay="true"
            :autoplayTimeout="2000"
            v-if="only_categories.length>0"
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
            <img :src="$imageBaseUrl2 + cat.icon_image" alt="men_items" />
            <p>{{ cat.name }}</p>
          </router-link>
        </div>
         </carousel>
      </div>

      <FeatureProduct />
      <!-- start feature product setion  -->

      <!-- end feature product setion  -->

      <!-- start flash deals here -->
      <FlashSale />
      <!-- end flash deals here -->

      <!-- start trending products here  -->

      <div v-if="categories.length > 0" class="__category_wise_product">
        <div class="row category-sec" v-for="(category, ctx) in categories" :key="ctx">
          <div class="col-lg-12">
            <div class="category-heading">
              <h3>{{ category.name }}</h3>
              <router-link
                class="d-block viewallcatlink"
                :to="{
                  name: 'categoryProducts',
                  params: { slug: category.slug },
                }"
                >VIEW ALL<i class="ec ec-arrow-right-categproes"></i
              ></router-link>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="row">
              <!-- <div class="col-lg-2">
                <ul
                  class="__category_list_sidebar"
                  v-if="category.sub_categories.length > 0"
                >
                  <li
                    class="trending_sub_c_li"
                    v-for="(sub_category, sbx) in category.sub_categories"
                    :key="sbx"
                  >
                    <router-link
                      :to="{
                        name: 'SubCategoryProduct',
                        params: {
                          categortSlug: category.slug,
                          slug: sub_category.slug,
                        },
                      }"
                    >
                      {{ sub_category.name }}
                      <i class="ec ec-arrow-right-categproes"></i>
                    </router-link>
                  </li>
                </ul>
              </div> -->
              <div class="col-lg-12 col-md-12">
                <div class="row" v-if="category.products.length > 0">
                  <div
                    class="width-20"
                    v-for="product in category.products"
                    :key="product.id"
                  >
                    <div class="__product_card">
                      <div class="__product_card_img">
                        <router-link
                          :to="{
                            name: 'single_product',
                            params: { slug: product.slug },
                          }"
                          class="d-block text-center"
                        >
                          <img
                            :alt="product.thumnail"
                            :src="$imageBaseUrl2 + product.thumnail"
                          />
                        </router-link>
                      </div>
                      <div class="__product_details">
                         <router-link
                          :to="{
                            name: 'single_product',
                            params: { slug: product.slug },
                          }"
                          class="d-block text-center"
                        >
                        <h4>
                          {{ product.name }}
                          </h4>
                          </router-link>
                        <p class="price">
                          <span
                            >৳<del>{{ product.regular_price }}</del></span
                          >
                          ৳{{ product.discount_price }}
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
        @infinite="getCategoryProdductS"
      >
        <div slot="no-more"></div>
      </InfiniteLoading>
    </div>
  </main>
</template>
<script>
import Slider from "../components/Slider";
import FeatureProduct from "../components/FeatureProduct";
import FlashSale from "../components/FlashSale";
// import VueHorizontalList from "vue-horizontal-list";
import InfiniteLoading from "vue-infinite-loading";
import carousel from "vue-owl-carousel";

export default {
  name: "welcome",

  data() {
    return {
      categories: [],
      // response_options: {
      //   responsive: [
      //     { end: 576, size: 1 },
      //     { start: 576, end: 768, size: 2 },
      //     { start: 768, end: 992, size: 10 },
      //     { start: 992, end: 1200, size: 10 },
      //     { start: 1200, size: 10 },
      //   ],
      //   list: {
      //     windowed: 1200,
      //     padding: 10,
      //   },
      //   position: {
      //     start: 1,
      //   },
      //   autoplay: { play: true, repeat: true, speed: 3000 },
      // },
      page: 1,
    };
  },

  methods: {
    getCategoryProdductS($state) {
      this.$axios
        .get("category/wise/all/products?page=" + this.page, {
          headers: this.$apiHeader,
        })
        .then((resp) => {
         // console.log(resp);
          if (resp.data.data.length) {
            this.page += 1;
            this.categories.push(...resp.data.data);

            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  components: {
    Slider,
    FeatureProduct,
    FlashSale,
    // VueHorizontalList,
    InfiniteLoading,
    carousel
  },
  computed: {
    only_categories() {
      return this.$store.state.categories;
    },
  },
};
</script>


