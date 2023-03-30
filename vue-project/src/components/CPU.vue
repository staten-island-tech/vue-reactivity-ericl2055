<template>
  <div class="new">
    <button @click="selectedManufacturer = ''">All</button>
    <button @click="selectedManufacturer = 'AMD'">AMD</button>
    <button @click="selectedManufacturer = 'Intel'">Intel</button>
    <label for="search">Search:</label>
    <input type="text" id="search" v-model="Search" />
    <select v-model="selectedCPU">
      <option value="">Select A CPU</option>
      <option v-for="CPU in filterCPU" :value="CPU.model">
        {{ CPU.brand }} {{ CPU.model }} ${{ CPU.price }}
      </option>
    </select>
    <button @click="addToBuild">Add to Build</button>

    <h2>Build</h2>
    <ul>
      <li v-for="CPU in build">{{ CPU.brand }} - {{ CPU.model }} - {{ CPU.price }}</li>
    </ul>
  </div>
</template>

<script>
import CPUdata from '../data/cpu.json'
export default {
  name: 'CPU',
  builds: localStorage.getItem('builds'),
  data() {
    return {
      CPUs: CPUdata.data,
      Search: '',
      selectedManufacturer: '',
      selectedCPU: null,
      build: []
    }
  },
  computed: {
    filterCPU() {
      if (this.selectedManufacturer && this.Search) {
        return this.CPUs.filter((CPU) => {
          return (
            CPU.brand === this.selectedManufacturer &&
            CPU.model.toLowerCase().includes(this.Search.toLowerCase()) &&
            CPU.price > 0
          )
        })
      } else if (this.selectedManufacturer) {
        return this.CPUs.filter((CPU) => {
          return CPU.brand === this.selectedManufacturer && CPU.price > 0
        })
      } else if (this.Search) {
        return this.CPUs.filter((CPU) => {
          return CPU.model.toLowerCase().includes(this.Search.toLowerCase()) && CPU.price > 0
        })
      } else {
        return this.CPUs.filter((CPU) => {
          return CPU.price > 0
        })
      }
    }
  },

  mounted() {
    this.Selected = ''
  },
  methods: {
    addToBuild() {
      console.log('cpu')
      if (this.selectedCPU) {
        const existingCPUIndex = this.build.findIndex((CPU) => CPU.model === this.selectedCPU.model)
        if (existingCPUIndex >= 0) {
          this.build.splice(existingCPUIndex, 1)
        }
        this.build.push(selectedCPU)
      }
      this.selectedCPU = null
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .new {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  button {
    font-size: 16px;
  }
  label {
    font-size: 16px;
  }
  #search {
    font-size: 16px;
  }
  select {
    font-size: 16px;
  }
  option {
    font-size: 16px;
  }
}
</style>
