<template>
  <div class="parts-container">
    <div class="filters">
      <FilterComponent
        :list="filtersList"
        @filterControl="manageFilters"
        @valueChange="filterValue"
      />
    </div>
    <ul class="main">
      <li v-for="part in filteredData" :key="part">
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
      data: [],
      filtersList: {},
      selectedFilters: {},
      price: [0, 10000],
      currentList: []
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
      if (data.objKey !== undefined) {
        if (this.selectedFilters[data.key] === undefined)
          this.selectedFilters[data.key] = { default: {}, min: {}, max: {} }
        this.selectedFilters[data.key][data.objKey] = data.values
      } else {
        this.selectedFilters[data.key] = data.values
      }
    }
  },
  computed: {
    createData() {
      this.data = data[this.part].data.map((data) => {
        return Object.entries(data).reduce((acc, [key, value]) => {
          if (typeof value === 'object') {
            if (Array.isArray(value)) {
              value[0] === 'USD' ? (value = value[1]) : (value = value[0])
            } else {
              if (value === null) {
                value = {}
              } else if (value.default === null) {
                value = { min: value.min, max: value.max }
              } else if (value.min === null && value.max === null) {
                value = { default: value.default }
              } else {
                value = Object.values(value)[0]
              }
            }
          }
          acc[key] = value
          return acc
        }, {})
      })
    },
    filteredData() {
      // if (this.currentList.length === 0) {
      this.currentList = this.data.filter((data) => {
        for (const key of Object.keys(this.selectedFilters)) {
          const filterValue = this.selectedFilters[key]
          const dataValue = data[key]

          if (!Array.isArray(filterValue)) {
            for (const [operation, operand] of filterValue) {
              if (key === 'price') {
                if (operation === 'max' && dataValue[1] > operand) return false
                if (operation === 'min' && dataValue[1] < operand) return false
              } else if (Array.isArray(operand)) {
                if (dataValue === null) continue

                for (const [op, value] of operand) {
                  if (dataValue[operation] === null) continue

                  if (op === 'min' && dataValue[operation] < value) return false
                  if (op === 'max' && dataValue[operation] > value) return false
                }
              } else {
                if (operation === 'min' && dataValue < operand && operand !== 0) return false
                if (operation === 'max' && dataValue > operand) return false
              }
            }
          } else {
            if (!filterValue.includes(dataValue)) return false
          }
        }
        return true
      })
      // }
      return this.currentList
    },
    convertList() {
      this.filtersList = Object.entries(this.data[0]).reduce((acc, [key, value]) => {
        let set = []
        if (typeof value === 'object') {
          set = this.data.reduce(
            (acc, obj) => {
              if (obj[key].min !== undefined && obj[key].max !== undefined) {
                acc.min.add(obj[key].min)
                acc.max.add(obj[key].max)
              } else if (obj[key].default !== undefined) {
                acc.default.add(obj[key].default)
              }
              return acc
            },
            { default: new Set(), min: new Set(), max: new Set() }
          )
          acc[key] = {
            default: Array.from(set.default),
            min: Array.from(set.min),
            max: Array.from(set.max)
          }
        } else {
          set = Array.from(new Set(this.data.map((obj) => obj[key])))
          if (set.length !== 1 && set[0] !== null) {
            acc[key] = set
          }
        }
        return acc
      }, {})
    }
  },
  watch: {
    part(newValue, oldValue) {
      this.createData
      this.convertList
      this.selectedFilters = {}
    },
    filtersList(newValue, oldValue) {
      this.filteredData
    }
  },
  mounted() {
    this.createData
    this.convertList
    console.log(this.filtersList)
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
