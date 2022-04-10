<template>
  <button>
    <slot></slot>
  </button>
  
</template>

<script>
export default {
  name: 'v-button'
}
</script>

<style lang="sass">
@import '@/assets/styles/global.sass'

button
  width: 140px
  padding: 10px 0
  border: none
  border-radius: 5px
  background: $blue-color
  border: 1px solid $blue-color
  font-size: 12px
  cursor: pointer
  font-family: $font-stack

button:hover
  transform: translateY(-3px)
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)

button:active
  transform: translateY(-1px)
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1)

button:hover::after 
  transform: scaleX(1) scaleY(1.6)
  opacity: 0

@keyframes moveInBottom 
  0% 
    opacity: 0
    transform: translateY(30px)

  100% 
    opacity: 1
    transform: translateY(0px)
</style>