<template>
  <div>
    <div v-for="n in inputs" :key="n">
      <input 
        v-for="m in inputs" 
        :key="m"
        v-model="matrix[n][m]"
        type="number" 
        :disabled="(m == n)"
        value="0"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputsBlock',
  // data() {
  //   return {
  //     matrix: [],
  //   }
  // },
  props: ['cityAmount', 'matrix'],
  computed: {
    inputs: function() {
      return Array.apply(null, {length: this.cityAmount}).map(Number.call, Number);
    },
  }
}
</script>

<style lang="sass" scoped>
input
  width: 17px
  margin: 3px
  outline: none
  -moz-appearance: textfield

.next-line 
  display: block

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
</style>>
