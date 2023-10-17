<template>
  <div class="text-grey-1 block" v-for="hadist in hadists" :key="hadist.Id">
    <h4>{{ hadist.HadistContent }}</h4>
    <h5>{{ hadist.HadistFrom }}</h5>    
  </div>
</template>
<script>
import Get from '@/api/http-get'
export default {
//   props: ["time"],
  data() {
    return {
      hadists: [{
        HadistContent: '',
        HadistFrom: ''
      }]
    };
  },
  async mounted() {
    setInterval(() => this.getHadist(), 10000);    
  },
  methods: {
    async getHadist(){
      // console.log('show hadist')
      this.hadists = (await Get.masjidHadistRandom()).data;
      // console.log('hadists', this.hadists)


    }
  },
};
</script>
<style scoped>
.block {
  /* border: 1px solid black; */
  /* padding: 0px; */
  position: absolute;
  top:45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 450px;
  /* padding: 0px; */
  background-color: rgba(0, 0, 0, 0.2);
  /* background-color: black; */
  /* text-align: center; */
}

</style>
