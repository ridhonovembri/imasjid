<template>
  <div class="text-weight-bold" style="padding:0 10px;">    
    <span :style="{'font-size': fontSizeLabel}">{{ label }}</span>
    <i class="far fa-clock" style="font-size: 24px;margin:0 10px"></i>
    <span :style="{'font-size': fontSizeLabel}">{{ minute }}.</span> 
    <span :style="{'font-size': fontSizeLabel}">{{ second }}</span>
  </div>  
</template>
<script>
export default {
  props: ['label', 'minute', 'second', 'fontSizeLabel'],
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
<style></style>
