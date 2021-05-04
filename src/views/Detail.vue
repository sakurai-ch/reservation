<template>
  <div class="detail">
    <div class="top flex">
      <p class="store-name">{{storeData.store_name}}</p>
      <div class="flex">
        <p>{{cutAreaName()}}／{{genreName()}}</p>
        <StoreFavorite 
          :storeData = "storeData" 
          @favoriteDelete="favoriteDelete" 
          @favoritePost="favoritePost" 
        ></StoreFavorite>
      </div>
    </div>
    <div class="bottom no-flex">
      <div class="left-side">
        <p class="description">{{storeData.description}}</p>
        <div 
          v-if="$store.state.auth"
          key="reservationInput"
          class="reservation"
        >
          <div class="flex flex-end">
            <div><p>予約日</p></div>
            <div class="input-box input-width243 input-width60p">
              <input 
                type="date" 
                :min="minDate" 
                :max="maxDate" 
                v-model="reservationData.date"
                class="input-box-input"
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>予約時間</p></div>
            <div class="input-box input-width243 input-width60p">
              <select 
                v-model="reservationData.time"
                class="input-box-select"
              >
                <option></option>
                <option 
                  v-for="select in selectableTime" 
                  :key="select.num" 
                >{{select.time}}</option>
              </select>
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>人数</p></div>
            <div class="input-box input-width243 input-width60p">
              <input 
                type="number" 
                :min="1" 
                :max="maxOfUsers" 
                v-model="reservationData.num_of_users"
                class="input-box-input"
              >
            </div>
          </div>
          <button 
            @click="reservationPost()"
            class="input-box input-width243 input-width60p input-box-button"
          >予約</button>
        </div>
        <div 
          v-else
          key="reservationInput"
          class="reservation"
        >
          <button 
            @click="$router.push({path: '/login'})"
            class="input-box input-width243 input-width60p input-box-button"
          >予約（ログイン）</button>
        </div>
      </div>
      <div class="right-side">
        <img 
          :src="storeData.image_url" 
          alt="" 
          class="img"
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StoreFavorite from '../components/StoreFavorite.vue';
import router from "../router/index";

export default {
  components: {
    StoreFavorite
  },
  // props: {
    //   shop_id: Number,
  // },
  props: ["shop_id"],
  data(){
    return {
      reservationData:{
        user_id: this.$store.state.user_id,
        store_id: this.shop_id,
        date: "",
        time: "",
        num_of_users:""
      },
      storeData:{},
      minDate:"",
      maxDate:"",
      minTime:10.5,
      maxTime:17,
      timeInterval:0.5,
      selectableTime:[],
      maxOfUsers:20
    };
  },
  methods: {
    async reservationPost(){
      const response = await axios.post("https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", this.reservationData);
      console.log(response);
      router.push({path: '/done'});
    },

    favoriteDelete(store_id){
      if(this.storeData.id == store_id){
        this.storeData.user_id = null;
      }
    },
    
    favoritePost(store_id){
      if(this.storeData.id == store_id){
        this.storeData.user_id = this.$store.state.user_id;
      }
    },

    dateFormat(argDate){
      const year = argDate.getFullYear();
      const month = ("0"+(argDate.getMonth() + 1)).slice(-2);
      const date = ("0"+argDate.getDate()).slice(-2);
      return year + "-" + month + "-" + date;
    },

    createSelectableDate(){
      const today = new Date();
      this.minDate = this.dateFormat(today);
      
      const nextMonthDate = today;
      nextMonthDate.setMonth(nextMonthDate.getMonth() +1);
      this.maxDate = this.dateFormat(nextMonthDate);
    },

    createSelectableTime(){
      let num = 0;
      let hour = this.minTime;
      while(hour <= this.maxTime){
        const hourView = ("0"+ Math.floor(hour) ).slice(-2);
        const minute = (hour - Math.floor(hour)) * 60;
        const minuteView = ("0"+ minute ).slice(-2);

        let array = {};
        array.num = num;
        array.time = hourView + ":" + minuteView;
        this.selectableTime[num] = array;

        num++;
        hour += this.timeInterval;
      }
    },

    cutAreaName(){
      return (this.storeData.area.area_name).substr(0, (this.storeData.area.area_name.length)-1);
    },

    genreName(){
      return this.storeData.genre.genre_name;
    },
  },
  async created(){
    const response = await axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + this.shop_id,{
      params: {user_id : this.$store.state.user_id}
    });
    this.storeData = response.data.data;

    this.createSelectableDate();
    this.createSelectableTime();
  }
}
</script>

<style scoped>
.top{
  margin-top: 20px;
  margin-bottom: 10px;
}

.store-name{
  font-size: 36px;
  font-weight: bold;
}

.bottom{
  display: flex;
}

.left-side{
  box-sizing: border-box;
  width: 40%;
  padding-right: 25px;
}

.description{
  text-align: start;
  line-height: 24px;
}

.reservation{
  margin-top: 50px;
  text-align: right;
}

.right-side{
  width: 60%;
}

img{
  width: 100%;
}

@media screen and (max-width : 480px) {
  .detail{
    width: 90%;
  }

  .no-flex{
    display: initial;
    align-items: initial;
    justify-content: initial;
  }

  .left-side{
    width: 100%;
    padding-right: 0;
  }

  .input-width60p{
    width: 60%;
  }

  .right-side{
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
  }

}
</style>