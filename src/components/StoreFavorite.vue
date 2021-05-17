<template>
  <div class="favorite">
    <button 
      v-if="storeData.user_id==this.$store.state.user_id" 
      key="userFavorite" 
      class="star yellow" 
      @click="favoriteDelete()"
    >★</button>
    <button 
      v-else 
      key="userFavorite" 
      class="star gray" 
      @click="favoritePost()"
    >★</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
    props:{
    storeData:{
      "id": Number,
      "store_name": String,
      "area_id": Number,
      "genre_id": Number,
      "image_url": String,
      "description": String,
      "user_id": Number,
      "area": {
        "id": Number,
        "area_name": String
      },
      "genre": {
        "id": Number,
        "genre_name": String
      },
      "select": Boolean
    },
  },
  data(){
    return {
    }
  },
  methods: {
    async favoriteDelete(){
      const favorite_data = {
        user_id: this.$store.state.user_id,
        store_id: this.storeData.id
      };
      const response = await axios.delete(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/favorite", {
          params: favorite_data, 
          headers: { Authorization: 'Bearer ' + this.$store.state.token }
      });
      console.log(response);
      this.$emit("favoriteDelete", this.storeData.id);
    },

    async favoritePost(){
      const favorite_data = {
        user_id: this.$store.state.user_id,
        store_id: this.storeData.id
      };
      const response = await axios.post(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/favorite", 
        favorite_data, 
        {headers: { Authorization: 'Bearer ' + this.$store.state.token }}
      );
      console.log(response);
      this.$emit("favoritePost", this.storeData.id);
    }
  }
}
</script>

<style scoped>
.star{
  font-size: 26px;
  padding: 0;
  border:none;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
}

.yellow{
  color: #ffc700;
}

.gray{
  color: #c4c4c4;
}
</style>