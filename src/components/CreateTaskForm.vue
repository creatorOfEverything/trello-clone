<template>
  <base-item class="create-task-field">
    <form action class="create-form" @submit.prevent="createTask">
      <base-input type="text" v-model="title" placeholder="add a list"></base-input>
      <div @click="$emit('close-create-form', false)" class="create-form__icon">
        <base-favicon-icon type="fas" icon="fa-times-circle" color="#000"></base-favicon-icon>
      </div>
    </form>
  </base-item>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import store from '@/store/store'

export default {
  props: {
    currentBoard: {
      type: Object
    }
  },
  data() {
    return {
      title: ''
    }
  },
  methods: {
    createTask() {
      var task = { id: this.currentBoard.id, title: this.title }

      store.dispatch('setNewTask', task)
    },
    ...mapActions(['setNewTask'])
  }
}
</script>

<style lang="scss" scoped>
.border-item.create-task-field {
  margin: 20px;
  position: relative;
  border-radius: 0;
  background: #fff;
}
.create-form {
  &__icon {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    color: #000;
    transform: translate(50%, -50%);
  }
}
</style>
