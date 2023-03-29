<template>
  <main>
    <nav>
      <RouterLink to="/new">New</RouterLink>
      <div class="parent">
        <div class="child" v-for="build in builds">
          <RouterLink onload="" to="/new" class="redirect">{{ build.name }}</RouterLink>
        </div>
      </div>
      <!-- :to="build.dir" -->
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
      builds: JSON.parse(localStorage.getItem('builds'))
    }
  },
  methods: {
    addbuild: function () {}
  }
}
</script>
<style>
html,
*,
body {
  font-size: 10px;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.parent {
  display: flex;
}

.child {
  display: flex;
  color: green;
  width: 10rem;
}
</style>
