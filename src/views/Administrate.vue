<template>
  <div class="administrate">
    <div><p class="title">店舗責任者 管理ページ</p></div>
    <div class="flex no-flex top">
      <div class="left-side">
        <MyData></MyData>
      </div>
      
      <div class="right-side">
        <!-- <p class="sub-title">店舗 新規作成</p>
        <table class="management-table">
          <tr>
            <th>店名</th>
            <th class="button-box"></th>
          </tr>
          <tr>
            <td><input type="text" class="input-width70 input-box input-height32"></td>
            <td><button @click="crateStore()" class="input-box input-height32 input-box-button">作成</button></td>
          </tr>
        </table> -->
        
        <p class="sub-title">新規作成</p>
        <table class="management-table">
          <tr>
            <th>管理者名</th>
            <th>メールアドレス</th>
            <th>パスワード</th>
            <th class="button-box"></th>
          </tr>
          <tr>
            <td><input type="text" v-model="newManager.user_name" class="input-width70 input-box input-height32"></td>
            <td><input type="text" v-model="newManager.email" class="input-width70 input-box input-height32"></td>
            <td><input type="text" v-model="newManager.password" class="input-width70 input-box input-height32"></td>
            <td><button @click="createManagaer()" class="input-box input-height32 input-box-button">作成</button></td>
          </tr>
        </table>
        
        <p class="sub-title">権限設定</p>
        <table class="management-table">
          <tr>
            <th>店舗番号</th>
            <th>管理者番号</th>
            <th class="button-box"></th>
          </tr>
          <tr>
            <td><input type="text" v-model="setManager.store_id" class="input-width70 input-box input-height32"></td>
            <td><input type="text" v-model="setManager.user_id" class="input-width70 input-box input-height32"></td>
            <td><button @click="setManagaer()" class="input-box input-height32 input-box-button">追加</button></td>
          </tr>
        </table>

        <p class="sub-title">検索</p>
        <div class="flex no-flex seatch-box">
          <div class="flex">
            <div class="flex-end"><p>店舗番号</p></div>
            <div class="input-box input-width70p input-height32 input-width100">
              <input
                type="number" 
                v-model="store_id"
                :min= 1
                class="input-box-select input-padding"
              >
            </div>
          </div>
          <div class="flex">
            <div class="flex-end"><p>管理者番号</p></div>
            <div class="input-box input-width70p input-height32 input-width100">
              <input 
                type="number" 
                v-model="user_id"
                :min= 1
                class="input-box-input input-padding"
              >
            </div>
          </div>
          <div class="flex">
            <div class="flex-end"><p>管理者名</p></div>
            <div class="input-box input-width70p input-height32 input-width100">
              <input 
                type="text" 
                v-model="user_name"
                class="input-box-input input-padding"
              >
            </div>
          </div>

          <button 
            @click="managersSearch()"
            class="input-box input-width70p input-box-button input-height32 input-width100"
          >検索</button>
        </div>

        <table class="management-table">
          <tr>
            <th>店舗<br>番号</th>
            <th>店名</th>
            <th>管理者<br>番号</th>
            <th>管理者名</th>
            <th>メール<br>アドレス</th>
            <th class="button-box"></th>
          </tr>
          <tr 
            v-for="(managerData, index) in managersSeatchedData"
            :key="index"
          >
            <td>{{managerData.store_id}}</td>
            <td>{{managerData.store_name}}</td>
            <td>{{managerData.user_id}}</td>
            <td>{{managerData.user_name}}</td>
            <td>{{managerData.email}}</td>
            <td><button @click="deleteManagaer(managerData)" class="input-box input-height32 input-box-button  color-red">削除</button></td>

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
      newManager:{
        user_name:"",
        email:"",
        password:"",
      },

      setManager:{
        user_id:"",
        store_id:"",
      },

      managersData:{},
      managersSeatchedData:[],
      store_id:"",
      user_id:"",
      user_name:"",
    };
  },
  methods: {
    // async crateStore(){
    //   const response = await axios.post(
    //     "https://mysterious-fjord-19119.herokuapp.com/api/v1/store", 
    //     { data:{} },
    //     { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
    //   );
    //   console.log(response);
    // },

    async createManagaer(){
      await axios.post(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/user", 
        {
          user_name: this.newManager.user_name,
          email: this.newManager.email,
          password: this.newManager.password,
          manager: true,
        },
        { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
      );
      // console.log(response);

      this.newManager.user_name = "";
      this.newManager.email = "";
      this.newManager.password = "";
      this.managersSeatchedData = [];
      this.getManagers();
    },

    async setManagaer(){
      await axios.post(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/manager", 
        {
          store_id: this.setManager.store_id,
          user_id: this.setManager.user_id,
        },
        { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
      );
      // console.log(response);

      this.setManager.store_id = "";
      this.setManager.user_id = "";
      this.managersSeatchedData = [];
      this.getManagers();
    },

    async deleteManagaer(managerData){
      await axios.delete(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/manager", 
        { 
          params: {
            store_id: managerData.store_id,
            user_id: managerData.user_id,
          },
          headers: { Authorization: 'Bearer ' + this.$store.state.token } 
        }
      );
      // console.log(response);
      this.managersSeatchedData = [];
      this.getManagers();
    },

    managersSearch(){
      this.managersSeatchedData = [];
      for(let managerData of this.managersData){
        if(
          ( this.store_id == "" || managerData.store_id == this.store_id ) &&
          ( this.user_id == "" || managerData.user_id == this.user_id ) &&
          ( managerData.user_name.includes(this.user_name) )
        ){
          this.managersSeatchedData.push(managerData);
        }
      }
    },

    async getManagers(){
      const response = await axios.get(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/user",
        { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
      );
      console.log(response);
      this.managersData = response.data.data;
    }
  },

  computed: {
  },

  created(){
    this.getManagers();
  }
}
</script>

<style scoped>
.administrate{
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
  margin-top: 60px;
  font-size: 16px;
}

.management-table{
  line-height: 18px;
}

.seatch-box{
  margin-top:10px;
}

.button-box{
  width: 70px;
}

.comment{
  font-size: 11px;
  font-weight: bold;
  color: #ffc700;
}

.input-box-button{
  background-color: #9b9067;
  border-color: #665f48;
}

.input-box-readonly{
  border-color: #c4c4c4;
  cursor: not-allowed;
}

.input-box{
  border-color: #665f48;
  margin-left: 7px;
}

.input-width100{
  width: 100px;
}


.right-side{
  width: 700px;
  margin-top: -40px;
}

table{
  border: solid 2px #665f48;
  width: 100%;
  margin-top: 20px;
}

th, td{
  border: solid 1px #665f48;
}

th{
  background-color: #9b9067;
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

.color-red{
  border-color: #ff5544;
  background-color: #ffaa99;
  height: 24px;
  margin: 1px;
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

  .input-width70{
    width: 70px;
  }

  .input-width70p{
    width: 70%;
  }

  .flex-end{
    width: 25%;
    text-align: end;
  }

  .management-table{
    font-size: 10px;
    line-height: 12px;
  }

  .moble-noshow{
    display: none;
  }

  .button-box{
    width: 55px;
  }
}

</style>