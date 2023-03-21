<template>
  <div>
    <button>
      <h2>{{ title }}</h2>
      <img v-bind:src="image" alt="" />
      <h3>{{ price }}</h3>
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
    price: String,
    description: String
  }
}
</script>

<style>
div {
  display: flex;
  flex-wrap: wrap;
}
img {
  width: 225px;
}
</style>
