<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header>
      <nav>
        <RouterLink to="/" class="home">Home</RouterLink>
      </nav>
    </header>
    <RouterView class="view" />
  </div>
</template>

<style scoped>
.container {
  height: 98.55vh;
  vertical-align: top;
}

header {
  width: 100%;
  height: 20px;
}

.view {
  width: 100%;
}

.home {
  font-size: 2rem;
  height: 2.5rem;
}
</style>
