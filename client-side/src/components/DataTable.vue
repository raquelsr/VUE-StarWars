<template>
  <div>
    <v-app>
      <v-card>
        <div class="checkbox">
          <v-checkbox
            v-model="isSorted"
            :label="'Activate sort'"
            class="black--text"
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
          :page.sync="page"
          :search="search"
          :server-items-length="serverItems"
          :footer-props="footerProps"
          @pagination="updatePage"
          @update:options="customSort"
        >
          <template v-slot:[`item.buttonValue`]="{ item }">
            <v-btn
              color="dark"
              min-width="100"
              outlined
              x-small
              @click="clickButton(item.buttonValue)"
            >
              {{ item.buttonValue }}
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
    data: Array,
    headers: Array,
    serverItems: Number,
    title: String,
  },
  data: () => ({
    customSortLaunched: false,
    isSorted: false,
    footerProps: {
      itemsPerPageOptions: [10],
      showFirstLastPage: true,
      showCurrentPage: true,
    },
    loading: false,
    options: {
      sortBy: ['name'],
      sortDesc: [true],
    },
    page: 1,
    pagination: {},
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

    clickButton(event) {
      this.$emit('onClickButton', event);
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

::v-deep .v-data-table-header .text-start {
  font-size: 16px;
}

::v-deep .v-data-footer {
  display: flex;
  justify-content: center;
  font-size: 16px;
}
</style>
