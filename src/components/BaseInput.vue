<template>
  <div>
    <input :type="type" class="base-input" :placeholder="placeholder" v-on="inputListeners">
    <!-- <p v-if="$v.title.$error" class="input-error">Oops! Looks like you forgot the name!</p> -->
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputListeners: function() {
      var vm = this
      // `Object.assign` объединяет объекты вместе, чтобы получить новый объект
      return Object.assign(
        {},
        // Мы добавляем все слушатели из родителя
        this.$listeners,
        // Затем мы можем добавить собственные слушатели или
        // перезаписать поведение некоторых существующих.
        {
          // Это обеспечит, что будет работать v-model на компоненте
          input: function(event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;
  height: 45px;
  padding: 0 18px;
  border-radius: 6px;
  border: 0;
  outline: 0;
  font-weight: bold;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
