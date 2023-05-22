<template>
  <div class="parts-container">
    <div class="head">
      <div v-for="(key, index) in keys" :key="key" :class="'key key' + index">
        <p class="key-text">
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
        </p>
      </div>
    </div>
    <div class="filters">
      <FilterComponent
        :list="filtersList"
        @filterControl="manageFilters"
        @valueChange="filterValue"
      />
    </div>
    <ul class="main">
      <li v-for="part in filteredData.splice(0, currentCount)" :key="part">
        <button @click="addToBuild(part)">Add to Build</button>
        <p
          v-for="(value, index) in Object.values(part).filter((part) => typeof part !== 'object')"
          :class="'subkey key' + index"
        >
          {{ value }}
        </p>
      </li>
      <button v-if="currentCount < data.length" @click="increaseCount">Show More</button>
    </ul>
  </div>
</template>

<script>
import FilterComponent from './FilterComponent.vue'
import * as data from '../data/index.js'

export default {
  name: 'about',
  emits: ['addBuild', 'keys'],
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
      currentCount: 200,
      data: [],
      filtersList: {},
      selectedFilters: {},
      keys: []
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
      let newObj = this.selectedFilters
      if (data.objKey !== undefined) {
        if (newObj[data.key] === undefined) {
          newObj[data.key] = { all: {}, min: {}, max: {}, default: {}, current: '' }
        }
        newObj[data.key][data.objKey] = data.values
        newObj[data.key].current = data.objKey
      } else {
        newObj[data.key] = data.values
      }
      this.selectedFilters = newObj
    },
    increaseCount() {
      if (this.currentCount < this.data.length) this.currentCount += 200
      else this.currentCount = this.data.length
    }
  },
  computed: {
    showLoadMoreButton() {
      return this.currentPage * this.itemsPerPage < this.filteredData.length
    },
    createData() {
      this.data = data[this.part].data.map((data) => {
        return Object.entries(data).reduce((acc, [key, value]) => {
          if (typeof value === 'object') {
            if (Array.isArray(value)) {
              value[0] === 'USD' ? (value = parseFloat(value[1])) : (value = parseFloat(value[0]))
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
      return this.data.filter((data) => {
        for (const [key, value] of Object.entries(this.selectedFilters)) {
          const dataValue = data[key]

          if (typeof value === 'object' && value.all !== undefined) {
            if (value.current === 'min' || value.current === 'max') {
              if (
                dataValue.min === undefined ||
                dataValue.min < value.min.min ||
                dataValue.min > value.min.max ||
                dataValue.max < value.max.min ||
                dataValue.max > value.max.max
              )
                return false
            } else if (value.current === 'default') {
              if (
                dataValue.default === undefined ||
                dataValue.default < value.default.min ||
                dataValue.default > value.default.max
              )
                return false
            } else {
              if (dataValue.default === undefined) {
                if (dataValue.min < value.all.min || dataValue.max > value.all.max) return false
              } else {
                if (dataValue.default < value.all.min || dataValue.default > value.all.max)
                  return false
              }
            }
          } else if (typeof value === 'object' && !Array.isArray(value)) {
            if (dataValue < value.min || dataValue > value.max) return false
          } else {
            if (!value.includes(dataValue)) return false
          }
        }
        return true
      })
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
          if (set.min.size + set.max.size + set.default.size === 0) return acc
          acc[key] = {
            default: Array.from(set.default),
            min: Array.from(set.min),
            max: Array.from(set.max)
          }
        } else {
          set = new Set(
            this.data.map((obj) => (typeof obj[key] === 'object' ? undefined : obj[key]))
          )
          set.delete(undefined)
          set = Array.from(set)
          if (set.length !== 1 && set[0] !== null) {
            acc[key] = set
          }
        }
        return acc
      }, {})

      this.keys = Object.keys(this.filtersList).filter((data) =>
        Array.isArray(this.filtersList[data])
      )
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
  border: 1rem solid white;
  border-radius: 5rem;
  width: 110rem;
  height: 85vh;
  overflow-y: auto;
  display: grid;
  grid-template:
    'head head'
    'filter list';
  grid-template-rows: 7rem 1fr;
  grid-template-columns: 20rem 1fr;
  padding-top: 0;
}

.head {
  position: fixed;
  grid-area: head;
  width: 106rem;
  padding: 3rem;
  padding-left: 32.5rem;
  padding-top: 0;
  display: flex;
  justify-content: space-around;
  background-color: red;
  z-index: 1;
  height: 7rem;
}

.key {
  display: inline-block;
  height: 7rem;
  align-items: center;
  font-size: 2.5rem;
  border-left: 1px solid rgb(255, 255, 255);
}

.key-text {
  margin: auto;
  font-size: 2.5rem;
}
.filters {
  grid-area: filter;
  height: 100%;
  width: 20rem;
}

.main {
  width: 100%;
  grid-area: list;
  list-style-type: decimal;
  padding: 0.75rem 2rem 3rem 4.5rem;
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

.data {
  display: inline-block;
}
</style>
