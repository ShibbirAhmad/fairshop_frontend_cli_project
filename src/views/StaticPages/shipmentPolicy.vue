<template>
  <div class="mt-3">
    <div class="container">
      <!-- <nav aria-label="breadcrumb">
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
      </nav> -->
    </div>
    <div class="container">
      <div id="content">
        <h4>SHIPMENT POLICY</h4>
        <p>
          How the product will be delivered. We process all deliveries through:
          <br>
          • Reputed couriers
          <br>
          • Our in house delivery team
          How much are the delivery charges?
          Within Dhaka city, delivery charge is BDT 60 and outside Dhaka city it is BDT 130 and the charge will be increase according to product weight. Note: If there is any modification in delivery charge for a particular item, it will be mentioned in Product details. What is the estimated delivery time? If your shipping address is in Dhaka city, products will be delivered by next business day or within 72 hours. If it is outside Dhaka then it will take 3-5 business days.
         <br>
           <strong>Note:</strong> 
          <br>
          • Any order placed after 6 pm will be considered as order of next business day, not as same day.
          <br>
          • Business Day: Saturday to Thursday
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