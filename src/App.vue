<template>
  <div class="wrapper">
    <app-header></app-header>
    <main class="mainpage">
      <section class="home">
        <div class="home__container">
          <div class="home__image"></div>
          <div class="home__content content-home"></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss"></style>;
