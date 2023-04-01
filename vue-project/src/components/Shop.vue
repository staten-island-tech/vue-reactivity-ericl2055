<template>
  <div class="new">
    <div class="header">
      <div>
        <button
          @click="selectedCPUManufacturer = ''"
          :class="{ selected: selectedCPUManufacturer === '' }"
        >
          All
        </button>
        <button
          @click="selectedCPUManufacturer = 'AMD'"
          :class="{ selected: selectedCPUManufacturer === 'AMD' }"
        >
          AMD
        </button>
        <button
          @click="selectedCPUManufacturer = 'Intel'"
          :class="{ selected: selectedCPUManufacturer === 'Intel' }"
        >
          Intel
        </button>
      </div>
      <div>
        <label for="search">Search:</label>
        <input type="text" id="search" v-model="CPUSearch" />
      </div>
    </div>
    <div class="cpu-container">
      <div class="cpu-list">
        <h2>CPU List</h2>
        <ul>
          <li v-for="CPU in filterCPU" :key="CPU.id">
            {{ CPU.brand }} {{ CPU.model }} - ${{ CPU.price }}
            <button @click="addCPUToBuild(CPU)">Add to Build</button>
          </li>
        </ul>
      </div>
      <div class="build">
        <h2>Build</h2>
        <p>CPU: {{ cpu.brand }}{{ cpu.model }} ${{ cpu.price }}</p>
        <p>GPU: {{ gpu.brand }}{{ gpu.chipset }} ${{ gpu.price }}</p>
        <p>Total price: ${{ totalPrice }}</p>
      </div>
    </div>

    <div v-if="selectedCPU">
      <h2>GPU Selection</h2>
      <div class="GPUheader">
        <div>
          <button
            @click="selectedGPUManufacturer = ''"
            :class="{ selected: selectedGPUManufacturer === '' }"
          >
            All
          </button>
          <button
            @click="selectedGPUManufacturer = 'AMD'"
            :class="{ selected: selectedGPUManufacturer === 'AMD' }"
          >
            AMD
          </button>
          <button
            @click="selectedGPUManufacturer = 'Nvidia'"
            :class="{ selected: selectedGPUManufacturer === 'Nvidia' }"
          >
            Nvidia
          </button>
        </div>
        <div>
          <label for="search">Search:</label>
          <input type="text" id="search" v-model="GPUSearch" />
        </div>
      </div>
      <div class="gpu-container">
        <div class="gpu-list">
          <h2>GPU List</h2>
          <ul>
            <li v-for="GPU in filterGPU" :key="GPU.id">
              {{ GPU.brand }} {{ GPU.model }} {{ GPU.chipset }} ${{ GPU.price }}
              <button @click="addGPUToBuild(GPU)">Add to Build</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GPUdata from '../data/video-card.json'
import CPUdata from '../data/cpu.json'
export default {
  name: 'Build',
  builds: localStorage.getItem('builds'),
  data() {
    return {
      GPUs: GPUdata.data,
      CPUs: CPUdata.data,
      CPUSearch: '',
      GPUSearch: '',
      selectedCPUManufacturer: '',
      selectedGPUManufacturer: '',
      selectedCPU: null,
      selectedGPU: null,
      cpu: '',
      gpu: ''
    }
  },
  computed: {
    filterCPU() {
      if (this.selectedCPUManufacturer && this.CPUSearch) {
        return this.CPUs.filter((CPU) => {
          return (
            CPU.brand === this.selectedCPUManufacturer &&
            (CPU.brand.toLowerCase().includes(this.CPUSearch.toLowerCase()) ||
              CPU.model.toLowerCase().includes(this.CPUSearch.toLowerCase())) &&
            CPU.price > 0
          )
        })
      } else if (this.selectedCPUManufacturer) {
        return this.CPUs.filter((CPU) => {
          return CPU.brand === this.selectedCPUManufacturer && CPU.price > 0
        })
      } else if (this.CPUSearch) {
        return this.CPUs.filter((CPU) => {
          return (
            (CPU.brand.toLowerCase().includes(this.CPUSearch.toLowerCase()) ||
              CPU.model.toLowerCase().includes(this.CPUSearch.toLowerCase())) &&
            CPU.price > 0
          )
        })
      } else {
        return this.CPUs.filter((CPU) => {
          return CPU.price > 0
        })
      }
    },
    filterGPU() {
      if (this.selectedGPUManufacturer && this.GPUSearch) {
        return this.GPUs.filter((GPU) => {
          return (
            GPU.brand === this.selectedGPUManufacturer &&
            (GPU.brand.toLowerCase().includes(this.GPUSearch.toLowerCase()) ||
              GPU.chipset.toLowerCase().includes(this.GPUSearch.toLowerCase())) &&
            GPU.price > 0
          )
        })
      } else if (this.selectedGPUManufacturer) {
        return this.GPUs.filter((GPU) => {
          return GPU.brand === this.selectedGPUManufacturer && GPU.price > 0
        })
      } else if (this.GPUSearch) {
        return this.GPUs.filter((GPU) => {
          return (
            (GPU.brand.toLowerCase().includes(this.GPUSearch.toLowerCase()) ||
              GPU.chipset.toLowerCase().includes(this.GPUSearch.toLowerCase())) &&
            GPU.price > 0
          )
        })
      } else {
        return this.GPUs.filter((GPU) => {
          return GPU.price > 0
        })
      }
    },
    totalPrice() {
      if (this.cpu == null && this.gpu == null) {
        return 0
      } else {
        console.log(this.cpu)
        return this.cpu.price + this.gpu.price
      }
    }
  },

  methods: {
    addCPUToBuild(CPU) {
      this.cpu = CPU
      this.selectedCPU = CPU
    },
    addGPUToBuild(GPU) {
      this.gpu = GPU
      this.selectedGPU = GPU
    }
  }
}
</script>

<style scoped>
.new {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  left: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #f0f0f0;
}

.cpu-container {
  left: 20rem;
  top: 0rem;
  width: 1000px;
  overflow-y: auto;
  padding: 1rem;
}
.cpu-list {
  flex: 1;
}

.build {
  position: fixed;
  top: 13rem;
  right: 90rem;
  bottom: 1rem;
  width: 20rem;
  padding: 1rem;
  overflow-y: auto;
}
.build p {
  font-size: 20px;
}

button {
  margin: 0 0.5rem;
}

label {
  margin-right: 0.5rem;
}

input[type='text'] {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

ul li {
  font-size: 24px;
}

.new h2 {
  font-size: 32px;
}

button {
  font-size: 20px;
  background-color: white;
}

button.selected {
  background-color: rgb(145, 145, 158);
}

label {
  font-size: 20px;
}

#search {
  font-size: 20px;
}
</style>
