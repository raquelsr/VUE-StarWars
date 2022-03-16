<template>
  <div>
    <img alt="StarWars logo" src="../assets/logo.png" />
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
    planetDialog: {},
    cache: [],
  }),

  components: {
    DataTable,
    DialogComponent,
  },

  mounted() {
    this.cache = Cache.getInstance();
    this.cache.planetList = [];
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
        const planet = await this.getPlanet(person.homeworld);
        person.planetName = planet.name;
        person.created = new Date(person.created).toDateString();
        person.edited = new Date(person.edited).toDateString();
      }
      return people;
    },

    async getPlanet(url) {
      let planet = this.cache.planetList.find((planet) => planet.url === url);
      if (!planet) {
        try {
          //TODO
          const res = await fetch(url);
          planet = await res.json();
          this.cache.planetList.push(planet);
        } catch (e) {
          console.error(e);
        }
      }
      return planet;
    },

    async showPlanetInfo(planetUrl) {
      const planetInfo = this.cache.planetList.find(
        (planet) => planet.url === planetUrl
      );
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

<style scoped>
img {
  width: 200px;
}
</style>
