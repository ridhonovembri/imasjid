<template>
  <div class="text-grey-1" :style="{'font-size': fontSizeMarquee}">
    <marquee>{{ text }} </marquee>
  </div>
</template>

<script>
import Get from '@/api/http-get'

export default {
  props: ["fontSizeMarquee"],
  data() {
    return {
      text:'',
      // fontSizeMarquee: this.fontSizeMarquee!=null?this.fontSizeMarquee: '36px'
    };
  },
  async mounted() {
    this.getText()
  },
  methods: {
    async getText(){
      this.marquees = (await (Get.masjidMarquee())).data
      // console.log('this.marquee', this.marquees)

      let marqueeText = this.marquees.map(function(item){
        return item.MarqueeText
      })

      this.text = marqueeText.join(`${'\xa0'.repeat(25)}`)
      // console.log('marqueeText', marqueeText)
    }
  },
};
</script>
<style scoped>
</style>
