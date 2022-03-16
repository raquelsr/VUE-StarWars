<template>
  <div>
    <h1>People</h1>
    <DataTable :request="request" :headers="headers" />
  </div>
</template>
<script>
import DataTable from '@/components/base-components/DataTable.vue';
import { PeopleService } from '@/services/PeopleService.js';

export default {
  name: 'PeopleList',
  data: () => ({
    peopleList: [],
    request: PeopleService.get,
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Height', value: 'height' },
      { text: 'Mass', value: 'mass' },
      { text: 'Created', value: 'created' },
      { text: 'Edited', value: 'edited' },
      { text: 'Planet name', value: 'planet' },
    ],
  }),

  components: {
    DataTable,
  },
};
</script>

<style scoped></style>
