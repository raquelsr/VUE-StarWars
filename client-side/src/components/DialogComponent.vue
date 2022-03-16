<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" v-model="show">
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>{{ title }} </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="dialog.value = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">
                <div v-for="keyValue in handledInfo.keys()" :key="keyValue">
                  <p>{{ keyValue }} : {{ handledInfo.get(keyValue) }}</p>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DialogComponent',
  props: {
    title: String,
    info: Object,
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dialog: false,
  }),
  mounted() {
    this.dialog = this.showDialog;
  },
  watch: {
    showDialog() {
      if (this.showDialog) this.dialog = true;
    },
  },
  computed: {
    show: {
      get() {
        return this.showDialog;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    handledInfo: {
      get() {
        const map = new Map();
        for (const field in this.info) {
          map.set(field, this.info[field]);
        }
        console.log(map);
        return map;
      },
    },
  },
};
</script>
