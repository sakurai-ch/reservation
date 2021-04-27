<template>
  <div class="register">
    <div class="login-box">
      <div>名前<input type="text" v-model="user_name"></div>
      <div>メールアドレス<input type="text" v-model="email"></div>
      <div>パスワード<input type="text" v-model="password"></div>
      <button @click="auth">登録</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  data() {
    return {
      user_name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    auth() {
      axios.post("http://localhost:3000/user_data_1", {
        id: 1,
        user_name: "一郎",
        email: "ichiro@aaa@com"
      })
      .then(response => {
        console.log(response);
      });
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
.register{
  max-width: 1000px;
}
.login-box{
  width: 80%;
  height: 500px;
  border: solid 1px;
  margin: auto;
}
</style>