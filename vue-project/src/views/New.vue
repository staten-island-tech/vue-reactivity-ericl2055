<template>
  <div class="about">
    <Card
      v-for="Card in Card"
      :key="Card.title"
      :brand="Card.brand"
      :name="Card.name"
      :price="Card.price"
    />
    <ResetButton>Reset Build</ResetButton>
  </div>
</template>

<script>
import data from `${name}.json`
import ResetButton from '../components/Reset.vue'
import Card from '../components/Card.vue'
export default {
  name: 'about',
  builds: localStorage.getItem('builds'),
  components: {
    Card,
    ResetButton
  },
  data() {
    return {
      Card: [
        {
          brand: ,
          name: '',
          price: ''
        }
      ]
    }
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
