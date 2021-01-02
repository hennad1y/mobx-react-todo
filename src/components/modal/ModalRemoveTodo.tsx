import {FC, ReactElement} from "react"
import {Modal} from "antd"
import {observer} from "mobx-react"
import ModalStore from "../../store/Modal"
import TodoStore from "../../store/Todos";

const ModalRemoveTodo: FC = (): ReactElement => {
  const {removeTodo} = TodoStore
  const {getIsOpen, getIdItem, closeModal} = ModalStore

  const handlerRemove = () => {
    removeTodo(getIdItem())
    closeModal()
  }

  return (
    <Modal title="Remove todo item" visible={getIsOpen()} onOk={() => handlerRemove()} onCancel={closeModal}>
      <p>Are you sure remove todo item?</p>
    </Modal>
  )
}

export default observer(ModalRemoveTodo)