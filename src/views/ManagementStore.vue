<template>
  <div class="management-store">
    <div><p class="title">店舗情報 管理ページ</p></div>
    <div class="flex no-flex top">
      <div class="left-side">
        <MyData @getStoreData = "getStoreData"></MyData>
      </div>
      
      <div class="right-side">
          <div class="flex flex-end">
            <div><p>店舗ID</p></div>
            <div class="input-box input-width600 input-width70p  input-box-readonly input-height32">
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
            <div class="input-box input-width600 input-width70p  input-height32">
              <input 
                type="text" 
                v-model="store_name"
                class="input-box-input input-padding"
              >
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>エリア</p></div>
            <div class="input-box input-width600 input-width70p  input-height32">
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
            <div class="input-box input-width600 input-width70p  input-height32">
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
            <div class="input-box input-width600 input-width70p input-height100">
              <textarea 
                v-model="description"
                class="input-box-input input-padding input-textarea"
              ></textarea>
            </div>
          </div>
          <div class="flex flex-end">
            <div><p>画像</p></div>
            <div class="input-box input-width600 input-width70p input-height32 flex-left">
              <label 
                for="file" 
                class="file-send-label"
              >選択</label>
              <span>{{fileInfo.name}}</span>
              <input 
                type="file" 
                id="file"
                @change="fileSelected" 
                class="input-box-input input-padding file-send"
                readonly
              >
            </div>
          </div>

          <button 
            @click="dataSend()"
            class="input-box input-width243 input-width70p input-box-button input-height32"
          >店舗情報変更</button>

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
      areasData:{},
      genresData:{},

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
      await axios.patch(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + this.shop_id, 
        data,
        { 
          headers: { Authorization: 'Bearer ' + this.$store.state.token }
        }
      );
      // console.log(response);
    },

    async fileUpload(){
      const formData = new FormData();
      formData.append('_method', 'PATCH');
      formData.append('file',this.fileInfo);
      await axios.post(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + this.shop_id, 
        formData,
        { 
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: 'Bearer ' + this.$store.state.token
          } 
        }
      );
      // console.log(response);
    },

    async getStoreData(store_id){
      const responseDetail = await axios.get(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/store/" + store_id, 
        {
          headers: { Authorization: 'Bearer ' + this.$store.state.token }
        }
      );
      this.store_id = responseDetail.data.data.id;
      this.store_name = responseDetail.data.data.store_name;
      this.area_name = responseDetail.data.data.area.area_name;
      this.genre_name = responseDetail.data.data.genre.genre_name;
      this.description = responseDetail.data.data.description;
      // console.log(responseDetail);
    },
  },

  computed: {

  },

  async created(){
    this.getStoreData(this.shop_id);
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

.input-box-select{
  padding-left: 0px;
}

.input-textarea{
  width: 88%;
  resize: none;
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

.file-send-label{
  height: 18px;
  font-size: 14px;
  margin: 2px 10px 2px 30px;;
  padding: 2px;
  padding-top: 1px;
  border: solid 1px #775d00;
  border-radius: 5px;
  background-color: #d4a701;
  cursor: pointer;
}

.flex-left{
  display: flex;
}

.file-send{
  display: none;
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

}

</style>