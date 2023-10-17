<template>
  <div class="q-pa-md">
    <q-table
      title="Masjid Info"
      :rows="rows"
      :columns="columns"
      row-key="Id"
      dense
      class="my-sticky-dynamic"
      style="height: 80vh"
      virtual-scroll
      :rows-per-page-options="[0]"
      :filter="filter"
      :separator="separator"
      selection="single"
      v-model:selected="selected"
      :selected-rows-label="getSelectedRow"
    >
      <template #header-cell="props">
        <q-th :props="props" class="bg-primary glossy text-white text-h7">
          {{ props.col.label }}
        </q-th>
      </template>

      <template #body-cell-MasjidName="props">
        <q-td :props="props" dense>
          <a href="#" @click="editRow(props)">{{ props.value }}</a>
        </q-td>
      </template>

      <template #top-right="props">
        <q-btn
          color="primary"
          style="margin: 3px"
          icon="add"
          dense
          @click="showForm"
          class="bg-primary glossy text-white"
        />
        <q-btn
          color="primary"
          style="margin: 3px"
          icon="archive"
          no-caps
          dense
          @click="exportTable"
        />
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="show_form">
      <q-card style="width: 600px; max-width: 60vw">
        <q-card-section>
          <q-btn
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
            v-close-popup
          ></q-btn>
          <div class="text-h6">Add Row</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nama Masjid</q-item-label>
                  <q-input dense outlined v-model="masjid.MasjidName" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Alamat Masjid</q-item-label>
                  <q-input dense outlined v-model="masjid.MasjidAddress" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Kota</q-item-label>
                  <q-input dense outlined v-model="masjid.City" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Propinsi</q-item-label>
                  <q-input dense outlined v-model="masjid.Province" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Contact</q-item-label>
                  <q-input dense outlined v-model="masjid.BkmPic" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Phone</q-item-label>
                  <q-input dense outlined v-model="masjid.BkmPhone" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Latitude</q-item-label>
                  <q-input dense outlined v-model="masjid.Latitude" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Longitude</q-item-label>
                  <q-input dense outlined v-model="masjid.Longitude" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancel"
              color="warning"
              dense
              v-close-popup
            ></q-btn>
            <q-btn
              flat
              label="OK"
              color="primary"
              dense
              v-close-popup
              @click="updateRow"
            ></q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="show_dialog">
      <q-card style="width: 600px; max-width: 30vw">
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section> Data mau diDELETE? </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancel"
              color="warning"
              dense
              v-close-popup
            ></q-btn>
            <q-btn
              flat
              label="OK"
              color="primary"
              dense
              v-close-popup
              @click="deleteRow"
            ></q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Get from "@/api/http-get";
import Post from "@/api/http-post";
import Update from "@/api/http-update";
import Delete from "@/api/http-delete";
import { Notify, exportFile } from "quasar";

export default {
  data() {
    return {
      columns: [
        {
          name: "MasjidName",
          label: "Nama Masjid",
          field: "MasjidName",
          align: "left",
          sortable: true,
        },
        {
          name: "MasjidAddress",
          label: "Alamat Masjid",
          field: "MasjidAddress",
          align: "left",
        },
        {
          name: "City",
          label: "Kota",
          field: "City",
          align: "left",
        },
        {
          name: "Province",
          label: "Propinsi",
          field: "Province",
          align: "left",
        },
        {
          name: "BkmPic",
          label: "Contact",
          field: "BkmPic",
          align: "left",
        },
        {
          name: "BkmPhone",
          label: "Phone",
          field: "BkmPhone",
          align: "left",
        },
        {
          name: "Latitude",
          label: "Latitude",
          field: "Latitude",
          align: "left",
        },
        {
          name: "Logitude",
          label: "Longitude",
          field: "Longitude",
          align: "left",
        },
      ],
      masjid: {
        Id: "",
        MasjidName: "",
        MasjidAddress: "",
        City: "",
        Province: "",
        BkmPic: "",
        BkmPhone: "",
        Latitude: "",
        Longitude: "",
      },
      rows: [],
      filter: "",
      separator: "cell",
      selected: [],
      show_dialog: false,
      show_form: false,
    };
  },

  async mounted() {
    this.getRow();
  },

  methods: {
    getSelectedRow() {
      this.show_dialog = true;
      this.masjid.Id = this.selected[0].Id;
    },

    async getRow() {
      this.rows = (await Get.masjid()).data;
    },

    editRow(props) {
      if (props) {
        this.masjid.Id = props.row.Id;
        this.masjid.MasjidName = props.row.MasjidName;
        this.masjid.MasjidAddress = props.row.MasjidAddress;
        this.masjid.City = props.row.City;
        this.masjid.Province = props.row.Province;
        this.masjid.BkmPic = props.row.BkmPic;
        this.masjid.BkmPhone = props.row.BkmPhone;
        this.masjid.Latitude = props.row.Latitude;
        this.masjid.Longitude = props.row.Longitude;
      }

      this.show_form = true;
    },

    async deleteRow() {
      // console.log('delete', props.row.Id)
      const id = this.masjid.Id;

      // const index = this.rows.indexOf(id);
      await Delete.masjid(id).then((res) => {
        let status = res.data.status;
        let message = res.data.message;
        if (status) {
          Notify.create({
            message,
            color: "blue-8",
            textColor: "white",
            icon: "cloud_done",
          });
        }
      });

      await this.getRow();
      this.show_dialog = false;
    },

    async updateRow() {
      let id = this.masjid.Id;

      // console.log(this.masjid)

      if (id > 0) {
        await Update.masjid(id, this.masjid).then((res) => {
          const status = res.data.status;
          const message = res.data.message;

          if (status) {
            Notify.create({
              message,
              color: "blue-8",
              textColor: "white",
              icon: "cloud_done",
            });
          }
        });
      } else {
        let data = {
          MasjidName: this.masjid.MasjidName,
          MasjidAddress: this.masjid.MasjidAddress,
          City: this.masjid.City,
          Province: this.masjid.Province,
          BkmPic: this.masjid.BkmPic,
          BkmPhone: this.masjid.BkmPhone,
          Latitude: this.masjid.Latitude,
          Longitude: this.masjid.Longitude,
        };

        //   console.log('data', data)

        await Post.masjid(data).then((res) => {
          const status = res.data.status;
          const message = res.data.message;

          if (status) {
            Notify.create({
              message,
              color: "blue-8",
              textColor: "white",
              icon: "cloud_done",
            });
          }
        });
      }

      await this.getRow();
      this.show_dialog = false;
    },

    showForm() {
      this.masjid.Id = "";
      this.masjid.MasjidName = "";
      this.masjid.MasjidAddress = "";
      this.masjid.City = "";
      this.masjid.Province = "";
      this.masjid.BkmPic = "";
      this.masjid.BkmPhone = "";
      this.masjid.Latitude = "";
      this.masjid.Longitude = "";
      this.show_form = true;
    },

    wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      formatted = formatted.split('"').join('""');
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`;
    },

    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => this.wrapCsvValue(col.label))]
        .concat(
          this.rows.map((row) =>
            this.columns
              .map((col) =>
                this.wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>
<style>
.my-sticky-dynamic {
  /* height or max-height is important */
  height: 410px;
  /* this will be the loading indicator */
  /* prevent scrolling behind sticky top row on focus */
}
.my-sticky-dynamic .q-table__top,
.my-sticky-dynamic .q-table__bottom,
.my-sticky-dynamic thead tr:first-child th {
  background-color: white;
}
.my-sticky-dynamic thead tr th {
  position: sticky;
  z-index: 1;
}
.my-sticky-dynamic thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}
.my-sticky-dynamic thead tr:first-child th {
  top: 0;
}
.my-sticky-dynamic tbody {
  /* height of all previous header rows */
  scroll-margin-top: 48px;
}
</style>
