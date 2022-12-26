<template>
  <section class="top-news">
    <transition name="fade-top-news" mode="out-in">
      <div
        class="top-news__container preview__body"
        v-if="news.length !== 0"
        :key="previewNews"
      >
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
    </transition>

    <div class="top-news__container preview__body" v-if="news.length === 0">
      <div class="top-news__image">
        <img src="../assets/images/japan-house.jpg" alt="" />
      </div>
      <div class="top-news__content content-top-news">
        <span class="content-top-news__label label"> Illustration </span>
        <h1 class="content-top-news__title title">
          Japan House opens in mountainside to foster peak creativity.
        </h1>
        <p class="content-top-news__desc desc">
          Enim omittam qui id, ex quo atqui dictas complectitur. Nec ad timeam
          accusata, hinc justo falli id eum, ferri novum molestie eos cu.
        </p>
        <span class="content-top-news__author author"> by Reta Torphy </span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState(["news", "selectedNews"]),
    previewNews() {
      const data = this.selectedNews || this.news[0];
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