<template>
  <div class="build-container">
    <h2>Build</h2>
    <ul>
      <li v-for="([component, item], index) in Object.entries(buildList)" :key="component">
        <button @click="$emit('changeDisplay', index)">
          <p>
            {{
              component
                .split(/(?=[A-Z])/)
                .map((string) =>
                  string.match(/cpu|ups/i)
                    ? string.toUpperCase()
                    : string[0].toUpperCase() + string.substring(1)
                )
                .join(' ')
            }}
          </p>
          :
          <p>{{ item.brand }} - ${{ item.price }}</p>
        </button>
      </li>
    </ul>
    <h2>Total Price: ${{ totalPrice.toFixed(2) }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Build',
  emits: ['changeDisplay'],
  props: {
    buildList: {
      type: Object,
      required: true
    }
  },
  computed: {
    totalPrice() {
      console.log(Object.values(this.buildList))
      return Object.values(this.buildList).reduce(
        (sum, component) => (component === '' ? sum : sum + component.price),
        0
      )
    },
    fullList() {
      console.log(this.components, this.buildList)
      return this.components
    }
  },
  watch: {
    buildList(newVal, oldVal) {}
  }
}
</script>

<style scoped>
p {
  display: inline-block;
}

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
