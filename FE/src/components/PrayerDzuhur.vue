<template>
  <div class="text-h4 prayer-name">{{ label }}</div>
  <div class="text-h1 prayer-time">{{ time }}</div>
</template>

<script>
export default {
  props: ['time', 'label'],
  data() {   
    return {    
    };
  },
  async mounted() {
  },
  methods: {    
  },
};
</script>
<style scoped>
.prayer-name {
  /* color: #ffd152; */
  /* color: #495057; */
  margin: 0;
  padding: 0;
  line-height: 1;
  font-family: 'montserratmedium';
  font-weight: 700;
  letter-spacing: 3px;
}

.prayer-time {  
  /* color: #ffd152; */
  /* color: #495057; */
  margin: 0;
  padding: 0;
  line-height: 1;
  font-family: 'montserratmedium';
  font-weight: 700;
  letter-spacing: 3px;
}


</style>
