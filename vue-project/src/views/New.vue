<template>
  <div class="new">
    <div class="parts">
      <label for="search">Search:</label>
    <input type="text" id="search" v-model="Search"/>
    <select v-model="Selected">
      <option value="">Select An Item</option>
      <option v-for="CPU in filterCPU" :value="CPU">{{ CPU.brand }} {{ CPU.model }}   ${{ CPU.price }}</option>
    </select>
    </div>
    <ResetButton>Reset Build</ResetButton>
  </div>
</template>

<script>
import CPUdata from '../data/cpu.json'
import ResetButton from '../components/Reset.vue'
export default {
  name: 'about',
  builds: localStorage.getItem('builds'),
  components: {
    ResetButton,
  },
  data() {
    return {
      CPUs: CPUdata.data,
      Search: '',
      Selected:''
      
    }
  },
  computed: {
    filterCPU() {
      return this.CPUs.filter(CPU => {
        return  CPU.model.toLowerCase().includes(this.Search.toLowerCase()) && CPU.price > 0
      })
    }
  },
  mounted() {
    this.Selected = ''
  },
  methods: {
    addbuild: function () {}
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
