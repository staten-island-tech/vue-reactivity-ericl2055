<template>
  <div class="about">
    <ResetButton>Reset Build</ResetButton>
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
      Card: [
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
      ],
      build: [{}]
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
