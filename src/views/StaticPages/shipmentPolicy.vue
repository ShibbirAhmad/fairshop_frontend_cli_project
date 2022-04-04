<template>
  <div class="mt-3">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol
          class="breadcrumb flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble"
        >
          <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
            <router-link to="/">Home</router-link>
          </li>

          <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
            <a href="#">shipment-policy</a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="container">
      <div id="content">

        <p>

How the product will be delivered. We process all deliveries through:
• Reputed couriers
• Our in house delivery team
How much are the delivery charges?
Within Dhaka city, delivery charge is BDT 70 and outside Dhaka city it is BDT 120. Note: If there is any modification in delivery charge for a particular item, it will be mentioned in Product details. What is the estimated delivery time? If your shipping address is in Dhaka city, products will be delivered by next business day or within 48 hours. If it is outside Dhaka then it will take 2-5 business days.
Note:
• Any order placed after 6 pm will be considered as order of next business day, not as same day.
• Business Day: Saturday to Thursday
Does fairshop.com.bd deliver internationally?
fairshop.com.bd doesn't deliver items internationally. You are more than welcome to make your purchases on our site from anywhere in the world, but you'll have to ensure the Delivery Address is within Bangladesh.

        </p>





      </div>
    </div>
  </div>
</template>

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