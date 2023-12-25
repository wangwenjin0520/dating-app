<template>
  <div class="container-title">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ""
    }
  }
};
</script>

<style scoped>
.container-title {
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
