<template>
  <div class="parts-container">
    <ul>
      <li v-for="part in data" :key="part.id">
        <button @click="addToBuild(part)">Add to Build</button>
        {{ part.brand }} {{ part.model }} - ${{ part.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import cpuData from '../data/cpu.json'
import gpuData from '../data/video-card.json'
import motherboardData from '../data/motherboard.json'

export default {
  name: 'ListComponent',
  props: {
    part: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {
    switch (this.part) {
      case 'cpu':
        this.data = cpuData.data
        break
      case 'gpu':
        this.data = gpuData.data
        break
      case 'motherboard':
        this.data = motherboardData.data
        break
      // add more cases for other parts as needed
      default:
        this.data = []
        break
    }
  },
  methods: {
    addToBuild(part) {
      this.$emit('add-to-build', part)
    }
  }
}
</script>

<style scoped></style>
