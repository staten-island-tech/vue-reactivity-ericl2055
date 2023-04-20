<template>
  <div class="new">
    <div class="header">
      <h2>CPU Selection</h2>
    </div>
    <div class="main">
      <div class="display">
        <ComponentDisplay
          v-on:add-to-build="updatePart"
          class="display"
          :part="this.part"
          :filters="this.activeFilters"
        />
      </div>
      <div class="filters">
        <Filter v-on:filter-changed="updateFilter" part="CPU" :options="filterOptions" />
        <label for="search">Search:</label>
        <input type="text" id="search" />
      </div>
      <div class="build-display">
        <!-- <Build :components="computerBuild" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import Build from '../components/BuildComponent.vue'
import Filter from '../components/FilterComponent.vue'
import * as data from '../data'
import ComponentDisplay from '../components/ComponentDisplay.vue'

export default {
  name: 'Build',
  data() {
    return {
      filterOptions: [
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
      ],
      allParts: [
        'cpu',
        'video-card',
        'case-fan',
        'case',
        'cpu-cooler',
        'external-hard-drive',
        'fan-controller',
        'headphones',
        'internal-hard-drive',
        'keyboard',
        'memory',
        'monitor',
        'motherboard',
        'mouse',
        'power-supply',
        'sound-card',
        'speakers',
        'thermal-paste',
        'wired-network-card',
        'wireless-network-card'
      ],
      part: 'cpu'
    }
  },
  components: {
    ComponentDisplay,
    Filter,
    Build
  },
  methods: {
    updateFilter(selectedFilters) {
      this.activeFilters = selectedFilters
    },
    updatePart() {
      this.part = 'gpu'
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
