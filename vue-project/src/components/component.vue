<template>
  <div class="cpu-container">
    <div class="cpu-list">
      <h2>{{ part }} List</h2>
      <ul>
        <li v-for="part in partData" :key="part.brand">
          <button @click="addToBuild(part)">Add to Build</button>
          {{ part.brand }} {{ part.model }} - ${{ part.price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Component',

  props: {
    part: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      partDataLoaded: false,
      partData: []
    }
  },
  created() {
    this.loadPartData()
  },
  methods: {
    async loadPartData() {
      const module = await import(`../data/${this.part}.json`)
      this.partData = module.default.data
      this.partDataLoaded = true
    },
    addToBuild(part) {
      this.cpu = part
      this.selectedCPU = part
    }
  }
}
</script>

<style></style>
