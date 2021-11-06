import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/us',
    name: 'About',
    // route level code-splittingNfoun
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */'../views/StaticPages/About')
  },

  {
    path: '/return/policy',
    name: 'ReturnPolicy',
    // route level code-splittingNfoun
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */'../views/StaticPages/ReturnPolicy')
  },

  {
    path: '/privacy/policy',
    name: 'PrivacyPolicy',
    // route level code-splittingNfoun
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */'../views/StaticPages/PrivacyPolicy')
  },

  {
    path: '/faq',
    name: 'FAQ',
    // route level code-splittingNfoun
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */'../views/StaticPages/Faq')
  },

  {
    path: '/contact/us',
    name: 'contact-us',
    component: () => import(/* webpackChunkName: "about" */'../views/StaticPages/ContactUs.vue')
  },

   {
    path: '/how/to/buy',
    name: 'how_to_buy',
    component: () => import(/* webpackChunkName: "how_to_buy" */'../views/StaticPages/howToBuy.vue')
  },

 {
    path: '/shipment',
    name: 'shipment_policy',
    component: () => import(/* webpackChunkName: "shipment_policy" */'../views/StaticPages/shipmentPolicy.vue')
  },

 {
    path: 'privacy/policy',
    name: 'privacy_policy',
    component: () => import(/* webpackChunkName: "privacy_policy" */'../views/StaticPages/PrivacyPolicy.vue')
  },
  {
    path: '/campaign',
    name: 'campaign',
    component: () => import(/* webpackChunkName: "campaign" */'../views/Campaign.vue')
  },



  {
    path: '/campaign',
    name: 'campaign',
    component: () => import(/* webpackChunkName: "campaign" */'../views/Campaign.vue')
  },
  {
    path: '/campaign/:slug',
    name: 'singleCampaign',
    component: () => import(/* webpackChunkName: "campaign" */'../views/singleCampaign.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */'../views/Shop.vue')
  },

  {
    path: '/search/:search',
    name: 'search',
    component: () => import(/* webpackChunkName: "shop" */'../views/SearchProducts.vue')
  },

  {
    path: '/shop/:slug',
    name: 'categoryProducts',
    component: () => import(/* webpackChunkName: "shop" */'../views/categoryProduct.vue')
  },

  {
    path: '/shop/:categortSlug/:slug',
    name: 'SubCategoryProduct',
    component: () => import(/* webpackChunkName: "shop" */'../views/SubCategoryProduct.vue')
  },

  {
    path: '/shop/:categortSlug/:SubCategortSlug/:slug',
    name: 'SubSubCategoryProduct',
    component: () => import(/* webpackChunkName: "shop" */'../views/SubSubCategoryProduct.vue')
  },

  {
    path: '/product/:slug',
    name: 'single_product',
    component: () => import(/* webpackChunkName: "single_product" */'../views/SingleProduct.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    meta: {
      // requiresAuthUser: true,
      title: 'Checkout'
    },
    component: () => import(/* webpackChunkName: "checkout" */'../views/Checkout.vue')
  },
      {
        path: '/user/checkout/success',
        component: () =>  import( /* webpackChunkName: "order_success" */ '../views/OrderSuccess.vue'),
        name: 'order_success',
        meta: {
            title: 'order success',
            // requiresAuthUser: true,
        }
    },

  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */'../views/Cart.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'../views/user/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */'../views/user/Register.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      requiresAuthUser: true,
      title: 'profile'
    },
    component: () => import(/* webpackChunkName: "profile" */'../views/user/Profile.vue')
  },
  {
    path: '/password',
    name: 'password',
    meta: {
      requiresAuthUser: true,
      title: 'password'
    },
    component: () => import(/* webpackChunkName: "password" */'../views/user/Password.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      requiresAuthUser: true,
      title: 'order'
    },
    component: () => import(/* webpackChunkName: "order" */'../views/user/Order.vue')
  },
  {
    path: '/order-details/:id',
    name: 'order_details',
    meta: {
      requiresAuthUser: true,
      title: 'order details'
    },
    component: () => import(/* webpackChunkName: "order_details" */'../views/user/OrderDetails.vue')
  },
  {
    path: '/payment-preview/:id',
    name: 'payment_preview',
    meta: {
      requiresAuthUser: true,
      title: 'payment preview'
    },
    component: () => import(/* webpackChunkName: "payment_preview" */'../views/user/paymentPreview.vue')
  },

  {
    path: '/blog',
    name: 'blog',
    meta: {
      title: 'blog'
    },
    component: () => import(/* webpackChunkName: "blog" */'../views/StaticPages/c_soon.vue')
  },

  {
    path: '/reseller',
    name: 'reseller',
    meta: {
      title: 'reseller'
    },
    component: () => import(/* webpackChunkName: "reseller" */'../views/c_soon.vue')
  },


  {
    path: '/gift/card',
    name: 'giftcard',
    meta: {
      title: 'Gift Card'
    },
    component: () => import(/* webpackChunkName: "reseller" */'../views/c_soon.vue')
  },




  {
    path: '*',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "notFound" */'../views/StaticPages/nFound.vue')

  },


]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthUser)) {

    if (localStorage.getItem('user_token')) {
      next();
      return;
    }
    next('/login')

  } else {
    next()
  }
});


export default router
