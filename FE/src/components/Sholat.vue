<template>
  <div>
    <div class="card-header">
      <div style="font-size: 36px" v-html="text"></div>
    </div>

    <div class="row">
      <q-card class="card-time">
        <q-item>
          <q-item-section>
            <img src="/assets/images/bg/mute.png" width="180" height="180"/>
          </q-item-section>

          <q-item-section>
            <img src="/assets/images/bg/praying.png" width="180" height="180"/>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  props: ['text'],
  data() {
    return {};
  },
  async mounted() {},
  methods: {},
};
</script>
<style scoped>
.card-header {
  /* width: 100%; */
  /* border: 1px solid red; */
  /* color: #ffd152; */
  max-width: 100%;
  height: 30vh;
  font-size: 32px;
  font-family: "montserratextrabold";
  text-align: center;
  /* letter-spacing: 10px; */
  /* box-shadow: 0 0 29px 0 rgba(18, 66, 101, 0.5); */
  /* background: rgba(168, 218, 220, 0.3); */
  /* background-color: rgba(0, 0, 0, 0.2); */
  /* color: #fff1e6; */
  /* color: #2b2e42; */
  /* color: #F1FAEE; */
  color: #fff1e6;
  background: rgba(1, 51, 122, 0.3);
}

.card-time {
  /* width: 800px; */
  max-width: 100%;
  font-family: "montserratextrabold";
  text-align: center;
  /* letter-spacing: 10px; */
  font-size: 50px;
  margin: auto;
  /* background-color: rgba(0, 0, 0, 0.2); */
  background: rgba(1, 51, 122, 0.3);
  color: #fff1e6;
  /* color: #fff1e6; */
  /* color:rgb(0,128,128); */
  /* color: #ffd152; */
  /* background-color: none; */
  /* box-shadow: 0 0 29px 0 rgba(18, 66, 101, 0.5); */
  /* background: rgba(168, 218, 220, 0.3); */
  /* background-color: #fff1e6; */
  
}


</style>

