import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getBoards() {
    return apiClient.get('/boards')
  },
  getBoard(id) {
    return apiClient.get('/boards/' + id)
  },
  postNewBoard(board) {
    return apiClient.post('/boards', board)
  }
}
