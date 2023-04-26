<template>
  <div class="new" @load="console.log(this.dataList[this.selectedValue])">
    <div class="header">
      <button class="arrow" id="left" @click="changeValue(-1)"></button>
      <h2>
        {{
          this.dataList[this.selectedValue]
            .split(/(?=[A-Z])/)
            .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
            .join(' ')
        }}
        Selection
      </h2>
      <button class="arrow" id="right" @click="changeValue(1)"></button>
    </div>
    <div class="main">
      <div class="display">
        <ComponentDisplay
          v-on:addBuild="updateBuild"
          class="display"
          :part="this.dataList[this.selectedValue]"
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
    changeValue(num) {
      this.selectedValue += num
      if (this.selectedValue === -1) this.selectedValue = this.dataList.length - 1
      else if (this.selectedValue === this.dataList.length) this.selectedValue = 0
    },
    updateBuild(part) {
      this.computerBuild.push(part)
      console.log(this.computerBuild)
      this.changeValue(1)
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
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
  width: 100rem;
}

.header h2 {
  font-size: 25px;
  margin: 0;
  width: 50rem;
  text-align: center;
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

.arrow {
  background-color: rgba(0, 0, 0, 0);
  border: solid #ccc;
  border-width: 0 10px 10px 0;
  display: inline-block;
  padding: 3px;
}
#right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

#left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
</style>
