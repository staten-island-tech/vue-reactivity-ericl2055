<template>
  <main>
    <ResetButton @click="build.length = 0">Reset Build</ResetButton>
    <div class="about">
      <Card
        @click="build.push(Card.title, Card.price)"
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
    addbuild: function () {
      if ((Card[1].charAt(0) == 'R', 'i')) {
        this.build.cpu.push(Card.title, Card.price)
      }
    }
  }
}
</script>
