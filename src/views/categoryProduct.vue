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

            <li
              v-if="category.category"
              class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"
            >
              {{ category.category.name }}
            </li>
          </ol>
        </nav>
        <div class="row" v-if="category.category.sub_category">
          <div
            class="col-6 col-md-2-custome"
            v-for="(related_category, rcdx) in category.category.sub_category"
            :key="rcdx"
          >
            <router-link
              :to="{
                name: 'SubCategoryProduct',
                params: {
                  categortSlug: $route.params.slug,
                  slug: related_category.slug,
                },
              }"
            >
              <div class="box">
                <span class="box-txt">
                  {{ related_category.name }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="container overflow-hidden">
        <div
          class="d-flex justify-content-between border-bottom border-color-1 flex-lg-nowrap flex-wrap border-md-down-top-0 border-md-down-bottView om- mb-3 mt-2"
        >
          <h3
            v-if="category.category"
            class="section-title section-title__full mb-0 pb-2 font-size-22"
          >
            {{ category.category.name }}
          </h3>
        </div>

        <products :products="products"></products>
      </div>

      <InfiniteLoading
        spinner="waveDots"
        @distange="0.5"
        @infinite="allProducts"
      >
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
  created() {
    this.$store.dispatch("category", this.$route.params.slug);
  },
  data() {
    return {
      page: 1,
      products: [],
    };
  },
  methods: {
    allProducts($state) {
      this.$axios
        .get(
          "category/wise/product/" + this.$route.params.slug + "?page=" +  this.page,
          {
            headers: this.$apiHeader,
          }
        )
        .then((resp) => {
          console.log(resp)
          if (resp.data.products.data.length > 0) {
            this.products.push(...resp.data.products.data);
            this.page += 1;
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
    category() {
      return this.$store.state.category;
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