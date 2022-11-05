<template>
  <section class="news">
    <div class="news__container">
      <h3 class="news__label label">Latest News</h3>
      <div class="news__body body-news">
        <div class="body-news__cards">
          <div
            class="body-news__card card"
            v-for="(item, index) in 6"
            :key="index"
          >
            <div class="card__image">
              <img src="../assets/images/japan-house.jpg" alt="foto news" />
            </div>
            <div class="card__body body-card">
              <span class="body-card__label label">Illustration</span>
              <h1 class="body-card__title title">
                Japan House opens in mountainside to foster peak creativity.
              </h1>
              <span class="body-card__author author">by Reta Torphy</span>
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
export default {};
</script>


<style scoped>
</style>
