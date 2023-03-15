<template>
  <button><slot></slot></button>
</template>
<script>
export default {
  name: 'Button'
}
</script>

<style>
button {
  font-size: 20px;
  color: red;
}
</style>
