<template>
  <div class="new">
    <div class="header">
      <h2>CPU Selection</h2>
    </div>
    <div class="main">
      <div class="display">
        <ComponentDisplay class="display" part="cpu" :filters="this.activeFilters" />
      </div>
      <div class="filters">
        <Filter v-on:filter-changed="updateFilter" part="CPU" :options="CPUfilterOptions" />
        <label for="search">Search:</label>
        <input type="text" id="search" />
      </div>
      <div class="build-display">
        <BuildComp :components="computerBuild" />
      </div>
    </div>
  </div>
</template>

<script>
import BuildComp from '../components/BuildComponent.vue'
import Filter from '../components/FilterComponent.vue'
import ComponentDisplay from '../components/ComponentDisplay.vue'

export default {
  name: 'Build',
  data() {
    return {
      CPUfilterOptions: [
        { type: 'brand', filter: 'Intel' },
        { type: 'brand', filter: 'AMD' },
        { type: 'price', filter: 100 }
      ],
      activeFilters: [],
      build_name: '',
      computerBuild: [
        {
          type: 'cpu',
          brand: 'Intel',
          model: 'i7-10700K',
          price: 399.99
        },
        {
          type: 'gpu',
          brand: 'Nvidia',
          model: 'RTX 3080',
          price: 999.99
        }
      ]
    }
  },
  components: {
    ComponentDisplay,
    Filter,
    BuildComp
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
.main {
  display: flex;
  width: 2000px;
}

.display {
  position: static;
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
  font-size: 25px;
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
  margin: 10px;
}
</style>
