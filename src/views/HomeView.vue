<template>
  <app-top-news></app-top-news>
  <app-latest-news></app-latest-news>
</template>

<script>
import AppTopNews from "@/components/AppTopNews.vue";
import AppLatestNews from "@/components/AppLatestNews.vue";

export default {
  components: {
    AppTopNews,
    AppLatestNews,
  },
};
</script>


<style scoped>
</style>