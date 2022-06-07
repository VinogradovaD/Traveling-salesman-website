<template>
  <nav>
    <nuxt-link to="/">Главная</nuxt-link>
    <nuxt-link to="/about">О методах</nuxt-link>
    <nuxt-link to="/task">Решить онлайн</nuxt-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="sass" scoped>
nav 
  @extend %wrapper-row
  padding-top: 50px
  margin: 0 auto

  a
    font-size: 16px
    text-decoration: none
    color: $gray
    line-height: 25px

    &.nuxt-link-exact-active 
      color: $white
      background-color: $blue
      border-radius: 4px
      text-align: center
      padding: 3px

@media screen and(max-width: 400px)
  nav a
    font-size: 12px
</style>