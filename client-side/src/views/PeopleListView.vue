<template>
  <div>
    <h1>People</h1>
    <DialogComponent
      :title="planetDialog.name"
      :info="planetDialog"
      :showDialog="showDialog"
      v-model="showDialog"
    />
    <DataTable
      title="People"
      :headers="headers"
      @onLoad="getPeople"
      :data="peopleList"
      :serverItems="serverItems"
      @onClickPlanet="showPlanetInfo"
    />
  </div>
</template>
<script>
import DataTable from '@/components/DataTable.vue';
import { PeopleService } from '@/services/PeopleService.js';
import { HttpService } from '@/services/HttpService.js';
import DialogComponent from '@/components/DialogComponent.vue';

export default {
  name: 'PeopleListView',
  data: () => ({
    peopleList: [],
    serverItems: 10,
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Height (cm)', value: 'height' },
      { text: 'Mass (kg)', value: 'mass' },
      { text: 'Created', value: 'created' },
      { text: 'Edited', value: 'edited' },
      { text: 'Planet name', value: 'planetName' },
    ],
    showDialog: false,
    planetDialog: {},
  }),

  components: {
    DataTable,
    DialogComponent,
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

    async showPlanetInfo(planet) {
      const res = await fetch(planet);
      const planetInfo = await res.json();
      console.log(planetInfo);
      this.showDialog = true;
      this.planetDialog = {
        name: planetInfo.name,
        diameter: planetInfo.diameter,
        climate: planetInfo.climate,
        population: planetInfo.population,
      };
    },
  },
};
</script>

<style scoped></style>
