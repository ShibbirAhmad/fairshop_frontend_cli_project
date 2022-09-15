<template>
  <main id="content" role="main" class="height">
    <!-- Slider & Banner Section -->
    <div class="mb-4">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol
            class="breadcrumb flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble"
          >
            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
              <router-link to="/">Home </router-link>
            </li>

            <!-- <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
              <router-link
                :to="{
                  name: 'shop',
                }"
                >shop
              </router-link>
            </li> -->

            <!-- <li
              v-if="sub_sub_category.sub_sub_category"
              class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"
            >
              <router-link
                :to="{
                  name: 'categoryProducts',
                  params: { slug: $route.params.categorySlug },
                }"
              >
                {{ sub_sub_category.sub_sub_category.category.name }}
              </router-link>
            </li>

            <li
              v-if="sub_sub_category.sub_sub_category"
              class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"
            >
              <router-link
                :to="{
                  name: 'SubCategoryProduct',
                  params: {
                    category: $route.params.categorySlug,
                    slug: $route.params.SubcategorySlug,
                  },
                }"
              >
                {{ sub_sub_category.sub_sub_category.sub_category.name }}
              </router-link>
            </li>

            <li
              v-if="sub_sub_category.sub_sub_category"
              class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"
            >
              {{ sub_sub_category.sub_sub_category.name }}
            </li> -->
          </ol>
        </nav>
        <!-- <div class="row" v-if="sub_sub_category.related_sub_sub_categories">
          <div
            class="col-6 col-md-2-custome"
            v-for="(
              sub_related_category, rcdx
            ) in sub_sub_category.related_sub_sub_categories"
            :key="rcdx"
          >
            <router-link
              :to="{
                name: 'SubSubCategoryProduct',
                params: {
                  categorySlug: $route.params.categorySlug,
                  SubcategorySlug: $route.params.SubcategorySlug,
                  slug: sub_related_category.slug,
                },
              }"
            >
              <div class="box">
                <span class="box-txt">
                  {{ sub_related_category.name }}
                </span>
              </div>
            </router-link>
          </div>
        </div> -->
      </div>

      <div class="container overflow-hidden">
        <div
          class="d-flex justify-content-between border-bottom border-color-1 flex-lg-nowrap flex-wrap border-md-down-top-0 border-md-down-bottView om- mb-3 mt-2"
        >
          <!-- <h3
            v-if="sub_sub_category.sub_sub_category"
            class="section-title section-title__full mb-0 pb-2 font-size-22"
          >
            {{ sub_sub_category.sub_sub_category.name }}
          </h3> -->
        </div>

        <products :products="products"></products>
      </div>

      <InfiniteLoading @infinite="allProducts" spinner="waveDots" @distange="1">
        <div slot="no-more"></div>
      </InfiniteLoading>
    </div>
  </main>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import products from "../components/products";
import Products from "../components/products.vue";
export default {
  // name: "sub_category",
  created() {
    // this.$store.dispatch("sub_sub_category", this.$route.params);
  },
  data() {
    return {
      products: [],
      page: 1,
    };
  },
  methods: {
    allProducts($state) {
      this.$axios
        .get(
          "sub/sub/category/wise/product/" +
            this.$route.params.slug +
            "?page=" +
            this.page,
          {
            // headers: this.$apiHeader,
            params: {
              category_slug: this.$route.params.categorySlug,
            },
          }
        )
        .then((resp) => {
          console.log(resp);
          if (resp.data.products.data.length) {
            this.page += 1;
            this.products.push(...resp.data.products.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
  components: {
    InfiniteLoading,
    products,
    Products,
  },
  computed: {
    // sub_sub_category() {
    //   return this.$store.state.sub_sub_category;
    // },
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