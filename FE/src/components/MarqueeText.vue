<template>
  <div class="text-h4 text-grey-1">
    <marquee>{{ text }}</marquee>
  </div>
</template>
<script>
import Get from '@/api/http-get'

export default {
  // props: ["MarqueeText"],
  data() {
    return {
      // marquees: [{
      //   MarqueeText:''
      // }],
      text:''
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
<style></style>
