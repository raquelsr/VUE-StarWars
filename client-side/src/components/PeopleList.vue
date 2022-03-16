<template>
  <div>
    <h1>People</h1>
    <TableComponent :data="peopleList" />
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent.vue';

export default {
  name: 'PeopleList',
  data: () => ({
    peopleList: [],
    error: false,
  }),

  components: {
    TableComponent,
  },

  methods: {
    async getPeople() {
      try {
        const res = await fetch('https://swapi.dev/api/people');
        const data = await res.json();
        this.peopleList = data.results;
      } catch (e) {
        console.error(e);
      }
    },
  },

  mounted() {
    this.getPeople();
  },
};
</script>

<style scoped></style>
