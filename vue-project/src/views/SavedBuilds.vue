<template>
  <div class="new">
    <div class="header" v-show="showCPU">
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
    <div class="cpu-container" v-show="showCPU">
      <div class="cpu-list">
        <h2>CPU List</h2>
        <ul>
          <li v-for="CPU in filterCPU" :key="CPU.id">
            {{ CPU.brand }} {{ CPU.model }} - ${{ CPU.price }}
            <button @click="addCPUToBuild(CPU), hideCPU()">Add to Build</button>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="selectedCPU" v-show="showMB">
      <h2>Motherboard Selection</h2>
      <div class="MBheader">
        <div>
          <button
            @click="selectedMBManufacturer = ''"
            :class="{ selected: selectedMBManufacturer === '' }"
          >
            All
          </button>
          <button
            @click="selectedMBManufacturer = 'AMD'"
            :class="{ selected: selectedMBManufacturer === 'AMD' }"
          >
            AMD
          </button>
          <button
            @click="selectedMBManufacturer = 'Nvidia'"
            :class="{ selected: selectedMBManufacturer === 'Nvidia' }"
          >
            Nvidia
          </button>
        </div>
        <div>
          <label for="search">Search:</label>
          <input type="text" id="search" v-model="MBSearch" />
        </div>
      </div>
      <div class="motherboard-container">
        <div class="motherboard-list">
          <h2>Motherboard List</h2>
          <ul>
            <li v-for="MB in filterMB" :key="MB.id">
              {{ MB.brand }} {{ MB.model }} {{ MB.socket }} {{ MB.form_factor }} ${{ MB.price }}
              <button @click="addMBToBuild(MB), hideMB()">Add to Build</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="selectedMB" v-show="showGPU">
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
              <button @click="addGPUToBuild(GPU), hideGPU()">Add to Build</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="build">
      <h2>Build</h2>
      <p>CPU: {{ cpu.brand }}{{ cpu.model }} ${{ cpu.price }}</p>
      <p>
        Motherboard: {{ motherboard.brand }} {{ motherboard.model }} {{ motherboard.socket }}
        {{ motherboard.form_factor }} ${{ motherboard.price }}
      </p>
      <p>GPU: {{ gpu.brand }}{{ gpu.chipset }} ${{ gpu.price }}</p>

      <p>Total price: ${{ totalPrice }}</p>
      <h1>Save Build to Local Storage</h1>
      <input type="text" v-model="build_name" />
      <button @click="saveBuild()">Save Build</button>
    </div>
  </div>
</template>
<script>
import GPUdata from '../data/video-card.json'
import MBdata from '../data/motherboard.json'
import CPUdata from '../data/cpu.json'
export default {
  name: 'Build',
  build: localStorage.getItem('builds'),
  data() {
    return {
      build_name: '',
      MBs: MBdata.data,
      GPUs: GPUdata.data,
      CPUs: CPUdata.data,
      CPUSearch: '',
      MBSearch: '',
      GPUSearch: '',
      selectedCPUManufacturer: '',
      selectedMBManufacturer: '',
      selectedGPUManufacturer: '',
      selectedCPU: null,
      selectedMB: null,
      selectedGPU: null,
      cpu: '',
      motherboard: '',
      gpu: '',
      showCPU: true,
      showMB: true,
      showGPU: true
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
    filterMB() {
      if (this.selectedMBManufacturer && this.MBSearch) {
        return this.MBs.filter((MB) => {
          return (
            MB.brand === this.selectedMBManufacturer &&
            (MB.brand.toLowerCase().includes(this.MBSearch.toLowerCase()) ||
              MB.chipset.toLowerCase().includes(this.MBSearch.toLowerCase())) &&
            MB.price > 0
          )
        })
      } else if (this.selectedMBManufacturer) {
        return this.MBs.filter((MB) => {
          return MB.brand === this.selectedMBManufacturer && MB.price > 0
        })
      } else if (this.MBSearch) {
        return this.MBs.filter((MB) => {
          return (
            (MB.brand.toLowerCase().includes(this.MBSearch.toLowerCase()) ||
              MB.chipset.toLowerCase().includes(this.MBSearch.toLowerCase())) &&
            MB.price > 0
          )
        })
      } else {
        return this.MBs.filter((MB) => {
          return MB.price > 0
        })
      }
    },
    totalPrice: function () {
      if (this.selectedCPU !== null && this.selectedMB !== null && this.selectedGPU !== null) {
        return this.cpu.price + this.motherboard.price + this.gpu.price
      }
      if (this.selectedMB == null && this.selectedGPU == null) {
        return this.cpu.price
      }
      if (this.selectedGPU == null) {
        return this.cpu.price + this.motherboard.price
      }
      if (this.selectedCPU == null && this.selectedMB == null && this.selectedGPU == null) {
        return 0
      }
    }
  },

  methods: {
    saveBuild() {
      const build = {
        name: this.build_name,
        cpu: this.cpu,
        motherboard: this.motherboard,
        gpu: this.gpu,
        totalPrice: this.totalPrice
      }

      // Check if local storage is available
      if (typeof Storage !== 'undefined') {
        // Retrieve existing builds from local storage
        const existingBuilds = JSON.parse(localStorage.getItem('builds')) || []

        // Add current build to existing builds
        existingBuilds.push(build)

        // Save updated build list to local storage
        localStorage.setItem('builds', JSON.stringify(existingBuilds))

        // Reset the current build to start fresh
        this.cpu = ''
        this.motherboard = ''
        this.gpu = ''
        this.totalPrice = 0
        this.build_name = ''

        alert('Build saved to local storage!')

        window.location.href = 'http://localhost:5173/'
      } else {
        alert('Sorry, local storage is not available on this browser.')
      }
    },
    addCPUToBuild(CPU) {
      this.cpu = CPU
      this.selectedCPU = CPU
    },
    hideCPU() {
      this.showCPU = false
    },
    hideMB() {
      this.showMB = false
    },
    hideGPU() {
      this.showGPU = false
    },
    addGPUToBuild(GPU) {
      this.gpu = GPU
      this.selectedGPU = GPU
    },
    addMBToBuild(MB) {
      this.motherboard = MB
      this.selectedMB = MB
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
