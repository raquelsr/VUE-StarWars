<template>
  <div>
    <h1>People</h1>
    <DataTable
      title="People"
      :headers="headers"
      @onLoad="getPeople"
      :data="peopleList"
      :serverItems="serverItems"
    />
  </div>
</template>
<script>
import DataTable from '@/components/DataTable.vue';
import { PeopleService } from '@/services/PeopleService.js';
import { HttpService } from '@/services/HttpService.js';

export default {
  name: 'PeopleListView',
  data: () => ({
    peopleList: [],
    serverItems: 10,
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
    async getPeople(page, search, cancelLoad) {
      const data = await HttpService.executeRequest(
        PeopleService.getAllWithPagination,
        page,
        search
      );
      const handledData = await this.handlePeopleList(data.results);
      this.peopleList = handledData;
      this.serverItems = data.count;
      cancelLoad();
    },

    async handlePeopleList(people) {
      for (const person of people) {
        const res = await fetch(person.homeworld);
        const planet = await res.json();
        person.planetName = planet.name;
        person.created = new Date(person.created).toDateString();
        person.edited = new Date(person.edited).toDateString();
      }
      return people;
    },
  },
};
</script>

<style scoped></style>
