<template>
  <div class="pop-up">
    <span><slot></slot></span>
  </div>
</template>

<script>
export default {};
</script>


<style scoped lang="scss">
.pop-up {
  position: fixed;
  border-radius: 4px;
  min-width: 290px;
  background-color: rgba(000, 000, 000, 0.8);
  bottom: 23%;
  left: 50%;
  padding: 15px;
  transform: translateX(-50%);
  text-align: center;
  @media (max-width: 480px) {
    padding: 10px;
  }
  span {
    font-weight: 600;
    font-size: 14px;
    color: #ffffff;
    text-transform: uppercase;
    width: 100%;
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
}
</style>
