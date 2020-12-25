import React, {FormEvent, FunctionComponent, ReactElement, useEffect} from 'react'
import {Checkbox, Input, Pagination, Spin, message} from 'antd'
import TodoStore from './../../store/Todo'
import {observer} from 'mobx-react'
import {LoadingOutlined} from "@ant-design/icons"
import ModalRemoveTodo from "../modal/ModalRemoveTodo"
import TodoList from "./TodoList"

const TodoWrapper: FunctionComponent = (): ReactElement => {
  const {fetchTodos, getTodos, loading, error, filter, toggleOnlyCompleted, setSearch, pagination, changePage} = TodoStore
  const {onlyCompleted, search} = filter
  const {allPages, current} = pagination

  useEffect(() => {fetchTodos().then()}, []) // eslint-disable-line

  if (loading) return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
  if (error) return <>{message.error(error)}</>

  return (
    <div className='todo-wrapper'>
      <Input placeholder="Search" className='search' value={search.toString()} onInput={(e: FormEvent<HTMLInputElement>) => setSearch(e.currentTarget.value.toLowerCase())}/>
      <Checkbox checked={Boolean(onlyCompleted)} onChange={toggleOnlyCompleted}>Only completed</Checkbox>
      <Pagination simple current={+current} total={+allPages} onChange={changePage} />
      <TodoList items={getTodos()}/>
      <ModalRemoveTodo/>
    </div>
  )
}

export default observer(TodoWrapper)