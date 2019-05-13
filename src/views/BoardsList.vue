<template>
  <div>
    <div class="list">
      <base-item
        class="list__create-board list__board"
        v-if="!createFormOpened"
        @click.native="showCreateForm"
      >Create a new board</base-item>
      <CreateBorderForm
        v-if="createFormOpened"
        v-on:close-create-form="closeCreateForm"
        class="list__create-form"
      ></CreateBorderForm>
      <div v-for="board in boards" :key="board.id">
        <router-link :to="{ name: 'board-show', params: { id: board.id} }">
          <base-item class="list__board">{{ board.title }}</base-item>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CreateBorderForm from '@/components/CreateBorderForm.vue'
import { mapState, mapActions } from 'vuex'
import store from '@/store/store'

export default {
  components: {
    CreateBorderForm
  },
  data() {
    return {
      createFormOpened: false
    }
  },
  methods: {
    showCreateForm() {
      this.createFormOpened = true
    },
    closeCreateForm(bool) {
      this.createFormOpened = bool
    },
    ...mapActions(['getBoards'])
  },
  created() {
    store.dispatch('getBoards')
  },
  computed: {
    ...mapState(['boards'])
  }
}
</script>

<style lang="scss" scoped>
.list {
  &__create-board {
    color: #fff;
  }

  &__board {
    margin: 20px;
  }

  &__create-form {
    margin: 20px;
  }
}
</style>
