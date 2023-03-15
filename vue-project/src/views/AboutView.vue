<template>
  <div class="about">
    <Button>Button One</Button>
    <Button>Button Two</Button>
  </div>
</template>
<script>
import Button from '../components/button.vue'
export default {
  name: 'about',
  components: {
    Button
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: {}
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
