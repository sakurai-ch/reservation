<template>
  <div class="header">
    <div class="text-area">
      <div>ロゴ</div>
      <div>
        <li v-if=$store.state.auth class="menu">
          <ul><a @click="$router.push({path: '/'})">店舗一覧</a></ul>
          <ul><a @click="$router.push({path: '/mypage'})">マイページ</a></ul>
          <ul><a @click="$store.dispatch('logout')">ログアウト</a></ul>
        </li>
        <li v-else class="menu">
          <ul><a @click="$router.push({path: '/'})">店舗一覧</a></ul>
          <ul><a @click="$router.push({path: '/register'})">会員登録</a></ul>
          <ul><a @click="$router.push({path: '/login'})">ログイン</a></ul>
        </li>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.header{
  background-color: orange;
  height: 50px;

}

.text-area{
  display: flex;
  justify-content: space-between;

  max-width:900px;
  margin: auto;
}

.menu{
  display: flex;
}
</style>