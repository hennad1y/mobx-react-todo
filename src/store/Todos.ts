import {makeAutoObservable, runInAction} from 'mobx'
import {ITodoFilter, ITodoItem, ITodoPagination} from "../typescript/interfaces/Todos"

class Todos {
  loading = true
  todos: ITodoItem[] = []
  error = ''

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

  getTodos = (): ITodoItem[] => {
    const {search, onlyCompleted} = this.filter
    const {current, limit} = this.pagination

    let todos: ITodoItem[] = [...this.todos]
    if (onlyCompleted) todos = todos.filter(todo => todo.completed)
    if (search.length) todos = todos.filter(todo => todo.title.toLowerCase().indexOf(search.toString()) > -1)
    runInAction(() => this.pagination.allPages = Math.ceil((todos.length / +limit) * 10))

    const start = (current - 1) * limit
    return todos.slice(start, start + limit)
  }

  changeStatus = (id: number) => {
    const index = this.todos.findIndex(todo => todo.id === id)
    const todo: ITodoItem = this.todos[index]

    this.todos[index] = {...todo, completed: !todo.completed}
  }

  removeTodo = (id: number) => {
    this.todos = this.todos.filter((todo: ITodoItem) => todo.id !== id)
  }

  toggleOnlyCompleted = () => {
    this.filter.onlyCompleted = !this.filter.onlyCompleted
    this.pagination.current = 1
  }

  setSearch = (value: string) => {
    this.filter.search = value
    this.pagination.current = 1
  }

  changePage = (page: number) => {
    this.pagination.current = page
  }
}

const TodoStore = new Todos()
export default TodoStore