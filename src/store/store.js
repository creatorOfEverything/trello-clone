import Vue from 'vue'
import Vuex from 'vuex'
import axiosRequests from '@/services/axiosRequests.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boards: [],
    currentBoard: {},
    tasks: [],
    taskItems: []
  },
  mutations: {
    GET_BOARDS(state, boards) {
      state.boards = boards
    },
    GET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    GET_TASK_ITEMS(state, tasks) {
      state.taskItems = tasks
    },
    SET_NEW_BOARD(state, board) {
      state.boards.push(board)
    },
    SET_CURRENT_BOARD(state, currentBoard) {
      state.currentBoard = currentBoard
    },
    SET_NEW_TASK(state, task) {
      state.tasks.push(task)
    },
    SET_NEW_TASK_ITEM(state, taskItem) {
      state.taskItems.push(taskItem)
    }
  },
  actions: {
    setNewBoard({ commit }, board) {
      return axiosRequests
        .postNewBoard(board)
        .then(() => {
          commit('SET_NEW_BOARD', board)
          return board
        })
        .catch(error => {
          console.log('Ошибка запроса' + error.message)
        })
    },
    getBoards({ commit }) {
      return axiosRequests
        .getBoards()
        .then(response => {
          commit('GET_BOARDS', response.data)
        })
        .catch(error => {
          console.log('Ошибка запроса' + error.message)
        })
    },
    getBoard({ state, commit, getters }, id) {
      if (id === state.currentBoard.id) {
        return state.currentBoard
      }

      var currentBoard = getters.getBoardById(id)

      if (currentBoard) {
        commit('SET_CURRENT_BOARD', currentBoard)
        return currentBoard
      } else {
        return axiosRequests.getBoard(id).then(response => {
          commit('SET_CURRENT_BOARD', response.data)
          return response.data
        })
      }
    },
    setNewTask({ commit }, task) {
      // !
      var taskId = Math.floor(Math.random() * 1000)
      localStorage.setItem('task' + taskId, JSON.stringify(task))
      commit('SET_NEW_TASK', JSON.parse(localStorage.getItem('task' + taskId)))
    },
    setNewTaskItem({ commit }, task) {
      // !
      localStorage.setItem('taskItem' + task.taskId, JSON.stringify(task))
      commit(
        'SET_NEW_TASK_ITEM',
        JSON.parse(localStorage.getItem('taskItem' + task.taskId))
      )
    },
    refreshTaskItem({}, task) {
      localStorage.setItem('taskItem' + task.taskId, JSON.stringify(task))
    },
    getTasks({ commit }, id) {
      var filteredTasks = []
      var filteredTasksItems = []

      // !
      Object.keys(localStorage).forEach(function(e) {
        if (localStorage[e] !== 'SILENT') {
          var task = JSON.parse(localStorage[e])
          if (task.id == id && !task.belongsTo) {
            filteredTasks.push(task)
          } else if (task.id == id && task.belongsTo) {
            filteredTasksItems.push(task)
          }
        }
      })

      commit('GET_TASKS', filteredTasks)
      commit('GET_TASK_ITEMS', filteredTasksItems)

      return filteredTasks
    }
  },
  getters: {
    getBoardById: state => id => {
      return state.boards.find(board => board.id === id)
    }
  }
})
