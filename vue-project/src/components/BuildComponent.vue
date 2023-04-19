<template>
  <div class="build-container">
    <h2>Build</h2>
    <ul>
      <li v-for="part in build" :key="part.id">
        {{ part.brand }} {{ part.model }} - ${{ part.price }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Build',
  props: {
    build: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>
