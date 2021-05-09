<template>
  <div class="done">
    <ThanksBox :type="type"></ThanksBox>
  </div>
</template>

<script>
import ThanksBox from "../components/ThanksBox.vue";

export default {
  components: {
    ThanksBox
  },
  props: ["commentNum"],
  data() {
    return {
      type: "done" + this.commentNum,
    };
  },
}
</script>

<style scoped>

</style>