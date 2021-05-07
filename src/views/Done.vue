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
  props: ["commentNom"],
  data() {
    return {
      type: "done" + this.commentNom,
    };
  },
}
</script>

<style scoped>

</style>