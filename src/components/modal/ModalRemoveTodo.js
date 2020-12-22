import {Modal} from "antd";
import TodoStore from "../../store/Todo";
import {observer} from "mobx-react";

const ModalRemoveTodo = () => {
  const {isDelete, removeTodoDisagree, removeTodoAgree}= TodoStore
  return (
    <Modal title="Remove todo item" visible={isDelete} onOk={removeTodoAgree} onCancel={removeTodoDisagree}>
      <p>Are you sure remove todo item?</p>
    </Modal>
  )
}

export default observer(ModalRemoveTodo)