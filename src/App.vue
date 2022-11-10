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

export default {
  name: "App",
  mounted() {},
  data() {
    return {
      news: [],
    };
  },
  components: {
    TheHeader,
    TheFooter,
  },
  methods: {
    //  async loadNews() {
    //    const response = await fetch(
    //      "https://pu-shin-news-blog-5996b-default-rtdb.europe-west1.firebasedatabase.app/news.json",
    //      {
    //        method: "POST",
    //        headers: {
    //          "Content-Type": "application/json",
    //        },
    //        body: JSON.stringify({
    //          firstName: "miha",
    //        }),
    //      }
    //    );
    //    console.log(response);
    //    const firebaseData = await response.json();
    //    console.log(firebaseData);
    //  },
  },
};
</script>

<style lang="scss"></style>;
