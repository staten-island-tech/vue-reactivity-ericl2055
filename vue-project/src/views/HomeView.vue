<template>
  <main>
    <nav>
      <h1 id="title">Builds</h1>
      <div class="parent">
        <RouterLink :to="`/${build.name}`" class="child" v-for="build in builds">
          <p class="name">{{ build.name }}</p>
          <p class="description"></p>
        </RouterLink>
        <RouterLink to="/new" class="child">
          <p class="name">New</p>
          <p class="description"></p>
        </RouterLink>
      </div>
    </nav>
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
:root {
  --background-color: rgb(255, 255, 255);
  --hover-color: rgb(0, 0, 0);
  --h1-color: rgb(46, 46, 46);
  --radial-1: rgba(50, 50, 50, 0.35);
  --radial-2: rgba(0, 0, 0, 0);
}
html,
*,
body {
  font-size: 10px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --hover-color: rgb(255, 255, 255);
    --h1-color: rgb(221, 221, 221);
    --radial-1: rgba(205, 205, 205, 0.35);
  }
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

body {
  height: 100vh;
  padding-top: 15px;
}
header {
  display: block;
  width: 100%;
  height: 50px;
}

h1 {
  display: block;
  font-size: 5rem;
  color: var(--h1-color);
  text-align: center;
}
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

.child {
  display: flex;
  width: 30rem;
  height: 15rem;
  color: green;
  border-color: grey;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 1rem;
  border-radius: 2rem;
  transition-duration: 0.3s;
  font-size: 5rem;
}

.child:before {
  position: absolute;
  content: '';
  top: 100%;
  left: 5%;
  height: 2rem;
  width: 90%;
  opacity: 0;
  background: radial-gradient(ellipse at center, var(--radial-1) 0%, rgba(0, 0, 0, 0) 70%);
  transition-duration: 0.3s;
  transition-property: transform, opacity;
}

.child:hover,
.child:focus,
.child:active {
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
  /* move the element up by 5px */
}

.child:hover:before,
.child:focus:before,
.child:active:before {
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  /* move the element down by 5px (it will stay in place because it's attached to the element that also moves up 5px) */
}
.name {
  width: 100%;
  text-align: center;
  font-size: 3rem;
}

.discription {
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
}
</style>
