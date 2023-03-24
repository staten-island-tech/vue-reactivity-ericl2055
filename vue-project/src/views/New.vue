<template>
  <div class="about">
    <h1>stuff</h1>
    <Card
      v-for="Card in Card"
      :key="Card.title"
      :title="Card.title"
      :image="Card.image"
      :price="Card.price"
      :description="Card.description"
    />
    <ResetButton @click="build.length = 0">Reset Build</ResetButton>
    <p>{{ build }}</p>
  </div>
</template>
<script>
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
      Card: [],
      build: [
        {
          casefan: '',
          cpu: '',
          headphones: '',
          motherboard: '',
          monitor: '',
          internalharddrive: '',
          externalharddrive: '',
          ups: '',
          fancontroller: '',
          case: '',
          keyboard: '',
          mouse: '',
          wirednetworkcard: '',
          soundcard: '',
          videocard: '',
          speakers: '',
          opticaldrive: '',
          powersupply: '',
          thermalpaste: '',
          memory: ''
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
