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
          <ul class="moble-ul">
            <a @click="$router.push({path: '/'})">
              店舗<br class="mobile-show">
              一覧
            </a>
          </ul>
          <ul class="moble-ul">
            <a @click="$router.push({path: '/mypage'})">
              マイ<br class="mobile-show">
              ページ
            </a>
          </ul>
          <ul class="moble-ul">
            <a @click="logout">
              ログ<br class="mobile-show">
              アウト
            </a>
          </ul>
          <ul class="moble-ul-button">
            <button 
              v-if="$store.state.manager != null && $store.state.manager" 
              @click="$router.push({path: '/management-reservation'})" 
              class="input-box input-height43 input-box-button managemant management-moble"
              >
                <span>店舗</span>
                <br class="management-moble-noshow">
                <span class="management-moble-noshow">管理</span>
              </button>
            <button 
              v-if="$store.state.administrator != null && $store.state.administrator" 
              @click="$router.push({path: '/administrate'})" 
              class="input-box input-height43 input-box-button administrate management-moble"
              >
                <span>全体</span>
                <br class="management-moble-noshow">
                <span class="management-moble-noshow">管理</span>
              </button>
          </ul>
        </li>
        <li 
          v-else 
          key="auth" 
          class="menu"
          :class="menu"
        >
          <ul>
            <a @click="$router.push({path: '/'})">
              店舗<br class="mobile-show">
              一覧
            </a>
          </ul>
          <ul>
            <a @click="$router.push({path: '/register'})">
              会員<br class="mobile-show">
              登録
            </a>
          </ul>
          <ul>
            <a @click="$router.push({path: '/login'})">
              ログ<br class="mobile-show">
              イン
            </a>
          </ul>
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
  /* line-height: 80px; */
  line-height: 25px;
  margin-top: 12px;
}

.moble-ul-button{
  margin-top: -12px;
}

.menu a{
  cursor: pointer;
}

.hamburger{
  display: none;
}

.managemant{
  vertical-align: middle;
  background-color: #d4a701;
  border-color: #775d00;
}

.administrate{
  vertical-align: middle;
  background-color: #9b9067;
  border-color: #665f48;
}

.mobile-show{
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
    /* width: 400px; */
    width: 320px;
    position: absolute;
    top: 0px;
    left: 100px;
    display: flex;
    font-size: 14px;
    margin-top: 22px;
    /* line-height: 80px; */
    line-height: 20px;
    opacity: 0;
    transition: 0.8s;
    pointer-events: none;

  }

  .moble-ul{
    width: 80px;
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
    z-index: -100;
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

  .management-moble{
    height: 45px;
    font-size: 12px;
    margin-top: -2px;
    margin-left: 10px;
  }

  .management-moble-noshow{
    display: none;
  }

  .mobile-show{
    display: initial;
  }

  .moble-ul-button{
    display: flex;
    width: 50px;
    margin-left: -20px;
    margin-top: 0px;
  }

}
</style>