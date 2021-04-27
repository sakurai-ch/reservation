<template>
  <div class="login">
    <div class="login-box">
      <div>メールアドレス<input type="text" v-model="email"></div>
      <div>パスワード<input type="text" v-model="password"></div>
      <button @click="auth">ログイン</button>
    </div>
  </div>
</template>

<script>
import router from "../router/index";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    auth() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      router.replace("/");
    }
  }
};
</script>

<style scoped>
.login{
  max-width: 1000px;
}
.login-box{
  width: 80%;
  height: 500px;
  border: solid 1px;
  margin: auto;
}
</style>