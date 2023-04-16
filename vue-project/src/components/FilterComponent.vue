<template>
  <div>
    <label>Filter by {{ part }}:</label>
    <input type="text" v-model="filter" />
  </div>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    part: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      filter: ''
    }
  },
  watch: {
    filter(newVal, oldVal) {
      this.$emit('filter-changed', { type: this.part, filter: newVal })
    }
  }
}
</script>

<style scoped></style>
