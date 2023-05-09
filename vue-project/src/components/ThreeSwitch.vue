<template>
    <div class="toggle-switch">
        <button :class="{ 'active': state === 'left' }" @click="toggleLeft">Left</button>
        <button :class="{ 'active': state === 'middle' }" @click="toggleMiddle">Middle</button>
        <button :class="{ 'active': state === 'right' }" @click="toggleRight">Right</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            state: 'left'
        };
    },
    methods: {
        toggleLeft() {
            this.state = 'left';
        },
        toggleMiddle() {
            this.state = 'middle';
        },
        toggleRight() {
            this.state = 'right';
        }
    }
};
</script>
  
<style scoped>
.toggle-switch {
    display: flex;
}

button {
    padding: 8px 16px;
    border: none;
    outline: none;
    background-color: #eee;
    cursor: pointer;
}

button.active {
    background-color: #333;
    color: #fff;
}
</style>