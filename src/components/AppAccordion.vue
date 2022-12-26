<template>
  <div class="accordion">
    <button class="accordion__toggle" @click="isOpen = !isOpen">
      Description <span> {{ isOpen ? "-" : "+" }}</span>
    </button>
    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <p class="accordion__desc desc" v-show="isOpen">
        <slot></slot>
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    start(el) {
      el.style.height = el.scrollHeight + "px";
    },
    end(el) {
      el.style.height = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion {
  @media (min-width: 620px) {
    display: none;
  }
  &__toggle {
    font-family: "Source Serif Pro";
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: left;
    align-items: center;
    font-size: 14px;
    color: #666666;
    text-transform: uppercase;
    span {
      font-size: 20px;
      font-weight: 700;
    }
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}
</style>