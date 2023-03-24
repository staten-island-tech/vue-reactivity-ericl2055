<template>
  <main>
    <nav>
      <RouterLink to="/new">New</RouterLink>
      <RouterLink v-for="build in builds" :to="build.dir">{{ build.name }}</RouterLink>
    </nav>

    <div class="about"></div>
  </main>
</template>

<script>
export default {
  name: 'about',
  components: {},
  data() {
    return {
      builds: localStorage.getItem('builds')
    }
  },
  methods: {
    addbuild: function () {}
  }
}
</script>
