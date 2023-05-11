<template>
  <div class="wrapper" ref="wrapperRef">
    <div class="slider">
      <div class="progress" :style="progressWidth"></div>
    </div>
    <div class="range-input">
      <input
        type="range"
        class="range-min"
        min="0"
        :max="totalValue"
        step="10"
        v-model="minValue"
      />
      <input
        type="range"
        class="range-max"
        min="0"
        :max="totalValue"
        step="10"
        v-model="maxValue"
      />
      <div class="nums">
        <p>{{ symbol }}{{ minValue }}</p>
        <p>{{ symbol }}{{ maxValue }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberSlider',
  emits: ['change'],

  data() {
    return {
      minValue: 0,
      maxValue: 100000,
      valueGap: 10,
      totalValue: 100000
    }
  },
  props: {
    valueList: {
      type: Array,
      required: true
    },
    symbol: {
      type: String,
      required: false
    }
  },
  computed: {
    progressWidth() {
      return `left: ${(this.minValue / this.totalValue) * 100}%; right: ${
        100 - (this.maxValue / this.totalValue) * 100
      }%;`
    },
    greatestValue() {
      if (Math.max(...this.valueList) < 10) {
        // console.log(Math.ceil(Math.max(...this.valueList)))
        this.totalValue = Math.ceil(Math.max(...this.valueList))
      } else if (Math.max(...this.valueList) < 800) {
        this.totalValue = Math.ceil(Math.max(...this.valueList) / 100) * 100
      } else {
        this.totalValue = Math.ceil(Math.max(...this.valueList) / 1000) * 1000
      }
      this.valueGap = this.totalValue / 10
      this.minValue = 0
      this.maxValue = this.totalValue
    }
  },
  watch: {
    valueList(newVal, oldVal) {
      this.greatestValue
    },
    minValue(newVal, oldVal) {
      if (newVal < 0) this.minValue = 0
      if (newVal > this.maxValue - this.valueGap) this.minValue = this.maxValue - this.valueGap
      this.$emit('change', { max: parseInt(this.maxValue), min: parseInt(this.minValue) })
    },
    maxValue(newVal, oldVal) {
      if (this.maxValue < parseInt(this.minValue) + this.valueGap)
        this.maxValue = parseInt(this.minValue) + this.valueGap

      if (newVal > this.totalValue) this.maxValue = this.totalValue
      this.$emit('change', { max: parseInt(this.maxValue), min: parseInt(this.minValue) })
    }
  },
  mounted() {
    this.greatestValue
    // console.log(this.valueList)
  }
}
</script>
<style scoped>
.wrapper {
  width: 200px;
}

.slider {
  height: 5px;
  position: relative;
  background: #ddd;
  border-radius: 5px;
}

.slider .progress {
  height: 100%;
  left: 25%;
  right: 25%;
  position: absolute;
  border-radius: 5px;
  background: #17a2b8;
}

.range-input {
  position: relative;
}

.range-input input {
  position: absolute;
  width: 100%;
  height: 5px;
  top: -5px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type='range']::-webkit-slider-thumb {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background: #17a2b8;
  pointer-events: auto;
  -webkit-appearance: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}

input[type='range']::-moz-range-thumb {
  height: 17px;
  width: 17px;
  border: none;
  border-radius: 50%;
  background: #17a2b8;
  pointer-events: auto;
  -moz-appearance: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}

p {
  display: inline-block;
  font-size: 12px;
}

.nums {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
