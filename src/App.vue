<template>
  <div class="wrapper">
    <the-header></the-header>
    <main class="mainpage">
      <div v-show="!loading">
        <router-view></router-view>
      </div>
      <app-loader v-if="loading"></app-loader>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  mounted() {
    this.unloadNews(6);
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["unloadNews"]),
  },
  computed: {
    ...mapState(["loading"]),
  },
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss"></style>;
