<template>
  <div class="build-container">
    <h2>Build</h2>
    <ul>
      <li v-for="component in components" :key="component.id">
        {{ component.type }} : {{ component.brand }} {{ component.model }} - ${{
          component.price.toFixed(2)
        }}
      </li>
    </ul>
    <h2>Total Price: ${{ totalPrice.toFixed(2) }}</h2>
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
    totalPrice() {
      return this.components.reduce((sum, component) => {
        return sum + component.price
      }, 0)
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
