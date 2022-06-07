<template>
  <section class="task">
    <div class="task__form">
      <canvas class="task__form-canvas" width="320" height="320" />
      <form class="task__form-data" @submit.prevent="">
        <div class="task__form-city-amount">
          <label
            >Количество городов:
            <input
              @click="textareaIsVisible = false"
              v-model="cityAmount"
              type="number"
              min="3"
              max="20"
            />
          </label>
          <p>или&nbsp;</p>
          <a v-on:click="textareaIsVisible = true"> Загрузить файл</a>
        </div>
        <div class="task__form-method">
          <select v-model="selectedMethod">
            <option hidden>Выберите метод</option>
            <option v-for="(method, index) of methods" :key="index">
              {{ method.name }}
            </option>
          </select>
        </div>
        <div class="task__form-error-message">{{ errorMessage }}</div>
        <div class="task__form-matrix">
          <p>Матрица расстояний:</p>
          <inputs-block
            v-if="(cityAmount > 2) & !textareaIsVisible"
            :cityAmount="cityAmount"
            :matrix="matrix"
          />
          <textarea
            v-if="textareaIsVisible"
            v-model="textareaText"
            placeholder="Вставьте скопированные данные из файла"
          />
        </div>
        <div class="task__form-buttons">
          <v-button @click-btn="getAnswer">Посчитать</v-button>
          <v-button class="task__form-btn-clean" @click-btn="cleanForm"
            >Очистить</v-button
          >
        </div>
        <div class="task__form-answer" v-html="answer" />
        <a>Показать решение</a>
      </form>
    </div>
  </section>
</template>

<script>
import InputsBlock from "../task/InputsBlock.vue";
import VButton from "../../components/VButton.vue";
import "../../assets/js/pathLength";
import bruteForce from "../../assets/js/bruteForce.js";
import nearestNeighbor from "../../assets/js/nearestNeighbor.js";

export default {
  components: { VButton, InputsBlock },
  name: "TaskPage",
  props: {
    selectedMethod: {
      type: String,
      default: "Выберите метод",
    },
  },
  data() {
    return {
      cityAmount: "",
      errorMessage: "",
      matrix: [],
      answer: "",
      textareaIsVisible: false,
      textareaText: "",
    };
  },
  computed: {
    methods() {
      return this.$store.state.methods.list;
    },
  },

  watch: {
    cityAmount(newValue) {
      if (newValue < 3 && newValue != "") {
        this.errorMessage = "Количество городов не должно быть меньше 3";
      } else {
        this.errorMessage = "";
      }
      this.matrix = this.createArray(newValue);
    },
  },
  methods: {
    createArray(len) {
      let array = [];
      for (let i = 0; i < len; i++) {
        array[i] = [];
        for (let j = 0; j < len; j++) {
          if (i == j) array[i][j] = 0;
          else array[i][j] = "";
        }
      }
      return array;
    },
    emptyArray(array) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
          if (array[i][j] === '')
            return true;
        }
      }
      return false;
    },
    readTextarea() {
      let rows = this.textareaText.split("\n");
      let array = this.createArray(rows.length);
      for (let i = 0; i < rows.length; i++) {
        array[i] = rows[i].split(";");
      }
      return array;
    },
    getAnswer() {
      if (this.cityAmount == "" && this.textareaText == "") {
        this.errorMessage =
          "Введите количество городов или загрузите матрицу расстояний";
      } else {
        if (this.selectedMethod === "Выберите метод") {
          this.errorMessage = "Выберите метод";
        } else {
          if (this.emptyArray(this.matrix) == true) {
            this.errorMessage = "Все поля должны быть заполнены";
          } else {
            if (this.textareaText !== "") {
              this.matrix = this.readTextarea();
            }
            this.errorMessage = "";
            let result;
            switch (this.selectedMethod) {
              case "Метод полного перебора":
                result = bruteForce(this.matrix);
                break;
              case "Метод ближайшего соседа":
                result = nearestNeighbor(this.matrix);
                break;
              case "Метод ветвей и границ":
                result = bruteForce(this.matrix);
                break;
            }
            this.answer = `Маршрут: ${result.path.join(
              "->"
            )}<br>Длина маршрута: ${
              result.distance
            }<br>Время работы алгоритма: ${result.time}мс`;
          }
        }
      }
    },
    cleanForm() {
      this.answer = "";
      this.cityAmount = "";
      this.textareaText = "";
      this.errorMessage = "";
      this.textareaIsVisible = false;
      this.selectedMethod = "Выберите метод";
    },
  },
};
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

    &-city-amount


      input
        width: 30px
        margin: 0 10px 0 5px

    &-city-amount,
    &-method
      @extend %wrapper-row
      justify-content: start
      margin-bottom: 15px

    &-city-amount input,
    &-method select,
    &-matrix textarea
      outline: none
      font-family: $font-stack

    &-method select
      font-size: 15px

    &-error-message
      margin-bottom: 10px
      font-size: 13px
      color: $red

    &-matrix
      textarea
        width: 80%
        height: 140px
        resize: none

    &-matrix,
    &-matrix p
      margin-bottom: 10px

    &-btn-clean
      color: $blue
      background-color: $white

    &-answer
      margin-top: 10px
      font-size: 15px
a
  font-size: 15px
  color: $gray
  text-decoration: underline
  cursor: pointer
</style>
