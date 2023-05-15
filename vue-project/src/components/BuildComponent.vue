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
    list: { type: Array, required: true },
    components: {type: Array, required: false }
    }
  }
}
</script>

<style scoped>
.build-container {
  font-size: 20px;
}
h2 {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
ul {
  list-style-type: none;
}
li {
  font-size: 15px;
}
</style>
