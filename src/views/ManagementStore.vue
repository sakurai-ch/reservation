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

          <!-- <div 
            v-for="reservationData in createReservationsData" 
            :key="reservationData.id"
          >
            <div class="flex">
              <div>
                <p class="sub-title">■予約 {{reservationData.num}}</p>
                <p>予約番号：{{reservationData.id}}</p>
                <p>店舗名：{{reservationData.store.store_name}}</p>
                <p>予約日：{{reservationData.date}}</p>
                <p>予約時間：{{reservationData.time}}</p>
                <p>人数：{{reservationData.num_of_users}}名</p><br>
              </div>

              <div 
                v-if="reservationData.date >= createRatingStartTime" 
                key="reservationDateTime"
                class="potition-top">
                <button 
                  @click="reservationPatch(reservationData.store_id ,reservationData.id)" 
                  class="input-box input-height43 input-box-button"
                >予約<br>変更</button>
                <br>
                <button 
                  @click="reservationDalete(reservationData.id)" 
                  class="input-box input-height43 input-box-button color-red"
                >予約<br>取消</button>
              </div>
                                       
              <div 
                v-else-if="reservationData.date < createRatingStartTime" 
                key="reservationDateTime"
                class="potition-top"
              >
                <button 
                  @click="reservationPatch(reservationData.store_id ,reservationData.id)"
                  class="input-box input-height32 input-box-button"
                >評価</button><br>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      
      <!-- <div class="store-boxes"> -->
      <div>
          <div class="flex flex-end">
            <div><p>店舗ID</p></div>
            <div class="input-box input-width243 input-width60p  input-box-readonly input-height32">
              <input 
                type="text" 
                v-model="storeData.id"
                class="input-box-input input-box-readonly input-padding"
                readonly
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>店舗名</p></div>
            <div class="input-box input-width243 input-width60p  input-box-readonly input-height32">
              <input 
                type="text" 
                v-model="storeData.store_name"
                class="input-box-input input-box-readonly input-padding"
                readonly
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>エリア</p></div>
            <div class="input-box input-width243 input-width60p  input-box-readonly input-height32">
              <input 
                type="text" 
                v-model="storeData.area.area_name"
                class="input-box-input input-box-readonly input-padding"
                readonly
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>ジャンル</p></div>
            <div class="input-box input-width243 input-width60p  input-box-readonly input-height32">
              <input 
                type="text" 
                v-model="storeData.genre.genre_name"
                class="input-box-input input-box-readonly input-padding"
                readonly
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>説明</p></div>
            <div class="input-box input-width243 input-width60p  input-box-readonly input-height32">
              <input 
                type="text" 
                v-model="storeData.description"
                class="input-box-input input-box-readonly input-padding"
                readonly
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>画像</p></div>
            <div class="input-box input-width243 input-width60p  input-box-readonly input-height32">
              <input 
                type="text" 
                v-model="storeData.image_url"
                class="input-box-input input-box-readonly input-padding"
                readonly
              >
            </div>
          </div>

          <button 
            @click="reservationPatch()"
            class="input-box input-width243 input-width60p input-box-button"
          >店舗情報変更</button>
        <!-- <div 
          v-for="storeData in storesData" 
          :key="storeData.id"
        > -->
          <!-- <StoreBox 
            v-if="storeData.user_id != null" 
            key="userFavorite"
            :storeData = "storeData"
            @favoriteDelete="favoriteDelete" 
            class="store-box"
          ></StoreBox> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import StoreBox from '../components/StoreBox.vue'
import axios from "axios";

export default {
  // components: {
    // StoreBox
  // },
  props: ["shop_id"],
  data(){
    return {
      reservationsData:"",
      storesData:"",
      storeData:"",
    };
  },
  methods: {
    // async reservationDalete(reservationId){
    //   const response = await axios.delete("https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", {
    //     params: {reservation_id: reservationId}
    //   });
    //   console.log(response);
    //   this.$router.push({path: '/done/3'});
    // },

    // reservationPatch(storeId, reservationId) {
    //   this.$router.push({ name: "Detail", params: { shop_id: storeId , reservationId: reservationId}});
    // },

    // favoriteDelete(store_id){
    //   for(let storeData of this.storesData){
    //     if(storeData.id == store_id){
    //       storeData.user_id = null;
    //     }
    //   }
    // },

    // reservationRating(reservationData, num){
    //   reservationData.rating = num;
    //   this.$forceUpdate();
    // },
  },

  computed: {
    // createReservationsData(){
    //   for(let reservationData of this.reservationsData){
    //     reservationData["num"] = this.reservationsData.findIndex(({id}) => id === reservationData.id)+1;
    //     reservationData["time"] = reservationData.time.substr(0, 5);
    //     reservationData["rating"] = 3;
    //   }
    //   return this.reservationsData;
    // },

    // createRatingStartTime(){
    //   const today = new Date();
    //   const startDateTime = today;
    //   startDateTime.setMinutes(startDateTime.getMinutes() +30);

    //   const startYear = startDateTime.getFullYear();
    //   const startMonth = ("0"+ (startDateTime.getMonth() + 1) ).slice(-2);
    //   const startDate = ("0"+ startDateTime.getDate() ).slice(-2);
    //   const startHours = ("0"+ startDateTime.getHours() ).slice(-2);
    //   const startMinutes = ("0"+ startDateTime.getMinutes() ).slice(-2);

    //   return startYear + "-" + startMonth + "-" + startDate + "-" + startHours + ":" + startMinutes;
    // },
  },

  async created(){
    // const storesDataPromise = axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/store", {
    //   params: {user_id : this.$store.state.user_id}
    // });
    // const reservationsDataPromise = axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", {
    //   params: {user_id : this.$store.state.user_id}
    // });
    // this.storesData = (await storesDataPromise).data.data;
    // this.reservationsData = (await reservationsDataPromise).data.data;

    const response = await axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + this.shop_id,{
      params: {user_id : this.$store.state.user_id}
    });
    this.storeData = response.data.data;
  }
}
</script>

<style scoped>
.my-page{
  margin-bottom: 40px;
}

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

.rating-box{
  position: relative;
}

.potition-top{
  margin-top: 18px;
  margin-bottom: auto;
}

.comment{
  font-size: 11px;
  font-weight: bold;
  color: #ffc700;
}

.rating{
  font-size: 26px;
  padding: 0;
  border:none;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  color: #ffc700;
}

.color-red{
  border-color: #ff5544;
  background-color: #ffaa99;
}

.thanks{
  width: 210px;
  height: 50px;
  top: 20px;
  position: absolute;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content:space-around;
  color: #ffc700;
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
  
  .thanks{
    width: 80vw;
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