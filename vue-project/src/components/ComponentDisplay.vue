<template>
  <div class="parts-container">
    <ul>
      <li v-for="part in filter" :key="part.id">
        <button @click="addToBuild()">Add to Build</button>
        {{ part.brand }} {{ part.model }} - ${{ part.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import * as data from '../data'

export default {
  name: 'about',
  components: {},
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
      builds: JSON.parse(localStorage.getItem('builds'))
    }
  },
  methods: {
    addToBuild(CPU) {
      this.cpu = CPU
      this.selectedCPU = CPU
    }
  },
  watch: {
    filters(newVal, oldVal) {
      this.filter()
    }
  },
  computed: {
    filter() {
      if (this.filters.length === 0) {
        return this.data.filter((part) => part.price > 0)
      }

      return this.filters.reduce((filteredData, filter) => {
        return filteredData.filter((part) => {
          const matchesFilter = part[filter.type] === filter.filter
          const hasPrice = part.price > 0
          return matchesFilter && hasPrice
        })
      }, this.data)
    }
  }
}
</script>
<style scoped>
.parts-container {
  left: 20rem;
  top: 0rem;
  width: calc(100vw - 41rem);
  overflow-y: auto;
  padding: 1rem;
  border: 0.9rem solid white;
  border-radius: 5rem;
  width: 100rem;
  overflow-y: auto;
}

.parts-container::-webkit-scrollbar {
  width: 1.2rem;
}
.parts-container::-webkit-scrollbar-track {
  margin: 35px;
}
.parts-container::-webkit-scrollbar-thumb {
  background-color: rgb(70, 70, 70);
  border-radius: 20px;
}

ul {
  list-style-type: decimal;
  padding: 0.75rem 2rem 3rem 4.5rem;
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
