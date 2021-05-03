<template>
  <div class="thanks">
    <ThanksBox :type="type"></ThanksBox>
  </div>
</template>

<script>
import ThanksBox from "../components/ThanksBox.vue";

export default {
  components: {
    ThanksBox
  },
  data() {
    return {
      type: "thanks"
    };
  }
}
</script>

<style scoped>

</style>