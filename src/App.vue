<template>
  <div class="wrapper">
    <app-header></app-header>
    <main class="mainpage">
      <app-home></app-home>
      <app-news></app-news>
    </main>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppHome from "@/components/AppHome.vue";
import AppNews from "@/components/AppNews.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppHome,
    AppNews,
  },
};
</script>

<style lang="scss"></style>;
