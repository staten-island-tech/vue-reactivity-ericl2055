<template>
  <div class="parts-container">
    <div class="filters">
      <FilterComponent :list="filtersList" @filterControl="manageFilters" @valueChange="filterValue" />
    </div>
    <ul class="main">
      <li v-for="part in filteredData" :key="part.id">
        <button @click="addToBuild(part)">Add to Build</button>
        {{ part.brand }} {{ part.model }} - ${{ part.price[1] }} - {{ part.size }}
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
      if (filter[2]) {
        if (this.selectedFilters[filter[0]] === undefined) {
          this.selectedFilters[filter[0]] = [filter[1]]
        } else this.selectedFilters[filter[0]].push(filter[1])
      } else {
        this.selectedFilters[filter[0]] = this.selectedFilters[filter[0]].filter(
          (existingFilter) => existingFilter !== filter[1]
        )
      }
      if (this.selectedFilters[filter[0]].length === 0) delete this.selectedFilters[filter[0]]
    },
    filterValue(data) {
      if (typeof data[1][1] === 'object') {
        if (this.selectedFilters[data[0]] === undefined) {
          this.selectedFilters[data[0]] = [data[1]]
        } else {
          let contains = true
          this.selectedFilters[data[0]] = this.selectedFilters[data[0]].map((array) => {
            if (array[0] === data[1][0]) {
              array[1] = array[1].filter((newArr) => {
                return newArr[0] !== data[1][1][0][0]
              })
              array[1].push(...data[1][1])
              contains = false
              return [array[0], array[1]]
            } else {
              return array
            }
          })
          if (contains) this.selectedFilters[data[0]].push(data[1])
        }
      } else {
        if (this.selectedFilters[data[0]] !== undefined) {
          this.selectedFilters[data[0]] = this.selectedFilters[data[0]].filter(
            (array) => array[0] !== data[1][0]
          )
        } else this.selectedFilters[data[0]] = []

        this.selectedFilters[data[0]].push(data[1])

      }
    }
  },
  computed: {
    filteredData() {
      if (Object.keys(this.selectedFilters).length === 0) return this.data
      return this.data.filter((data) => {
        for (const key of Object.keys(this.selectedFilters)) {
          const filterValue = this.selectedFilters[key];
          const dataValue = data[key];

          if (Array.isArray(filterValue[0])) {
            for (const [operation, operand] of filterValue) {
              if (key === 'price') {
                if (operation === 'max' && dataValue[1] > operand) return false;
                if (operation === 'min' && dataValue[1] < operand) return false;
              } else if (Array.isArray(operand)) {
                if (dataValue === null) continue;

                for (const [op, value] of operand) {
                  if (dataValue[operation] === null) continue;

                  if (op === 'min' && dataValue[operation] < value) return false;
                  if (op === 'max' && dataValue[operation] > value) return false;
                }
              } else {
                if (operation === 'min' && dataValue < operand && operand !== 0) return false;
                if (operation === 'max' && dataValue > operand) return false;
              }
            }
          } else {
            if (!filterValue.includes(dataValue)) return false;
          }
        }
        return true;
      });
    },
    convertList() {
      this.filtersList = Object.entries(
        Object.entries(this.data[0]).reduce((acc, [key, value]) => {
          acc[key] = new Set(this.data.map((obj) => JSON.stringify(obj[key])))
          return acc
        }, {})
      ).reduce((acc, [key, values]) => {
        acc[key] = Array.from(values).map((value) => JSON.parse(value))
        return acc
      }, {})
    }
  },
  watch: {
    part(newValue, oldValue) {
      this.data = data[newValue].data
      this.convertList
      this.selectedFilters = {}
    },
    filtersList(newValue, oldValue) {
      this.filteredData
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
  height: 100%;
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
  width: 100%;
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
