<template>
  <main>
    <ResetButton @click="build.length = 0">Reset Build</ResetButton>
    <div class="about">
      <Card
        v-for="Card in Card"
        :key="Card.title"
        :title="Card.title"
        :image="Card.image"
        :price="Card.price"
        :description="Card.description"
      />
      <p>{{ build }}</p>
    </div>
  </main>
</template>

<script>
import ResetButton from '../components/Reset.vue'
import Card from '../components/Card.vue'
export default {
  name: 'about',
  builds: localStorage.getItem('builds'),
  components: {
    ResetButton,
    Card
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
