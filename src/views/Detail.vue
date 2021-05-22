<template>
  <div class="detail">
    <div class="top flex">
      <p class="store-name">{{storeData.store_name}}</p>
      <div class="flex">
        <p>{{createAreaName}}／{{createGenreName}}</p>
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
          v-if="!($store.state.auth)" 
          key="reservationInput"
          class="reservation"
        >
          <button 
            @click="$router.push({path: '/login'})"
            class="input-box input-width243 input-width60p input-box-button"
          >予約（ログイン）</button>
        </div>

        <div 
          v-else-if="reservationData.reservation_id == '' "
          key="reservationInput"
          class="reservation"
        >
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
            @click="reservationPost()"
            class="input-box input-width243 input-width60p input-box-button"
          >予約</button>
        </div>

        <div 
          v-else-if="reservationData.date >= createRatingStartTime"
          key="reservationInput"
          class="reservation"
        >
          <div class="flex flex-end">
            <div><p>予約番号</p></div>
            <div class="input-box input-width243 input-width60p  input-box-readonly input-height32">
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
            @click="reservationPatch()"
            class="input-box input-width243 input-width60p input-box-button"
          >予約変更</button>
        </div>

        <div 
          v-else-if="reservationData.date < createRatingStartTime"
          key="reservationInput"
          class="reservation"
        >
          <div class="flex flex-end">
            <div><p>予約番号</p></div>
            <div class="input-box input-width243 input-width60p  input-box-readonly input-height32">
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
            <div class="input-box input-width243 input-width60p input-box-readonly input-height32">
              <input 
                type="date" 
                v-model="reservationData.date"
                class="input-box-input input-box-readonly"
                readonly
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>予約時間</p></div>
            <div class="input-box input-width243 input-width60p input-box-readonly input-height32">
              <input 
                type="time" 
                v-model="reservationData.time"
                class="input-box-select input-box-readonly"
                readonly
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>人数</p></div>
            <div class="input-box input-width243 input-width60p input-box-readonly input-height32">
              <input 
                type="text" 
                v-model="reservationData.num_of_users"
                class="input-box-input input-padding input-box-readonly"
                readonly
              >
            </div>
          </div>

          <div class="flex flex-end">
            <div><p>評価</p></div>
            <div class="input-box input-width243 input-width60p flex input-star">
              <div 
                v-for="n of 5" 
                :key="n"
              >
                <button 
                  v-if="reservationData.rating >= n" 
                  key="rating"
                  class="rating" 
                  @click="reservationRating(reservationData, n-1)" 
                >★</button>
                <button 
                  v-else 
                  key="rating"
                  class="rating" 
                  @click="reservationRating(reservationData, n)" 
                >☆</button>
              </div>
            </div>
          </div>
          
          <div class="flex flex-end">
            <div><p>コメント</p></div>
            <div class="input-box input-width243 input-width60p input-height78">
              <textarea 
                v-model="reservationData.comment"
                class="input-box-textarea input-padding"
              ></textarea>
            </div>
          </div>

          <button 
            @click="reservationRatingPost()" 
            class="input-box input-width243 input-width60p input-box-button"
          >評価送信</button>
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
  props: ["shop_id", "reservationId"],
  data(){
    return {
      reservationData:{
        reservation_id: "",
        store_id: this.shop_id,
        date: "",
        time: "",
        num_of_users: "1",
        rating: "3",
        comment: "",
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
      const response = await axios.post(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", 
        this.reservationData,
        { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
      );
      console.log(response);
      router.push({path: '/done/1'});
    },

    async reservationPatch(){
      const reservationPatchData = {
        reservation_id: this.reservationData.reservation_id,
        date: this.reservationData.date,
        time: this.reservationData.time,
        num_of_users: this.reservationData.num_of_users,
        rating: null,
        comment: null,
      };
      const response = await axios.patch(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", 
        reservationPatchData, 
        { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
      );
      console.log(response);
      router.push({path: '/done/2'});
    },

    async reservationRatingPost(){
      const response = await axios.patch(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", 
        this.reservationData, 
        { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
      );
      console.log(response);
      router.push({path: '/done/4'});
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

    reservationRating(reservationData, num){
      reservationData.rating = num;
      this.$forceUpdate();
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

    createRatingStartTime(){
      const today = new Date();
      const startDateTime = today;
      startDateTime.setMinutes(startDateTime.getMinutes() +30);

      const startYear = startDateTime.getFullYear();
      const startMonth = ("0"+ (startDateTime.getMonth() + 1) ).slice(-2);
      const startDate = ("0"+ startDateTime.getDate() ).slice(-2);
      const startHours = ("0"+ startDateTime.getHours() ).slice(-2);
      const startMinutes = ("0"+ startDateTime.getMinutes() ).slice(-2);

      return startYear + "-" + startMonth + "-" + startDate + "-" + startHours + ":" + startMinutes;
    },

    createAreaName(){
      return (this.storeData.area.area_name).substr(0, (this.storeData.area.area_name.length)-1);
    },

    createGenreName(){
      return this.storeData.genre.genre_name;
    },
  },

  async created(){
    const response = await axios.get(
      "https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + this.shop_id, {
        params: {user_id : this.$store.state.user_id}
    });
    this.storeData = response.data.data;

    if(this.reservationId == "none"){
      this.reservationData.date = this.createSelectableMinDate;
      this.reservationData.time = this.timeFormat(this.minTime);
    }else{
      const reservationsData = await axios.get(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", {
          params: {user_id : this.$store.state.user_id},
          headers: { Authorization: 'Bearer ' + this.$store.state.token } 
      });
      const reservationDataArray = (reservationsData.data.data.filter(data => data.id == this.reservationId))[0];
      this.reservationData.reservation_id = reservationDataArray.id;
      this.reservationData.date = reservationDataArray.date;
      this.reservationData.time = reservationDataArray.time.substr(0,5);
      this.reservationData.num_of_users = reservationDataArray.num_of_users;
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

.input-star{
  border: none;
  padding-left: 10px;
  padding-right: 10px;
}

.rating{
  font-size: 26px;
  padding: 0;
  border:none;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  color: #ffc700;
  outline: none;
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