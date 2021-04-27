<template>
  <div class="detail">
    <div class="top">
      <span>{{store_data.store_name}}</span>
      <div>
        <span>{{store_data.area_name}}/{{store_data.genre_name}}</span>
        <button>星</button>
      </div>
    </div>
    <div class="bottom">
      <div class="left-side">
        <p>{{store_data.description}}</p>
        <div v-if="$store.state.auth">
          <div>予約日<input type="text" v-model="date"></div>
          <div>予約時間<input type="text" v-model="time"></div>
          <div>人数<input type="text" v-model="num_of_users"></div>
          <button @click="reservation_post()">予約</button>
        </div>
        <div v-else>
          <button @click="$router.push({path: '/login'})">予約（ログイン）</button>
        </div>
      </div>
      <div class="right-side">
        <img :src="store_data.image_url" alt="" class="img">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  props: ["shop_id"],
  data(){
    return {
      reservation_data:{
        user_id: this.store.state.user_id,
        store_id: this.shop_id,
        date: "",
        time: "",
        num_of_users:""
      },
      store_data:"",
    };
  },
  methods: {
    reservation_post(){
      axios.post("", this.reservation_data);
      router.push({path: '/done'});
    }
  },
  created(){
    axios.get("http://localhost:3000/store_data_" + this.shop_id)
    .then((response) => {this.store_data = response.data;});
  }
}
</script>

<style scoped>
.top{
  display: flex;
  justify-content: space-between;
}
.bottom{
  display: flex;
}
.left-side{
  width: 40%;
}
.right-side{
  width: 60%;
}
img{
  width: 100%;
}
</style>