<template>
  <div class="management-reservation">
    <div><p class="title">店舗予約 管理ページ</p></div>
    <div class="flex no-flex top">
      <div class="left-side">
        <div class="my-data">
          <p class="sub-title">■名前</p>
          <p>{{$store.state.user_name}}</p><br>
          <p class="sub-title">■メールアドレス</p>
          <p>{{$store.state.email}}</p><br>

          <!-- <div 
            v-for="storeData in storesData" 
            :key="storeData.id"
          > -->
            <div class="flex">
              <div>
                <p class="sub-title">■管理店舗 1</p>
                <p>店舗番号：1</p>
                <p>店舗名：aaa</p>
                <p>エリア：bbb</p>
                <p>ジャンル：ccc</p>
              </div>

              <div 
                class="potition-top">
                <button 
                  @click="$router.push({path: '/management-store/1'})" 
                  class="input-box input-height43 input-box-button"
                >情報<br>変更</button>
              </div>
            </div>
          <!-- </div> -->
        </div>
      </div>
      
      <div class="right-side">
        <div class="flex right-side">
          <div class="flex">
            <div><p>店舗</p></div>
            <div class="input-box input-width184 input-width60p  input-height32">
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
            <div><p>予約日</p></div>
            <div class="input-box input-width184 input-width60p  input-height32">
              <input 
                type="date" 
                v-model="date"
                class="input-box-input input-padding"
              >
            </div>
          </div>

          <button 
            @click="reservationSearch()"
            class="input-box input-width184 input-width60p input-box-button"
          >予約情報確認</button>
        </div>

          <table>
            <tr>
              <th>予約<br>番号</th>
              <th>予約日</th>
              <th>予約時間</th>
              <th>人数</th>
              <th>ユーザー<br>番号</th>
              <th>ユーザー名</th>
              <th>メールアドレス</th>
              <th>評価</th>
              <th>コメント</th>
            </tr>
            <tr 
              v-for="(reservationData, index) in reservationsData"
              :key="index"
            >
              <td>{{reservationData.id}}</td>
              <td>{{reservationData.date}}</td>
              <td>{{reservationData.time}}</td>
              <td>{{reservationData.num_of_users}}</td>
              <td>{{reservationData.user_id}}</td>
              <td>{{reservationData.user.user_name}}</td>
              <td>{{reservationData.user.email}}</td>
              <td>{{reservationData.rating}}</td>
              <td>
                <div class="store-comment">
                  {{reservationData.comment}}
                </div>
              </td>
            </tr>
          </table>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["shop_id"],
  data(){
    return {
      storesData:{},
      reservationsData:{},

      store_id:"",
      store_name:"",
      date:""
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

.input-width600{
  width: 600px;
}

.input-height100{
  height: 100px;
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
  width: 50px;
  height: 32px;
  line-height: 32px;
  overflow:hidden;
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