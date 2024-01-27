import { defineStore } from "pinia";
import Get from "@/api/http-get";
import axios from "axios";

export const useMasjidInfoStore = defineStore("masjidInfo", {
  state: () => ({
    masjidName: "x",
    masjidAddress: "",
    city: "",
    province: "",
    infos: [],
  }),
  getters: {
    getData() {
      return "masjid anamabas";
    },
    getInfo(state) {
      return state.infos;
    },
  },
  actions: {
    // setData(data) {
    //   console.log('masjidName', data.MasjidName)
    //   console.log('masjidAddress', data.MasjidAddress)
    //   console.log('city', data.City)
    //   console.log('province', data.Province)
    //   this.masjidName = data.MasjidName;
    //   this.masjidAddress = data.MasjidAddress;
    //   this.city = data.City;
    //   this.province = data.Province;
    // },
    async fetchInfo() {
      try {
        // this.configs = (await Get.masjidInfo()).data;
        // this.configs = data
        // const res = (await Get.masjidInfo()).data;

        const res = await axios.get('http://localhost:3000/api/masjidInfo')
        this.infos = res.data
      
        console.log("infos", this.infos);
        this.masjidName = res.MasjidName;
        this.masjidAddress = res.MasjidAddress;
        this.city = res.City;
        this.province = res.Province;

        this.infos = res;
        console.log("infos", this.infos);

      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
