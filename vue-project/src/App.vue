<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </header>
    <RouterView class="view"/>
  </div>
</template>

<style scoped>
.container {
  /* width: 100vw; */
}

header {
  width: 100%;
  height: 20px;
}

.view {
  width: 100%;
}

</style>
