<template>
  <div class="parts-container">
    <div class="filters">
      <FilterComponent :list="filtersList" @filterControl="manageFilters" @valueChange="filterValue" />
    </div>
    <ul class="main">
      <li v-for="part in filteredData" :key="part.id">
        <button @click="addToBuild(part)">Add to Build</button>
        {{ part.brand }} {{ part.model }} - ${{ part.price[1] }}
      </li>
    </ul>
  </div>
</template>

<script>
import FilterComponent from './FilterComponent.vue'
import * as data from '../data'

export default {
  name: 'about',
  components: {
    FilterComponent
  },
  props: {
    part: {
      type: String,
      required: true
    },
    filters: {
      type: Array,
      required: false
    }
  },

  data() {
    return {
      data: data[this.part].data,
      filtersList: {},
      selectedFilters: {},
      price: [0, 10000]
    }
  },
  methods: {
    addToBuild(part) {
      this.$emit('addBuild', part)
    },
    manageFilters(filter) {
      if (filter[0]) {
        if (this.selectedFilters[filter[1]] === undefined) this.selectedFilters[filter[1]] = [filter[2]]
        else this.selectedFilters[filter[1]].push(filter[2])
      } else {
        delete this.selectedFilters[filter[1]]
      }
    },
    filterValue(price) {
      if (price[0] === "min") this.price[0] = price[1]
      else this.price[1] = price[1]
    },
  },
  computed: {
    filteredData() {
      if (this.selectedFilters.length === 0 && this.price[0] === 0 && this.price[1] === 10000) return this.data
      return this.data.filter((data) => {
        if (parseInt(data.price[1]) < this.price[0]) return false
        if (parseInt(data.price[1]) > this.price[1]) return false
        for (let key in this.selectedFilters) {
          if (!this.selectedFilters[key].includes(data[key])) return false
        }
        return true
      })
    },
    convertList() {
      this.filtersList = Object.entries(
        Object.entries(
          this.data[0])
          .reduce(((acc, [key, value]) => {
            acc[key] = new Set(this.data.map(obj => JSON.stringify(obj[key])))
            return acc
          }), {}))
        .reduce(((acc, [key, values]) => {
          acc[key] = Array.from(values).map((value) => JSON.parse(value))
          return acc
        }), {})
    }
  },
  watch: {
    part(newValue, oldValue) {
      this.data = data[newValue].data
      this.convertList
      this.selectedFilters = {}
    }
  },
  mounted() {
    this.convertList
  }
}
</script>
<style scoped>
.parts-container {
  left: 20rem;
  top: 0rem;
  width: calc(100vw - 40rem);
  overflow-y: auto;
  padding: 1rem;
  border: 0.9rem solid white;
  border-radius: 5rem;
  width: 100rem;
  height: 85vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 10px;
}

.filters {
  height: 100%
}

.parts-container::-webkit-scrollbar {
  background-color: rgba(0, 0, 0, 0);
  width: 1.2rem;
}

.parts-container::-webkit-scrollbar-track {
  margin: 35px;
}

.parts-container::-webkit-scrollbar-thumb {
  background-color: rgb(70, 70, 70);
  border-radius: 20px;
}

.main {
  list-style-type: decimal;
  padding: 0.75rem 2rem 3rem 4.5rem;
  width: 100%
}

li {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  color: rgb(175, 175, 175);
}

button {
  background-color: rgba(0, 0, 0, 0);
  font-size: 1.5rem;
  color: rgb(175, 175, 175);
  border: 0.25rem solid rgb(175, 175, 175);
  border-radius: 1rem;
}

button:hover {
  background-color: rgb(100, 100, 100);
}
</style>
