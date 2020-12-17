import {makeAutoObservable, runInAction} from 'mobx'

class Todo {
  loading = true
  todos = []
  error = ''

  isDelete = false
  deleteId = null

  filter = {
    onlyCompleted: false,
    search: ''
  }

  pagination = {
    current: 1,
    limit: 20,
    allPages: 10
  }

  constructor() {
    makeAutoObservable(this);
  }

  fetchTodos = async () => {
    this.todos = []
    this.allTodos = []
    this.error = ''

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos`).then(res => res.json())
      runInAction(() => {
        this.todos = response
      })
    } catch (e) {
      runInAction(() => {
        this.error = e.message || 'An error has occurred'
      })
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  getTodos = () => {
    const {search, onlyCompleted} = this.filter
    const {current, limit} = this.pagination

    let todos = [...this.todos]
    if (onlyCompleted) todos = todos.filter(todo => todo.completed === true)
    if (search.length) todos = todos.filter(todo => todo.title.toLowerCase().indexOf(search) > -1)
    runInAction(() => this.pagination.allPages = Math.ceil((todos.length / limit) * 10))

    const start = (current - 1) * limit
    return todos.slice(start, start + limit)
  }

  changeStatus = (id) => {
    const index = this.todos.findIndex(todo => todo.id === id)
    const todo = this.todos[index]

    this.todos[index] = {...todo, completed: !todo.completed}
  }

  removeTodo = (id) => {
    this.isDelete = true
    this.deleteId = id
  }

  removeTodoAgree = () => {
    const index = this.todos.findIndex(todo => todo.id === this.deleteId)
    this.todos.splice(index, 1)

    this.isDelete = false
    this.deleteId = null
  }

  removeTodoDisagree = () => {
    this.isDelete = false
    this.deleteId = null
  }

  toggleOnlyCompleted = () => {
    this.filter.onlyCompleted = !this.filter.onlyCompleted
    this.pagination.current = 1
  }

  setSearch = (value) => {
    this.filter.search = value
    this.pagination.current = 1
  }

  changePage = (page) => {
    this.pagination.current = page
  }
}

const TodoStore = new Todo()
export default TodoStore