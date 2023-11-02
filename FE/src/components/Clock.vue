<template>
  <span class="text-h1 hour-minute"> {{ hour }}.</span>.
  <span class="text-h3 second">{{ second }}</span>
</template>
<script>
export default {
  props: ["hour", "second"],
  data() {
    return {};
  },
  async mounted() {},
  methods: {},
};
</script>
<style scoped>
.hour-minute {
  color: #ffd152;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-family: "montserratmedium";
  font-weight: 700;
  letter-spacing: 3px;
}

.second {
  color: #ffd152;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-family: "montserratmedium";
  font-weight: 700;
  letter-spacing: 3px;
}
</style>
