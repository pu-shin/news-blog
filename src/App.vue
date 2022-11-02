<template>
  <div class="wrapper">
    <app-header></app-header>
    <main class="mainpage">
      <app-home></app-home>
    </main>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppHome from "@/components/AppHome.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppHome,
  },
};
</script>

<style lang="scss"></style>;
