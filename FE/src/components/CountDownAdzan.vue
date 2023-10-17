<template>
  <div class="text-h3 text-weight-bold">{{ label }} - {{ hour }}.<span class="text-h4">{{ second }}</span></div>  
</template>
<script>
export default {
  props: ['label', 'hour', 'second'],
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
