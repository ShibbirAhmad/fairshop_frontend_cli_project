<template>

<div class="mt-3">
    <div class="container">
	<nav aria-label="breadcrumb">
   <ol class="breadcrumb flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
 <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link to="/">Home</router-link></li>

     <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><a href="#">contact</a></li>

        </ol>

 </nav>
</div>
<div class="container">

<div id="content" style="min-height:500px;">
    <div class="col-lg-12 col-xs-12 text-center">
         <h4> Contact Us </h4>
         <p>
             Shop# 19, Muktiplaza, Mirpur-1, Dhaka-1216
         </p>
         <p>   Cell: 0176 2424 333</p>
         <p>Email: support@fairshop.com.bd</p>
    </div>
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