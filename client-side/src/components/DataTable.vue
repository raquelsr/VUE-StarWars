<template>
  <div>
    <v-app>
      <v-card>
        <div class="checkbox">
          <v-checkbox
            v-model="isSorted"
            :label="'Activate sort'"
            class="black--text text-center justify-center"
          ></v-checkbox>
        </div>
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
          :items="isSorted ? sortedData : data"
          :loading="loading"
          :loader-height="10"
          :loading-text="'Loading...'"
          :options="options"
          :server-items-length="serverItems"
          :footer-props="footerProps"
          :search="search"
          @pagination="updatePage"
          :page.sync="page"
          class="data-table"
          @update:options="customSort"
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
      sortBy: ['name'],
      sortDesc: [true],
    },
    pagination: {},
    page: 1,
    isSorted: false,
    customSortLaunched: false,
    search: '',
  }),

  computed: {
    sortedData: {
      get() {
        const field = this.options.sortBy;
        const copiedData = this.data;
        return copiedData.sort((a, b) => {
          let modifier = 1;
          if (this.options.sortDesc != 'false') modifier = -1;
          if (a[field] < b[field]) return -1 * modifier;
          if (a[field] > b[field]) return 1 * modifier;
          return 0;
        });
      },
    },
  },

  watch: {
    search: function (newValue) {
      this.debounce(() => {
        this.page = 1;
        if (newValue === this.search) this.getData();
      })();
    },

    isSorted: function (isSorted) {
      if (!isSorted) {
        this.options = {};
      } else {
        this.options.sortBy = 'name';
        this.options.sortDesc = true;
      }
    },
  },

  updated() {
    this.customSortLaunched = false;
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
      if (this.pagination.page != pagination.page && !this.customSortLaunched) {
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

    customSort(options) {
      if (this.options.sortBy !== options.sortBy && this.isSorted) {
        this.customSortLaunched = true;
      }
      this.options.sortBy = options.sortBy;
      this.options.sortDesc = options.sortDesc;
    },
  },
};
</script>

<style scoped>
.checkbox {
  display: flex;
  justify-content: center;
  height: 30px;
}
</style>
