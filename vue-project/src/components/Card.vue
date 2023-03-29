<template>
  <div>
    <h2>{{ brand }}</h2>
    <h3>{{ name }}</h3>
    <h4>{{ price }}</h4>
    <button>Add To Cart</button>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    brand: String,
    name: String,
    price: String
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
