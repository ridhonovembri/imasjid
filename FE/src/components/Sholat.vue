<template>
  <div>
    <div class="card">
      <div v-html="text1"></div>
      <img :src="imgSrc" width="180" height="180"/>
      <div v-html="text2"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['text1', 'text2', 'imgSrc'],
  data() {
    return {};
  },
  setup(props) {
    // setup() receives props as the first argument.
  },
  methods: {},
};
</script>
<style scoped>
.card{
  max-width: 100%;
  height: 40vh;
  font-size: 32px;
  font-family: "montserratmedium";
  text-align: center;
  color: #124265;
}
</style>

