<template>
  <div class="wrapper">
    <the-header></the-header>
    <main class="mainpage">
      <router-view></router-view>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  mounted() {
    this.uploadNews();
  },
  data() {
    return {};
  },
  components: {
    TheHeader,
    TheFooter,
  },
  methods: {
    ...mapActions(["uploadNews"]),
  },
  computed: {},
};
</script>

<style lang="scss"></style>;
