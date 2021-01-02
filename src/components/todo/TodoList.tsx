import React, {FC, ReactElement} from 'react'
import {Checkbox, List} from "antd"
import {DeleteFilled} from "@ant-design/icons"
import ModalStore from "../../store/Modal"
import TodoStore from "../../store/Todos"
import {observer} from "mobx-react"
import {ITodoItem} from "../../typescript/interfaces/Todos"

type Props = {
  items: ITodoItem[]
}

const TodoList: FC<Props> = ({items}): ReactElement => {
  const {changeStatus} = TodoStore
  const {openModal} = ModalStore

  return (
    <List
      size="small"
      bordered
      dataSource={items}
      renderItem={item => {
        return (
          <List.Item>
            <Checkbox checked={item.completed} onChange={() => changeStatus(item.id)}>
              {item.title}
            </Checkbox>
            <DeleteFilled onClick={() => openModal(item.id)}/>
          </List.Item>
        )
      }}
    />
  )
}

export default observer(TodoList)