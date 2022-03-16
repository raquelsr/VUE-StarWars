<template>
  <div class="home">
    <PeopleList />
  </div>
</template>

<script>
// @ is an alias to /src
import PeopleList from '@/components/PeopleList.vue';

export default {
  name: 'HomeView',
  components: {
    PeopleList,
  },
};
</script>
