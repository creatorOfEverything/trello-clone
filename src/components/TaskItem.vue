<template>
  <div class="task">
    <div class="task__title">{{ currentTask }}</div>
    <form @submit.prevent="addTaskItem" class="task__form">
      <BaseInput type="text" v-model="title" class="task__input"/>
    </form>
    <div v-for="taskItem in filteredTaskItems" :key="taskItem.title" class="task__item">
      <div class="task__desc">{{ taskItem.title }}</div>
      {{ taskItem.state }}
      <div class="task__state" @click="refreshTask(taskItem.taskId, true)">
        <base-favicon-icon
          type="fas"
          icon="fa-check"
          color="#000"
          class="task__icon"
          :style="{ 'task_done': taskItem.state }"
        ></base-favicon-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store/store'

export default {
  props: {
    currentBoard: {
      type: Object
    },
    currentTask: {
      type: String
    }
  },
  data() {
    return {
      title: ''
    }
  },
  methods: {
    addTaskItem() {
      var taskId = Math.floor(Math.random() * 1000)

      var taskItem = {
        taskId: taskId,
        id: this.currentBoard.id,
        belongsTo: this.currentTask,
        title: this.title,
        state: false
      }

      store.dispatch('setNewTaskItem', taskItem)
    },
    refreshTask(taskId, state) {
      var taskItem = {
        taskId: taskId,
        id: this.currentBoard.id,
        belongsTo: this.currentTask,
        title: this.title,
        state: state
      }

      store.dispatch('refreshTaskItem', taskItem)
    }
  },
  computed: {
    filteredTaskItems() {
      return this.taskItems.filter(e => {
        return e['belongsTo'] == this.currentTask
      })
    },
    ...mapState(['taskItems'])
  }
}
</script>

<style lang="scss" scoped>
.task {
  @include fp(flex-start, center);
  flex-direction: column;
  margin: 20px;
  padding: 0 15px;
  width: 250px;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  color: #fff;
  background: #fff;
  transition: all 0.3s ease;

  &_done {
    background-color: rgb(222, 202, 255);
  }

  &__form {
    width: 100%;
  }

  &__title {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
    text-align: center;
    text-transform: uppercase;
    color: #000;
  }

  &__input {
    margin: 10px 0;
  }

  &__item {
    @include fp(space-between, center);
    margin-bottom: 10px;
    padding: 0 35px;
    width: 100%;
    padding: 10px 30px;
    border-radius: 6px;
    text-align: left;
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    color: #000;
    background-color: rgb(202, 255, 222);
  }

  &__icon {
    font-size: 12px;
  }

  &__desc {
    flex: 0 1 70%;
  }

  &__state {
    flex: 0 1 25%;
    text-align: right;
  }
}
</style>
