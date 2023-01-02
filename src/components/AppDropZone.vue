<template>
  <div
    class="dropzone"
    :class="{ 'active-drop': active, 'disable-drop': disabled }"
    @click="selectFile"
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="dropFile($event, 'drop')"
  >
    <div class="dropzone__body">
      <div
        class="dropzone__image"
        :class="{ 'dropzone__image-disabled': disabled }"
      ></div>
      <button type="button" class="dropzone__button" v-if="!disabled"></button>
      <input
        class="dropzone__field"
        type="file"
        :accept="format"
        ref="select-file"
        @change="addFile($event, 'change')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["format", "disabled"],
  emits: ["drop-file", "add-file"],

  data() {
    return {
      active: false,
    };
  },

  methods: {
    toggleActive() {
      this.active = !this.active;
    },

    selectFile() {
      this.$refs["select-file"].click();
    },

    dropFile(event, type) {
      this.$emit("drop-file", event, type);
      this.toggleActive();
    },

    addFile(event, type) {
      this.$emit("add-file", event, type);
      this.$refs["select-file"].value = "";
    },
  },
};
</script>

<style scoped lang="scss">
.dropzone {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    height: 100%;
  }
  &__field {
    display: none;
  }
  &__image {
    width: 40px;
    height: 40px;
    background: no-repeat center url("../assets/icons/upload-image-icon.png");
  }
  &__image-disabled {
    filter: invert(15%) sepia(85%) saturate(0%) brightness(95%) contrast(95%);
  }
  &__button {
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #666666;
    &::before {
      content: "select or drag an image";
      display: block;
      @media (max-width: 680.98px) {
        content: "select image";
      }
    }
  }
}

.disable-drop {
  pointer-events: none;
  cursor: default;
}
.active-drop {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, black 0px 0px 0px 1px inset;
}
</style>
