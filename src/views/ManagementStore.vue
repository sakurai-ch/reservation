<template>
  <div class="management-store">
    <div><p class="title">店舗管理ページ</p></div>
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
                  @click="$router.push({path: '/managementstore/1'})" 
                  class="input-box input-height43 input-box-button"
                >内容<br>変更</button>
              </div>
            </div>
          <!-- </div> -->
        </div>
      </div>
      
      <div>
          <div class="flex flex-end">
            <div><p>店舗ID</p></div>
            <div class="input-box input-width600 input-width60p  input-box-readonly input-height32">
              <input 
                type="text" 
                v-model="store_id"
                class="input-box-input input-box-readonly input-padding"
                readonly
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>店舗名</p></div>
            <div class="input-box input-width600 input-width60p  input-height32">
              <input 
                type="text" 
                v-model="store_name"
                class="input-box-input input-padding"
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>エリア</p></div>
            <div class="input-box input-width600 input-width60p  input-height32">
              <select
                type="text" 
                v-model="area_name"
                class="input-box-select input-padding"
              >
                <option 
                  v-for="areaData in this.areasData" 
                  :key="areaData.id"
                >{{areaData.area_name}}</option>
              </select>
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>ジャンル</p></div>
            <div class="input-box input-width600 input-width60p  input-height32">
              <select 
                type="text" 
                v-model="genre_name"
                class="input-box-select input-padding"
              >
                <option 
                  v-for="genreData in this.genresData" 
                  :key="genreData.id"
                >{{genreData.genre_name}}</option>
              </select>
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>説明</p></div>
            <div class="input-box input-width600 input-width60p input-height100">
              <textarea 
                v-model="description"
                class="input-box-input input-padding"
              ></textarea>
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>画像</p></div>
            <div class="input-box input-width600 input-width60p input-height32">
              <input 
                type="file" 
                @change="fileSelected" 
                class="input-box-input input-padding"
                readonly
              >
            </div>
          </div>

          <button 
            @click="dataSend()"
            class="input-box input-width243 input-width60p input-box-button"
          >店舗情報変更</button>

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
      areasData:{},
      genresData:"",

      store_id:"",
      store_name:"",
      area_name:"",
      genre_name:"",
      description:"",
      fileInfo:"",
    };
  },
  methods: {
    fileSelected(event){
      this.fileInfo = event.target.files[0];
    },

    dataSend(){
      this.dataUpdate();
      if(this.fileInfo != ""){
        this.fileUpload();
      }
    },

    async dataUpdate(){
      const areaData = this.areasData.find((areaData) => {
          return (areaData.area_name == this.area_name);
      });
      const genreData = this.genresData.find((genreData) => {
          return (genreData.genre_name == this.genre_name);
      });
      const data = {
        store_name: this.store_name,
        area_id: areaData.id,
        genre_id: genreData.id,
        description: this.description,
      };
      const response = await axios.patch(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + this.shop_id, 
        data,
        { params: {params:"dataUpdate"} }
      );
      console.log(response);
    },

    async fileUpload(){
      const formData = new FormData();
      formData.append('_method', 'PATCH');
      formData.append('file',this.fileInfo);
      console.log(formData);
      const response = await axios.post(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + this.shop_id, 
        formData,
        { params: {params:"fileUpload"}, header: {"Content-Type": "multipart/form-data"} }
      );
      console.log(response);
    },
  },

  computed: {

  },

  async created(){
    const response = await axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + this.shop_id,{
      params: {user_id : this.$store.state.user_id}
    });
    this.store_id = response.data.data.id;
    this.store_name = response.data.data.store_name;
    this.area_name = response.data.data.area.area_name;
    this.genre_name = response.data.data.genre.genre_name;
    this.description = response.data.data.description;

    this.areasData = (await axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/area")).data.data;
    this.genresData = (await axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/genre")).data.data;
  }
}
</script>

<style scoped>
.management-store{
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