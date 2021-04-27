<template>
  <div class="store-box">
    <img :src="store_data.image_url" alt="" class="img">
    <span>{{store_data.area_name}}</span>
    <span>/</span>
    <span>{{store_data.genre_name}}</span>
    <button v-if="store_data.user_favorite" class="yellow" @click="favorite_delete()">星</button>
    <button v-else @click="favorite_post()">星</button>
    <br>
    <span>{{store_data.store_name}}</span>
    <button @click="transition()">詳細</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props:["store_data"],
  data(){
    return {
    }
  },
  methods: {
    transition() {
      this.$router.push({ name: "Detail", params: { shop_id: this.store_data.id } });
    },

    favorite_delete(){
      axios.delete("", {
        store_id: this.store_data.id,
        user_id: this.store_data.user_id
      });
      this.store_data.user_favorite = false;
    },

    favorite_post(){
      axios.post("", {
        store_id: this.store_data.id,
        user_id: this.store_data.user_id
      });
      this.store_data.user_favorite = true;
    }
  },
}
</script>

<style scoped>
.store-box{
  width: 150px;
  height: 150px;
  border: solid 1px;
  float: left;
}

.img{
  width: 90%;
}

.yellow{
  background-color: yellow;
}
</style>