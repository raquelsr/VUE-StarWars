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
  props: ['request', 'headers', 'dataHandled'],
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
  watch: {
    dataHandled: function () {
      this.data = this.dataHandled.results;
    },

    search: function () {
      this.getData();
    },
  },

  methods: {
    async getData(page = 1) {
      this.loading = true;
      try {
        // eslint-disable-next-line
        const data = await HttpService.executeRequest(
          this.request,
          page,
          this.search
        );
        await this.$emit('onHandleData', data);
        const data2 = this.dataHandled;
        this.data = data2.results;
        this.serverItems = data2.count;
        this.loading = false;
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
  },
};
</script>
