<template>
  <div class="build-container">
    <h2>Build</h2>
    <ul>
      <li v-for="component in components" :key="component">
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
        <p :key="containsObj(component)">
          {{ containsObj(component) }}
        </p>
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
      required: true
    },
    buildList: {
      type: Array,
      required: true
    }
  },
  methods: {
    containsObj(component) {
      return this.buildList.find((item) => item.type === component)
    }
  },
  computed: {
    totalPrice() {
      return this.components.reduce((sum, component) => {
        return sum + component.price
      }, 0)
    }
  },
  mounted() {
    console.log(this.containsObj(this.components[0]))
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
}</style>
