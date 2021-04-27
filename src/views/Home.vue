<template>
  <div class="home">
    <div class="search">
      <div>
        エリア
        <select type="text">
          <option value=""></option>
          <option v-for="(area_data, index) in areas_data" :key="index" value=area_data.area_id>{{area_data.area_name}}</option>
        </select>
      </div>
      <div>ジャンル
        <select type="text">
          <option value=""></option>
          <option v-for="(genre_data, index) in genres_data" :key="index" value=genre_data.genre_id>{{genre_data.genre_name}}</option>
        </select></div>
      <div>店名<input type="text"></div>
      <button>検索</button>
    </div>
    <div>
      <div v-for="(store_data,index) in stores_data" :key="index">
        <StoreBox :store_data = store_data></StoreBox>
      </div>
    </div>
  </div>
</template>

<script>
import StoreBox from '../components/StoreBox.vue'
import axios from "axios";

export default {
  // name: 'Home',
  components: {
    StoreBox
  },
  data(){
    return{
      stores_data:"",
      areas_data:"",
      genres_data:"",
    }
  },
  created(){
    axios.get("http://localhost:3000/stores_data")
    .then((response) => {this.stores_data = response.data;});
    axios.get("http://localhost:3000/areas_data")
    .then((response) => {this.areas_data = response.data;});
    axios.get("http://localhost:3000/genres_data")
    .then((response) => {this.genres_data = response.data;});
  }
}
</script>

<style scoped>
.search{
  display: flex;
  justify-content: center;
}

select{
  width:100px;
}

</style>
