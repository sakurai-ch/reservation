<template>
  <div class="header">
    <div class="text-area">
      <div 
        class="logo"
        :class="logo"
      >Rese</div>
      <div>
        <li 
          v-if="$store.state.auth" 
          key="auth" 
          class="menu"
          :class="menu"
        >
          <ul><a @click="$router.push({path: '/'})">店舗一覧</a></ul>
          <ul><a @click="$router.push({path: '/mypage'})">マイページ</a></ul>
          <ul><a @click="logout">ログアウト</a></ul>
        </li>
        <li 
          v-else 
          key="auth" 
          class="menu"
          :class="menu"
        >
          <ul><a @click="$router.push({path: '/'})">店舗一覧</a></ul>
          <ul><a @click="$router.push({path: '/register'})">会員登録</a></ul>
          <ul><a @click="$router.push({path: '/login'})">ログイン</a></ul>
        </li>
      </div>
      <div 
        @click="hamburgerOpen"
        class="hamburger"
        :class="hamburger"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index";

export default {
  data(){
    return {
      logo:"",
      menu:"",
      hamburger:""
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      router.replace("/");
    },

    hamburgerOpen(){
      if(this.hamburger == "hamburger"){
        this.logo = "no-logo";
        this.menu = "menu-open";
        this.hamburger = "hamburger-close";
      }else{
        this.logo = "";
        this.menu = "";
        this.hamburger = "hamburger";
      }
    }
  },
}
</script>

<style scoped>
.header{
  background-color: #ffe454;
  height: 82px;
  width: 100%;
  position: fixed;
  top:0;
}

.text-area{
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width:1000px;
  margin: auto;
}

.logo{
  font-size: 48px;
  font-weight: bold;
  color: white;
  line-height: 75px;
  cursor: default;
}

.menu{
  display: flex;
  line-height: 80px;
}

.menu a{
  cursor: pointer;
}

.hamburger{
  display: none;
}

@media screen and (max-width : 480px){
  .text-area{
    width:100%;
    justify-content: initial;
  }

  .logo{
    position: absolute;
    top: 0px;
    left: 15px;
    line-height: 80px;
    opacity: 1;
    transition: 0.8s;
  }

  .no-logo{
    opacity: 0;
  }

  .menu{
    width: 400px;
    position: absolute;
    top: 0px;
    left: 100px;
    display: flex;
    line-height: 80px;
    opacity: 0;
    transition: 0.8s;
    pointer-events: none;
  }

  .menu-open{
    left: -15px;
    opacity: 1;
    pointer-events: initial;
  }

  .hamburger {
    display: initial;
    width: 48px;
    height: 48px;
    position: absolute;
    cursor: pointer;
    top: 12px;
    right: 15px;
    transition: 0.4s;
  }

  .hamburger span {
    position: absolute;
    left: 2px;
    display: block;
    width: 35px;
    height: 3px;
    background-color: #000;
    transition: 0.8s;
  }

  .hamburger span:nth-of-type(1) {
    top: 12px;
  }

  .hamburger span:nth-of-type(2) {
    top: 24px;
  }

  .hamburger span:nth-of-type(3) {
    top: 36px;
  }

  .hamburger-close span {
    left: 33px;
    width: 4px;
    height: 28px;
  }

  .hamburger-close span:nth-of-type(1) {
    top: 12px;
  }

  .hamburger-close span:nth-of-type(2) {
    top: 12px;
  }

  .hamburger-close span:nth-of-type(3) {
    top: 12px;
  }


}
</style>