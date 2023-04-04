<template>
  <div class="cpu-container">
    <div class="cpu-list">
      <h2>CPU List</h2>
      <ul>
        <li v-for="CPU in filterSelected" :key="CPU.id">
          <button @click="addCPUToBuild(CPU), hideCPU()">Add to Build</button>
          {{ CPU.brand }} {{ CPU.model }} - ${{ CPU.price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import caseFan from '../data/case-fan.json'
// import case from '../data/case.json'
// import cpu-cooler from '../data/cpu-cooler.json'
// import cpu from '../data/cpu.json'
// import externalHardDrive from '../data/external-hard-drive.json'
// import fanController from '../data/fan-controller.json'
// import headphones from '../data/headphones.json'
// import internalHardDrive from '../data/internal-hard-drive.json'
// import keyboard from '../data/keyboard.json'
// import memory from '../data/memory.json'
// import monitor from '../data/monitor.json'
// import motherboard from '../data/motherboard.json'
// import mouse from '../data/mouse.json'
// import opticalDrive from '../data/optical-drive.json'
// import powerSupply from '../data/power-supply.json'
// import soundCard from '../data/sound-card.json'
// import speakers from '../data/speakers.json'
// import thermalPaste from '../data/thermal-paste.json'
// import ups from '../data/ups.json'
// import videoCard from '../data/video-card.json'
// import wiredNetworkCard from '../data/wired-network-card.json'
// import wirelessNetworkCard from '../data/wireless-network-card.json'

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
      data: [],
      builds: JSON.parse(localStorage.getItem('builds'))
    }
  },
  methods: {
    addToBuild(CPU) {
      this.cpu = CPU
      this.selectedCPU = CPU
    }
  },
  computed: {
    setData() {
      // import partData from `../data/${this.part}.json`
      // this.data = partData.data
    },
    filter() {
      if (this.filters.length === 0) return
      // [{ type: <type>, filter: <filterBy}, { type: <type>, filter: <filterBy}]
      this.filters.forEach((filter) => {
        this.data.filter((part) => part[filter.type] === filter.filter)
      })
    }
  }
}
</script>
<style></style>
