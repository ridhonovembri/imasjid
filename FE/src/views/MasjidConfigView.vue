<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card bordered class="card">
      <q-card-section elevated class="bg-primary text-grey-1">
        <div class="text-h6">Konfigurasi Masjid</div>
      </q-card-section>

      <q-separator />
      <h7>Setting Hitung Mundur Menuju Adzan</h7>
      <div class="q-gutter-xs row" style="margin: 10px">
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToAdzanShubuh"
          type="number"
          label="Shubuh (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToAdzanDzuhur"
          type="number"
          label="Dzuhur (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToAdzanAshar"
          type="number"
          label="Ashar (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToAdzanMaghrib"
          type="number"
          label="Maghrib (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToAdzanIsya"
          type="number"
          label="Isya (Menit)"
        />
      </div>
      <h7 style="margin: 15px">Setting Hitung Mundur Persiapan Adzan</h7>
      <div class="q-gutter-xs row" style="margin: 10px">
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToAdzanPrep"
          type="number"
          label="Persiapan Adzan (Menit)"
        />
      </div>
      <h7 style="margin: 15px">Setting Hitung Mundur Menuju Iqomah dan Durasi Sholat</h7>
      <div class="q-gutter-xs row" style="margin: 10px">
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToIqomahShubuh"
          type="number"
          label="Shubuh (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToIqomahDzuhur"
          type="number"
          label="Dzuhur (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToIqomahAshar"
          type="number"
          label="Ashar (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToIqomahMaghrib"
          type="number"
          label="Maghrib (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.MinutesToIqomahIsya"
          type="number"
          label="Isya (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.SholatDuration"
          type="number"
          label="Durasi Sholat(Menit)"
        />
      </div>

      <h7 style="margin: 15px">Label Sholat</h7>
      <div class="q-gutter-xs row" style="margin: 10px">
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.LabelShubuh"
          label="Label Shubuh"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.LabelSyuruq"
          label="Label Syuruq"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.LabelDzuhur"
          label="Label Dzuhur"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.LabelAshar"
          label="Label Ashar"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.LabelMaghrib"
          label="Label Maghrib"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.LabelIsya"
          label="Label Isya"
        />
      </div>
      <h7 style="margin: 15px">Penyesuaian waktu sholat</h7>
      <div class="q-gutter-xs row" style="margin: 10px">
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.AdjustShubuh"
          type="number"
          label="+/- Shubuh (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.AdjustSyuruq"
          type="number"
          label="+/- Syuruq (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.AdjustDzuhur"
          type="number"
          label="+/- Dzuhur (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.AdjustAshar"
          type="number"
          label="+/- Ashar (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.AdjustMaghrib"
          type="number"
          label="+/- Maghrib (Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.AdjustIsya"
          type="number"
          label="+/- Isya (Menit)"
        />
      </div>
      <u><h7 style="margin: 15px">Teks Persiapan Adzan dan Iqomah</h7></u>
      <div class="q-gutter-xs row" style="margin: 10px">
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.TextBeforeAdzan"
          label="Sebelum Adzan"
          :input-style="{ width: '500px' }"
          type="textarea"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.TextBeforeIqomah"
          label="Sebelum Iqomah"
          :input-style="{ width: '500px' }"
          type="textarea"
        />
      </div>
      
      <u><h7 style="margin: 15px">Teks Ketika Sholat</h7></u>
      <div class="q-gutter-xs row" style="margin: 10px">
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.TextDuringSholat1"
          label="Teks 1"
          :input-style="{ width: '500px' }"
          type="textarea"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.TextDuringSholat2"
          label="Teks 2"
          :input-style="{ width: '500px' }"
          type="textarea"
        />
      </div>
      <h7 style="margin: 15px">Koordinat dan Interval</h7>
      <div class="q-gutter-xs row" style="margin: 10px">
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.Latitude"
          label="Latitude"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.Longitude"
          label="Longitude"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.IntervalSlide"
          type="number"
          label="Interval Slide (Milidetik)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.IntervalHadist"
          type="number"
          label="Interval Hadist (Milidetik)"
        />
      </div>
      <u><h7 style="margin: 15px">Misc</h7></u>
      <div class="q-gutter-xs row" style="margin: 10px">       
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.BgImgSholat"
          label="Background Image"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.IconDuringSholat"
          label="Icon"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.SoundLocation"
          label="Suara"
        />
      </div>
      <u><h7 style="margin: 15px">Ukuran Font</h7></u>
      <div class="q-gutter-xs row" style="margin: 10px">
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.FontSizeMasjidname"
          type="number"
          label="Nama Masjid"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.FontSizeMasjidaddress"
          type="number"
          label="Alamat Masjid"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.FontSizeDate"
          type="number"
          label="Tanggal"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.FontSizeClockHourMinute"
          type="number"
          label="Clock(Jam dan Menit)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.FontSizeClockSecond"
          type="number"
          label="Clock(Detik)"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.FontSizeHadist"
          type="number"
          label="Hadist"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.FontSizeMarquee"
          type="number"
          label="Marquee/Teks Berjalan"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.FontSizePrayertime"
          type="number"
          label="Waktu Sholat"
        />
        <q-input
          standout="bg-teal text-white"
          v-model="masjidConfig.FontSizePrayerlabel"
          type="number"
          label="Label Sholat"
        />
      </div>
      <q-btn
        color="white"
        text-color="black"
        label="Simpan"
        style="margin: 15px"
        @click="updatemasjidConfig"
      />
    </q-card>
  </div>
</template>
<script>
import Update from "@/api/http-update";
import Get from "@/api/http-get";
import { Notify } from "quasar";

export default {
  data() {
    return {
      masjidConfig: {
        Id: "",
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
        LabelShubuh: '',
        LabelSyuruq: '',
        LabelDzuhur: '',
        LabelAshar:' ',
        LabelMaghrib: '',
        LabelIsya: '',
        AdjustShubuh: 0,
        AdjustSyuruq: 0,
        AdjustDzuhur: 0,
        AdjustAshar: 0,
        AdjustMaghrib: 0,
        AdjustIsya: '',
        Latitude: 0,
        Longitude: 0,
        TextBeforeAdzan: '',
        TextBeforeIqomah: '',
        TextDuringSholat1: '',
        TextDuringSholat2: '',
        BgImgSholat: '',
        IconDuringSholat: '',
        IntervalSlide: 0,
        IntervalHadist: 0,
        SholatDuration: 0,
        SoundLocation:'',
        FontSizeMarquee: 0,
        FontSizeHadist: 0,
        FontSizeMasjidname: 0,
        FontSizeMasjidaddress: 0,
        FontSizeDate: 0,
        FontSizeClock: 0,
        FontSizePrayertime: 0,
        FontSizePrayerlabel: 0,
      },
    };
  },
  async mounted() {
    // this.updatemasjidConfig();
    this.getmasjidConfig();
  },
  methods: {
    async updatemasjidConfig() {
      // console.log("masjidConfig", this.masjidConfig);
      // console.log("this.masjidConfig.id", this.masjidConfig.Id);
      // Update.masjidConfig();
      await Update.masjidConfig(this.masjidConfig.Id, this.masjidConfig).then(
        (res) => {
          const status = res.data.status;
          const message = res.data.message;
          // console.log("after update", status);

          if (status) {
            Notify.create({
              message,
              color: "blue-8",
              textColor: "white",
              icon: "cloud_done",
            });
          }
        }
      );
    },

    async getmasjidConfig() {
      this.masjidConfig = (await Get.masjidConfig()).data;
      // console.log('masjidConfig', this.masjidConfig)
    },
  },
};
</script>
<style scoped>
.card {
  width: 100%;
  text-align: left;
  /* max-width: 250px */
}

h7{
  margin:15px;
  text-decoration: underline;
  font-weight: bold;
}
</style>