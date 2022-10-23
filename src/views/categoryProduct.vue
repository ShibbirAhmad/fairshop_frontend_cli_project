<template>
  <main id="content" role="main" class="height">
    <!-- Slider & Banner Section -->
    <div class="mb-4">
      <div class="container">
        <!-- breadcrumb -->
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

            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
              <router-link
                :to="{
                  name: 'shop',
                }"
                >shop
              </router-link>
            </li>

            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
              {{ $route.params.slug }}
            </li>
          </ol>
        </nav>
        <!-- sub category buttons -->
        <div class="row" v-if="category">
          <div
            class="col-6 col-md-2-custome"
            style="margin-left: 0px;"
            v-for="(sub_c, sub_c_idx) in category.sub_category"
            :key="sub_c_idx"
          >
            <router-link
              :to="{
                name: 'SubCategoryProduct',
                params: {
                  category: category.slug,
                  slug: sub_c.slug,
                },
              }"
            >
              <div class="box">
                <span class="box-txt">
                  <span
                    class="spinner-grow text-light spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {{ sub_c.name }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
        <!-- filter & sort By -->
        <div class="sort_filter-box">
          <!-- Sort By Price -->
          <div class="sort_filter">
            <h5>Sort By:</h5>
            <!-- sort by Price Dropdown -->
            <div>
              <select
                v-model="sort_by_price"
                @change="price_sorting_asec_desc"
                class="sort_form"
              >
                <option value="sort_by" disabled>Select Best Match</option>
                <option value="1">price less to high</option>
                <option value="2">price high to less</option>
              </select>
            </div>
          </div>
          <!-- Filter By Price -->
          <div class="sort_filter">
            <h5>Filter By Price:</h5>
            <!-- Filter By Price Input -->
            <form action="" class="min_max_form">
              <div class="price_form">
                <div class="price_input ">
                  <label for="">Min Price</label>
                  <input type="number" placeholder="Min" />
                </div>

                <div class="price_input">
                  <label for="">Max Price</label>
                  <input type="number" placeholder="Max" />
                </div>
              </div>
              <button type="submit" class="filter_btn">
                Filter <i class="fa fa-lg fa-filter"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- products -->
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
          <h3 class="section-title section-title__full mb-0 pb-2 font-size-22">
            {{ $route.params.slug }}
          </h3>
        </div>

        <products :products="products"></products>
      </div>

      <InfiniteLoading
        spinner="waveDots"
        @distange="0.5"
        @infinite="categoryProducts"
      >
        <div slot="no-more"></div>
      </InfiniteLoading>
    </div>
  </main>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import Products from "../components/products.vue";

export default {
  mounted() {
    this.$store.dispatch("category", this.$route.params.slug);
  },
  computed: {
    category() {
      return this.$store.getters.category;
    },
  },
  data() {
    return {
      sort_by_price: "sort_by",
      page: 1,
      products: [],
    };
  },

  methods: {
    // Sort By Price
    price_sorting_asec_desc() {
      this.$axios
        .get("/_public/api/sort/product/according/to/asc/desc", {
          params: {
            sort_value: this.sort_by_price,
            slug: this.$route.params.slug,
          },
        })
        .then((resp) => {
          this.products = [];
          this.products.push(...resp.data.products);
        })
        .catch();
    },


    categoryProducts($state) {
      this.$axios
        .get(
          "category/wise/product/" +
            this.$route.params.slug +
            "?page=" +
            this.page,
          {
            headers: this.$apiHeader,
          }
        )
        .then((resp) => {
          // console.log(resp)
          if (resp.data.success == true && resp.data.products.data.length) {
            this.products.push(...resp.data.products.data);
            this.page += 1;
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
    InfiniteLoading,
    Products,
  },
};
</script>

<style scoped>
.breadcrumb-item + .breadcrumb-item::before {
  display: inline-block;
  padding-right: 1rem;
  color: #333e48;
  content: ">";
  padding-right: 5px;
}
.breadcrumb-item + .breadcrumb-item a {
  background-color: transparent;
  border-radius: 0.313rem;
  margin-top: 3px;
}
.breadcrumb-item + .breadcrumb-item {
  padding-left: 5px;
}
</style>
