<template>
  <div>
    <button>
      <h2>{{ title }}</h2>
      <img v-bind:src="image" alt="" />
      <h4>{{ description }}</h4>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    image: String,
    description: String
  }
}
</script>

<style>
img {
  width: 225px;
}
</style>
