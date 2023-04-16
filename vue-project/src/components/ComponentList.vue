<template>
  <div class="component-container">
    <div class="component-list">
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
  name: 'ComponentList',

  props: {
    part: {
      type: String,
      required: true
    },
    build: {
      type: Object,
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
      this.build[this.part.toLowerCase()] = part
    }
  }
}
</script>

<style></style>
