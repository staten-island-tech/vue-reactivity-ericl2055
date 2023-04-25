<template>
  <div class="new">
    <div class="header">
      <!-- <h2>
        {{:onload="log()" <-supposed to be in class="new" _____
          this.dataList[this.selectedValue]
            .split(/(?=[A-Z])/)
            .forEach((value) => (value = value.toUpperCase()))
            .join(' ')
        }}
        Selection
      </h2> -->
    </div>
    <div class="main">
      <div class="display">
        <ComponentDisplay
          v-on:addBuild="updateBuild"
          class="display"
          part="cpu"
          :filters="this.activeFilters"
        />
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

      computerBuild: [],
      selectedValue: 0,
      dataList: [
        'caseFan',
        'case',
        'cpuCooler',
        'cpu',
        'externalHardDrive',
        'fanController',
        'headphones',
        'internalHardDrive',
        'keyboard',
        'memory',
        'monitor',
        'motherboard',
        'mouse',
        'opticalDrive',
        'powerSupply',
        'soundCard',
        'speakers',
        'thermalPaste',
        'ups',
        'videoCard',
        'networkCard'
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
    },

    updateBuild(part) {
      this.computerBuild.push(part)
      console.log(this.computerBuild)
    }
    // log() {
    //   console.log(
    //     this.dataList[this.selectedValue]
    //       .split(/(?=[A-Z])/)
    //       .forEach((value) => console.log(value.split(1)))
    //       .join(' ')
    //   )
    // }
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
