<script>
  export default {
    props: {
      title: String,
      extra: String,
    }
  }
</script>

<template>
  <div class="now-playing-card">
    <div class="title-section">
      <div class="title">{{title}}</div>
      {{extra}}
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
  .now-playing-card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    padding: 16px 16px 8px;
    background-color: #1f1f1f;
    border-radius: 8px;
    z-index: 1;
    margin: 5px;
  }

  .title {
    font-weight: bold;
  }
</style>