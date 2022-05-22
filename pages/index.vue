<template>
  <section class="home">
    <section class="home__about">
      <div class="home__about-text">
        <h1>
          Что такое<br> «задача коммивояжёра»?
        </h1>
        <p>
          Это задача о нахождении самого короткого маршрута между городами. Требуется побывать в каждом
          городе хотя бы по одному разу и вернуться домой.
        </p>
      </div>
      <img class="home__about-img" src="@/assets/img/map.jpg" alt="Карта">
    </section>
    <section class="home__methods">
      <method-card
        v-for="(method, index) of methods"
        :method="method"
        :key="index"
        v-on:click-card="toTaskPage(method.name)"
      />
    </section>
  </section>
</template>

<script>
import MethodCard from '../components/MethodCard.vue'
export default {
  components: { MethodCard },
  name: 'IndexPage',
  computed: {
    methods () {
      return this.$store.state.methods.list
    }
  },
  methods: {
    toTaskPage: function(methodName) {
      this.$router.push({
        name: 'task',
        params: {
          selectedMethod: methodName
        }});
        console.log(methodName);
    },
  },
}
</script>

<style lang="sass" scoped>
.home 
  &__about
    @extend %wrapper-row
    margin-top: 80px
    margin-bottom: 100px

    h1
        margin-top: 70px
        font-size: 33px
        color: $blue
      
    p
        width: 400px
        margin-top: 25px
        color: $gray

    
    &-img 
      width: 360px
      border-radius: 300px
      margin-top: 10px

  &__methods
    @extend %wrapper-row
    
@media (max-width: 1200px) 
  

@media screen and (max-width: 992px) 


@media screen and (max-width: 768px) 


@media screen and (max-width: 576px) 
</style>