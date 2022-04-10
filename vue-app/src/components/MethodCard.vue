<template>
  <div class="main-page-method" >
    <img :src="method.img" alt="Граф">
    <h1>{{ method.name }}</h1>
    <v-button>Использовать</v-button>
  </div>
</template>

<script>
export default {
name: 'method-card',
props:{
  method: Object
}
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/global.sass'

.main-page-method 
  @extend %wrapper-column
  width: 23%
  height: 260px
  background: $white-color
  border-radius: 10px
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1)
  padding: 15px 0 20px

  img 
    width: 150px

  h1 
    text-align: center
    font-size: 14px
    width: 160px
    font-weight: 300
    color: $black-color
</style>