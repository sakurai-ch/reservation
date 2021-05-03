<template>
  <div class="register">
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
      type: "register"
    };
  }
};
</script>

<style scoped>

</style>