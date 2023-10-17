<template>
  <div style="height: 100vh">
    <q-card>
      <q-carousel
        v-model="currentSlide"
        animated
        infinite
        padding
        continue
        style="height: 100vh"
        :autoplay="autoplay"
      >
        <q-carousel-slide
          v-for="slide in slides"
          :key="slide.ImgName"
          :name="slide.ImgName"
          :img-src="slide.ImgSource"
        >
          <MasjidInfo
            :MasjidName="masjid.MasjidName"
            :MasjidAddress="masjid.MasjidAddress"
            :City="masjid.City"
            :Province="masjid.Province"
            :Today="today"
            :TodayHijrah="todayHijrah"
          />

          <div class="absolute-top-center">
            <q-card class="card-clock">
              <Clock :hour="clockHour" :second="clockSecond" />
            </q-card>
          </div>

          <div class="absolute-top-right">
            <q-card class="card-countdown">
              <CountDownAdzan v-if="showCountDownAdzan" :hour="countDownAdzanHour" :second="countDownAdzanSecond" :label="activeLabel"/>
            </q-card>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card>
  </div>
  <div class="q-pa-xs center-block">
    <PrepAdzan v-if="prepAdzan" :hour="countDownAdzanHour" :second="countDownAdzanSecond" :prayerName="activeLabel" :text="config.TextBeforeAdzan"/>
    <PrepIqomah v-else-if="prepIqomah" :hour="countDownIqomahHour" :second="countDownIqomahSecond" :text="config.TextBeforeIqomah"/>
    <Sholat v-else-if="sholat" :text="config.TextDuringSholat"/>
    <Hadist v-else />
  </div>
  <div class="q-pa-xs marquee">
    <MarqueeText />
  </div>
  <!-- <div class="row q-gutter-sm prayer-time"> -->
  <div class="row q-gutter-sm prayer-time">
    <q-card :class="activeLabel=='Shubuh' ? 'selected' : 'card-prayer'">
      <PrayerShubuh :time="prayerTime.Shubuh" :label="config.LabelShubuh" :isSelected="isSelected"/>
    </q-card>
    <q-card :class="activeLabel=='Syuruq' ? 'selected' : 'card-prayer'">
      <PrayerSyuruq :time="prayerTime.Syuruq" :label="config.LabelSyuruq" :isSelected="isSelected"/>
    </q-card>
    <q-card :class="activeLabel=='Dzuhur' ? 'selected' : 'card-prayer'">
      <PrayerDzuhur :time="prayerTime.Dzuhur" :label="config.LabelDzuhur" :isSelected="isSelected"/>
    </q-card>
    <q-card :class="activeLabel=='Ashar' ? 'selected' : 'card-prayer'">
      <PrayerAshar :time="prayerTime.Ashar" :label="config.LabelAshar" :isSelected="isSelected"/>
    </q-card>
    <q-card :class="activeLabel=='Maghrib' ? 'selected' : 'card-prayer'">
      <PrayerMaghrib :time="prayerTime.Maghrib" :label="config.LabelMaghrib" :isSelected="isSelected"/>
    </q-card>
    <q-card :class="activeLabel=='Isya' ? 'selected' : 'card-prayer'">
      <PrayerIsya :time="prayerTime.Isya" :label="config.LabelIsya" :isSelected="isSelected"/>
    </q-card>
  </div>
  <!-- <div class="row q-gutter-sm" >
    <q-btn color="teal" label="Button" v-for="n in 10" :key="n" />
    <div>column 1</div>
    <div>column 2</div>
    <div>column 3</div>
    <div>column 4</div>
    <div>column 5</div>
    <div>column 6</div>
  </div> -->
</template>

<script>
import PrayerShubuh from "@/components/PrayerShubuh.vue";
import PrayerSyuruq from "@/components/PrayerSyuruq.vue";
import PrayerDzuhur from "@/components/PrayerDzuhur.vue";
import PrayerAshar from "@/components/PrayerAshar.vue";
import PrayerMaghrib from "@/components/PrayerMaghrib.vue";
import PrayerIsya from "@/components/PrayerIsya.vue";
import Clock from "@/components/Clock.vue";

import Hadist from "@/components/Hadist.vue";
import MasjidInfo from "@/components/MasjidInfo.vue";
import PrepAdzan from "@/components/PrepAdzan.vue";
import PrepIqomah from "@/components/PrepIqomah.vue";
import Sholat from '@/components/Sholat.vue'
import MarqueeText from "@/components/MarqueeText.vue";
import CountDownAdzan from '@/components/CountDownAdzan.vue'
import CountDownIqomah from '@/components/CountDownIqomah.vue'

import Get from "@/api/http-get";
import HijrahDate from "hijrah-date";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import moment from "moment";

export default {
  components: {
    PrayerShubuh,
    PrayerSyuruq,
    PrayerDzuhur,
    PrayerAshar,
    PrayerMaghrib,
    PrayerIsya,
    Clock,
    Hadist,
    MasjidInfo,
    MarqueeText,
    PrepAdzan,
    PrepIqomah,
    Sholat,
    CountDownAdzan,
    CountDownIqomah
  },
  data() {
    return {
      currentSlide: "Img01",
      clockHour: "",
      clockSecond: "",
      countDownAdzanHour: "",
      countDownAdzanSecond: "",
      countDownIqomahHour: "",
      countDownIqomahSecond: "",
      marqueeText: "",
      prayTimeAll: "",
      today: "",
      todayHijrah: "",
      autoplay: 20000,
      activeLabel: "",
      prepAdzan: false,
      prepIqomah: false,
      sholat: false,
      showCountDownAdzan: false,
      showCountDownIqomah: false,
      isSelected: false,
      slides: {
        Id: "",
        ImgName: "",
        ImgDesc: "",
        ImgSource: "",
      },
      masjid: {
        MasjidName: "",
        MasjidAddress: "",
        City: "",
        Province: "",
        // Latitude: 0,
        // Longitude: 0,
      },
      prayerTime: {
        Shubuh: "",
        Syuruq: "",
        Dzuhur: "",
        Ashar: "",
        Maghrib: "",
        Isya: "",
      },
      config: {
        MinutesToAdzanShubuh: "",
        MinutesToAdzanDzuhur: "",
        MinutesToAdzanAshar: "",
        MinutesToAdzanMaghrib: "",
        MinutesToAdzanIsya: "",
        MinutesToIqomahShubuh: "",
        MinutesToIqomahDzuhur: "",
        MinutesToIqomahAshar: "",
        MinutesToIqomahMaghrib: "",
        MinutesToIqomahIsya: "",
        MinutesToAdzanPrep: "",
        LabelShubuh: '',
        LabelSyuruq: '',
        LabelDzuhur: '',
        LabelAshar: '',
        LabelMaghrib: '',
        LabelIsya: '',
        AdjustShubuh: '',
        AdjustSyuruq: '',
        AdjustDzuhur: '',
        AdjustAshar: '',
        AdjustMaghrib: '',
        AdjustIsya: '',
        Latitude: 0,
        Longitude: 0,
        TextBeforeAdzan: "",
        TextBeforeIqomah: "",
        TextDuringSholat:""
      },
    };
  },
  async unmounted(){

  },
  async created(){
    // console.log('start created')
    await this.getMasjidInfo();
    // console.log('getMasjidInfo DONE')
    await this.getMasjidConfig();
    // console.log('getMasjidConfid DONE')
    this.getPrayerTime();
    this.getSlides();
    this.getMarquee();
  },
  mounted() {
    // console.log('mounted')
    this.getToday();
    this.getTodayHijrah();
    setInterval(() => this.getClock(), 1000);
  },

  methods: {
    async getMasjidConfig() {
      // console.log('inside getMasjidConfig')
      const result = (await Get.masjidConfig()).data;
      // console.log("masjidConfig", result);

      this.config.LabelShubuh = result.LabelShubuh;
      this.config.LabelSyuruq = result.LabelSyuruq;
      this.config.LabelDzuhur = result.LabelDzuhur;
      this.config.LabelAshar = result.LabelAshar;
      this.config.LabelMaghrib = result.LabelMaghrib;
      this.config.LabelIsya = result.LabelIsya;

      this.config.MinutesToAdzanShubuh = result.MinutesToAdzanShubuh;
      this.config.MinutesToAdzanDzuhur = result.MinutesToAdzanDzuhur;
      this.config.MinutesToAdzanAshar = result.MinutesToAdzanAshar;
      this.config.MinutesToAdzanMaghrib = result.MinutesToAdzanMaghrib;
      this.config.MinutesToAdzanIsya = result.MinutesToAdzanIsya;

      this.config.MinutesToIqomahShubuh = result.MinutesToIqomahShubuh;
      this.config.MinutesToIqomahDzuhur = result.MinutesToIqomahDzuhur;
      this.config.MinutesToIqomahAshar = result.MinutesToIqomahAshar;
      this.config.MinutesToIqomahMaghrib = result.MinutesToIqomahMaghrib;
      this.config.MinutesToIqomahIsya = result.MinutesToIqomahIsya;

      this.config.MinutesToAdzanPrep = result.MinutesToAdzanPrep;

      this.config.AdjustShubuh = result.AdjustShubuh
      this.config.AdjustSyuruq = result.AdjustSyuruq
      this.config.AdjustDzuhur = result.AdjustDzuhur
      this.config.AdjustAshar = result.AdjustAshar
      this.config.AdjustMaghrib = result.AdjustMaghrib
      this.config.AdjustIsya = result.AdjustIsya

      this.config.Latitude = result.Latitude
      this.config.Longitude = result.Longitude

      this.config.TextBeforeAdzan = result.TextBeforeAdzan;
      this.config.TextBeforeIqomah = result.TextBeforeIqomah;
      this.config.TextDuringSholat = result.TextDuringSholat

      // console.log('this.config.AdjustShubuh', this.config.AdjustShubuh)
    },

    async getClock() {
      let today = new Date();

      //testing
      // let currentTime = moment(today).subtract(1027, "m");

      //actual
      let currentTime = moment(today);
      // console.log('currentTime', currentTime)

      const hour = moment(currentTime).format("HH:mm");
      const second = moment(currentTime).format("ss");
      // const time = moment(currentTime).format("HH:mm:ss");
      // console.log('hour', hour)
      // console.log('second', second)

      this.clockHour = hour;
      this.clockSecond = second;
      let distanceToAdzan = "";
      let distanceToIqomah = ""

      if (currentTime > moment(this.prayTimeAll.fajr).subtract(this.config.MinutesToAdzanShubuh,"m") && currentTime < moment(this.prayTimeAll.fajr).add(this.config.MinutesToIqomahShubuh+11, "m")) {
        this.isSelected = true
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.fajr, "HH:mm:ss").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahShubuh, "m")

        this.activeLabel = this.config.LabelShubuh;
        this.showCountDownAdzan = true
        this.countDownAdzanHour = distanceToAdzan.format("mm")
        this.countDownAdzanSecond = distanceToAdzan.format("ss")
        this.countDownIqomahHour = distanceToIqomah.format("mm")
        this.countDownIqomahSecond = distanceToAdzan.format("ss")

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          // console.log('countdown to adzan')
          this.showCountDownAdzan = false
          this.prepAdzan = true;
        }

        // //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.fajr) && moment(currentTime) <= moment(this.prayTimeAll.fajr).add(this.config.MinutesToIqomahShubuh, 'm')) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = true    
        }

        if (moment(currentTime) > moment(this.prayTimeAll.fajr).add(this.config.MinutesToIqomahShubuh, 'm')+10) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = false
          this.sholat = true 
        }

      } else if (currentTime > moment(this.prayTimeAll.dhuhr).subtract(this.config.MinutesToAdzanDzuhur,"m") && currentTime < moment(this.prayTimeAll.dhuhr).add(this.config.MinutesToIqomahDzuhur+11, "m")) {
        this.isSelected = true
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.dhuhr, "HH:mm:ss").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahDzuhur, "m")

        this.activeLabel = this.config.LabelDzuhur;
        this.showCountDownAdzan = true
        this.countDownAdzanHour = distanceToAdzan.format("mm")
        this.countDownAdzanSecond = distanceToAdzan.format("ss")
        this.countDownIqomahHour = distanceToIqomah.format("mm")
        this.countDownIqomahSecond = distanceToAdzan.format("ss")

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          // console.log('countdown to adzan')
          this.showCountDownAdzan = false
          this.prepAdzan = true;
        }

        // //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.dhuhr) && moment(currentTime) <= moment(this.prayTimeAll.dhuhr).add(this.config.MinutesToIqomahDzuhur, 'm')) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = true    
        }

        if (moment(currentTime) > moment(this.prayTimeAll.dhuhr).add(this.config.MinutesToIqomahDzuhur, 'm')+10) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = false
          this.sholat = true 
          this.activeLabel = ''
        }
        
      } else if (currentTime > moment(this.prayTimeAll.asr).subtract(this.config.MinutesToAdzanAshar,"m") && currentTime < moment(this.prayTimeAll.asr).add(this.config.MinutesToIqomahAshar+11, "m")) {
        this.isSelected = true
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.asr, "HH:mm:ss").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahAshar, "m")

        this.activeLabel = this.config.LabelAshar;
        this.showCountDownAdzan = true
        this.countDownAdzanHour = distanceToAdzan.format("mm")
        this.countDownAdzanSecond = distanceToAdzan.format("ss")
        this.countDownIqomahHour = distanceToIqomah.format("mm")
        this.countDownIqomahSecond = distanceToAdzan.format("ss")

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          // console.log('countdown to adzan')
          this.showCountDownAdzan = false
          this.prepAdzan = true;
        }

        // //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.asr) && moment(currentTime) <= moment(this.prayTimeAll.asr).add(this.config.MinutesToIqomahAshar, 'm')) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = true    
        }

        if (moment(currentTime) > moment(this.prayTimeAll.asr).add(this.config.MinutesToIqomahAshar, 'm')+10) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = false
          this.sholat = true 
          this.activeLabel = ''
        }
      } else if (currentTime > moment(this.prayTimeAll.maghrib).subtract(this.config.MinutesToAdzanMaghrib,"m") && currentTime < moment(this.prayTimeAll.maghrib).add(this.config.MinutesToIqomahMaghrib+11, "m")) {
        this.isSelected = true
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.maghrib, "HH:mm:ss").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahMaghrib, "m")

        this.activeLabel = this.config.LabelMaghrib;
        this.showCountDownAdzan = true
        this.countDownAdzanHour = distanceToAdzan.format("mm")
        this.countDownAdzanSecond = distanceToAdzan.format("ss")
        this.countDownIqomahHour = distanceToIqomah.format("mm")
        this.countDownIqomahSecond = distanceToAdzan.format("ss")

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          // console.log('countdown to adzan')
          this.showCountDownAdzan = false
          this.prepAdzan = true;
        }

        // //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.maghrib) && moment(currentTime) <= moment(this.prayTimeAll.maghrib).add(this.config.MinutesToIqomahMaghrib, 'm')) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = true    
        }

        if (moment(currentTime) > moment(this.prayTimeAll.maghrib).add(this.config.MinutesToIqomahMaghrib, 'm')+10) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = false
          this.sholat = true 
          this.activeLabel = ''
        }
      } else if (currentTime > moment(this.prayTimeAll.isha).subtract(this.config.MinutesToAdzanIsya,"m") && currentTime < moment(this.prayTimeAll.isha).add(this.config.MinutesToIqomahIsya+11, "m")) {
        this.isSelected = true
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.isha, "HH:mm:ss").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahIsya, "m")

        this.activeLabel = this.config.LabelIsya;
        this.showCountDownAdzan = true
        this.countDownAdzanHour = distanceToAdzan.format("mm")
        this.countDownAdzanSecond = distanceToAdzan.format("ss")
        this.countDownIqomahHour = distanceToIqomah.format("mm")
        this.countDownIqomahSecond = distanceToAdzan.format("ss")

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          this.showCountDownAdzan = false
          this.prepAdzan = true;
        }

        // //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.isha) && moment(currentTime) <= moment(this.prayTimeAll.isha).add(this.config.MinutesToIqomahIsya, 'm')) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = true    
        }

        if (moment(currentTime) > moment(this.prayTimeAll.isha).add(this.config.MinutesToIqomahIsya, 'm')+10) {
          this.showCountDownAdzan = false
          this.prepAdzan = false
          this.prepIqomah = false
          this.sholat = true 
          this.activeLabel = ''
        }
        
      } 
      else{
        this.sholat = false
        this.activeLabel = ''        
      }      
    },

    async getMarquee() {
      let content =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eligendi, iusto vitae, accusantium rem, dolor atque quas omnis quo autem quod! Harum amet voluptatum aspernatur dolor reprehenderit rerum, magnam";
      this.marqueeText = content;
    },

    async getSlides() {
      this.slides = (await Get.slides()).data;
    },

    async getMasjidInfo() {
      // console.log('iniside getMasjidInfo')
      this.masjid = (await Get.masjidInfo()).data;

      // console.log('this.masjidx', this.masjid)
      // console.log('this.masjidx', this.masjid.Latitude)
      // console.log('this.masjidx', this.masjid.Longitude)
    },

    async getToday() {
      const now = new Date();
      let day = now.getDay();
      let date = now.getDate();
      let month = now.getMonth();
      let year = now.getFullYear();

      // console.log(day);
      // let hari = "";

      switch (day) {
        case 0:
          day = "Ahad";
          break;
        case 1:
          day = "Senin";
          break;
        case 2:
          day = "Selasa";
          break;
        case 3:
          day = "Rabu";
          break;
        case 4:
          day = "Kamis";
          break;
        case 5:
          day = "Jumat";
          break;
        case 6:
          day = "Sabtu";
          break;
      }

      switch (month) {
        case 0:
          month = "Januari";
          break;
        case 1:
          month = "Februari";
          break;
        case 2:
          month = "Maret";
          break;
        case 3:
          month = "April";
          break;
        case 4:
          month = "Mei";
          break;
        case 5:
          month = "Juni";
          break;
        case 6:
          month = "Juli";
          break;
        case 7:
          month = "Agustus";
          break;
        case 8:
          month = "September";
          break;
        case 9:
          month = "Oktober";
          break;
        case 10:
          month = "November";
          break;
        case 11:
          month = "Desember";
          break;
      }

      // console.log(day, "-", date, "-", month, "-", year);
      let today = day + ", " + date + " " + month + " " + year;

      this.today = today;

      // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    },

    async getTodayHijrah() {
      let hijrahDate = new HijrahDate();

      let day = hijrahDate.getDay();
      let date = hijrahDate.getDate();
      let month = hijrahDate.getMonth() + 1;
      let year = hijrahDate.getFullYear();

      switch (day) {
        case 0:
          day = "Al Ahad";
          break;
        case 1:
          day = "Al Itsnain";
          break;
        case 2:
          day = "Al Tsulasa";
          break;
        case 3:
          day = "Al Arbi’aa’";
          break;
        case 4:
          day = "Al Khomiis";
          break;
        case 5:
          day = "Al Jumu’ah";
          break;
        case 6:
          day = "As Sabtu";
          break;
      }

      switch (month) {
        case 1:
          month = "Muharram";
          break;
        case 2:
          month = "Shafar";
          break;
        case 3:
          month = "Rabi'ul Awwal";
          break;
        case 4:
          month = "Rabi'ul Akhir";
          break;
        case 5:
          month = "Jumadil";
          break;
        case 6:
          month = "Jumadil Akhir";
          break;
        case 7:
          month = "Rajab";
          break;
        case 8:
          month = "Sya'ban";
          break;
        case 9:
          month = "Ramadhan";
          break;
        case 10:
          month = "Syawwal";
          break;
        case 11:
          month = "Dzulqo’dah";
          break;
        case 12:
          month = "Dzulhijjah";
          break;
      }

      let today = day + ", " + date + " " + month + " " + year;

      this.todayHijrah = today;

      // console.log('hijrahDate', day,'-', date,'-',month,'-', year)
    },

    async getPrayerTime() {
      const today = new Date();
      const latitude = parseFloat(this.config.Latitude)
      const longitude = parseFloat(this.config.Longitude)

      // console.log('nilai latitude', this.config.Latitude + ',' + this.config.Longitude)

      let params = CalculationMethod.Singapore();

      // if (latitude > 0 and lo)
      const coordinates = new Coordinates(
        // 0.406393, 101.845164
        // 1.117, 104.04
        // this.config.Latitude, this.config.Longitude
        latitude, longitude
      );

      // console.log('coordinates', coordinates)

      const prayerTimes = new PrayerTimes(coordinates, today, params);
      // console.log("prayerTimes", prayerTimes);
      // console.log('adjust Shubuh', this.config.AdjustShubuh)



      this.prayerTime.Shubuh = moment(prayerTimes.fajr).add(this.config.AdjustShubuh, 'm').format("HH:mm");
      this.prayerTime.Syuruq = moment(prayerTimes.sunrise).add(this.config.AdjustSyuruq, 'm').format("HH:mm");
      this.prayerTime.Dzuhur = moment(prayerTimes.dhuhr).add(this.config.AdjustDzuhur, 'm').format("HH:mm");
      this.prayerTime.Ashar = moment(prayerTimes.asr).add(this.config.AdjustAshar, 'm').format("HH:mm");
      this.prayerTime.Maghrib = moment(prayerTimes.maghrib).add(this.config.AdjustMaghrib, 'm').format("HH:mm");
      this.prayerTime.Isya = moment(prayerTimes.isha).add(this.config.AdjustIsya, 'm').format("HH:mm");
      this.clock = moment(new Date()).format("HH:mm:ss");
      this.prayTimeAll = prayerTimes;

      // console.log("Shubuh", this.prayerTimes.Shubuh);
      // console.log("Dzuhur", this.prayerTimes.Dzuhur);
      // console.log("Ashar", this.prayerTimes.Ashar);
      // console.log("Maghrib", this.prayerTimes.Maghrib);
      // console.log("Isya", this.prayerTimes.Isya);
      // console.log("Syuruq", this.prayerTimes.Syuruq);
    },
  },
};
</script>

<style scoped>

.card-prayer {
  width: 100%;
  max-width: 16%;
  margin: auto;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background: rgba(168, 218, 220, 0.3);
  color: #ffd152;
}

.card-clock {
  width: 25%;
  background-color: rgba(0, 0, 0, 0.2);
  margin: auto;
}

.card-countdown {
  /* width: 20%; */
  /* max-width: 16%; */
  /* margin-right: 5%; */
  /* background-color: rgba(0, 0, 0, 0.2); */
  color: #fff1e6;
  background: #124265; 
}

/* .custom-caption {
  text-align: left;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
} */

.marquee {
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 20vh;
  /* right:0px; */
}

/* .count-down {
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 28%;
  right:0px;
} */

.prayer-time {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 6%;
  /* background: rgba(168, 218, 220, 0.3); */
}

.center-block {
  position: absolute;
  top:45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 450px;
  /* padding: 0px; */
  /* background-color: rgba(0, 0, 0, 0.2); */
  /* background-color: black; */
  text-align: center;
}

.selected {
  width: 100%;
  max-width: 16%;
  margin: auto;
  color: #fff1e6;
  /* background-color: #ffd152; */
  /* background-color: rgb(0,128,128) */
  /* color: rgb(255,127,80); */
  /* background: #1d3557; */
  /* background: #f77f00; */
  background: #124265; 

}

</style>
