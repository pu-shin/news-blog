<template>
  <section class="create-news" v-if="!loading">
    <div class="create-news__container">
      <h1 class="create-news__title title">Create News</h1>
      <form class="create-news__form form" @submit.prevent>
        <div class="form__united-row">
          <div class="form__row">
            <label class="form__label" for="type">type</label>
            <input
              class="form__item item"
              type="text"
              id="type"
              placeholder="Enter news type"
              v-model.trim="objNews.type"
            />
          </div>
          <div class="form__row">
            <label class="form__label" for="author">Author</label>
            <input
              class="form__item item"
              type="text"
              id="author"
              placeholder="Enter news author"
              v-model.trim="objNews.author"
            />
          </div>
        </div>
        <div class="form__row">
          <label class="form__label" for="title">Title</label>
          <input
            class="form__item form__item item"
            type="text"
            id="title"
            placeholder="Enter news title"
            v-model.trim="objNews.title"
          />
        </div>
        <div class="form__row">
          <label class="form__label" for="description">Description</label>
          <textarea
            class="form__item form__textarea item"
            type="desc"
            id="title"
            placeholder="Enter news description"
            v-model.trim="objNews.desc"
          />
        </div>
        <div class="form__united-row">
          <div class="form__file">
            <div class="load-file">
              <h3 class="load-file__title form__label">Image</h3>
              <div class="load-file__content file-content">
                <div class="file-content__task">
                  <app-drop-zone
                    format="image/jpeg"
                    :disabled="limitImages"
                    @drop-file="addImage"
                    @add-file="addImage"
                  >
                  </app-drop-zone>
                </div>
                <div class="file-content__task">
                  <div class="file-content__picture file-picture">
                    <div class="file-picture__body" v-if="images.length">
                      <img
                        class="file-picture__item"
                        :src="images.at(-1).url"
                        alt=""
                      />
                      <button
                        class="file-picture__remove-item"
                        @click="delImage(index)"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form__buttons">
            <button
              class="form__button button"
              type="submit"
              @click="clearInputs()"
            >
              Clear
            </button>
            <button
              class="form__button button"
              type="submit"
              @click="preview = !preview"
            >
              Preview
            </button>
            <button
              class="form__button button"
              type="submit"
              @click="uploadImage()"
            >
              Add news
            </button>
          </div>
        </div>
      </form>

      <div class="create-news__preview preview home" v-if="preview">
        <h2 class="preview__title title">Preview</h2>
        <div class="preview__body">
          <div class="preview__image home__image">
            <img
              :src="images.at(-1).url"
              alt="foto news"
              v-if="images.length"
            />
          </div>
          <div class="preview__content content-preview content-home">
            <span class="content-preview__label content-home__label label">{{
              typeNews
            }}</span>
            <h1 class="content-preview__title content-home__title title">
              Japan House opens in mountainside to foster peak creativity.
            </h1>
            <p class="content-preview__text content-home__text text">
              Enim omittam qui id, ex quo atqui dictas complectitur. Nec ad
              timeam accusata, hinc justo falli id eum, ferri novum molestie eos
              cu.
            </p>
            <span class="content-preview__author content-home__author author"
              >by Reta Torphy</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
  <app-loader v-if="loading"></app-loader>
</template>

<script>
import { mapActions } from "vuex";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import AppDropZone from "../components/AppDropZone.vue";
import AppLoader from "../components/AppLoader.vue";

export default {
  mounted() {},
  data() {
    return {
      objNews: {
        type: "",
        author: "",
        title: "",
        desc: "",
      },
      url: "",
      images: [],
      file: {},
      loading: false,
      preview: false,
    };
  },
  methods: {
    ...mapActions(["addNews"]),
    clearInputs() {
      for (let key in this.objNews) {
        this.objNews[key] = "";
      }
      this.delImage(0);
    },
    setDataNews() {
      const dataNews = {
        ...this.objNews,
        image: this.url,
      };
      this.addNews(dataNews);
      this.clearInputs();
    },
    async uploadImage() {
      try {
        this.loading = true;
        const file = this.file;
        const storageRef = ref(storage, `/images/${file.name}`);
        await uploadBytes(storageRef, file);
        this.url = await getDownloadURL(ref(storage, `/images/${file.name}`));
        this.setDataNews();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async addImage(event, type) {
      const file =
        type === "change" ? event.target.files[0] : event.dataTransfer.files[0];
      this.file = file;
      this.images.push({
        size: file.size,
        url: URL.createObjectURL(file),
      });
    },
    delImage(index) {
      this.images.splice(index, 1);
    },
  },
  computed: {
    limitImages() {
      return this.images.length > 0;
    },
  },
  components: {
    AppDropZone,
    AppLoader,
  },
};
</script>

<style  lang="scss" scoped>
</style>


