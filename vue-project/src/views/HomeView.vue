<template>
  <main>
    <div class="about">
      <ResetButton>Reset Build</ResetButton>
      <Card
        @click="addbuild"
        v-for="Card in Card"
        :key="Card.title"
        :title="Card.title"
        :image="Card.image"
        :price="Card.price"
        :description="Card.description"
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
          title: 'Ryzen 5 5600X',
          image: '',
          price: '$154.00',
          description: ''
        },
        {
          title: 'Ryzen 5 5600',
          image: '',
          price: '$139.79',
          description: ''
        },
        {
          title: 'Ryzen 5 7600',
          image: '',
          price: '$244.44',
          description: ''
        },
        {
          title: 'Ryzen 5 7600X',
          image: '',
          price: '$234.00',
          description: ''
        },
        {
          title: 'Ryzen 7 5700X',
          image: '',
          price: '$185.99',
          description: ''
        },
        {
          title: 'Ryzen 7 7700X',
          image: '',
          price: '$338.00',
          description: ''
        },
        {
          title: 'Ryzen 7 7700',
          image: '',
          price: '$154.00',
          description: ''
        },
        {
          title: 'Ryzen 7 5800X',
          image: '',
          price: '$209.00',
          description: ''
        },
        {
          title: 'Ryzen 9 5900X',
          image: '',
          price: '$340.00',
          description: ''
        },
        {
          title: 'Ryzen 9 5950X',
          image: '',
          price: '$437.85',
          description: ''
        },
        {
          title: 'Ryzen 9 7950X',
          image: '',
          price: '$560.00',
          description: ''
        },
        {
          title: 'Ryzen 9 7900X',
          image: '',
          price: '$432.00',
          description: ''
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
