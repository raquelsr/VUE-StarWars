<template>
  <div>
    <h1>People</h1>
    <TableComponent2 />
  </div>
</template>
<script>
import TableComponent2 from '@/components/TableComponent2.vue';

export default {
  name: 'PeopleList',
  data: () => ({
    peopleList: [],
    error: false,
  }),

  components: {
    TableComponent2,
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
