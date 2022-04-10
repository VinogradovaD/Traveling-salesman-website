<template>
  <nav>
    <router-link to="/">О задаче</router-link>
    <router-link to="/about">Методы решения</router-link>
    <router-link to="/task">Решить онлайн</router-link>
  </nav>
  <router-view/>
</template>

<style lang="sass">
@import '@/assets/styles/global.sass'

*
  margin: 0
  padding: 0

body
  background-color: $light-gray-color

#app 
  font-family: $font-stack
  width: 75%
  margin: 0 auto

nav 
  @extend %wrapper-row
  padding-top: 50px

  a 
    font-size: 14px
    text-decoration: none

    &.router-link-exact-active 
      color: $red-color
</style>
