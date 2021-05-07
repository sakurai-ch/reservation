<template>
  <div class="home">
    <div class="store-search flex no-flex">
      <div class="flex flex-end">
        <div><p>エリア</p></div>
        <div
          class="input-box input-width184 input-width60p"
        >
          <select 
            type="text" 
            v-model="saerchData.area_name"
            class="input-box-select"
          >
            <option value="">全て</option>
            <option 
              v-for="areaData in createAreasName" 
              :key="areaData.id"
            >{{areaData.area_name}}</option>
          </select>
        </div>
      </div>
      <div class="flex flex-end">
        <div><p>ジャンル</p></div>
        <div
          class="input-box input-width184 input-width60p"
        >
          <select 
            type="text" 
            v-model="saerchData.genre_name" 
            class="input-box-select" 
          >
            <option value=""> 全て</option>
            <option 
              v-for="genreData in createGenresName" 
              :key="genreData.id" 
            >{{genreData.genre_name}}</option>
          </select>
        </div>
      </div>
      <div class="flex flex-end">
        <div><p>店名</p></div>
        <div
          class="input-box input-width184 input-width60p input-padding"
        >
          <input 
            type="text" 
            v-model="saerchData.store_name"
            class="input-box-input"
          >
        </div>
      </div>
      <button 
        @click="storeSaerch()" 
        class="input-box input-box-button input-width122"
      >検索</button>
    </div>

    <div class="store-boxes">
      <div 
        v-for="storeData in storesData" 
        :key="storeData.id"
      >
        <StoreBox 
          v-if="storeData.select" 
          key="userSelect"
          :storeData = "storeData"
          @favoriteDelete="favoriteDelete" 
          @favoritePost="favoritePost" 
          class="store-box"
        ></StoreBox>
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
    return{
      storesData:"",
      areasData:"",
      genresData:"",
      saerchData:{
        area_name:"", 
        genre_name:"", 
        store_name:""
      },
    }
  },
  methods:{
    storeSaerch(){
      for(let storeData of this.storesData){
        let existsAreaId;
        if(storeData.area.area_name.includes(this.saerchData.area_name)){
          existsAreaId = true;
        }else{
          existsAreaId = false;
        }

        let existsGenreId;
        if(storeData.genre.genre_name.includes(this.saerchData.genre_name)){
          existsGenreId = true;
        }else{
          existsGenreId = false;
        }

        let existsStoreName;
        if(storeData.store_name.includes(this.saerchData.store_name)){
          existsStoreName = true;
        }else{
          existsStoreName = false;
        }
        
        if(existsAreaId && existsGenreId && existsStoreName){
          storeData.select = true;
        }else{
          storeData.select = false;
        }
      }
      this.$forceUpdate();
    },

    favoriteDelete(store_id){
      for(let storeData of this.storesData){
        if(storeData.id == store_id){
          storeData.user_id = null;
        }
      }
    },

    favoritePost(store_id){
      for(let storeData of this.storesData){
        if(storeData.id == store_id){
          storeData.user_id = this.$store.state.user_id;
        }
      }
    },
  },

  computed:{
    createAreasName(){
      for(let areaData of this.areasData){
        areaData.area_name = (areaData.area_name).substr(0, areaData.area_name.length-1);
      }
      return this.areasData;
    },

    createGenresName(){
      return this.genresData;
    },
  },

  async created(){
    const storesDataPromise = axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/store", {
      params: {user_id: this.$store.state.user_id}
    });
    const areasDataPromise = axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/area");
    const genresDataPromise = axios.get("https://mysterious-fjord-19119.herokuapp.com/api/v1/genre");
    this.storesData = (await storesDataPromise).data.data;
    this.areasData = (await areasDataPromise).data.data;
    this.genresData = (await genresDataPromise).data.data;

    for(let storeData of this.storesData){
      storeData["select"] = true;
    }
  }
}
</script>

<style scoped>
.home{
  margin: 20px auto;
}

.store-search{
  margin-top: 30px;
  margin-bottom: 15px;
}

.store-boxes{
  display: flex;
  flex-wrap:wrap;
  margin-bottom: 30px;
} 

.store-box{
  margin: 10px;
} 

@media screen and (max-width : 480px){
  .no-flex{
    display: initial;
    align-items: initial;
    justify-content: initial;
  }
  
  .store-search{
    margin-top: 100px;
  }

  .input-box{
    margin-right: 20px;
  }

  .input-width60p{
    width: 60%;
  }

  .store-boxes{
    margin-top: 20px;
    justify-content: center;
  }

  .store-boxes div{
    width: 95%;
  }

  .store-box{
    margin: 8px auto;
  }
}

</style>
