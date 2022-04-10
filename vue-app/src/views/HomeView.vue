<template>
  <div class="home">
    <section class="about">
      <div class="about-text">
        <h1>
          Что такое<br> «задача коммивояжёра»?
        </h1>
        <p>
          Это задача о нахождении самого короткого маршрута между городами. Требуется побывать в каждом
          городе хотя бы по одному разу и вернуться домой.
        </p>
      </div>
      <img class="about-img" src="@/assets/map.jpg" alt="Карта">
    </section>
    <section class="methods">
      <method-card
        v-for="(method, index) of methods"
        :method="method"
        :key="index"
      />
    </section>
    <v-footer/>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      methods: [
      {name:"Метод полного перебора", img: require('@/assets/img1.png'), desc:""},
      {name:"Метод ближайшего соседа", img: require('@/assets/img2.png'), desc:""},
      {name:"Усов. метод ближайшего соседа", img: require('@/assets/img3.png'), desc:""},
      {name:"Метод ветвей и границ", img: require('@/assets/img4.png'), desc:""},
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/global.sass'

.about
  @extend %wrapper-row
  margin-top: 80px
  margin-bottom: 100px

  h1
    margin-top: 70px
    font-size: 33px
    color: $blue-color
      
  p
    width: 400px
    margin-top: 25px
    color: $gray-color

  .about-img 
    width: 350px
    border-radius: 300px
    margin-top: 20px

.methods
  @extend %wrapper-row
</style>