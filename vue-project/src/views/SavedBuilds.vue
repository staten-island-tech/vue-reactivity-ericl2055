<template>
  <div class="new">
    <div class="header">
      <button class="arrow" id="left" @click="changeValue(-1)"></button>
      <h2>
        {{
          this.dataList[this.selectedValue]
            .split(/(?=[A-Z])/)
            .map((string) =>
              string.match(/cpu|ups/i)
                ? string.toUpperCase()
                : string[0].toUpperCase() + string.substring(1)
            )
            .join(' ')
        }}

        Selection
      </h2>
      <button class="arrow" id="right" @click="changeValue(1)"></button>
    </div>
    <div class="main">
      <div class="display">
        <ComponentDisplay
          @addBuild="updateBuild"
          class="display"
          :part="this.dataList[this.selectedValue]"
          :filters="this.activeFilters"
        />
      </div>
      <div class="build-display">
        <BuildComp :components="computerBuild" />
      </div>
    </div>
  </div>
</template>

<script>
import BuildComp from '../components/BuildComponent.vue'
import ComponentDisplay from '../components/ComponentDisplay.vue'

export default {
  name: 'Build',
  data() {
    return {
      CPUfilterOptions: [
        { type: 'brand', filter: 'Intel' },
        { type: 'brand', filter: 'AMD' },
        { type: 'price', filter: 100 },
        { type: 'price', filter: 200 },
        { type: 'price', filter: 300 }
      ],
      activeFilters: [],
      build_name: '',
      computerBuild: [],
      selectedValue: 0,
      dataList: [
        'cpu',
        'cpuCooler',
        'motherboard',
        'memory',
        'internalHardDrive',
        'videoCard',
        'wiredNetworkCard',
        'wirelessNetworkCard'
      ]
    }
  },
  components: {
    ComponentDisplay,
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
      this.activeFilters = []
    },
    updateBuild(part) {
      const partType = part.type
      let partAlreadyExists = false

      for (let i = 0; i < this.computerBuild.length; i++) {
        if (this.computerBuild[i].type === partType) {
          this.computerBuild.splice(i, 1, part)
          partAlreadyExists = true
          break
        }
      }
      if (!partAlreadyExists) {
        this.computerBuild.push(part)
      }
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
