<template>
  <div>
    <h1>People</h1>
    <DataTable
      :request="request"
      :headers="headers"
      @onHandleData="handlePeopleList"
      :dataHandled="peopleList"
    />
  </div>
</template>
<script>
import DataTable from '@/components/base-components/DataTable.vue';
import { PeopleService } from '@/services/PeopleService.js';

export default {
  name: 'PeopleList',
  data: () => ({
    peopleList: [],
    request: PeopleService.getAllWithPagination,
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Height', value: 'height' },
      { text: 'Mass', value: 'mass' },
      { text: 'Created', value: 'created' },
      { text: 'Edited', value: 'edited' },
      { text: 'Planet name', value: 'planetName' },
    ],
  }),

  components: {
    DataTable,
  },

  methods: {
    async handlePeopleList(data) {
      // eslint-disable-next-line
      debugger;
      for (const person of data.results) {
        const res = await fetch(person.homeworld);
        const planet = await res.json();
        person.planetName = planet.name;
        person.created = new Date(person.created).toDateString();
        person.edited = new Date(person.edited).toDateString();
      }

      this.peopleList = data;
    },
  },
};
</script>

<style scoped></style>
