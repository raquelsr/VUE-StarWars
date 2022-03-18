<template>
  <div>
    <img alt="StarWars logo" src="../assets/logo.png" />
    <DialogComponent
      v-model="showDialog"
      :title="planetInfo.name"
      :info="planetInfo"
      :showDialog="showDialog"
    />
    <DataTable
      title="People"
      :headers="headers"
      :data="peopleList"
      :serverItems="serverItems"
      @onClickButton="showPlanetInfo"
      @onLoad="getPeople"
      class="people-list__table"
    />
  </div>
</template>

<script>
import { HttpService } from '@/services/HttpService.js';
import { PeopleService } from '@/services/PeopleService.js';
import { PlanetService } from '@/services/PlanetService.js';
import DataTable from '@/components/DataTable.vue';
import DialogComponent from '@/components/DialogComponent.vue';

export default {
  name: 'PeopleListView',
  data: () => ({
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Height (cm)', value: 'height' },
      { text: 'Mass (kg)', value: 'mass' },
      { text: 'Created', value: 'createdString' },
      { text: 'Edited', value: 'editedString' },
      { text: 'Planet name', value: 'buttonValue' },
    ],
    serverItems: 10,
    showDialog: false,
    peopleList: [],
    planetInfo: {},
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
        const planet = await PlanetService.getPlanetByUrl(person.homeworld);
        person.buttonValue = planet.name;
        person.createdString = new Date(person.created).toDateString();
        person.editedString = new Date(person.edited).toDateString();
      }
      return people;
    },

    showPlanetInfo(planetName) {
      const planet = HttpService.cache.planetList.find(
        (planet) => planet.name === planetName
      );
      this.showDialog = true;
      const { name, diameter, climate, population } = planet;
      this.planetInfo = {
        name,
        diameter: Number(diameter).toLocaleString('en-EN', {
          style: 'unit',
          unit: 'kilometer',
        }),
        climate,
        population: Number(population).toLocaleString(),
      };
    },
  },
};
</script>

<style scoped>
img {
  width: 400px;
}

.people-list__table {
  margin: 0 6%;
}
</style>
