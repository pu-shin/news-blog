<template>
  <section class="news">
    <div class="news__container">
      <h3 class="news__label label">Latest News</h3>
      <div class="title" v-if="news.length === 0">no news, be the first</div>
      <div class="news__body body-news">
        <div class="body-news__cards">
          <transition-group name="fade-news" @before-leave="beforeLeave">
            <div
              class="body-news__card card"
              v-for="item in news"
              :key="item.id"
            >
              <div class="card__image">
                <img :src="item.image" alt="" />
                <button
                  class="card__remove-item"
                  @click="removeNews(item)"
                ></button>
              </div>
              <div class="card__body body-card">
                <span class="body-card__label label">{{ item.type }}</span>
                <h1 class="body-card__title title">
                  {{ item.title }}
                </h1>
                <span class="body-card__author author">{{ item.author }}</span>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <button
        type="button"
        class="news__show-more"
        @click="setNews(news.length + 3)"
        v-if="news.length && news.length !== dataLength"
      >
        <span>show more</span>
      </button>
    </div>
  </section>
</template>

<script>
import { HTTP } from "@/axios";
import { mapActions, mapState } from "vuex";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setNews", "getNewsLength"]),
    //transition fix
    beforeLeave(el) {
      const { marginLeft, marginTop, width, height } =
        window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    },
    async removeNews(item) {
      try {
        // Delete from Database
        await HTTP.delete(`/news/${item.id}.json`);
        // Delete from Storage
        const storage = getStorage();
        const desertRef = storageRef(storage, `/images/${item.imageName}`);
        await deleteObject(desertRef);
        console.log("Successful removal");
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState(["news", "dataLength"]),
  },
  watch: {
    news() {
      this.getNewsLength();
    },
  },
  components: {},
};
</script>

<style scoped>
</style>
