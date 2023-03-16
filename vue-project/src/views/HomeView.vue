<template>
  <main>
    <div class="about">
      <AddButton>Add</AddButton>
      <Card></Card>
    </div>
  </main>
</template>

<script>
import AddButton from '../components/AddButton.vue'
import Card from '../components/Card.vue'
export default {
  name: 'about',
  components: {
    AddButton,
    Card
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
