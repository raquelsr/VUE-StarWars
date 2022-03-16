<template>
  <div>
    <v-app>
      <v-card>
        <v-card-title>
          {{ title }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="data"
          :loading="loading"
          :options.sync="options"
          :server-items-length="serverItems"
          :footer-props="footerProps"
          :search="search"
          @pagination="updatePage"
          :page.sync="page"
        >
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    title: String,
    headers: Array,
    data: Array,
    serverItems: Number,
  },
  data: () => ({
    loading: false,
    footerProps: {
      itemsPerPageOptions: [10],
      showFirstLastPage: true,
      showCurrentPage: true,
    },
    options: {
      // TODO
      sortBy: ['name'],
      sortDesc: [true],
    },
    pagination: {},
    page: 1,
    search: '',
  }),

  watch: {
    search: function () {
      this.debounce(() => {
        this.page = 1;
        this.getData();
      })();
    },
  },

  methods: {
    async getData(page = 1) {
      this.loading = true;
      try {
        await this.$emit(
          'onLoad',
          page,
          this.search,
          () => (this.loading = false)
        );
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },

    updatePage(pagination) {
      console.log();
      if (this.pagination.page != pagination.page) {
        const { page } = pagination;
        this.pagination = pagination;
        this.getData(page);
      }
    },

    debounce(callback, wait = 1500) {
      let timerId;
      return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          callback(...args);
        }, wait);
      };
    },
  },
};
</script>
