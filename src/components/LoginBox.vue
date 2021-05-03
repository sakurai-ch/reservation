<template>
    <div class="login-box">
      <div 
        v-if="type=='register'" 
        key="title-type"
      >
        <p class="title">会員登録</p>
      </div>
      <div 
        v-else-if="type=='login'" 
        key="title-type"
      >
        <p class="title">ログイン</p>
      </div>

      <div class="input">
        <div 
          class="flex flex-end" 
          v-if="type=='register'" 
          key="input-type"
        >
          <div><p>名前</p></div>
          <div class="input-box input-width390 input-width60p">
            <input 
              type="text" 
              v-model="user_name"
              class="input-box-input"
            >
          </div>
        </div>
        <div class="flex flex-end">
          <div><p>メールアドレス</p></div>
          <div class="input-box input-width390 input-width60p">
            <input 
              type="text" 
              v-model="email"
              class="input-box-input"
            >
          </div>
        </div>
        <div class="flex flex-end">
          <div><p>パスワード</p></div>
          <div class="input-box input-width390 input-width60p">
            <input 
              type="text" 
              v-model="password"
              class="input-box-input"
            >
          </div>
        </div>
      </div>

      <button 
        v-if="type=='register'" 
        key="button-type" 
        @click="register"
        class="input-box input-width122 input-box-button"
      >登録</button>
      <button 
        v-else-if="type=='login'" 
        key="button-type" 
        @click="login"
        class="input-box input-width122 input-box-button"
      >ログイン</button>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  props:{
    type: String
  },
  data() {
    return {
      user_name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      router.go(-1);
    },

    async register() {
      const response = await axios.post("http://localhost:3000/user_data_1", {
        id: 1,
        user_name: "一郎",
        email: "ichiro@aaa@com"
      });
      console.log(response);
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      router.replace("/thanks");
    }
  }
};
</script>

<style scoped>
.login-box{
  box-sizing: border-box;
  width: 800px;
  height: 380px;
  margin: 60px auto;
  border: solid 1px #c4c4c4;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px #c4c4c4;
}

.title{
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 30px;
}

.input{
  padding-right: 195px;
}

@media screen and (max-width : 480px){
  .login-box{
    width: 100%;
    border: none;
    box-shadow: none;
  }

  .input{
    padding-right: 20px;
  }

  .input-width60p{
    width: 60%;
  }
}
</style>