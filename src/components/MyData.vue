<template>
  <div class="my-data">
    <p class="sub-title">■名前</p>
    <p>{{$store.state.user_name}}</p><br>
    <p class="sub-title">■メールアドレス</p>
    <p>{{$store.state.email}}</p><br>

    <div 
      v-for="(storeData, index) in storesData" 
      :key="storeData.id"
    >
      <div class="flex">
        <div>
          <p class="sub-title">■管理店舗 {{index+1}}</p>
          <p>番号：{{storeData.store.id}}</p>
          <p>店名：{{storeData.store.store_name}}</p>
        </div>

        <div 
          class="potition-top">
          <button 
            @click="pageTransition(storeData.store.id)"
            class="input-box input-height43 input-box-button"
          >情報<br>変更</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      storesData:{},
    };
  },
  methods:{
    pageTransition(nextShopId){
      // this.$emit("getStoreData", nextShopId);
      this.$router.push({path: '/management-store/' + nextShopId}, () => {});
      this.$emit("getStoreData", nextShopId);
    },
  },

  async created(){
    const responseStores = await axios.get(
      "https://mysterious-fjord-19119.herokuapp.com/api/v1/manager",
      { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
    );
    this.storesData = responseStores.data.data;
    // console.log(responseStores);
  }
    
}
</script>

<style scoped>
.my-data{
  border: solid 2px #c4c4c4;
  border-radius: 10px;
  margin: 10px 5px 0 5px;
  padding: 15px 15px 5px 20px;
  text-align: start;
}

.sub-title{
  margin-left: -5px;
  font-weight: bold;
}

.potition-top{
  margin-top: 18px;
  margin-bottom: auto;
}

.input-box-button{
  background-color: #d4a701;
  border-color: #775d00;
}
</style>