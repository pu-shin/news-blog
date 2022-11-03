<template>
  <div class="wrapper">
    <app-header></app-header>
    <main class="mainpage">
      <app-home></app-home>
      <app-news></app-news>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppHome from "@/components/AppHome.vue";
import AppNews from "@/components/AppNews.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppHome,
    AppNews,
    AppFooter,
  },
};
</script>

<style lang="scss"></style>;
