<template>
  <section class="create-news">
    <div class="create-news__container">
      <h1 class="create-news__title title">Create News</h1>
      <form class="create-news__form form" @submit.prevent>
        <div class="form__united-row">
          <div class="form__row">
            <label class="form__label" for="type">type</label>
            <input
              maxlength="30"
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
              maxlength="30"
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
            maxlength="70"
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
            maxlength="1000"
            class="form__item form__textarea item"
            type="desc"
            id="title"
            placeholder="Enter news description"
            v-model.trim="objNews.desc"
          />
        </div>
        <div class="form__united-row">
          <div class="form__file load-file">
            <h5 class="load-file__title form__label">Image</h5>
            <div class="load-file__content file-content">
              <div class="file-content__task file-content__dropzone">
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
                      type="button"
                      class="file-picture__remove-item"
                      @click="delImage(index)"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form__buttons">
            <button
              class="form__button button"
              type="button"
              @click="clearInputs()"
            >
              Clear
            </button>
            <button
              class="form__button button"
              type="button"
              :disabled="!checkValidForm"
              :class="{ form__button_invalid: !checkValidForm }"
              @click="preview = !preview"
            >
              Preview
            </button>
            <button
              class="form__button button"
              type="submit"
              :disabled="!checkValidForm"
              :class="{ form__button_invalid: !checkValidForm }"
              @click="uploadNews()"
            >
              Add news
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="top-news preview" v-if="preview">
      <div class="top-news__container preview__body">
        <div class="top-news__image">
          <img :src="images.at(-1).url" alt="" />
        </div>
        <div class="top-news__content content-top-news">
          <span class="content-top-news__label label">
            {{ objNews.type }}
          </span>
          <h1 class="content-top-news__title title">
            {{ objNews.title }}
          </h1>
          <p class="content-top-news__desc desc">
            {{ objNews.desc }}
          </p>
          <span class="content-top-news__author author">
            {{ objNews.author }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AppDropZone from "../components/AppDropZone.vue";
import AppTopNews from "../components/AppTopNews.vue";

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
      imageName: "",
      url: "",
      images: [],
      file: {},
      preview: false,
    };
  },
  methods: {
    ...mapActions(["addOwnNews"]),
    ...mapMutations(["showLoader"]),

    clearInputs() {
      for (let key in this.objNews) {
        this.objNews[key] = "";
      }
      this.delImage(0);
    },

    sendDataNews() {
      const dataNews = {
        ...this.objNews,
        image: this.url,
        imageName: this.imageName,
        uid: this.uid,
      };
      this.addOwnNews(dataNews);
      this.clearInputs();
    },

    addImage(event, type) {
      const file =
        type === "change" ? event.target.files[0] : event.dataTransfer.files[0];
      this.file = file;
      if (!file || file.type !== "image/jpeg") return;
      this.images.push({
        url: URL.createObjectURL(file),
      });
    },

    async sendImageToStorage() {
      try {
        const storage = getStorage();
        const fileName = Date.now() + ".jpg";
        this.imageName = fileName;
        const storageRef = ref(storage, `images/${fileName}`);
        await uploadBytes(storageRef, this.file);
        this.url = await getDownloadURL(ref(storage, `/images/${fileName}`));
      } catch (error) {
        console.log(error);
      }
    },

    async uploadNews() {
      try {
        this.showLoader(true);
        await this.sendImageToStorage();
        this.sendDataNews();
        console.log("Upload successful");
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.showLoader(false);
      }
    },

    delImage(index) {
      this.images.splice(index, 1);
    },
  },
  computed: {
    ...mapState(["uid"]),
    limitImages() {
      return this.images.length > 0;
    },
    checkValidForm() {
      const { type, author, title, desc } = this.objNews;
      return type && author && title && desc && this.limitImages ? true : false;
    },
  },
  watch: {
    checkValidForm(value) {
      this.preview = value ? this.preview : false;
    },
  },
  components: {
    AppDropZone,
    AppTopNews,
  },
};
</script>

<style  lang="scss" scoped>
</style>


