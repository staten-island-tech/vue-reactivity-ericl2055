<template>
  <main>
    <nav>
      <div class="parent">
        <div class="child" v-for="build in builds">
          <RouterLink onload="" to="/new" class="redirect">{{ build.name }}</RouterLink>
        </div>
        <RouterLink to="/new" class="child">New</RouterLink>
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

body {
  padding-top: 15px;
}

header {
  display: block;
  width: 100%;
  height: 50px;
}
.parent {
  display: flexbox;
}

.child {
  display: flex;
  color: green;
  width: 20rem;
  border-color: grey;
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
