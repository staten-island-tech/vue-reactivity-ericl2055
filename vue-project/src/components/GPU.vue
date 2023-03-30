<template>
  <div class="new">
    <button @click="selectedManufacturer = ''">All</button>
    <button @click="selectedManufacturer = 'AMD'">AMD</button>
    <button @click="selectedManufacturer = 'NVIDIA'">Nvidia</button>
    <label for="search">Search:</label>
    <input type="text" id="search" v-model="Search" />
    <select v-model="selectedGPU" @change="addToBuild">
      <option value="">Select A GPU</option>
      <option v-for="GPU in filterGPU" :value="GPU">
        {{ GPU.brand }} {{ GPU.model }} {{ GPU.chipset }} ${{ GPU.price }}
      </option>
    </select>

    <h2>Build</h2>
    <ul>
      <li v-for="GPU in build">
        {{ GPU.brand }} {{ GPU.model }} {{ GPU.chipset }} ${{ GPU.price }}
      </li>
    </ul>
    <p>Total price: ${{ totalPrice }}</p>
  </div>
</template>

<script>
import GPUdata from '../data/video-card.json'
export default {
  name: 'GPU',
  builds: localStorage.getItem('builds'),
  data() {
    return {
      GPUs: GPUdata.data,
      Search: '',
      selectedManufacturer: '',
      selectedGPU: null,
      build: []
    }
  },
  computed: {
    filterGPU() {
      if (this.selectedManufacturer && this.Search) {
        return this.GPUs.filter((GPU) => {
          return (
            GPU.brand === this.selectedManufacturer &&
            GPU.model.toLowerCase().includes(this.Search.toLowerCase()) &&
            GPU.price > 0
          )
        })
      } else if (this.selectedManufacturer) {
        return this.GPUs.filter((GPU) => {
          return GPU.brand === this.selectedManufacturer && GPU.price > 0
        })
      } else if (this.Search) {
        return this.GPUs.filter((GPU) => {
          return GPU.model.toLowerCase().includes(this.Search.toLowerCase()) && GPU.price > 0
        })
      } else {
        return this.GPUs.filter((GPU) => {
          return GPU.price > 0
        })
      }
    },
    totalPrice() {
      return this.build.reduce((total, GPU) => total + GPU.price, 0)
    }
  },

  mounted() {
    this.Selected = ''
  },
  methods: {
    addToBuild() {
      if (this.selectedGPU !== null) {
        this.build = this.build.filter((GPU) => {
          return GPU.brand !== this.selectedGPU.brand && this.selectedGPU.model
        })
        this.selectedGPU = Object.assign({}, this.selectedGPU)
        this.build.push(this.selectedGPU)
        console.log(this.build)
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
