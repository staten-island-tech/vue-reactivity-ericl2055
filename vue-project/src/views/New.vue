<template>
  <div class="new">
    <CPU />
    <GPU />
  </div>
</template>

<script>
import CPU from '../components/Shop.vue'
import GPU from '../components/GPU.vue'
import ResetButton from '../components/Reset.vue'
export default {
  builds: localStorage.getItem('builds'),
  components: {
    CPU,
    GPU,
    ResetButton
  },
  data() {
    return {}
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
  .new {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
