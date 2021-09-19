<template>
 

  <div class="thumbnail __user_sidebar">
    <div class="card mycard">
      <div class="text-center mt-7">
        <img
          @click="user_file_show =true"
          class="card-img-top"
          :src="
            user.image
              ? $imageBaseUrl + user.image
              : $imageBaseUrl + 'images/img_avatar.png'
          "
          alt="Profile Image"
          style="width: 50%; border-radius: 50%; cursor: pointer"
          max-height="300px"
          id="__user_img_preview"
        />
        <div class="user_input _file" v-if="user_file_show">
          <label for="__user_img">Browse</label>
          <label class="__update_img" @click.prevent="saveImage">Update</label>
        </div>
        <input
          @change="uploadImage"
          type="file"
          id="__user_img"
          style="display: none"
        />
        <h5 class="mt-2 mb-0">
          {{ user.name }}
          <img src="https://chahida.live/icon/verified-icon.jpg" width="20px" />
        </h5>

        <p class="text-gray-5 mb-0">{{ user.mobile_no }}</p>
        <span class="badge badge-pill badge-success mt-2 font-size-15 mb-5"
          >৳ 0.00</span
        >
      </div>
      <ul class="list-unstyled mb-0 view-all mb-4">
        <li style="padding: 5px">
          <router-link :to="{ name: 'profile' }">
            <i class="far fa-user mr-2 ml-4"></i> My Information
          </router-link>
        </li>

        <li style="padding: 5px">
          <router-link :to="{ name: 'order' }">
            <i class="fas fa-list-ul mr-2 ml-4"></i> Order List
          </router-link>
        </li>
        <li style="padding: 5px">
          <a class="" href="#">
            <i class="fas fa-exchange-alt ml-4"></i> &nbsp; Transaction
          </a>
        </li>

        <li style="padding: 5px">
          <a @click.prevent="logout" href="#">
            <i class="fas fa-power-off mr-2 ml-4"></i> Log Out
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.user_input._file label {
  /* border: #2783c2; */
  padding: 10px 25px;
  color: #000;
  border: 2px solid #2783c2;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.user_input._file {
  margin-top: 20px;
}
label.__update_img {
  background: #2783c2;
  color: #fff !important;
}
</style>
<script>
import Vue from "vue";
import { Form } from "vform";
import ObjectToFD from "vue-object-to-formdata";
Vue.use(ObjectToFD);
export default {
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      user_id: "",

      form: new Form({
        image: "",
      }),
      loading: true,
      user_file_show:false
    };
  },
  methods: {
  

    uploadImage(e) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        let img = new Image();
        img.onload = () => {
          document
            .getElementById("__user_img_preview")
            .setAttribute("src", evt.target.result);
          this.form.image = evt.target.result;
         // this.saveImage();
        };
        img.src = evt.target.result;
      };
    },
    saveImage() {
      this.form.post("add/user/profile/image/" + this.user.id).then((resp) => {
       // console.log(resp);
        if (resp.data.status == "SUCCESS") {
          this.user_file_show=false;
          this.$toast.open({
            message: resp.data.message,
            type: "success",
            position: "bottom",
            duration: 4000,
          });
          this.getUserInfo();
        }
      });
    },
    logout() {
      localStorage.removeItem("user_token");

      this.$router.push({ name: "login" });
      location.reload();
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>