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
            <a href="#">return-policy</a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="container">
      <div id="content">

        <p>
          পণ্য ও সার্ভিস সম্পর্কিত কোনো অভিযোগের জন্য আমাদের কমপ্লেইন্ট টীম
          আপনাকে ফোন করবেন। এ জন্য আপনার অভিযোগটি সমাধান না হওয়া পর্যন্ত আপনাকে
          আমরা ফোনে সক্রিয় পেতে চাই। আপনার যোগাযোগে দেওয়া নম্বরটি সক্রিয় না
          থাকলে বিকল্প কোনো নম্বর সক্রিয় থাকতে হবে। রিফান্ডের জন্য আপনাকে টাকাটি
          ফেরতের মাধ্যম আমাদের জানাতে হবে। আমরা আপনার কোনো প্রকার সহযোগিতা
          <b>১৫</b> কার্যদিবসের মধ্যে ফোনে অথবা ইমেইলে না পেলে আপনার অভিযোগটি
          নিস্পত্তি বলে মনে করবো।
        </p>

        <p>আপনার - প্রশ্ন - মতামত – অভিযোগ আমাদের জানান- ফোন: 880 1762424333, ই-মেইল: support@fairshop.com.bd</p>

         <p>
             After receiving the product you will be able to accept the modified product in case of any problem of the product (eg: product broken, torn, product not working, product does not match with the photo, etc.). In that case you have to e-mail support@fairshop.com.bd within maximum 48 hours after receiving the product or you have to inform us on our hotline number 880 1762424333. Note that you have to bear the cost of courier to replace any product as a result of your change of mind and fairshop.com.bd will bear the cost of any product by fairshop.com.bd.
        </p>

        <p>Let us know your - questions - comments - complaints - phone: 880 1762424333, e-mail: support@fairshop.com.bd</p>




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