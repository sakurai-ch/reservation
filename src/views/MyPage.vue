<template>
  <div>
    <p>マイページ</p>
    <div class="content">
      <div class="left-side">
        <p>■名前</p>
        <p>{{$store.state.user_name}}</p>
        <p>■メールアドレス</p>
        <p>{{$store.state.email}}</p>
        <div v-for="(reservation_data, index) in reservations_data" :key="index">
          <span>■予約{{reservation_data.reservation_id}}</span>
          <button @click="reservation_dalete()">取消</button>
          <p>店名：{{reservation_data.store_id}}</p>
          <p>予約日：{{reservation_data.date}}</p>
          <p>予約時間：{{reservation_data.time}}</p>
          <p>人数：{{reservation_data.num_of_users}}</p>
        </div>
      </div>
      <div class="right-side">
        <div v-for="(store_data,index) in stores_data" :key="index">
          <StoreBox v-if="store_data.user_favorite" :store_data = store_data></StoreBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StoreBox from '../components/StoreBox.vue'
import axios from "axios";

export default {
  components: {
    StoreBox
  },
  data(){
    return {
      reservations_data:"",
      stores_data:"",
    };
  },
  methods: {
    reservation_dalete(){
      axios.delete("", {
        reservation_id: this.reservation_data.reservation_id
      });
    }
  },
  created(){
    axios.get("http://localhost:3000/reservations_data_" + this.$store.state.user_id)
    .then((response) => {this.reservations_data = response.data;});

    axios.get("http://localhost:3000/stores_data")
    .then((response) => {this.stores_data = response.data;});
  }
}
</script>

<style scoped>
.content{
  display: flex;
}

.left-side{
  width: 200px;
  border: solid 1px;
}
.right-side{
  display: flex;
}
</style>