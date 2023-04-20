<template>
  <div class="build-container">
    <h2>Build</h2>
    <ul>
      <li v-for="component in cpuComponents" :key="component.id">
        {{ component.type.toUpperCase() }}: {{ component.brand }} {{ component.model }} - ${{
          component.price
        }}
      </li>
      <li v-for="component in gpuComponents" :key="component.id">
        {{ component.type.toUpperCase() }}: {{ component.brand }} {{ component.model }} - ${{
          component.price
        }}
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
  },
  computed: {
    cpuComponents() {
      return this.components.filter((component) => component.type === 'cpu')
    },
    gpuComponents() {
      return this.components.filter((component) => component.type === 'gpu')
    }
  }
}
</script>

<style scoped></style>
