<template>
  <h1>Price</h1>
  <NumberSlide :valueList="price" symbol="$" @change="(event) => $emit('price', event)" />

  <div class="checkbox-list" v-for="[key, value] in Object.entries(list)" :key="key">
    <div v-if="isNaN(value[0]) || typeof value[0] === 'object'">
      <h1>
        {{
          key
            .split('_')
            .map((string) =>
              string.match(/rpm|pwm|psu|tdp|gb|cas|ram|dpi|dvd|cd|snr|va/i)
                ? string.toUpperCase()
                : string[0].toUpperCase() + string.substring(1)
            )
            .join(' ')
        }}
      </h1>
      <label v-for="item in this.active[key] ? value.sort().slice(0, 5) : value.sort()" :key="item">
        <input
          v-if="item !== null"
          type="checkbox"
          name="option3"
          :value="item"
          @change="(event) => selectedFilter(event, key, item)"
        />
        <p v-if="item !== null">{{ item }}</p>
      </label>
      <button @click="this.active[key] = !this.active[key]" class="show">
        {{ this.active[key] ? 'Show more' : 'Show less' }}
      </button>
    </div>
    <div v-if="!isNaN(value[0])">
      <h1>
        {{
          key
            .split('_')
            .map((string) =>
              string.match(/rpm|pwm|psu|tdp|gb|cas|ram|dpi|dvd|cd|snr|va/i)
                ? string.toUpperCase()
                : string[0].toUpperCase() + string.substring(1)
            )
            .join(' ')
        }}
      </h1>
      <NumberSlide :valueList="value.map((value) => parseInt(value))" @change="(event) => {}" />
    </div>
  </div>
</template>

<script>
import NumberSlide from './NumberSlide.vue'
export default {
  name: 'FilterComponent',
  emits: ['filterControl', 'price'],
  components: {
    NumberSlide
  },
  data() {
    return {
      active: {},
      price: []
    }
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectedFilter(event, key, filter) {
      if (event.target.checked) {
        this.$emit('filterControl', [true, key, filter])
      } else {
        this.$emit('filterControl', [false, key, filter])
      }
    },
    activeList(obj) {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {})
    },
    createPrice(value) {
      return value === undefined ? [] : value.map((price) => parseInt(price[1]))
    },
    handleFunction(value) {}
  },
  watch: {
    list(newValue, oldValue) {
      this.active = this.activeList(newValue)
      this.price = this.createPrice(newValue.price)
      delete this.list.price
    }
  }
}
</script>
<style scoped>
.checkbox-list label {
  display: block;
  margin-bottom: 10px;
  line-height: 1.5;
  align-items: center;
}

h1 {
  font-size: 25px;
  margin: 0;
}

p {
  display: inline-block;
  font-size: 12px;
}

.checkbox-list input[type='checkbox'] {
  display: inline-block;
  margin-right: 10px;
  top: 1px;
}

.show {
  font-size: 12px;
  border: none;
  background: none;
  color: rgb(113, 113, 230);
  text-decoration: underline;
  cursor: pointer;
}
</style>
