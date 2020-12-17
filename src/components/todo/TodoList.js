import React, {useEffect} from 'react'
import {Checkbox, Input, Modal, Pagination, Spin, message} from 'antd'
import TodoStore from './../../store/Todo'
import {observer} from 'mobx-react'
import TodoItem from "./TodoItem";
import {LoadingOutlined} from "@ant-design/icons";

const TodoList = observer(() => {
  const {fetchTodos, getTodos, loading, error, filter, toggleOnlyCompleted, setSearch, pagination, changePage, isDelete, removeTodoDisagree, removeTodoAgree}= TodoStore
  const {onlyCompleted, search} = filter
  const {allPages, current} = pagination

  useEffect(() => {
    (async function fetch() {
      await fetchTodos()
    })()
  }, []) // eslint-disable-line

  if (loading) return <><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></>
  if (error) return message.error(error)

  return (
    <div className='todo-wrapper'>
      <Input placeholder="Search" className='search' value={search} onInput={e => setSearch(e.target.value.toLowerCase())}/>
      <Checkbox cheked={onlyCompleted} onChange={toggleOnlyCompleted}>Only completed</Checkbox>
      <Pagination simple current={current} total={allPages} onChange={changePage} />
      <TodoItem className="todo-list" items={getTodos()}/>
      <Modal title="Remove todo item" visible={isDelete} onOk={removeTodoAgree} onCancel={removeTodoDisagree}>
        <p>Are you sure remove todo item?</p>
      </Modal>
    </div>
  )
})

export default TodoList