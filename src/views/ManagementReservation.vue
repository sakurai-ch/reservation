<template>
  <div class="management-reservation">
    <div><p class="title">店舗予約 管理ページ</p></div>
    <div class="flex no-flex top">
      <div class="left-side">
        <MyData></MyData>
      </div>
      
      <div class="right-side">
        <div class="flex no-flex">
          <div class="flex">
            <div class="flex-end"><p>店名</p></div>
            <div class="input-box input-width184 input-width70p  input-height32">
              <select
                type="text" 
                v-model="store_name"
                class="input-box-select input-padding"
              >
                <option 
                  v-for="storeData in this.storesData" 
                  :key="storeData.id"
                >{{storeData.store_name}}</option>
              </select>
            </div>
          </div>
          <div class="flex">
            <div class="flex-end"><p>予約日</p></div>
            <div class="input-box input-width184 input-width70p input-height32">
              <input 
                type="date" 
                v-model="date"
                class="input-box-input input-padding"
              >
            </div>
          </div>

          <button 
            @click="reservationSearch()"
            class="input-box input-width184 input-width70p input-box-button"
          >予約情報確認</button>
        </div>

          <table class="reservation-table">
            <tr>
              <th>予約<br>番号</th>
              <th>予約<br>時間</th>
              <th>人数</th>
              <th>顧客<br>番号</th>
              <th>顧客名</th>
              <th>メール<br>アドレス</th>
              <th class="moble-noshow">評価</th>
              <th class="moble-noshow">コメント</th>
            </tr>
            <tr 
              v-for="(reservationData, index) in reservationsData"
              :key="index"
            >
              <td>{{reservationData.id}}</td>
              <td>{{reservationData.time.slice(0, 5)}}</td>
              <td>{{reservationData.num_of_users}}</td>
              <td>{{reservationData.user_id}}</td>
              <td>{{reservationData.user.user_name}}</td>
              <td>{{reservationData.user.email}}</td>
              <td class="moble-noshow">{{reservationData.rating}}</td>
              <td class="moble-noshow">
                <div 
                  class="store-comment"
                   :class="comment_show"
                  @click="showComment()"
                >
                  <span>{{reservationData.comment}}</span>
                </div>
              </td>
            </tr>
          </table>

      </div>
    </div>
  </div>
</template>

<script>
import MyData from '../components/MyData.vue'
import axios from "axios";

export default {
  props: ["shop_id"],
  components: {
    MyData
  },
  data(){
    return {
      storesData:{},
      reservationsData:{},

      store_id:"",
      store_name:"",
      date:"",

      comment_show:"comment-noshow",
    };
  },
  methods: {
    async reservationSearch(){
      const storeData = this.storesData.find((storeData) => {
          return (storeData.store_name == this.store_name);
      });
      const data = {
        store_id: storeData.id,
        date: this.date,
      };
      const response = await axios.get(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/reservation", { 
          params: data,
          headers: { Authorization: 'Bearer ' + this.$store.state.token } 
        });
      console.log(response);
      this.reservationsData = response.data.data;
    },

    showComment(){
      if(this.comment_show=="comment-noshow"){
        this.comment_show = "comment-show"
      }else{
        this.comment_show = "comment-noshow"
      }
    }
  },

  computed: {
  },

  async created(){
    this.storesData = (await axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/store")).data.data;
  }
}
</script>

<style scoped>
.management-reservation{
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

.reservation-table{
  line-height: 18px;
}

.comment{
  font-size: 11px;
  font-weight: bold;
  color: #ffc700;
}

.input-box-button{
  background-color: #d4a701;
  border-color: #775d00;
}

.input-box-readonly{
  border-color: #c4c4c4;
  cursor: not-allowed;
}

.input-box{
  border-color: #775d00;;
}

.right-side{
  width: 700px;
}

table{
  border: solid 2px #775d00;
  width: 100%;
  margin-top: 20px;
}

th, td{
  border: solid 1px #775d00;
}

th{
  background-color: #d4a701;
}

.store-comment{
  color: blue;
  cursor: pointer;
  width: 100px;
  height: 32px;
  line-height: 32px;
  overflow:hidden;
}

.comment-show{
  width: auto;
  height: 100%;
  line-height: 18px;
}


table {
  border: 1px solid #aaa;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 6px;
}

table thead th,
table tbody th,
table tbody td {
  padding: .6em 3em;
  border-bottom: 1px solid #aaa;
}
table thead th {
  background-color: #ddd;
}
table tbody th {
  background-color: #eee;
}
table thead th + th,
table tbody td {
  border-left: 1px solid #aaa;
}
table tbody tr:last-child th,
table tbody tr:last-child td {
  border-bottom: none;
}
table thead tr:first-child th:first-child {
  border-radius: 5px 0 0 0;
}
table thead tr:first-child th:last-child {
  border-radius: 0 5px 0 0;
}
table tbody tr:last-child th:first-child {
  border-radius: 0 0 0 5px;
}
table tbody tr:last-child th:last-child {
  border-radius: 0 0 5px 0;
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

  .right-side{
    width: 90%;
    margin: 20px auto;
  }

  .input-width70p{
    width: 70%;
  }

  .flex-end{
    width: 25%;
    text-align: end;
  }

  .reservation-table{
    font-size: 10px;
    line-height: 12px;
  }

  .moble-noshow{
    display: none;
  }
}

</style>