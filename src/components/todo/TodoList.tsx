import React, {FunctionComponent, ReactElement} from 'react'
import {Checkbox, List} from "antd"
import {DeleteFilled} from "@ant-design/icons"
import TodoStore from "../../store/Todo"
import {observer} from "mobx-react"
import {ITodoItem} from "../../typescript/interfaces/Todo"

const TodoList: FunctionComponent<{items: ITodoItem[]}> = ({items}): ReactElement => {
  const {changeStatus, removeTodo} = TodoStore

  return (
    <List
      size="small"
      bordered
      dataSource={items}
      renderItem={item => {
        return (
          <List.Item>
            <Checkbox checked={!!item.completed} onChange={() => changeStatus(item.id)}>
              {item.title}
            </Checkbox>
            <DeleteFilled onClick={() => removeTodo(item.id)}/>
          </List.Item>
        )
      }}
    />
  )
}

export default observer(TodoList)