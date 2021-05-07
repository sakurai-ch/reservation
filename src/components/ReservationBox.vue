<template>
  <div class="left-side">
    <div 
      v-if="$store.state.auth"
      key="reservationInput"
      class="reservation"
    >
      <div 
        v-if="reservationData.reservation_id != '' "
        key="reservationUpdate" 
        class="flex flex-end"
      >
        <div><p>予約番号</p></div>
        <div class="input-box input-width243 input-width60p  input-box-readonly">
          <input 
            type="text" 
            v-model="reservationData.reservation_id"
            class="input-box-input input-box-readonly input-padding"
            readonly
          >
        </div>
      </div>
      <div class="flex flex-end">
        <div><p>予約日</p></div>
        <div class="input-box input-width243 input-width60p">
          <input 
            type="date" 
            :min= createSelectableMinDate 
            :max= createSelectableMaxDate 
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
            <option 
              v-for="select in createSelectableTime" 
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
            class="input-box-input input-padding"
          >
        </div>
      </div>
      <button 
        v-if="reservationData.reservation_id != '' "
        key="reservationUpdate" 
        @click="reservationPatch()"
        class="input-box input-width243 input-width60p input-box-button"
      >予約変更</button>
      <button 
        v-else 
        key="reservationUpdate" 
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
</template>

<script>
import axios from "axios";
import StoreFavorite from '../components/StoreFavorite.vue';
import router from "../router/index";

export default {
  components: {
    StoreFavorite
  },
  props: ["shop_id", "reservation_data"],
  data(){
    return {
      reservationData:{
        reservation_id: "",
        user_id: this.$store.state.user_id,
        store_id: this.shop_id,
        date: "",
        time: "",
        num_of_users: "1"
      },
      storeData:{
        area:{area_name:""},
        genre:{}
      },
      minTime:10.5,
      maxTime:17,
      timeInterval:0.5,
      maxOfUsers:20
    };
  },
  methods: {
    async reservationPost(){
      const response = await axios.post("https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", this.reservationData);
      console.log(response);
      router.push({path: '/done'});
    },

    async reservationPatch(){
      const response = await axios.patch("https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", this.reservationData);
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
      const yearView = argDate.getFullYear();
      const monthView = ("0"+(argDate.getMonth() + 1)).slice(-2);
      const dateView = ("0"+argDate.getDate()).slice(-2);
      return yearView + "-" + monthView + "-" + dateView;
    },

    timeFormat(arghour){
        const hourView = ("0"+ Math.floor(arghour) ).slice(-2);
        const minute = (arghour - Math.floor(arghour)) * 60;
        const minuteView = ("0"+ minute ).slice(-2);
        return hourView + ":" + minuteView;
    },
  },
  
  computed: {
    createSelectableMinDate(){
      const today = new Date();
      const tomorrow = today;
      tomorrow.setDate(tomorrow.getDate() +1);
      return this.dateFormat(tomorrow);
    },

    createSelectableMaxDate(){
      const nextMonthDate = new Date();
      nextMonthDate.setMonth(nextMonthDate.getMonth() +1);
      return this.dateFormat(nextMonthDate);
    },

    createSelectableTime(){
      let num = 0;
      let hour = this.minTime;
      let selectableTime = [];
      while(hour <= this.maxTime){
        selectableTime[num] = {
          num: num, 
          time: this.timeFormat(hour)
        };
        num++;
        hour += this.timeInterval;
      }
      return selectableTime;
    },

    createAreaName(){
      return (this.storeData.area.area_name).substr(0, (this.storeData.area.area_name.length)-1);
    },

    createGenreName(){
      return this.storeData.genre.genre_name;
    },
  },

  async created(){
    const response = await axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + this.shop_id,{
      params: {user_id : this.$store.state.user_id}
    });
    this.storeData = response.data.data;

    if(this.reservation_data == null){
      this.reservationData.date = this.createSelectableMinDate;
      this.reservationData.time = this.timeFormat(this.minTime);
    }else{
      this.reservationData.reservation_id = this.reservation_data.reservation_id;
      this.reservationData.date = this.reservation_data.date;
      this.reservationData.time = this.reservation_data.time;
      this.reservationData.num_of_users = this.reservation_data.num_of_users;
    }
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

input[type=number]::-webkit-inner-spin-button {
    opacity: 1
}


.input-box-readonly{
  border-color: #c4c4c4;
  cursor: not-allowed;
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