<template>
  <div class="about">
    <button @click="authS" v-if="loggedIn">logged in</button>
    <button v-else>logged out</button>
    <ul>
      <li v-for="card in cards" :key="card">{{ card }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'about',
  components: {},
  data() {
    return {
      loggedIn: true
    }
  },
  methods: {
    authState: function () {
      if (this.loggedIn === false) {
        this.loggedIn === true
      } else {
        this.loggedIn === false
      }
    }
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
