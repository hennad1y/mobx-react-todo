import {makeAutoObservable, runInAction} from 'mobx'
import {ITodoFilter, ITodoItem, ITodoPagination} from "../typescript/interfaces/Todo"
import {TTodoIsDelete} from "../typescript/types/Todo"

class Todo {
  loading: Boolean = true
  todos: ITodoItem[] = []
  error: String = ''

  isDelete: TTodoIsDelete = false

  filter: ITodoFilter = {
    onlyCompleted: false,
    search: ''
  }

  pagination: ITodoPagination = {
    current: 1,
    limit: 20,
    allPages: 10
  }

  constructor() {
    makeAutoObservable(this)
  }

  fetchTodos = async () => {
    this.todos = []
    this.error = ''

    try {
      const response: ITodoItem[] = await fetch(`https://jsonplaceholder.typicode.com/todos`).then(res => res.json())
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

    let todos: ITodoItem[] = [...this.todos]
    if (onlyCompleted) todos = todos.filter(todo => todo.completed)
    if (search.length) todos = todos.filter(todo => todo.title.toLowerCase().indexOf(search.toString()) > -1)
    runInAction(() => this.pagination.allPages = Math.ceil((todos.length / +limit) * 10))

    const start: Number = (+current - 1) * +limit
    return todos.slice(+start, +start + +limit)
  }

  changeStatus = (id: Number) => {
    const index: Number = this.todos.findIndex((todo: ITodoItem) => todo.id === id)
    const todo: ITodoItem = this.todos[+index]

    this.todos[+index] = {...todo, completed: !todo.completed}
  }

  removeTodo = (id: Boolean | Number) => {
    this.isDelete = id
  }

  removeTodoAgree = () => {
    const index: Number = this.todos.findIndex((todo: ITodoItem) => todo.id === +this.isDelete)
    this.todos.splice(+index, 1)

    this.isDelete = false
  }

  removeTodoDisagree = () => {
    this.isDelete = false
  }

  toggleOnlyCompleted = () => {
    this.filter.onlyCompleted = !this.filter.onlyCompleted
    this.pagination.current = 1
  }

  setSearch = (value: String) => {
    this.filter.search = value.toString()
    this.pagination.current = 1
  }

  changePage = (page: Number) => {
    this.pagination.current = +page
  }
}

const TodoStore = new Todo()
export default TodoStore