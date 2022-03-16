<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :footer-props="footerProps"
        :headers="headers"
        :items="data"
        :loading="loading"
        :options.sync="options"
        :server-items-length="serverItems"
        @pagination="updatePage"
      >
      </v-data-table>
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
        const res = await fetch(`${this.apiURL}/?page=${numberPage}`);
        const data = await res.json();
        this.data = data.results;
        this.serverItems = data.count;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    updatePage(pagination) {
      const { page } = pagination;
      this.pagination = pagination;
      this.getData(page);
    },
  },
};
</script>
