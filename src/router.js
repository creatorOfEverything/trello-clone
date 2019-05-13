import Vue from 'vue'
import Router from 'vue-router'
import BoardsList from '@/views/BoardsList.vue'
import BoardShow from '@/views/BoardShow.vue'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      component: BoardsList
    },
    {
      path: '/board/:id',
      name: 'board-show',
      component: BoardShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('getBoards').then(() => {
          store.dispatch('getBoard', routeTo.params.id).then(currentBoard => {
            routeTo.params.currentBoard = currentBoard
            store.dispatch('getTasks', routeTo.params.id).then(() => {
              next()
            })
          })
        })
      }
    }
  ]
})

export default router
