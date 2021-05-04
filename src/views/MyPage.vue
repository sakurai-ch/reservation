<template>
  <div class="my-page">
    <div><p class="title">マイページ</p></div>
    <div class="flex no-flex top">
      <div class="left-side">
        <div class="my-data">
          <p class="sub-title">■名前</p>
          <p>{{$store.state.user_name}}</p><br>
          <p class="sub-title">■メールアドレス</p>
          <p>{{$store.state.email}}</p><br>
          <div 
            v-for="reservationData in reservationsData" 
            :key="reservationData.id"
          >
            <div class="flex">
              <div>
                <p class="sub-title">■予約 {{reservationNum(reservationData.id)}}</p>
                <p>予約番号：{{reservationData.id}}</p>
                <p>店舗名：{{reservationData.store.store_name}}</p>
                <p>予約日：{{reservationData.date}}</p>
                <p>予約時間：{{reservationTime(reservationData.time)}}</p>
                <p>人数：{{reservationData.num_of_users}}名</p><br>
              </div>
              <div class="potition-top">
                <button 
                  @click="reservationDalete()" 
                  class="input-box input-height32 input-box-button"
                >取消</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="store-boxes">
        <div 
          v-for="storeData in storesData" 
          :key="storeData.id"
        >
          <StoreBox 
            v-if="storeData.user_id != null" 
            key="userFavorite"
            :storeData = "storeData"
            @favoriteDelete="favoriteDelete" 
            class="store-box"
          ></StoreBox>
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
      reservationsData:"",
      storesData:"",
    };
  },
  methods: {
    async reservationDalete(){
      const response = await axios.delete("https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", {
        params: {reservation_id: this.reservationData.id}
      });
      console.log(response);
      this.$forceUpdate();
    },

    favoriteDelete(store_id){
      for(let storeData of this.storesData){
        if(storeData.id == store_id){
          storeData.user_id = null;
        }
      }
    },

    reservationNum(reservationId){
      return this.reservationsData.findIndex(({id}) => id === reservationId)+1
    },

    reservationTime(reservationTime){
      return reservationTime.substr(0, 5);
    }
  },
  async created(){
    const storesDataPromise = axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/store", {
      params: {user_id : this.$store.state.user_id}
    });
    const reservationDataPromise = axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", {
      params: {user_id : this.$store.state.user_id}
    });
    this.storesData = (await storesDataPromise).data.data;
    this.reservationsData = (await reservationDataPromise).data.data;
  }
}
</script>

<style scoped>
.title{
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 20px;
}


.top{
  align-items:initial;
}

.left-side{
  box-sizing: border-box;
  width: 25%;
}

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
  margin-bottom: auto;
}

.store-boxes{
  width: 75%;
  display: flex;
  flex-wrap:wrap;
  margin-bottom: auto;
} 

.store-box{
  margin: 10px;

} 

@media screen and (max-width : 480px) {
  .no-flex{
    display: initial;
    align-items: initial;
    justify-content: initial;
  }

  .left-side{
    width: 93%;
    margin: 0 auto;
  }

  .store-boxes{
    width: 100%;
    margin-top: 20px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .store-boxes div{
    width: 95%;
  }

  .store-box{
    margin: 8px auto;
  }
}

</style>