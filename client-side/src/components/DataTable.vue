<template>
  <div>
    <v-app>
      <v-card>
        <v-card-title>
          <h2 class="text-uppercase text-center text-h3">{{ title }}</h2>
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
          :loader-height="10"
          :loading-text="'Loading...'"
          :options.sync="options"
          :server-items-length="serverItems"
          :footer-props="footerProps"
          :search="search"
          @pagination="updatePage"
          :page.sync="page"
          class="data-table"
        >
          <template v-slot:[`item.planetName`]="{ item }">
            <v-btn
              color="dark"
              outlined
              @click="clickPlanetButton(item.homeworld)"
              x-small
              min-width="100"
            >
              {{ item.planetName }}
              <v-icon right dark> mdi-open-in-new</v-icon>
            </v-btn>
          </template>
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
    search: function (newValue) {
      this.debounce(() => {
        this.page = 1;
        if (newValue === this.search) this.getData();
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

    clickPlanetButton(planetUrl) {
      this.$emit('onClickPlanetButton', planetUrl);
    },
  },
};
</script>
