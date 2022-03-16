<template>
  <div>
    <v-app>
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
import { HttpService } from '@/services/HttpService.js';

export default {
  name: 'DataTable',
  props: ['request', 'headers'],
  data: () => ({
    serverItems: 0,
    footerProps: {
      itemsPerPageOptions: [10],
      showFirstLastPage: true,
      showCurrentPage: true,
    },
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

  methods: {
    async getData(page = 1) {
      this.loading = true;
      try {
        const data = await HttpService.executeRequest(
          this.request,
          page,
          this.search
        );
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
