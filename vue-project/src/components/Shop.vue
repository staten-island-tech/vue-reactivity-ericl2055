<template>
  <div class="new">
    <div class="header" v-show="showCPU">
      <h2>CPU Selection</h2>
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
            <button @click="addCPUToBuild(CPU), hideCPU()">Add to Build</button>
            {{ CPU.brand }} {{ CPU.model }} - ${{ CPU.price }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="selectedCPU" v-show="showMB">
      <h2>Motherboard Selection</h2>
      <div class="MBheader">
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

    <div v-if="selectedMB" v-show="showMemory">
      <h2>Memory Selection</h2>
      <div class="Memoryheader">
        <div>
          <label for="search">Search:</label>
          <input type="text" id="search" v-model="MemorySearch" />
        </div>
      </div>
      <div class="memory-container">
        <div class="memory-list">
          <h2>Memory List</h2>
          <ul>
            <li v-for="memory in filterMemory" :key="memory.id">
              {{ memory.brand }} {{ memory.model }} {{ memory.module_type }} ${{ memory.price }}
              <button @click="addMemoryToBuild(memory), hideMemory()">Add to Build</button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="selectedMemory" v-show="showStorage">
      <h2>Storage Selection</h2>
      <div class="Storageheader">
        <div>
          <label for="search">Search:</label>
          <input type="text" id="search" v-model="StorageSearch" />
        </div>
      </div>
      <div class="Storage-container">
        <div class="Storage-list">
          <h2>Storage List</h2>
          <ul>
            <li v-for="Storage in filterStorage" :key="Storage.id">
              {{ Storage.brand }} {{ Storage.model }} ${{ Storage.price }}
              <button @click="addStoragetoBuild(Storage), hideStorage()">Add to Build</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="selectedStorage" v-show="showGPU">
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
    <div v-if="selectedGPU" v-show="showCase">
      <h2>Case Selection</h2>
      <div class="Caseheader">
        <div>
          <label for="search">Search:</label>
          <input type="text" id="search" v-model="CaseSearch" />
        </div>
      </div>
      <div class="Case-container">
        <div class="Case-list">
          <h2>Case List</h2>
          <ul>
            <li v-for="Case in filterCase" :key="Case.id">
              {{ Case.brand }} {{ Case.model }} {{ Case.form_factor }}{{ Case.color }} ${{
                Case.price
              }}
              <button @click="addCaseToBuild(Case), hideCase()">Add to Build</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="selectedCase" v-show="showPSU">
      <h2>Power Supply Selection</h2>
      <div class="PSUheader">
        <div>
          <label for="search">Search:</label>
          <input type="text" id="search" v-model="PSUSearch" />
        </div>
      </div>
      <div class="PSU-container">
        <div class="PSU-list">
          <h2>Power Supply List</h2>
          <ul>
            <li v-for="PSU in filterPSU" :key="PSU.id">
              {{ PSU.brand }} {{ PSU.model }} {{ PSU.form_factor }} {{ PSU.efficiency_rating }}
              {{ PSU.wattage }} watts ${{ PSU.price }}
              <button @click="addPSUToBuild(PSU), hidePSU()">Add to Build</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="selectedPSU" v-show="showMonitor">
      <h2>Monitor Selection</h2>
      <div class="Monitorheader">
        <div>
          <label for="search">Search:</label>
          <input type="text" id="search" v-model="MonitorSearch" />
        </div>
      </div>
      <div class="Monitor-container">
        <div class="Monitor-list">
          <h2>Monitor List</h2>
          <ul>
            <li v-for="Monitor in filterMonitor" :key="Monitor.id">
              {{ Monitor.brand }} {{ Monitor.model }} {{ Monitor.size }} in. {{ Monitor.width }} by
              {{ Monitor.height }} ${{ Monitor.price }}
              <button @click="addMonitorToBuild(Monitor), hideMonitor()">Add to Build</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="selectedMonitor">
      <h2>Finished Build</h2>
    </div>
    <div class="build">
      <h2>Build:</h2>
      <p>CPU: {{ cpu.brand }}{{ cpu.model }} ${{ cpu.price }}</p>
      <p>
        Motherboard: {{ motherboard.brand }} {{ motherboard.model }} {{ motherboard.socket }}
        {{ motherboard.form_factor }} ${{ motherboard.price }}
      </p>
      <p>
        Memory:{{ memory.brand }} {{ memory.model }} {{ memory.module_type }} ${{ memory.price }}
      </p>
      <p>Storage: {{ storage.brand }} {{ storage.model }} ${{ storage.price }}</p>
      <p>GPU: {{ gpu.brand }} {{ gpu.model }} {{ gpu.chipset }} ${{ gpu.price }}</p>
      <p>
        Case: {{ Case.brand }} {{ Case.model }} {{ Case.form_factor }}{{ Case.color }} ${{
          Case.price
        }}
      </p>
      <p>
        Power Supply:{{ psu.brand }} {{ psu.model }} {{ psu.form_factor }} {{ psu.efficiency_rating
        }}{{ psu.wattage }} ${{ psu.price }}
      </p>
      <p>
        Monitor: {{ monitor.brand }} {{ monitor.model }} {{ monitor.size }} in.
        {{ monitor.width }} by {{ monitor.height }} ${{ monitor.price }}
      </p>
      <p>Total price: ${{ totalPrice }}</p>
      <p>Save Build to Local Storage</p>
      <label for="name">Name Of Build:</label>
      <input type="text" id="name" v-model="build_name" />
      <button @click="saveBuild()">Save Build</button>
    </div>
  </div>
</template>

<script>
import DropDown from '../components/DropDown.vue'

import Monitordata from '../data/monitor.json'
import PSUdata from '../data/power-supply.json'
import Casedata from '../data/case.json'
import StorageData from '../data/internal-hard-drive.json'
import Memorydata from '../data/memory.json'
import GPUdata from '../data/video-card.json'
import MBdata from '../data/motherboard.json'
import CPUdata from '../data/cpu.json'
export default {
  name: 'Build',
  build: localStorage.getItem('builds'),
  data() {
    return {
      filterList: ['All', 'AMD', 'Intel'],
      build_name: '',
      Monitors: Monitordata.data,
      PSUs: PSUdata.data,
      Cases: Casedata.data,
      Storages: StorageData.data,
      Memorys: Memorydata.data,
      MBs: MBdata.data,
      GPUs: GPUdata.data,
      CPUs: CPUdata.data,
      MonitorSearch: '',
      PSUSearch: '',
      StorageSearch: '',
      CPUSearch: '',
      MBSearch: '',
      GPUSearch: '',
      MemorySearch: '',
      CaseSearch: '',
      selectedCPUManufacturer: '',
      selectedGPUManufacturer: '',
      selectedCPU: null,
      selectedMemory: null,
      selectedMB: null,
      selectedStorage: null,
      selectedGPU: null,
      selectedCase: null,
      selectedPSU: null,
      selectedMonitor: null,
      cpu: '',
      motherboard: '',
      memory: '',
      storage: '',
      gpu: '',
      Case: '',
      psu: '',
      monitor: '',
      showStorage: true,
      showMemory: true,
      showCPU: true,
      showMB: true,
      showGPU: true,
      showCase: true,
      showPSU: true,
      showMonitor: true
    }
  },
  components: {
    DropDown
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
              MB.model.toLowerCase().includes(this.MBSearch.toLowerCase())) &&
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
              MB.model.toLowerCase().includes(this.MBSearch.toLowerCase())) &&
            MB.price > 0
          )
        })
      } else {
        return this.MBs.filter((MB) => {
          return MB.price > 0
        })
      }
    },

    filterMemory() {
      if (this.selectedMemoryManufacturer && this.MemorySearch) {
        return this.Memorys.filter((Memory) => {
          return (
            Memory.brand === this.selectedMemoryManufacturer &&
            (Memory.brand.toLowerCase().includes(this.MemorySearch.toLowerCase()) ||
              Memory.module_type.toLowerCase().includes(this.MemorySearch.toLowerCase())) &&
            Memory.price > 0
          )
        })
      } else if (this.selectedMemoryManufacturer) {
        return this.Memorys.filter((Memory) => {
          return Memory.brand === this.selectedMemoryManufacturer && Memory.price > 0
        })
      } else if (this.MemorySearch) {
        return this.Memorys.filter((Memory) => {
          return (
            (Memory.brand.toLowerCase().includes(this.MemorySearch.toLowerCase()) ||
              Memory.module_type.toLowerCase().includes(this.MemorySearch.toLowerCase())) &&
            Memory.price > 0
          )
        })
      } else {
        return this.Memorys.filter((Memory) => {
          return Memory.price > 0
        })
      }
    },
    filterStorage() {
      if (this.selectedStorageManufacturer && this.StorageSearch) {
        return this.Storages.filter((Storage) => {
          return (
            Storage.brand === this.selectedStorageManufacturer &&
            (Storage.brand.toLowerCase().includes(this.StorageSearch.toLowerCase()) ||
              Storage.module_type.toLowerCase().includes(this.StorageSearch.toLowerCase())) &&
            Storage.price > 0
          )
        })
      } else if (this.selectedStorageManufacturer) {
        return this.Storages.filter((Storage) => {
          return Storage.brand === this.selectedStorageManufacturer && Storage.price > 0
        })
      } else if (this.StorageSearch) {
        return this.Storages.filter((Storage) => {
          return (
            (Storage.brand.toLowerCase().includes(this.StorageSearch.toLowerCase()) ||
              Storage.module_type.toLowerCase().includes(this.StorageSearch.toLowerCase())) &&
            Storage.price > 0
          )
        })
      } else {
        return this.Storages.filter((Storage) => {
          return Storage.price > 0
        })
      }
    },
    filterCase() {
      if (this.selectedCaseManufacturer && this.CaseSearch) {
        return this.Cases.filter((Case) => {
          return (
            Case.brand === this.selectedCaseManufacturer &&
            (Case.brand.toLowerCase().includes(this.CaseSearch.toLowerCase()) ||
              Case.module_type.toLowerCase().includes(this.CaseSearch.toLowerCase())) &&
            Case.price > 0
          )
        })
      } else if (this.selectedCaseManufacturer) {
        return this.Cases.filter((Case) => {
          return Case.brand === this.selectedCaseManufacturer && Case.price > 0
        })
      } else if (this.CaseSearch) {
        return this.Cases.filter((Case) => {
          return (
            (Case.brand.toLowerCase().includes(this.CaseSearch.toLowerCase()) ||
              Case.module_type.toLowerCase().includes(this.CaseSearch.toLowerCase())) &&
            Case.price > 0
          )
        })
      } else {
        return this.Cases.filter((Case) => {
          return Case.price > 0
        })
      }
    },

    filterPSU() {
      if (this.selectedPSUManufacturer && this.PSUSearch) {
        return this.PSUs.filter((PSU) => {
          return (
            PSU.brand === this.selectedPSUManufacturer &&
            (PSU.brand.toLowerPSU().includes(this.PSUSearch.toLowerPSU()) ||
              PSU.module_type.toLowerPSU().includes(this.PSUSearch.toLowerPSU())) &&
            PSU.price > 0
          )
        })
      } else if (this.selectedPSUManufacturer) {
        return this.PSUs.filter((PSU) => {
          return PSU.brand === this.selectedPSUManufacturer && PSU.price > 0
        })
      } else if (this.PSUSearch) {
        return this.PSUs.filter((PSU) => {
          return (
            (PSU.brand.toLowerPSU().includes(this.PSUSearch.toLowerPSU()) ||
              PSU.module_type.toLowerPSU().includes(this.PSUSearch.toLowerPSU())) &&
            PSU.price > 0
          )
        })
      } else {
        return this.PSUs.filter((PSU) => {
          return PSU.price > 0
        })
      }
    },
    filterMonitor() {
      if (this.selectedMonitorManufacturer && this.MonitorSearch) {
        return this.Monitors.filter((Monitor) => {
          return (
            Monitor.brand === this.selectedMonitorManufacturer &&
            (Monitor.brand.toLowerMonitor().includes(this.MonitorSearch.toLowerMonitor()) ||
              Monitor.module_type.toLowerMonitor().includes(this.MonitorSearch.toLowerMonitor())) &&
            Monitor.price > 0
          )
        })
      } else if (this.selectedMonitorManufacturer) {
        return this.Monitors.filter((Monitor) => {
          return Monitor.brand === this.selectedMonitorManufacturer && Monitor.price > 0
        })
      } else if (this.MonitorSearch) {
        return this.Monitors.filter((Monitor) => {
          return (
            (Monitor.brand.toLowerMonitor().includes(this.MonitorSearch.toLowerMonitor()) ||
              Monitor.module_type.toLowerMonitor().includes(this.MonitorSearch.toLowerMonitor())) &&
            Monitor.price > 0
          )
        })
      } else {
        return this.Monitors.filter((Monitor) => {
          return Monitor.price > 0
        })
      }
    },
    totalPrice: function () {
      if (this.selectedCPU !== null && this.selectedMonitor !== null) {
        return (
          this.cpu.price +
          this.motherboard.price +
          this.memory.price +
          this.gpu.price +
          this.storage.price +
          this.Case.price +
          this.psu.price +
          this.monitor.price
        ).toFixed(2)
      }
      if (this.selectedMB == null && this.selectedGPU == null) {
        return this.cpu.price
      }
      if (this.selectedMemory == null && this.selectedGPU == null) {
        return (this.cpu.price + this.motherboard.price).toFixed(2)
      }
      if (this.selectedStorage == null) {
        return (this.cpu.price + this.motherboard.price + this.memory.price).toFixed(2)
      }
      if (this.selectedGPU == null) {
        return (
          this.cpu.price +
          this.motherboard.price +
          this.memory.price +
          this.storage.price
        ).toFixed(2)
      }
      if (this.selectedCase == null) {
        return (
          this.cpu.price +
          this.motherboard.price +
          this.memory.price +
          this.gpu.price +
          this.storage.price
        ).toFixed(2)
      }
      if (this.selectedPSU == null) {
        return (
          this.cpu.price +
          this.motherboard.price +
          this.memory.price +
          this.gpu.price +
          this.storage.price +
          this.Case.price
        ).toFixed(2)
      }
      if (this.selectedMonitor == null) {
        return (
          this.cpu.price +
          this.motherboard.price +
          this.memory.price +
          this.gpu.price +
          this.storage.price +
          this.Case.price +
          this.psu.price
        ).toFixed(2)
      }
      if (this.selectedCPU == null && this.selectedGPU == null) {
        return 0
      }
    }
  },

  methods: {
    filterSelected(data) {},
    addCPUToBuild(CPU) {
      this.cpu = CPU
      this.selectedCPU = CPU
    },
    addStoragetoBuild(Storage) {
      this.storage = Storage
      this.selectedStorage = Storage
    },
    addMemoryToBuild(Memory) {
      this.memory = Memory
      this.selectedMemory = Memory
    },
    addGPUToBuild(GPU) {
      this.gpu = GPU
      this.selectedGPU = GPU
    },
    addMBToBuild(MB) {
      this.motherboard = MB
      this.selectedMB = MB
    },
    addCaseToBuild(Case) {
      this.Case = Case
      this.selectedCase = Case
    },
    addPSUToBuild(PSU) {
      this.psu = PSU
      this.selectedPSU = PSU
    },
    addMonitorToBuild(Monitor) {
      this.monitor = Monitor
      this.selectedMonitor = Monitor
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
    hideMemory() {
      this.showMemory = false
    },
    hideStorage() {
      this.showStorage = false
    },
    hideCase() {
      this.showCase = false
    },
    hidePSU() {
      this.showPSU = false
    },
    hideMonitor() {},
    saveBuild() {
      const build = {
        name: this.build_name,
        cpu: this.cpu,
        motherboard: this.motherboard,
        memory: this.memory,
        storage: this.storage,
        gpu: this.gpu,
        case: this.Case,
        psu: this.psu,
        monitor: this.monitor,
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
        this.memory = ''
        this.gpu = ''
        this.storage = ''
        this.case = ''
        this.psu = ''
        ;(this.monitor = ''), (this.totalPrice = 0)
        this.build_name = ''

        alert('Build saved to local storage!')

        window.location.href = 'http://localhost:5173/'
      } else {
        alert('Sorry, local storage is not available on this browser.')
      }
    }
  }
}
</script>

<style scoped>
.cpu-container,
.motherboard-container,
.memory-container,
.Storage-container,
.gpu-container,
.Case-container,
.PSU-container,
.Monitor-container {
  display: flex;
  flex-direction: column;
  height: 95vh;
}

.header {
  left: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 41rem);
  background-color: #f0f0f0;
  margin-bottom: 3rem;
}

.cpu-container {
  left: 20rem;
  top: 0rem;
  width: calc(100vw - 41rem);
  overflow-y: auto;
  padding: 1rem;
  border: 1rem solid white;
  border-radius: 5rem;
  height: 100vh;
  width: 1000px;
  overflow-y: auto;
}
.cpu-list {
  flex: 1;
}

.build {
  position: fixed;
  top: 13rem;
  right: 10rem;
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
