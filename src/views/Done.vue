<template>
  <div class="done">
    <div class="login-box">
      <p>予約を完了しました</p>
      <button @click="$router.push({path: '/mypage'})">マイページへ</button>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.done{
  max-width: 1000px;
}
.login-box{
  width: 80%;
  height: 500px;
  border: solid 1px;
  margin: auto;
}
</style>