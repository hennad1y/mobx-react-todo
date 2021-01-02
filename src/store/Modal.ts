import {makeAutoObservable} from 'mobx'

class Modal {
  isOpen = false
  idItem = NaN

  constructor() {
    makeAutoObservable(this)
  }

  getIsOpen = (): boolean => {
    return this.isOpen
  }

  getIdItem = (): number => {
    return this.idItem
  }

  openModal = (id: number) => {
    this.idItem = id
    this.isOpen = true
  }

  closeModal = () => {
    this.idItem = NaN
    this.isOpen = false
  }
}

const ModalStore = new Modal()
export default ModalStore