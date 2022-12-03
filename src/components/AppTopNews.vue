<template>
  <section class="top-news">
    <div class="top-news__container preview__body">
      <div class="top-news__image">
        <img :src="previewNews.image" alt="" />
      </div>
      <div class="top-news__content content-top-news">
        <span class="content-top-news__label label">
          {{ previewNews.type }}
        </span>
        <h1 class="content-top-news__title title">
          {{ previewNews.title }}
        </h1>
        <p class="content-top-news__desc desc">
          {{ previewNews.desc }}
        </p>
        <span class="content-top-news__author author">
          {{ previewNews.author }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      staticNews: {
        image: require("../assets/images/japan-house.jpg"),
        type: "Illustration",
        title: "Japan House opens in mountainside to foster peak creativity.",
        desc: "Enim omittam qui id, ex quo atqui dictas complectitur. Nec ad timeam accusata, hinc justo falli id eum, ferri novum molestie eos cu.",
        author: "by Reta Torphy",
      },
    };
  },
  methods: {},
  computed: {
    ...mapState(["news"]),
    previewNews() {
      const data = this.news.length ? this.news[0] : this.staticNews;
      return {
        image: data.image,
        type: data.type,
        title: data.title,
        desc: data.desc,
        author: data.author,
      };
    },
  },
};
</script>


<style scoped>
</style>