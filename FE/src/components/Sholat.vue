<template>
  <div>
    <div class="card" v-bind:style="{ backgroundImage: 'url(' + bgSrc + ')'}" >
      <div v-html="text1"></div>
      <img :src="imgSrc" width="180" height="180"/>
      <div v-html="text2"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['text1', 'text2', 'imgSrc', 'bgSrc', 'fontSizeText'],
  data() {
    return {};
  },
  setup(props) {
    // setup() receives props as the first argument.
  },
  mounted(){
    // setInterval(() => this.playSound('/assets/sounds/SoundsBeep.mp3'), 1000);    
  },
  methods: {
    // playSound (sound) {
    //   console.log('playsound')
    //   // if(sound) {
    //     console.log('sound', sound)
    //     var audio = new Audio(sound);
    //     audio.play();
    //   // }
    // },
  },
};

</script>
<style scoped>
.card{
  max-width: 100%;
  height: 70vh;
  /* font-size: 42px; */
  font-size: v-bind('fontSizeText');
  font-family: "montserratmedium";
  text-align: center;
  color: #124265;
  background-image: 'url(' + bgSrc + ')';
}
</style>

