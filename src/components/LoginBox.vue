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

      <ValidationObserver ref="obs" v-slot="ObserverProps">
      <div class="input">
        <div 
          class="flex flex-end" 
          v-if="type=='register'" 
          key="input-type"
        >
          <div><p>名前</p></div>
          <div class="input-box input-width390 input-width60p">
            <ValidationProvider rules="required" v-slot="ProviderProps" class="validation">
              <input 
                type="text" 
                v-model="user_name"
                class="input-box-input"
                name="名前"
              >
            <span class="validation-error">{{ ProviderProps.errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex flex-end">
          <div><p>メールアドレス</p></div>
          <div class="input-box input-width390 input-width60p">
            <ValidationProvider rules="required|email" v-slot="ProviderProps" class="validation">
              <input 
                type="text" 
                v-model="email"
                class="input-box-input"
                name="メールアドレス"
              >
              <span class="validation-error">{{ ProviderProps.errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex flex-end">
          <div><p>パスワード</p></div>
          <div class="input-box input-width390 input-width60p">
            <ValidationProvider rules="required|alpha_num|min:6" v-slot="ProviderProps" class="validation">
              <input 
                type="text" 
                v-model="password"
                class="input-box-input"
                name="パスワード"
              >
              <span class="validation-error">{{ ProviderProps.errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
      </div>

      <button 
        v-if="type=='register'" 
        key="button-type" 
        @click="register"
        class="input-box input-width122 input-box-button" 
        :disabled="ObserverProps.invalid || !ObserverProps.validated" 
      >登録</button>
      <button 
        v-else-if="type=='login'" 
        key="button-type" 
        @click="login"
        class="input-box input-width122 input-box-button" 
        :disabled="ObserverProps.invalid || !ObserverProps.validated" 
      >ログイン</button>
      </ValidationObserver>
      <br>
      <p :class="server_error">入力が正しくありません</p>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, email, alpha_num, min } from 'vee-validate/dist/rules';
extend("required", {
  ...required,
  message: "必須項目です"
});
extend('email', {
  ...email,
  message: "E-mailの形式で記載してください"
});
extend('alpha_num', {
  ...alpha_num,
  message: "英数字のみ使用できます"
});
extend('min', {
  ...min,
  message: "{length}文字以上にしてください"
});

export default {
  props:{
    type: String
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      user_name: "",
      email: "",
      password: "",
      server_error: "no-server-error",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      router.back();
    },

    async register() {
      try{
        const response = await axios.post("https://mysterious-fjord-19119.herokuapp.com/api/v1/user", {
          user_name: this.user_name,
          email: this.email,
          password: this.password
        });
        console.log(response);
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
        router.replace("/thanks");
      }catch(error){
        console.log(error.response);
        this.server_error = "server_error";
      }
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

.validation{
  position: relative;
}

.validation-error{
  width: 100%;
  position: absolute;
  text-align: right;
  left: 0;
  bottom: -11px;
  color: #ff0000;
  font-size: 11px;
  line-height: 11px;
}

.no-server-error{
  display: none;

}

.server_error{
  display: initial;
  color: #ff0000;
  font-size: 11px;
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