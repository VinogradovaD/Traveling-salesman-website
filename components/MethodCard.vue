<template>
  <div class="method-card" v-on:click="$emit('click-card')">
    <img class="method-card__img" :src="method.img" alt="Граф">
    <h1 class="method-card__header">{{ method.name }}</h1>
    <v-button />
    <a class="method-card__link" href="/about">О методе</a>
  </div>
</template>

<script>
import VButton from './VButton.vue'
export default {
  components: { VButton },
  name: 'MethodCard',
  props:{
    method: Object
  }
}
</script>

<style lang="sass" scoped>
.method-card 
  @extend %wrapper-column
  width: 23%
  height: 260px
  background: $white
  border-radius: 10px
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1)
  padding: 15px 0 20px
  cursor: pointer
  @media screen and (max-width: 992px) 
    width: 25%


  &__img 
    width: 150px
    @media screen and (max-width: 992px) 
      width: 130px

  &__header
    text-align: center
    font-size: 14px
    width: 160px
    font-weight: 300
    color: $black
  
  &__link
    text-decoration: underline
    font-size: 12px
    color: $gray
</style>