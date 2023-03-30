<template>
  <div class="new">
    <button @click="selectedManufacturer = ''">All</button>
    <button @click="selectedManufacturer = 'AMD'">AMD</button>
    <button @click="selectedManufacturer = 'Intel'">Intel</button>
    <label for="search">Search:</label>
    <input type="text" id="search" v-model="Search" />
    <select v-model="selectedCPU" @change="addToBuild">
      <option value="">Select A CPU</option>
      <option v-for="CPU in filterCPU" :value="CPU">
        {{ CPU.brand }} {{ CPU.model }} ${{ CPU.price }}
      </option>
    </select>

    <h2>Build</h2>
    <ul>
      <li v-for="CPU in build">{{ CPU.brand }} {{ CPU.model }} ${{ CPU.price }}</li>
    </ul>
    <p>Total price: ${{ totalPrice }}</p>
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
    },
    totalPrice() {
      return this.build.reduce((total, CPU) => total + CPU.price, 0)
    }
  },

  mounted() {
    this.Selected = ''
  },
  methods: {
    addToBuild() {
      if (this.selectedCPU !== null) {
        this.build = this.build.filter((CPU) => {
          return CPU.brand !== this.selectedCPU.brand
        })
        this.selectedCPU = Object.assign({}, this.selectedCPU)
        this.build.push(this.selectedCPU)
        console.log(this.build[0])
      }
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
