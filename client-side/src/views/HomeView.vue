<template>
  <div class="home">
    <PeopleListView />
  </div>
</template>

<script>
// @ is an alias to /src
import PeopleListView from '@/views/PeopleListView.vue';

export default {
  name: 'HomeView',
  components: {
    PeopleListView,
  },
};
</script>
