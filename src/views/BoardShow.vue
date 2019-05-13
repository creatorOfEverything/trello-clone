<template>
  <div>
    <div class="list">
      <base-item class="border-item-title inner-border">{{ currentBoard.title }}</base-item>
      <TaskItem
        v-for="task in tasks"
        :key="task.title"
        :currentTask="task.title"
        :currentBoard="currentBoard"
      ></TaskItem>
      <base-item
        class="add-task"
        v-if="!createTaskFormOpened"
        @click.native="showCreateForm"
      >Add a task</base-item>
      <CreateTaskForm
        v-if="createTaskFormOpened"
        v-on:close-create-form="closeCreateForm"
        :currentBoard="currentBoard"
      ></CreateTaskForm>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CreateTaskForm from '@/components/CreateTaskForm.vue'
import TaskItem from '@/components/TaskItem.vue'

export default {
  components: {
    CreateTaskForm,
    TaskItem
  },
  props: {
    currentBoard: {
      type: Object
    }
  },
  data() {
    return {
      createTaskFormOpened: false
    }
  },
  methods: {
    showCreateForm() {
      this.createTaskFormOpened = true
    },
    closeCreateForm(bool) {
      this.createTaskFormOpened = bool
    }
  },
  computed: {
    ...mapState(['tasks'])
  }
}
</script>

<style lang="scss" scoped>
.inner-border {
  border-radius: 0;
}

.border-item.border-item-title {
  position: absolute;
  top: 80px;
  padding: 19px 25px;
  width: auto;
  height: auto;
  font-size: 26px;
  word-break: break-all;
  cursor: initial;

  &:hover {
    transform: scale(1);
  }
}

.border-item.add-task {
  margin: 20px;
  width: 150px;
  border-radius: none;
  background-color: #0a2c74;
}
</style>
