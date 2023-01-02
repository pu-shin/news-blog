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
                <div class="card__actions">
                  <button
                    class="card__remove-item"
                    @click="showModal(item)"
                  ></button>
                  <button
                    class="card__read-item"
                    @click="changeSelectedNews(item)"
                  ></button>
                </div>
              </div>
              <div class="card__body body-card">
                <span class="body-card__label label">{{ item.type }}</span>
                <h1 class="body-card__title title">
                  {{ item.title }}
                </h1>
                <app-accordion>
                  {{ item.desc }}
                </app-accordion>
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

  <teleport to="body">
    <app-modal
      :show="modal.show"
      @close="modal.show = false"
      @delete="removeNews(modal.item)"
    >
      <template #header>
        <h3>Delete News ?</h3>
      </template>
    </app-modal>
  </teleport>
</template>

<script>
// import { HTTP } from "@/axios";
import AppAccordion from "./AppAccordion.vue";
import AppModal from "./AppModal.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { getDatabase, ref as databaseRef, remove } from "@firebase/database";

export default {
  data() {
    return {
      modal: {
        item: {},
        show: false,
      },
    };
  },
  methods: {
    ...mapMutations(["changeSelectedNews"]),
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
        // await HTTP.delete(`/news/${item.id}.json`);
        // Delete from Database
        const db = getDatabase();
        const newsRef = databaseRef(db, `/news/${item.id}`);
        await remove(newsRef);
        this.modal.show = false;
        // Delete from Storage
        const storage = getStorage();
        const desertRef = storageRef(storage, `/images/${item.imageName}`);
        await deleteObject(desertRef);
        this.changeSelectedNews(null);
        console.log("Successful removal");
      } catch (error) {
        console.log(error);
      }
    },
    showModal(item) {
      this.modal.item = item;
      this.modal.show = true;
    },
  },
  computed: {
    ...mapState(["news", "dataLength", "uid"]),
  },
  watch: {
    news() {
      this.getNewsLength();
    },
  },
  components: { AppAccordion, AppModal },
};
</script>

<style scoped>
</style>
