<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <v-data-table
          :headers="headers"
          :items="data"
          :page.sync="page"
          :items-per-page="10"
          @page-count="prueba"
          :options.sync="options"
          :server-items-length="10"
          :loading="loading"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
      </div>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="5"
          :next="prueba"
          circle
        ></v-pagination>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'TableComponent',

  data() {
    return {
      page: 1,
      pageCount: 0,
      data: [],
      loading: true,
      options: {},
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Height', value: 'height', width: 200 },
        { text: 'Mass', value: 'mass', width: 200 },
        { text: 'Created', value: 'created' },
        { text: 'Edited', value: 'edited' },
        { text: 'Planet Name', value: 'planet', width: 200 },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    prueba() {
      alert('Cambio pagina');
    },

    async getDataFromApi() {
      this.loading = true;
      // this.fakeApiCall().then((data) => {
      //   this.desserts = data.items;
      //   this.totalDesserts = data.total;
      //   this.loading = false;
      // });
      const des = await this.getDesserts();
      this.data = des.results;
      this.pageCount = Math.ceil(des.count / 10);
      this.loading = false;
    },
    /**
     * In a real application this would be a call to fetch() or axios.get()
     */
    //  async fakeApiCall() {
    //     return new Promise((resolve) => {
    //       const { sortBy, sortDesc, page, itemsPerPage } = this.options;

    //       let items = await this.getDesserts();
    //       const total = items.length;

    //       if (sortBy.length === 1 && sortDesc.length === 1) {
    //         items = items.sort((a, b) => {
    //           const sortA = a[sortBy[0]];
    //           const sortB = b[sortBy[0]];

    //           if (sortDesc[0]) {
    //             if (sortA < sortB) return 1;
    //             if (sortA > sortB) return -1;
    //             return 0;
    //           } else {
    //             if (sortA < sortB) return -1;
    //             if (sortA > sortB) return 1;
    //             return 0;
    //           }
    //         });
    //       }

    //       if (itemsPerPage > 0) {
    //         items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    //       }

    //       setTimeout(() => {
    //         resolve({
    //           items,
    //           total,
    //         });
    //       }, 1000);
    //     });
    //   },
    async getDesserts() {
      try {
        const res = await fetch('https://swapi.dev/api/people');
        const data = await res.json();
        return data;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
