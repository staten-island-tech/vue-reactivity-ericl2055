<template>
  <div class="checkbox-dropdown" :class="{ 'is-active': isActive }">
    <div class="checkbox-dropdown-toggle" @click="toggleActive">
      <span>Filter by {{ part }}</span>
      <span class="arrow"></span>
    </div>
    <ul class="checkbox-dropdown-list">
      <li v-for="option in options" :key="option">
        <div class="checkbox-wrapper">
          <input type="checkbox" :value="option" v-model="selectedFilters" />
          <label>
            {{
              option.type === 'price'
                ? option.type.toUpperCase() + ' - less than or equal to $' + option.filter
                : option.type.toUpperCase() + ' - ' + option.filter
            }}
          </label>
        </div>
      </li>
    </ul>
    <button @click="applyFilters">Apply Filters</button>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    part: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedFilters: [],
      isActive: false
    }
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive
    },
    applyFilters() {
      console.log(this.selectedFilters)
      this.$emit('filter-changed', this.selectedFilters)
    }
  }
}
</script>

<style>
.checkbox-dropdown {
  width: 200px;
  border: 1px solid #aaa;
  padding: 10px;
  position: relative;
  margin: 0 auto;
  user-select: none;
}
.checkbox-dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

/* Display CSS arrow to the right of the dropdown text */
.checkbox-dropdown-toggle span.arrow {
  font-size: 1.2rem;
}

.checkbox-dropdown-toggle span.arrow::before {
  content: '';
  height: 0;
  position: absolute;
  width: 0;
  border: 6px solid transparent;
  border-top-color: #ffffff;
  top: 50%;
  right: 10px;
  margin-top: -3px;
}

/* Reverse the CSS arrow when the dropdown is active */
.checkbox-dropdown.is-active .checkbox-dropdown-toggle span.arrow::before {
  border-bottom-color: #000;
  border-top-color: #fff;
  margin-top: -9px;
}

.checkbox-dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%; /* align the dropdown right below the dropdown text */
  border: inherit;
  border-top: none;
  left: -1px; /* align the dropdown to the left */
  right: -1px; /* align the dropdown to the right */
  opacity: 0; /* hide the dropdown */

  transition: opacity 0.4s ease-in-out;
  height: 100px;
  overflow: scroll;
  overflow-x: hidden;
  pointer-events: none; /* avoid mouse click events inside the dropdown */
}
.is-active .checkbox-dropdown-list {
  opacity: 1; /* display the dropdown */
  pointer-events: auto; /* make sure that the user still can select checkboxes */
}

.checkbox-dropdown-list li label {
  display: block;
  border-bottom: 1px solid silver;
  padding: 10px;

  transition: all 0.2s ease-out;
}

.checkbox-dropdown-list li label:hover {
  background-color: #555;
  color: white;
}
</style>
