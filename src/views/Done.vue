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
  data() {
    return {
      type: "done"
    };
  },
}
</script>

<style scoped>

</style>