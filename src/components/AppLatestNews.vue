<template>
  <section class="news">
    <div class="news__container">
      <h3 class="news__label label">Latest News</h3>
      <div class="news__body body-news">
        <div class="body-news__cards">
          <div class="body-news__card card" v-for="item in news" :key="item.id">
            <div class="card__image">
              <img :src="item.image" alt="" />
            </div>
            <div class="card__body body-card">
              <span class="body-card__label label">{{ item.type }}</span>
              <h1 class="body-card__title title">
                {{ item.title }}
              </h1>
              <span class="body-card__author author">{{ item.author }}</span>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="news__show-more">
        <span>show more</span>
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: mapState(["news"]),
};
</script>


<style scoped>
</style>
