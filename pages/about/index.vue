<template>
  <div class="about">
    <about-card
      v-for="(method, index) of methods"
      :method="method"
      :key="index"
    />
  </div>
</template>

<script>
import AboutCard from '../about/AboutCard.vue'
export default {
  components: { AboutCard },
  name: 'AboutPage',
  computed: {
    methods () {
      return this.$store.state.methods.list
    }
  },
}
</script>