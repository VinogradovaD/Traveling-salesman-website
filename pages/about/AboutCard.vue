<template>
  <div class="method">
    <h1>{{ method.name }}</h1>
    <div class="method-info">
      <img :src="method.img" alt="" />
      <div class="method-text">
        <p>
          {{method.desc}}
        </p>
        <v-button />
      </div>
    </div>
  </div>
</template>

<script>
import VButton from '@/components/VButton.vue'
export default {
  components: { VButton },
  name: 'about-card',
  props:{
    method: Object
  }
}
</script>

<style lang="sass" scoped>
.method 
  padding: 48px 40px 25px
  width: 70%
  margin: 0 auto
  margin-top: 50px
  background: $white
  border-radius: 15px
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.10)

  h1
    font-size: 20px
    text-align: center
    
  .method-info
    @extend %wrapper-row
    text-align: right

    img 
      width: 200px
      margin-top: 20px
      margin-bottom: 50px

    p 
      font-size: 15px
      font-weight: 300
      margin-top: 50px
      margin-bottom: 20px
      width: 430px
</style>