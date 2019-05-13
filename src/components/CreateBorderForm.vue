<template>
  <form action class="create-form" @submit.prevent="createNewBoard">
    <div class="create-form__header">
      <p class="create-form__title create-form__title_hr-line">Creating a board...</p>
      <div @click="$emit('close-create-form', false)" class="create-form__icon">
        <base-favicon-icon type="fas" icon="fa-times-circle" color="#fff"></base-favicon-icon>
      </div>
    </div>
    <div class="create-form__body">
      <p class="create-form__text">What shall we call the board?</p>
      <base-input type="text" v-model="title" @blur="$v.title.$touch()"></base-input>
      <p v-if="$v.title.$error" class="create-form__error">Oops! Looks like you forgot the name!</p>
    </div>
    <div class="create-form__footer">
      <p
        class="create-form__cancel create-form__btn"
        @click="$emit('close-create-form', false)"
      >Cancel</p>
      <button
        type="submit"
        class="create-form__create create-form__btn"
        :class="{ 'create-form__btn_disabled' : $v.$error }"
      >Create</button>
    </div>
  </form>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import store from '@/store/store'

export default {
  data() {
    return {
      title: '',
      id: 1
    }
  },
  validations: {
    title: {
      required
    }
  },
  methods: {
    createNewBoard() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      var id = Math.floor(Math.random() * 1000)

      var newBoard = {
        id: id,
        title: this.title,
        tasks: ''
      }

      store.dispatch('setNewBoard', newBoard).then(newBoard => {
        this.$router.push({
          name: 'board-show',
          params: { id: newBoard.id }
        })
        // this.event = this.createFreshEventObject()
      })
    },
    ...mapActions(['setNewBoard'])
  }
}
</script>

<style lang="scss" scoped>
.create-form {
  width: 345px;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: #9fe7a4;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  &__header {
    @include fp(space-between, center);
    position: relative;
    width: 100%;
    height: 100px;

    &:before {
      @include ps();
      width: 100%;
      height: 1px;
      bottom: 20px;
      background: rgba($color: #fff, $alpha: 0.7);
    }
  }

  &__body {
    padding: 0 50px;
  }

  &__title {
    padding-left: 20px;
    line-height: 100px;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    text-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.8);
    color: #fff;
  }

  &__icon {
    @include c('y');
    position: absolute;
    right: 50px;
  }

  &__text {
    padding: 18px 0;
    text-shadow: 0px 0px 3px #000;
    text-align: left;
    font-weight: 400;
    font-size: 12px;
    color: #fff;
  }

  &__footer {
    @include fp(center, center);
    padding: 30px 0 45px;
  }

  &__btn {
    margin: 0 10px;
    font-size: 14px;
    text-transform: uppercase;

    &_disabled {
      color: grey;
      background: darken(#ccc, 7%);
    }
  }

  &__cancel {
    font-weight: bold;
    cursor: pointer;
    color: #fff;

    &:hover {
      color: #00ffc5;
      transition: all 0.3s ease;
    }
  }

  &__create {
    padding: 13px 27px;
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition: 0.3s all ease;

    &:hover {
      box-shadow: 0 4px 3px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      color: #00baff;
      transition: all 0.3s ease;
    }
  }

  &__error {
    padding: 8px 0;
    font-size: 12px;
    text-align: center;
  }
}
</style>
