<script>
export default {
  props: {
    show: Boolean,
    id: String,
  },
};
</script>

<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('delete')">
              Yes
            </button>
            <button class="modal-default-button" @click="$emit('close')">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang='scss' scooped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  font-family: "Tenor Sans";
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  text-transform: uppercase;
  text-align: center;
  font-size: 23px;
  font-weight: 700;
  color: #d18888;
  &:not(:last-child) {
    margin-bottom: 25px;
  }
}

.modal-footer {
  display: flex;
  justify-content: space-around;
}
.modal-default-button {
  color: #666666;
  font-weight: 700;
  font-size: 17px;
  text-transform: uppercase;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>