<template>
  <ul class="menus">
    <li>
      <button type="button">{{ title }}<span class="arrow"></span></button>
      <ul class="dropdown" id="dropdown1">
        <li v-for="item in list">
          <button @click="selectedFilter(item)">{{ item }}</button>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
// https://blog.logrocket.com/making-dropdown-menus-css/
export default {
  name: 'DropDown',
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    selectedFilter(filter) {
      this.$emit('clickedFilter', filter)
    }
  }
}
</script>

<style scoped>
body {
  font-family: sans-serif;
}

li {
  list-style: none;
  font-size: 18px;
}

li button {
  font-size: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
}

li button {
  display: block;
  color: black;
  text-decoration: none;
}

li button,
li button {
  padding: 0.7rem 1rem;
  text-align: left;
}

.dropdown {
  padding: 2px 1.5rem;
  height: 0;
  overflow: hidden;
  transition: height ease 0.2s;
}

li:focus-within .dropdown {
  height: fit-content;
}

.arrow {
  width: 0.5em;
  height: 0.5em;
  display: inline-block;
  vertical-align: middle;
  border-left: 0.15em solid currentColor;
  border-bottom: 0.15em solid currentColor;
  transform: rotate(-45deg);
  margin-left: 0.38em;
  margin-top: -0.25em;
  transition: transform 100ms ease-in-out;
}

li:focus-within > button > .arrow {
  transform: rotate(-225deg);
  margin-top: 4px;
}
.header-content {
  display: flex;
}

.menus {
  position: static;
  visibility: visible;
  background: #fff;
  display: flex;
  transform: initial;
}

label,
input[type='checkbox'] {
  display: none;
}

ul li {
  position: relative;
  font-size: 14px;
}

ul li button:hover,
ul li button:hover {
  background-color: #f2f2f2;
}

.dropdown {
  position: absolute;
  left: auto;
  box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08), 0 4px 6px -2px rgba(71, 63, 79, 0.16);
  z-index: 99;
  min-width: 10rem;
  padding: 0;
  background-color: #fff;
  border-radius: 0 0 0.5rem 0.5rem;
}

ul li:hover .dropdown {
  height: fit-content;
}

ul li:hover > button > .arrow {
  transform: rotate(-225deg);
  margin-top: 4px;
}
</style>
