<template>
  <div class="new">
    <div class="header" v-show="showCPU">
      <h2>CPU Selection</h2>
      <div>
        <DropDown :list="filterList" @clickedFilter="filterSelected" />
      </div>
      <div>
        <label for="search">Search:</label>
        <input type="text" id="search" v-model="CPUSearch" />
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

import caseFan from '../data/case-fan.json'
import case from '../data/case.json'
import cpu-cooler from '../data/cpu-cooler.json'
import cpu from '../data/cpu.json'
import externalHardDrive from '../data/external-hard-drive.json'
import fanController from '../data/fan-controller.json'
import headphones from '../data/headphones.json'
import internalHardDrive from '../data/internal-hard-drive.json'
import keyboard from '../data/keyboard.json'
import memory from '../data/memory.json'
import monitor from '../data/monitor.json'
import motherboard from '../data/motherboard.json'
import mouse from '../data/mouse.json'
import opticalDrive from '../data/optical-drive.json'
import powerSupply from '../data/power-supply.json'
import soundCard from '../data/sound-card.json'
import speakers from '../data/speakers.json'
import thermalPaste from '../data/thermal-paste.json'
import ups from '../data/ups.json'
import videoCard from '../data/video-card.json'
import wiredNetworkCard from '../data/wired-network-card.json'
import wirelessNetworkCard from '../data/wireless-network-card.json'

export default {
  name: 'Build',
  build: localStorage.getItem('builds'),
  data() {
    return {
      filterList: ['All', 'AMD', 'Intel'],
      build_name: ''
    }
  },
  components: {
    DropDown
  },

  methods: {
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
