<template>
  <div class="absolute-top-left q-pa-xs text-left">
    <div class="name">
      <i class="fas fa-mosque"></i>
      {{ MasjidName }}
    </div>
    <div class="address">
      {{ MasjidAddress }} - {{ City }} - {{ Province }}
    </div>
    <div class="date">
      {{ Today }} <i class="fas fa-calendar-alt"></i> {{ TodayHijrah }}
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "MasjidName",
    "MasjidAddress",
    "City",
    "Province",
    "Today",
    "TodayHijrah",
    "fontSizeMasjidname",
    "fontSizeMasjidaddress",
    "fontSizeDate"
  ],
  data() {
    return {};
  },
  async mounted() {},
  methods: {},
};
</script>

<style scoped>

.name {
  /* font-size: 40px; */
  font-size: v-bind('fontSizeMasjidname');
  color: #ffd152;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-family: 'montserratextrabold';
  font-weight: 700;
  letter-spacing: 3px;
}

.address {
  /* font-size: 20px; */
  font-size: v-bind('fontSizeMasjidaddress');
  padding-top: 5px;  
  color: #fff1e6;
  letter-spacing: 2px;
  font-family: 'montserratmedium';
  font-weight: 700;
}

.date {
  /* font-size: 18px; */
  font-size: v-bind('fontSizeDate');
  padding-top: 2px;  
  color: #fff1e6;
  letter-spacing: 2px;
  font-family: 'montserratmedium';
  font-weight: 700;
}

</style>
