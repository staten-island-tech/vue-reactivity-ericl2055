<template>
  <div class="build-container">
    <h2>Build</h2>
    <h2>Total Price: ${{ totalPrice.toFixed(2) }}</h2>

    <ul>
      <li v-for="([component, item], index) in Object.entries(buildList)" :key="component">
        <button @click="$emit('changeDisplay', index)" :class="current === index ? 'selected' : 'none'">
          <p class="component">
            {{
              component
                .split(/(?=[A-Z])/)
                .map((string) =>
                  string.match(/cpu|ups/i)
                    ? string.toUpperCase()
                    : string[0].toUpperCase() + string.substring(1)
                )
                .join(' ')
            }}
          </p>
          :
          <p v-if="item !== ''">{{ item.brand }} {{ item.model }} - ${{ item.price }}</p>
        </button>
      </li>
    </ul>
    <div class="name" v-if="$route.name === 'new'">
      <p class="save-text">Save As: </p>
      <input placeholder="Name of Build" v-model="input" />
    </div>
    <button class="commit" @click="commit">{{ save }}</button>
  </div>
</template>
<script>
export default {
  name: 'Build',
  emits: ['changeDisplay'],
  data() {
    return {
      save: "Save Build",
      input: ""
    }
  },
  props: {
    buildList: {
      type: Object,
      required: true
    },
    current: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPrice() {
      return Object.values(this.buildList).reduce(
        (sum, component) => (component === '' ? sum : sum + component.price),
        0
      )
    },
    fullList() {
      return this.components
    },
    commit() {
      let current = JSON.parse(localStorage.getItem("builds"));
      localStorage.removeItem("builds")
      if (this.$route.name === "new") {
        current.push({ name: this.input, build: this.buildList })
        this.$router.matcher = new VueRouter().matcher;

        this.$router.addRoutes({
          path: `/${this.input}`,
          name: `${this.input}|custom`,
          component: () => import('../views/SavedBuilds.vue')
        });
      } else {
        let name = this.$route.name.split("|")[0]
        current = current.filter(obj => obj.name !== name)
        current.push({ name: name, build: this.buildList })
      }
      localStorage.setItem("builds", JSON.stringify(current))
      // const routeData = JSON.parse(localStorage.getItem('routeData'));
      // const updatedRoutes = generateRoutesFromData(routeData);

      // // Update the routes in Vue Router
      // this.$router.matcher = new VueRouter().matcher;

    }
  },
  watch: {
    buildList(newVal, oldVal) { }
  }
}
</script>

<style scoped>
p {
  display: inline-block;
}


h2 {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-left: 1rem
}

ul {
  list-style-type: none;
}

button {
  background-color: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  width: 45rem;
  text-align: left;
}

.selected {
  background-color: rgba(100, 100, 100, 0.2)
}

button:hover {
  background-color: rgba(100, 100, 100, 0.2)
}

p {
  font-size: 1.75rem;
}

.component {
  width: 22.3rem;
}

.commit {
  width: 45rem;
  font-size: 3rem;
  margin-left: 4rem;
  text-align: center;
}

.name {
  padding: 0;
  margin: 0;
  font-size: 0;
  width: 45rem;
  margin-left: 4rem;
  text-align: center;
  border: solid 2px rgb(0, 0, 0);
  margin-bottom: 0.5rem;
  padding-bottom: 4px;
}

.save-text {
  margin: 0;
  margin-right: 0.5rem
}

input {
  font-size: 13px;
  border-radius: 4px;
  line-height: 1.5;
  padding: 5px 10px;
  transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;
  border: 2px solid #dee1e2;
  color: rgb(14, 14, 16);
  background: #dee1e2;
  height: 25px;
}

input:hover {
  border-color: #ccc;
}

input:focus {
  border-color: #9147ff;
  background: #fff;
}
</style>
