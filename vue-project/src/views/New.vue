<template>
  <div class="new">
    <CPU/>
    <ResetButton>Reset Build</ResetButton>
  </div>
</template>

<script>
import CPU from '../components/CPU.vue'
import ResetButton from '../components/Reset.vue'
export default {
  builds: localStorage.getItem('builds'),
  components: {
    CPU,
    ResetButton,
  },
  data() {
    return {
    }
  }}
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
