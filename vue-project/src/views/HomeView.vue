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
  display: flex;
  justify-content: center;
  align-items: center;
}

.child {
  display: flex;
  color: green;
  width: 30rem;
  border-color: grey;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 1rem;
  height: 15rem;
  border-radius: 2rem;
}

.child:hover {
  /* box-shadow: 10px 100px 10px 10px black; */
}
.child:hover,
.child:focus {
  box-shadow: 0 10px 0.5em -0.4em black;
  transform: translateY(-10px);
}
</style>
