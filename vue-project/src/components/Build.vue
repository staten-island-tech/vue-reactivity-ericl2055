<template>
  <div id="Build">
    <ul>
      <li>CPU {{ cpu }}</li>
      <li>Motherboard {{}}</li>
      <li>Memory</li>
      <li>Storage</li>
      <li>Video Card</li>
      <li>Case</li>
      <li>Power Supply</li>
      <li>Monitor</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Build',
  props: {
    cpu: Element,
    motherboard: Element,
    memory: Element,
    storage: Element,
    VideoCard: Element,
    Case: Element,
    PowerSupply: Element,
    Monitor: Element
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
