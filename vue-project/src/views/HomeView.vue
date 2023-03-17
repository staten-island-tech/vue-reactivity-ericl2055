<template>
  <main>
    <div class="about">
      <ResetButton>Reset Build</ResetButton>
      <Card
        @click="addbuild"
        title="Ryzen 5 3600"
        image="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71Cb5BoyGkL._AC_UF894,1000_QL80_.jpg"
        description="The AMD Ryzen 5 3600 3.6 GHz Six-Core AM4 Processor is a powerful six-core processor with 12 threads, designed for socket AM4 motherboards. Built with Zen 2 architecture, the third-generation 7nm Ryzen processor offers increased performance compared to its predecessor."
      />
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
      Card: [
        {
          title: 'Ryzen 5 3600',
          image:
            'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71Cb5BoyGkL._AC_UF894,1000_QL80_.jpg',
          description:
            'The AMD Ryzen 5 3600 3.6 GHz Six-Core AM4 Processor is a powerful six-core processor with 12 threads, designed for socket AM4 motherboards. Built with Zen 2 architecture, the third-generation 7nm Ryzen processor offers increased performance compared to its predecessor.'
        }
      ],
      build: []
    }
  },
  methods: {
    addbuild: function () {
      console.log('work')
    }
  }
}
</script>
