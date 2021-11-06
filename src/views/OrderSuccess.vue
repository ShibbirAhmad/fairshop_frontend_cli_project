<template>
 <div class="container">

</div>
</template>


<script>
export default {
  created(){
    setTimeout(()=>{
      this.showAlert();
    },1000);
  },
  methods: {
    showAlert(){
              this.$swal({
              position: 'top-center',
              icon: "success",
              title: '<strong><h2>Your order has been confirmed, Thanks</h2></strong>',
              html:'<h4> We will call you to inform about order details(at 9:00 AM to 9:00 PM)</h4>',
              confirmButtonText: `<h6><a style="color:#fff;padding:20px 0px;" href="/">View More</a></h6>`,
              showCancelButton: true,
              cancelButtonText: `<h6><a style="color:#fff;padding:20px 0px;" href="/">Close</a></h6>`,
              cancelButtonColor: 'red',
              duration: 5000,
            });
    }
  },
}
</script>

<style>



.swal2-popup {
    display: none;
    position: relative;
    box-sizing: border-box;
    grid-template-columns: minmax(0,100%);
    width: 50em !important;
    max-width: 100%;
    padding: 0 0 1.25em;
    border: none;
    border-radius: 5px;
    color: #545454;
    font-family: inherit;
    font-size: 1rem;
}



</style>