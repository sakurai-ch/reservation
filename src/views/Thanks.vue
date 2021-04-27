<template>
  <div class="thanks">
    <div class="login-box">
      <p>会員登録を完了しました</p>
      <button @click="$router.push({path: '/'})">店舗一覧へ戻る</button>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.thanks{
  max-width: 1000px;
}
.login-box{
  width: 80%;
  height: 500px;
  border: solid 1px;
  margin: auto;
}
</style>