<template>
  <div class="store-box">
    <div class="mobile-left">
      <img 
        :src="storeData.image_url" 
        alt="" 
        class="img"
      >
    </div>
    <div class="mobile-right">
      <div class="flex">
        <p>{{cutAreaName(storeData.area.area_name)}}／{{storeData.genre.genre_name}}</p>
        <StoreFavorite 
          :storeData = "storeData"
          @favoriteDelete="favoriteDelete" 
          @favoritePost="favoritePost" 
        ></StoreFavorite>
      </div>
      <div class="flex text-low">
        <p class="store_name">{{storeData.store_name}}</p>
        <button 
          @click="detail"
          class="input-box input-height32 input-box-button"
        >詳細</button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreFavorite from './StoreFavorite.vue';

export default {
  components: {
    StoreFavorite
  },
  props:{
    storeData:{
      "id": Number,
      "store_name": String,
      "area_id": Number,
      "genre_id": Number,
      "image_url": String,
      "user_id": Number,
      "area": {
        "id": Number,
        "area_name": String,
      },
      "genre": {
        "id": Number,
        "genre_name": String,
      },
      "select": Boolean
    },
  },
  data(){
    return {
    }
  },
  methods: {
    cutAreaName(areaName){
      return areaName.substr(0, areaName.length-1);
    },

    detail() {
      this.$router.push({ name: "Detail", params: { shop_id: this.storeData.id } });
    },

    favoriteDelete(store_id){
      this.$emit("favoriteDelete", store_id);
    },

    favoritePost(store_id){
      this.$emit("favoritePost", store_id);
    },
  },
}
</script>

<style scoped>
.store-box{
  box-sizing: border-box;
  width: 230px;
  height: 230px;
  border: solid 1px #c4c4c4;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px #c4c4c4;
  padding: 10px 10px 5px 10px;
}

.img{
  width: 100%;
  max-height: 130px;
  margin-bottom: 0px;
}

.text-low{
  margin-top: 0px;
}

.store_name{
  font-size: 20px;
  font-weight: bold;
}

@media screen and (max-width : 480px){
  .store-box{
    box-sizing: border-box;
    height: 100px;
    display: flex;
  }

  .mobile-left{
    width: 30%;
    margin-right: 10px;
  }

  .img{
    width: 78px;
    height: 78px;
    object-fit: cover;
  }
  
  .mobile-right{
    width: 60%;
    margin-left: 5px;
  }
}

</style>