import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.min.css'
import './styles/index.scss'

import TodoList from './components/todo/TodoList'

ReactDOM.render(
  <TodoList/>,
  document.getElementById('root')
)
