import { defineStore } from "pinia";
import { ref } from 'vue'
import Get from "@/api/http-get";

// export const useMasjidConfigStore = defineStore('masjidConfig' ,{
export const useMasjidConfigStore = defineStore("masjidConfig", () => {
  // state: () => ({
  //   count: 6,
  //   name: 'Eduardo',
  //   masjidConfig: []
  // }),
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  //   getMasjidConfig: (state) => state.masjidConfig
  // },
  // actions: {
  //   increment() {
  //     this.count++;
  //   },
  //   fetchMasjidConfig(){
  //     try {
  //       Get.masjidConfig().then(data => {
  //         console.log('data', data.data)
  //         this.masjidConfig = data.data
  //       })

  //       // console.log('result', result.LabelShubuh)
  //       // this.masjidConfig = result
  //     }
  //     catch(e){
  //       console.log('error', e)
  //     }
  //   }
  // },

  const configs = ref([]);

  function getConfig() {
    Get.masjidConfig()
      .then((res) => {
        // console.log("data", res.data);
        // this.masjidConfig = data.data;
        configs.value = res.data
        // console.log("configs.value", configs.value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Runs the very first time the store is used. i.e., when the store is initialized.
  getConfig();

  return {
    configs,
    getConfig,
  };
});
