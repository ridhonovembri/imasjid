<template>
  <div style="height: 100vh">
    <q-card>
      <q-carousel
        v-model="currentSlide"
        infinite
        style="height: 100vh"
        :autoplay="autoplay"
        animated
        transition-duration="800"
      >
        <q-carousel-slide
          v-for="slide in slides"
          :key="slide.ImgName"
          :name="slide.ImgName"
          :img-src="slide.ImgSource"
        >
        
          <MasjidInfo
            v-show="!sholat"
            :MasjidName="masjid.MasjidName"
            :MasjidAddress="masjid.MasjidAddress"
            :City="masjid.City"
            :Province="masjid.Province"
            :Today="today"
            :TodayHijrah="todayHijrah"
            :fontSizeMasjidname="config.FontSizeMasjidname"
            :fontSizeMasjidaddress="config.FontSizeMasjidaddress"
            :fontSizeDate="config.FontSizeDate"
            style="margin-left: 10px; background-color: rgba(0, 0, 0, 0.7)"            
          />
        

          <div class="absolute-top-center" v-show="!sholat">
            <q-card class="card-clock">
              <Clock
                :hour="clockHour"
                :second="clockSecond"
                :fontSizeClockHourMinute="config.FontSizeClockHourMinute"
                :fontSizeClockSecond="config.FontSizeClockSecond"
              />
            </q-card>
          </div>

          <div class="absolute-top-right" v-show="!sholat" style="margin: 15px">
            <q-card class="card-countdown">
              <CountDownAdzan
                v-if="showCountDownAdzan"
                :minute="countDownAdzanHour"
                :second="countDownAdzanSecond"
                :label="activeLabel"
                :fontSizeLabel="config.FontSizeMasjidname"
              />
            </q-card>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card>
  </div>
  <div class="q-pa-xs center-block">
    <PrepAdzan
      v-if="prepAdzan"
      :hour="countDownAdzanHour"
      :second="countDownAdzanSecond"
      :prayerName="activeLabel"
      :text="config.TextBeforeAdzan"
      :fontSizePrayerName="config.FontSizeHadist"
      :fontSizeText="config.FontSizeMarquee"
      :fontSizeClock="config.FontSizeClockHourMinute"
      :fontSizeClockLabel="config.FontSizeClockSecond"
    />
    <PrepIqomah
      v-else-if="prepIqomah"
      :hour="countDownIqomahHour"
      :second="countDownIqomahSecond"
      :text="config.TextBeforeIqomah"
      :fontSizePrayerName="config.FontSizeHadist"
      :fontSizeText="config.FontSizeMarquee"
      :fontSizeClock="config.FontSizeClockHourMinute"
      :fontSizeClockLabel="config.FontSizeClockSecond"
    />
    <Sholat
      v-else-if="sholat"
      :text1="config.TextDuringSholat1"
      :text2="config.TextDuringSholat2"
      :imgSrc="config.IconDuringSholat"
      :bgSrc="config.BgImgSholat"
      :fontSizeText="config.FontSizeHadist"
    />
    <Hadist v-else :fontSizeHadist="config.FontSizeHadist" />
  </div>

  <div class="q-pa-xs marquee" v-show="!sholat">
    <MarqueeText :fontSizeMarquee="config.FontSizeMarquee" />
  </div>

  <!-- <div class="row q-gutter-sm prayer-time"> -->
  <div class="row q-gutter-sm prayer-time" v-show="!sholat">
    <q-card :class="activeLabel == 'Shubuh' ? 'selected' : 'card-prayer'">
      <PrayerShubuh
        :time="prayerTime.Shubuh"
        :label="config.LabelShubuh"
        :isSelected="isSelected"
        :fontSizePrayerlabel="config.FontSizePrayerlabel"
        :fontSizePrayertime="config.FontSizePrayertime"
      />
    </q-card>
    <q-card :class="activeLabel == 'Syuruq' ? 'selected' : 'card-prayer'">
      <PrayerSyuruq
        :time="prayerTime.Syuruq"
        :label="config.LabelSyuruq"
        :isSelected="isSelected"
        :fontSizePrayerlabel="config.FontSizePrayerlabel"
        :fontSizePrayertime="config.FontSizePrayertime"
      />
    </q-card>
    <q-card :class="activeLabel == 'Dzuhur' ? 'selected' : 'card-prayer'">
      <PrayerDzuhur
        :time="prayerTime.Dzuhur"
        :label="config.LabelDzuhur"
        :isSelected="isSelected"
        :fontSizePrayerlabel="config.FontSizePrayerlabel"
        :fontSizePrayertime="config.FontSizePrayertime"
      />
    </q-card>
    <q-card :class="activeLabel == 'Ashar' ? 'selected' : 'card-prayer'">
      <PrayerAshar
        :time="prayerTime.Ashar"
        :label="config.LabelAshar"
        :isSelected="isSelected"
        :fontSizePrayerlabel="config.FontSizePrayerlabel"
        :fontSizePrayertime="config.FontSizePrayertime"
      />
    </q-card>
    <q-card :class="activeLabel == 'Maghrib' ? 'selected' : 'card-prayer'">
      <PrayerMaghrib
        :time="prayerTime.Maghrib"
        :label="config.LabelMaghrib"
        :isSelected="isSelected"
        :fontSizePrayerlabel="config.FontSizePrayerlabel"
        :fontSizePrayertime="config.FontSizePrayertime"
      />
    </q-card>
    <q-card :class="activeLabel == 'Isya' ? 'selected' : 'card-prayer'">
      <PrayerIsya
        :time="prayerTime.Isya"
        :label="config.LabelIsya"
        :isSelected="isSelected"
        :fontSizePrayerlabel="config.FontSizePrayerlabel"
        :fontSizePrayertime="config.FontSizePrayertime"
      />
    </q-card>
  </div>
  <div class="footer">
    <p class="footer-left">
      <i
        class="fas fa-user-cog"
        @click="openDashboard()"
        style="cursor: pointer"
      ></i>
      iMasjid 2.0
      <i class="far fa-copyright"></i>{{ masjid.MasjidName }}
    </p>
    <p class="footer-right">
      <i class="fas fa-phone-alt"></i> +62821-711-88500
      <i class="fab fa-github" style="font-size: 18px"></i>
      https://github.com/ridhonovembri/imasjid
    </p>
  </div>

  <audio id="beep-adzan">
    <source src="/assets/sounds/SoundsBeepAdzan.mp3" type="audio/mpeg"/>
  </audio>

  <audio id="beep-iqomah">
    <source src="/assets/sounds/SoundsBeepIqomah.mp3" type="audio/mpeg"/>
  </audio>
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
import Sholat from "@/components/Sholat.vue";
import MarqueeText from "@/components/MarqueeText.vue";
import CountDownAdzan from "@/components/CountDownAdzan.vue";

import Get from "@/api/http-get";
import HijrahDate from "hijrah-date";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import moment from "moment";
import Router from "@/router/index";

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
      prayTimeAll: "",
      today: "",
      todayHijrah: "",
      autoplay: 0,
      activeLabel: "",
      prepAdzan: false,
      prepIqomah: false,
      sholat: false,
      jumat: false,
      showCountDownAdzan: false,
      showCountDownIqomah: false,
      isSelected: false,
      slides: {
        Id: "",
        Sequence: 0,
        ImgName: "",
        ImgDesc: "",
        ImgSource: "",
      },
      masjid: {
        MasjidName: "",
        MasjidAddress: "",
        City: "",
        Province: "",
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
        MinutesToAdzanShubuh: 0,
        MinutesToAdzanDzuhur: 0,
        MinutesToAdzanAshar: 0,
        MinutesToAdzanMaghrib: 0,
        MinutesToAdzanIsya: 0,
        MinutesToIqomahShubuh: 0,
        MinutesToIqomahDzuhur: 0,
        MinutesToIqomahAshar: 0,
        MinutesToIqomahMaghrib: 0,
        MinutesToIqomahIsya: 0,
        MinutesToAdzanPrep: 0,
        LabelShubuh: "",
        LabelSyuruq: "",
        LabelDzuhur: "",
        LabelAshar: "",
        LabelMaghrib: "",
        LabelIsya: "",
        AdjustShubuh: 0,
        AdjustSyuruq: 0,
        AdjustDzuhur: 0,
        AdjustAshar: 0,
        AdjustMaghrib: 0,
        AdjustIsya: 0,
        Latitude: 0,
        Longitude: 0,
        TextBeforeAdzan: "",
        TextBeforeIqomah: "",
        TextDuringSholat1: "",
        TextDuringSholat2: "",
        BgImgSholat: "",
        IconDuringSholat: "",
        IntervalSlide: 0,
        IntervalHadist: 0,
        SholatDuration: 0,
        SoundLocation: "",
        FontSizeMasjidname: "",
        FontSizeMasjidaddress: "",
        FontSizeDate: "",
        FontSizeClockHourMinute: "",
        FontSizeClockSecond: "",
        FontSizeHadist: "",
        FontSizeMarquee: "",
        FontSizePrayerlabel: "",
        FontSizePrayertime: "",
        IsBeep: "Y",
      },
    };
  },

  async created() {
    await this.getMasjidConfig();
    await this.getMasjidInfo();
    await this.getPrayerTime();
    await this.getSlides();
    this.getToday();
    this.getTodayHijrah();
  },

  mounted() {
    setInterval(() => this.getClock(), 1000);
  },

  methods: {

    playBeepAdzan() {
      var sound=document.getElementById("beep-adzan");
      sound.play();
    },

    playBeepIqomah() {
      var sound=document.getElementById("beep-iqomah");
      sound.play();
    },

    openDashboard() {
      let route = this.$router.resolve({ path: "/dashboard" });
      window.open(route.href);
    },

    async getMasjidConfig() {
      const result = (await Get.masjidConfig()).data;

      // console.log('result', result)

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

      this.config.AdjustShubuh = result.AdjustShubuh;
      this.config.AdjustSyuruq = result.AdjustSyuruq;
      this.config.AdjustDzuhur = result.AdjustDzuhur;
      this.config.AdjustAshar = result.AdjustAshar;
      this.config.AdjustMaghrib = result.AdjustMaghrib;
      this.config.AdjustIsya = result.AdjustIsya;

      this.config.Latitude = result.Latitude;
      this.config.Longitude = result.Longitude;

      this.config.TextBeforeAdzan = result.TextBeforeAdzan;
      this.config.TextBeforeIqomah = result.TextBeforeIqomah;
      this.config.TextDuringSholat1 = result.TextDuringSholat1;
      this.config.TextDuringSholat2 = result.TextDuringSholat2;
      this.config.BgImgSholat = result.BgImgSholat;
      this.config.IconDuringSholat = result.IconDuringSholat;
      this.config.IntervalSlide = result.IntervalSlide;
      this.config.IntervalHadist = result.IntervalHadist;
      this.config.SholatDuration = result.SholatDuration;
      this.config.SoundLocation = result.SoundLocation;
      this.config.FontSizeMasjidname = result.FontSizeMasjidname + "px";
      (this.config.FontSizeMasjidaddress = result.FontSizeMasjidaddress + "px"),
      (this.config.FontSizeDate = result.FontSizeDate + "px"),
      (this.config.FontSizeClockHourMinute = result.FontSizeClockHourMinute + "px"),
      (this.config.FontSizeClockSecond = result.FontSizeClockSecond + "px"),
      (this.config.FontSizeHadist = result.FontSizeHadist + "px"),
      (this.config.FontSizeMarquee = result.FontSizeMarquee + "px"),
      (this.config.FontSizePrayerlabel = result.FontSizePrayerlabel + "px");
      this.config.FontSizePrayertime = result.FontSizePrayertime + "px";

      this.autoplay = result.IntervalSlide;
      // console.log('this.config', this.config)
    },

    async getMasjidInfo() {
      this.masjid = (await Get.masjidInfo()).data;
    },

    async getSlides() {
      this.slides = (await Get.getSlides()).data;
      // console.log('this.slides', this.slides)
    },

    async getPrayerTime() {
      const today = new Date();
      const latitude = parseFloat(this.config.Latitude);
      const longitude = parseFloat(this.config.Longitude);

      // console.log('nilai latitude', this.config.Latitude + ',' + this.config.Longitude)

      let params = CalculationMethod.Singapore();

      // if (latitude > 0 and lo)
      const coordinates = new Coordinates(
        // 0.406393, 101.845164
        // 1.117, 104.04
        // this.config.Latitude, this.config.Longitude
        latitude,
        longitude
      );

      // console.log('coordinates', coordinates)

      const prayerTimes = new PrayerTimes(coordinates, today, params);

      this.prayerTime.Shubuh = moment(prayerTimes.fajr).add(this.config.AdjustShubuh, "m").format("HH:mm");
      this.prayerTime.Syuruq = moment(prayerTimes.sunrise).add(this.config.AdjustSyuruq, "m").format("HH:mm");
      this.prayerTime.Dzuhur = moment(prayerTimes.dhuhr).add(this.config.AdjustDzuhur, "m").format("HH:mm");
      this.prayerTime.Ashar = moment(prayerTimes.asr).add(this.config.AdjustAshar, "m").format("HH:mm");
      this.prayerTime.Maghrib = moment(prayerTimes.maghrib).add(this.config.AdjustMaghrib, "m").format("HH:mm");
      this.prayerTime.Isya = moment(prayerTimes.isha).add(this.config.AdjustIsya, "m").format("HH:mm");
      this.clock = moment(new Date()).format("HH:mm:ss");
      this.prayTimeAll = prayerTimes;
    },

    async getClock() {

      let today = new Date();

      //testing
      // let currentTime = moment(today).add(103, "m");

      //actual
      let currentTime = moment(today);

      const hour = moment(currentTime).format("HH:mm");
      const second = moment(currentTime).format("ss");

      let hourToRefresh = moment(currentTime).format("HH:mm")

      // console.log('hour', hourToRefresh)

      if (hourToRefresh == '01:00') {
        location.reload();
      }

      this.clockHour = hour;
      this.clockSecond = second;
      let distanceToAdzan = "";
      let distanceToIqomah = "";

      if (currentTime > moment(this.prayTimeAll.fajr).add(this.config.AdjustShubuh, "m").subtract(this.config.MinutesToAdzanShubuh, "m") && currentTime < moment(this.prayTimeAll.fajr).add(this.config.AdjustShubuh + this.config.MinutesToIqomahShubuh + this.config.SholatDuration,"m")) {
        this.isSelected = true;
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.fajr, "HH:mm:ss").add(this.config.AdjustShubuh, "m").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahShubuh,"m");

        this.activeLabel = this.config.LabelShubuh;
        this.showCountDownAdzan = true;
        this.countDownAdzanHour = distanceToAdzan.format("mm");
        this.countDownAdzanSecond = distanceToAdzan.format("ss");
        this.countDownIqomahHour = distanceToIqomah.format("mm");
        this.countDownIqomahSecond = distanceToAdzan.format("ss");

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          this.showCountDownAdzan = false;
          this.prepAdzan = true;
        }

        //playbeep adzan shubuh
        if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.fajr).add(this.config.AdjustShubuh,"m").format("HH:mm:ss")) {      
          this.playBeepAdzan();
        }

        //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.fajr).add(this.config.AdjustShubuh, "m") && moment(currentTime) <= moment(this.prayTimeAll.fajr).add(this.config.AdjustShubuh + this.config.MinutesToIqomahShubuh + this.config.SholatDuration,"m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = true;
        }

        //playbeep iqomah shubuh
        if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.fajr).add(this.config.AdjustShubuh + this.config.MinutesToIqomahShubuh,"m").format("HH:mm:ss")) {      
          this.playBeepIqomah();
        }
        
        //start to sholat        
        if (moment(currentTime) > moment(this.prayTimeAll.fajr).add(this.config.AdjustShubuh + this.config.MinutesToIqomahShubuh,"m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = false;
          this.sholat = true;
          this.activeLabel = "";
          this.currentSlide = "xx";
          this.autoplay = false;
        }
      } else if (currentTime > moment(this.prayTimeAll.dhuhr).add(this.config.AdjustDzuhur, "m").subtract(this.config.MinutesToAdzanDzuhur, "m") && currentTime < moment(this.prayTimeAll.dhuhr).add(this.config.AdjustDzuhur + this.config.MinutesToIqomahDzuhur + this.config.SholatDuration,"m")) {
        this.isSelected = true;
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.dhuhr, "HH:mm:ss").add(this.config.AdjustDzuhur, "m").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahDzuhur,"m");

        this.activeLabel = this.config.LabelDzuhur;
        this.showCountDownAdzan = true;
        this.countDownAdzanHour = distanceToAdzan.format("mm");
        this.countDownAdzanSecond = distanceToAdzan.format("ss");
        this.countDownIqomahHour = distanceToIqomah.format("mm");
        this.countDownIqomahSecond = distanceToAdzan.format("ss");

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          this.showCountDownAdzan = false;
          this.prepAdzan = true;
        }

        //playbeep adzan dzuhur
        if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.dhuhr).add(this.config.AdjustDzuhur,"m").format("HH:mm:ss")) {      
          this.playBeepAdzan();
        }

        //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.dhuhr).add(this.config.AdjustDzuhur, "m") && moment(currentTime) <= moment(this.prayTimeAll.dhuhr).add(this.config.AdjustDzuhur + this.config.MinutesToIqomahDzuhur + this.config.SholatDuration,"m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = true;
        }

        //playbeep iqomah dzuhur
        if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.dhuhr).add(this.config.AdjustDzuhur + this.config.MinutesToIqomahDzuhur,"m").format("HH:mm:ss")) {      
          this.playBeepIqomah();
        }

        //start to sholat
        if (moment(currentTime) > moment(this.prayTimeAll.dhuhr).add(this.config.AdjustDzuhur, "m").add(this.config.MinutesToIqomahDzuhur, "m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = false;
          this.sholat = true;
          this.activeLabel = "";
          this.currentSlide = "xx";
          this.autoplay = false;
        }
      } else if (currentTime > moment(this.prayTimeAll.asr).add(this.config.AdjustAshar, "m").subtract(this.config.MinutesToAdzanAshar, "m") && currentTime < moment(this.prayTimeAll.asr).add(this.config.AdjustAshar + this.config.MinutesToIqomahAshar + this.config.SholatDuration,"m")) {
        this.isSelected = true;
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.asr, "HH:mm:ss").add(this.config.AdjustAshar, "m").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahAshar,"m");

        this.activeLabel = this.config.LabelAshar;
        this.showCountDownAdzan = true;
        this.countDownAdzanHour = distanceToAdzan.format("mm");
        this.countDownAdzanSecond = distanceToAdzan.format("ss");
        this.countDownIqomahHour = distanceToIqomah.format("mm");
        this.countDownIqomahSecond = distanceToAdzan.format("ss");

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          // console.log('countdown to adzan')
          this.showCountDownAdzan = false;
          this.prepAdzan = true;
        }

        //playbeep adzan ashar
        if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.asr).add(this.config.AdjustAshar,"m").format("HH:mm:ss")) {      
          this.playBeepAdzan();
        }

        //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.asr).add(this.config.AdjustAshar, "m") && moment(currentTime) <= moment(this.prayTimeAll.asr).add(this.config.AdjustAshar + this.config.MinutesToIqomahAshar + this.config.SholatDuration,"m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = true;
        }

        //playbeep iqomah ashar
        if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.asr).add(this.config.AdjustAshar + this.config.MinutesToIqomahAshar,"m").format("HH:mm:ss")) {      
          this.playBeepIqomah();
        }

        //start to sholat
        if (moment(currentTime) > moment(this.prayTimeAll.asr).add(this.config.AdjustAshar, "m").add(this.config.MinutesToIqomahAshar, "m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = false;
          this.sholat = true;
          this.activeLabel = "";
          this.currentSlide = "xx";
          this.autoplay = false;
        }
      } else if (currentTime > moment(this.prayTimeAll.maghrib).add(this.config.AdjustMaghrib, "m").subtract(this.config.MinutesToAdzanMaghrib, "m") && currentTime < moment(this.prayTimeAll.maghrib).add(this.config.AdjustMaghrib + this.config.MinutesToIqomahMaghrib + this.config.SholatDuration,"m")) {
        this.isSelected = true;
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.maghrib, "HH:mm:ss").add(this.config.AdjustMaghrib, "m").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahMaghrib,"m");

        this.activeLabel = this.config.LabelMaghrib;
        this.showCountDownAdzan = true;
        this.countDownAdzanHour = distanceToAdzan.format("mm");
        this.countDownAdzanSecond = distanceToAdzan.format("ss");
        this.countDownIqomahHour = distanceToIqomah.format("mm");
        this.countDownIqomahSecond = distanceToAdzan.format("ss");

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          this.showCountDownAdzan = false;
          this.prepAdzan = true;
        }

         //playbeep adzan magrib
         if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.maghrib).add(this.config.AdjustMaghrib,"m").format("HH:mm:ss")) {      
          this.playBeepAdzan();
        }       

        //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.maghrib).add(this.config.AdjustMaghrib,"m") && moment(currentTime) <= moment(this.prayTimeAll.maghrib).add(this.config.AdjustMaghrib + this.config.MinutesToIqomahMaghrib + this.config.SholatDuration,"m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = true;
        }

        //playbeep iqomah maghrib
        if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.maghrib).add(this.config.AdjustMaghrib + this.config.MinutesToIqomahMaghrib,"m").format("HH:mm:ss")) {      
          this.playBeepIqomah();
        }

        //start to sholat
        if (
          moment(currentTime) > moment(this.prayTimeAll.maghrib).add(this.config.AdjustMaghrib, "m").add(this.config.MinutesToIqomahMaghrib, "m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = false;
          this.sholat = true;
          this.activeLabel = "";
          this.currentSlide = "xx";
          this.autoplay = false;
        }
      } else if (
        currentTime > moment(this.prayTimeAll.isha).add(this.config.AdjustIsya, "m").subtract(this.config.MinutesToAdzanIsya, "m") && currentTime < moment(this.prayTimeAll.isha).add(this.config.AdjustIsya + this.config.MinutesToIqomahIsya + this.config.SholatDuration,"m")) {
        this.isSelected = true;
        distanceToAdzan = moment.utc(moment(this.prayTimeAll.isha, "HH:mm:ss").add(this.config.AdjustIsya, "m").diff(moment(currentTime, "HH:mm:ss")));
        distanceToIqomah = moment(distanceToAdzan).add(this.config.MinutesToIqomahIsya,"m");

        this.activeLabel = this.config.LabelIsya;
        this.showCountDownAdzan = true;
        this.countDownAdzanHour = distanceToAdzan.format("mm");
        this.countDownAdzanSecond = distanceToAdzan.format("ss");
        this.countDownIqomahHour = distanceToIqomah.format("mm");
        this.countDownIqomahSecond = distanceToAdzan.format("ss");

        //waiting to adzan
        if (distanceToAdzan.minutes() < this.config.MinutesToAdzanPrep) {
          this.showCountDownAdzan = false;
          this.prepAdzan = true;
        }

        //playbeep adzan isya
        if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.isha).add(this.config.AdjustIsya,"m").format("HH:mm:ss")) {      
          this.playBeepAdzan();
        }

        // //start to adzan and waiting to iqomah
        if (moment(currentTime) >= moment(this.prayTimeAll.isha).add(this.config.AdjustIsya, "m") && moment(currentTime) <= moment(this.prayTimeAll.isha).add(this.config.AdjustIsya + this.config.MinutesToIqomahIsya + this.config.SholatDuration,"m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = true;
        }

        //playbeep iqomah shubuh
        if (this.config.IsBeep == "Y" && moment(currentTime).format("HH:mm:ss") === moment(this.prayTimeAll.isha).add(this.config.AdjustIsya + this.config.MinutesToIqomahIsya,"m").format("HH:mm:ss")) {      
          this.playBeepIqomah();
        }

        //start to sholat
        if (moment(currentTime) > moment(this.prayTimeAll.isha).add(this.config.AdjustIsya, "m").add(this.config.MinutesToIqomahIsya, "m")) {
          this.showCountDownAdzan = false;
          this.prepAdzan = false;
          this.prepIqomah = false;
          this.sholat = true;
          this.activeLabel = "";
          this.currentSlide = "xx";
          this.autoplay = false;
        }
      } else {
        this.showCountDownAdzan = false;
        this.activeLabel = "";
        this.autoplay = this.config.IntervalSlide;

        if (this.sholat) {
          location.reload();
          this.currentSlide = "Img01";
          this.sholat = false;
        }
      }
    },

    async getToday() {
      const now = new Date();
      let day = now.getDay();
      let date = now.getDate();
      let month = now.getMonth();
      let year = now.getFullYear();

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

      let today = day + ", " + date + " " + month + " " + year;
      this.today = today;
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
  },
};
</script>

<style scoped>
.card-prayer {
  width: 100%;
  max-width: 16%;
  margin: auto;
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* background: rgba(168, 218, 220, 0.3); */
  background-color: rgba(0, 0, 0, 0.5);  
  color: #ffd152;
}

.card-clock {
  width: 25%;
  background-color: rgba(0, 0, 0, 0.7);  
  margin: auto;
}

.card-countdown {
  /* width: 20%; */
  /* max-width: 16%; */
  /* margin-right: 5%; */
  /* background-color: rgba(0, 0, 0, 0.2); */
  color: #fff1e6;
  /* background: #124265; */
  /* background-color: rgba(0, 0, 0, 0.5);   */
  background-color: #be12ce;  
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
  /* background-color: rgba(0, 0, 0, 0.2); */
  background-color: rgba(0, 0, 0, 0.5);  
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
  /* margin:2px; */
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 8vh;
  /* background: rgba(168, 218, 220, 0.3); */
}

.footer {
  width: 100%;
  /* height: 3px; */
  position: absolute;
  bottom: 0;
}

.footer-left {
  float: left;
  font-size: 12px;
  margin-left: 20px;
  color: #fff1e6;
  letter-spacing: 2px;
  font-family: "montserratmedium";
  font-weight: 700;
}

.footer-right {
  float: right;
  font-size: 12px;
  margin-right: 20px;
  color: #fff1e6;
  letter-spacing: 2px;
  font-family: "montserratmedium";
  font-weight: 700;
}

.center-block {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 450px;
  /* padding: 0px; */
  /* background-color: rgba(0, 0, 0, 0.2); */
  /* background-color: black; */
  text-align: center;
  /* background-color: rgba(0, 0, 0, 0.5);   */
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
  background: #be12ce;
}
</style>
