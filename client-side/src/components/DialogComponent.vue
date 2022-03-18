<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="show"
    :max-width="400"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" class="toolbar">
          <v-toolbar-title class="text-h4 black--text text-uppercase">
            {{ title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog.value = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <div class="text-body-1 ma-12 text-left black--text">
            <div v-for="keyValue in handledInfo.keys()" :key="keyValue">
              <p>
                <strong class="text-uppercase">{{ keyValue }} :</strong>
                {{ handledInfo.get(keyValue) }}
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogComponent',
  props: {
    info: Object,
    showDialog: {
      type: Boolean,
      default: false,
    },
    title: String,
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
        return map;
      },
    },
  },
};
</script>
