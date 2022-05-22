<template>
  <div>
    <Navbar />
    <main>
      <Nuxt />
    </main>
    <VFooter/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import VFooter from '../components/VFooter.vue'
export default {
  components: { VFooter, Navbar },
  
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0

body
  background-color: $light-gray
  font-family: $font-stack
  width: 75%
  margin: 0 auto
  @media (max-width: 992px)
      width: 80%

</style>