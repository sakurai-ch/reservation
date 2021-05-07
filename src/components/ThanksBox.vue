<template>
  <div class="thanks-box">
    <div 
      v-if="type=='thanks'" 
      key="title-type"
    >
      <p class="title" >会員登録を完了しました</p>
    </div>
    <div 
      v-else-if="type=='done1'" 
      key="title-type"
    >
      <p class="title">予約を完了しました</p>
    </div>
    <div 
      v-else-if="type=='done2'" 
      key="title-type"
    >
      <p class="title">予約を変更しました</p>
    </div>
    <div 
      v-else-if="type=='done3'" 
      key="title-type"
    >
      <p class="title">予約を取消しました</p>
    </div>

    <button 
      v-if="type=='thanks'" 
      key="button-type" 
      @click="$router.push({path: '/'})"
      class="input-box input-width122 input-box-button"
    >店舗一覧へ</button>
    <button 
      v-else-if="type=='done1' || type=='done2' || type=='done3'" 
      key="button-type" 
      @click="$router.push({path: '/mypage'})" 
      class="input-box input-width122 input-box-button"
    >マイページへ</button>
  </div>
</template>

<script>
export default {
  props:{
    type: String
  }
}
</script>

<style scoped>
.title{
  font-size: 24px;
  margin-top: 140px;
  margin-bottom: 30px;
}

.thanks-box{
  box-sizing: border-box;
  width: 950px;
  height: 430px;
  margin: 60px auto;
  border: solid 2px #c4c4c4;
  border-radius: 10px;
}

@media screen and (max-width : 480px){
  .thanks-box{
    width: 95%;
  }
}
</style>