<template>
  <div class="new">
    <Build />
  </div>
</template>

<script>
import Build from '../components/Shop.vue'
import ResetButton from '../components/Reset.vue'
export default {
  builds: localStorage.getItem('builds'),
  components: {
    Build,
    ResetButton
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .new {
    display: flex;
  }
}
</style>
