<template>
  <span class="hour-minute"> {{ hour }}.</span>.
  <span class="second">{{ second }}</span>
</template>
<script>
export default {
  props: ["hour", "second","fontSizeClockHourMinute", "fontSizeClockSecond"],
  data() {},
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
  /* font-size: 110px; */
  font-size: v-bind('fontSizeClockHourMinute');
}

.second {
  color: #ffd152;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-family: "montserratmedium";
  font-weight: 700;
  letter-spacing: 3px;
  /* font-size: 56px; */
  font-size: v-bind('fontSizeClockSecond');
}
</style>
