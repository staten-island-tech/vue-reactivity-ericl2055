<template>
  <div class="new">
    <div class="header">
      <div>
        <h2>CPU Selection</h2>
        <div class="filters">
          <Filter v-on:filter-changed="updateFilter" part="CPU" :options="filterOptions" />
        </div>
      </div>
      <div>
        <label for="search">Search:</label>
        <input type="text" id="search" />
      </div>
    </div>
    <div class="main">
      <ComponentDisplay class="display" :part="this.part" :filters="this.activeFilters" />
    </div>
  </div>
</template>

<script>
import Filter from '../components/FilterComponent.vue'
import * as data from '../data'
import ComponentDisplay from '../components/ComponentDisplay.vue'

export default {
  name: 'Build',
  data() {
    return {
      filterOptions: [
        { type: 'brand', filter: 'Intel' },
        { type: 'price', filter: 100 }
      ],
      activeFilters: [],
      build_name: '',
      part: 'cpu'
    }
  },
  components: {
    ComponentDisplay,
    Filter
  },
  methods: {
    updateFilter(selectedFilters) {
      this.activeFilters = selectedFilters
    }
  }
}
</script>

<style scoped>
* {
  font-size: 16px;
}

.filters {
  display: flex;
  align-items: center;
}

.filters > * {
  margin-right: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header h2 {
  margin: 0;
}

.header label {
  margin-right: 0.5rem;
}

.header input[type='text'] {
  width: 200px;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.new {
  max-width: 800px;
  margin: 0 auto;
}
</style>
