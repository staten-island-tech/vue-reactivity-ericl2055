<template>
  <div class="new">
    <div class="header">
      <h2>CPU Selection</h2>
      <div>
        <DropDown title="Brand" :list="filterList" @clickedFilter="filterSelected" />
        <Filter :list="cities" part="CPU" />
      </div>
      <div>
        <label for="search">Search:</label>
        <input type="text" id="search" />
      </div>
    </div>
    <div class="main">
      <ComponentDisplay class="display" :part="this.part" :filters="this.filters" />
    </div>
  </div>
</template>

<script>
import Filter from '../components/FilterComponent.vue'
import * as data from '../data'
import DropDown from '../components/DropDown.vue'
import ComponentDisplay from '../components/ComponentDisplay.vue'

export default {
  name: 'Build',
  data() {
    return {
      filterList: ['All', 'AMD', 'Intel'],
      filters: [
        // { type: 'brand', filter: 'Intel' },
        // { type: 'price', filter: '<500' }
      ],
      build_name: '',
      part: 'cpu',
      cities: ['Milwaukee', 'Denver', 'Boston', 'LA']
    }
  },
  components: {
    DropDown,
    ComponentDisplay,
    Filter
  }
}
</script>

<style scoped></style>
