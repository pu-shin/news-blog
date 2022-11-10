  <template>
  <div class="create-news">
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
            />
          </div>
          <div class="form__row">
            <label class="form__label" for="author">Author</label>
            <input
              class="form__item item"
              type="text"
              id="author"
              placeholder="Enter news author"
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
          />
        </div>
        <div class="form__row">
          <label class="form__label" for="description">Description</label>
          <textarea
            class="form__item form__textarea item"
            type="desc"
            id="title"
            placeholder="Enter news description"
          />
        </div>
        <button class="form__button button" type="submit">Add news</button>
      </form>
      <!-- <div class="create-news__view view">
        <div class="view__body">
          <div class="view__image">
            <img src="../assets/images/japan-house.jpg" alt="foto news" />
          </div>
          <div class="view__body body-view">
            <span class="body-view__label label">Illustration</span>
            <h1 class="body-view__title title">
              Japan House opens in mountainside to foster peak creativity.
            </h1>
            <p class="body-view__text text">
              Enim omittam qui id, ex quo atqui dictas complectitur. Nec ad
              timeam accusata, hinc justo falli id eum, ferri novum molestie eos
              cu.
            </p>
            <span class="body-view__author author">by Reta Torphy</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style scoped>
</style>