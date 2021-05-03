<template>
  <div class="login">
    <LoginBox :type = "type"></LoginBox>
  </div>
</template>

<script>
import LoginBox from '../components/LoginBox.vue';

export default {
  components: {
    LoginBox
  },
  data() {
    return {
      type: "login"
    };
  }
};
</script>

<style scoped>

</style>