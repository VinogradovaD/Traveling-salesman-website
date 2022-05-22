<template>
  <button v-on:click="$emit('click-btn')">
    <slot>Использовать</slot>
  </button>
</template>

<script>
export default {
  name: 'VButton'
}
</script>

<style lang="sass" scoped>
button
  width: 140px
  padding: 10px 0
  border: none
  border-radius: 5px
  background: $blue
  border: 1px solid $blue
  font-size: 12px
  cursor: pointer
  font-family: $font-stack
  color: $white

  &:hover
    transform: translateY(-3px)
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)

  &:active
    transform: translateY(-1px)
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1)

  &:hover::after 
    transform: scaleX(1) scaleY(1.6)
    opacity: 0
</style>