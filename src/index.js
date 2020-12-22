import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.min.css'
import './styles/index.scss'

import TodoWrapper from './components/todo/TodoWrapper'

ReactDOM.render(
  <TodoWrapper/>,
  document.getElementById('root')
)
