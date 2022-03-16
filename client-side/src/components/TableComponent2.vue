<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-card-title>
          People
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            @change="filterByName"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :footer-props="footerProps"
          :headers="headers"
          :items="data"
          :loading="loading"
          :options.sync="options"
          :server-items-length="serverItems"
          @pagination="updatePage"
          :search="search"
        >
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'TableComponent2',
  data: () => ({
    apiURL: 'https://swapi.dev/api/people',
    serverItems: 0,
    footerProps: {
      itemsPerPageOptions: [10],
      showFirstLastPage: true,
      showCurrentPage: true,
    },
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Gender', value: 'gender' },
    ],
    loading: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['name'],
      sortDesc: [true],
    },
    pagination: {},
    data: [],
    search: '',
  }),
  watch: {},
  mounted() {
    this.getData();
  },
  methods: {
    async getData(numberPage = 1) {
      this.loading = true;
      try {
        const res = await fetch(
          `${this.apiURL}/?page=${numberPage}&search=${this.search}`
        );
        const data = await res.json();
        this.loading = false;
        this.data = data.results;
        this.serverItems = data.count;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    updatePage(pagination) {
      const { page } = pagination;
      this.pagination = pagination;
      this.getData(page);
    },
    filterByName() {
      this.getData();
    },
  },
};
</script>
