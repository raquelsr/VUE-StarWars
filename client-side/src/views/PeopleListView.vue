<template>
  <div>
    <img alt="StarWars logo" src="../assets/logo.png" />
    <DialogComponent
      :title="planetInfo.name"
      :info="planetInfo"
      :showDialog="showDialog"
      v-model="showDialog"
    />
    <DataTable
      title="People"
      :headers="headers"
      @onLoad="getPeople"
      :data="peopleList"
      :serverItems="serverItems"
      @onClickPlanetButton="showPlanetInfo"
      class="people-list__table"
    />
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import { PeopleService } from '@/services/PeopleService.js';
import { PlanetService } from '@/services/PlanetService.js';
import { HttpService } from '@/services/HttpService.js';
import DialogComponent from '@/components/DialogComponent.vue';
import { Cache } from '@/services/Cache.js';

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
    planetInfo: {},
    cache: [],
  }),

  components: {
    DataTable,
    DialogComponent,
  },

  mounted() {
    this.cache = Cache.getInstance();
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
        person.planetName = planet.name;
        person.created = new Date(person.created).toDateString();
        person.edited = new Date(person.edited).toDateString();
      }
      return people;
    },

    showPlanetInfo(planetUrl) {
      const planet = this.cache.planetList.find(
        (planet) => planet.url === planetUrl
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
  width: 30%;
}

.people-list__table {
  margin: 0 6%;
}
</style>
