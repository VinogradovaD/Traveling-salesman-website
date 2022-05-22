<template>
  <section class="task">
    <div class="task__form">
      <canvas class="task__form-canvas" width="320" height="320" />
      <form class="task__form-data" @submit.prevent="">
        <div class="task__form-city-amount">
          <label>Количество городов:
            <input v-model="cityAmount" type="number" min="3" max="20" />
          </label>
        </div>
        <div class="task__form-method">
          <select v-model="selectedMethod">
            <option hidden>Выберите метод</option>
            <option 
              v-for="(method, index) of methods" :key="index">
              {{ method.name }}
            </option>
          </select>
        </div>
        <div class="task__form-error-message"> {{ errorMessage }} </div>
        <div class="task__form-matrix">
          <p>Матрица расстояний:</p>
          <inputs-block 
            v-if="(cityAmount > 2)" 
            :cityAmount="cityAmount" 
            :matrix="matrix"
          />
        </div>
        <div class="task__form-buttons">
          <v-button v-on:click-btn="getAnswer">Посчитать</v-button>
          <v-button class="task__form-btn-clear">Очистить</v-button>
        </div>
        <a href="">Загрузить файл</a>
        <div class="task__form-answer" v-html="answer" />
      </form>
    </div>
  </section>
</template>

<script>
import InputsBlock from '../task/InputsBlock.vue';
import VButton from "../../components/VButton.vue";
import '../../assets/js/pathLength'
import bruteForce from '../../assets/js/bruteForce.js'
import {nearestNeighbor, nearestNeighbor2} from '../../assets/js/nearestNeighbor.js'

export default {
  components: { VButton, InputsBlock },
  name: "TaskPage",
  props: {
    selectedMethod: {
      type: String,
      default: 'Выберите метод'
    }
  },
  data() {
    return {
      cityAmount: '',
      //selectedMethod: 'Выберите метод',
      errorMessage: '',
      matrix: [],
      answer: '',
    };
  },
  computed: {
    methods() {
      return this.$store.state.methods.list;
    },
  },  

  watch: {
    cityAmount(newValue) {
      if (newValue < 3 & newValue != '') {
        this.errorMessage = "Количество городов не должно быть меньше 3";
      }
      else {
        this.errorMessage = "";
      }
      this.matrix = [];
      for (let i = 0; i < newValue; i++) {
        this.matrix[i] = [];
        for (let j = 0; j < newValue; j++) {
          this.matrix[i][j] = 0;
        }
      }
    },
  },
  methods: {
    getAnswer() {
      if (this.cityAmount == '') {
        this.errorMessage = 'Введите количество городов';
      }
      else if (this.selectedMethod === 'Выберите метод') {
        this.errorMessage = 'Выберите метод';
      }
      else {
        this.errorMessage = '';
        let result;
        switch (this.selectedMethod) {
          case 'Метод полного перебора':
            result = bruteForce(this.matrix);
            break;
          case 'Метод ближайшего соседа':
            result = nearestNeighbor2(this.matrix);
            break;
          case 'Метод ветвей и границ':
            result = bruteForce(this.matrix);
            break;
        } 
        this.answer = `Маршрут: ${result.path.join('->')}<br>Длина маршрута: ${result.distance}<br>Время работы алгоритма: ${result.time}мс`;
      }
    }
  },
}
</script>

<style lang="sass" scoped>
.task
  &__form
    @extend %wrapper-row
    justify-content: start
    width: 80%
    background-color: white
    border-radius: 15px
    margin: 0 auto
    padding: 40px
    margin-top: 60px
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.10)

    &-canvas
      outline: gray 1px solid
      border-radius: 10px

    &-data
      padding: 10px 0 0 30px

    &-city-amount,
    &-method
      @extend %wrapper-row
      justify-content: start
      margin-bottom: 20px

    &-city-amount input,
    &-method select
      outline: none
      font-family: $font-stack

    &-city-amount input
      width: 30px
      margin-left: 10px

    &-method select
      font-size: 15px

    &-error-message
      margin-bottom: 10px
      font-size: 13px
      color: $red

    &-matrix,
    &-matrix p
      margin-bottom: 10px    
    
    &-btn-clear
      color: $blue
      background-color: $white

    &-answer
      margin-top: 10px
      font-size: 15px
</style>
