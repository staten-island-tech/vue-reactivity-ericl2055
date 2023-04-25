<template>
  <div class="build-container">
    <h2>Build</h2>
    <ul>
      <li v-for="component in components" :key="component.id">
        {{ component.brand }} {{ component.model }} - ${{ component.price }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Build',
  props: {
    components: {
      type: Array,
      required: false
    }
  }
}
</script>

<style scoped></style>
