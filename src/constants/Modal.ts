export interface ModalVal {
  mode:string
}
type ModalKey = 'NONE'|'LOADING'|'ADD_SUBJECT'|'ADD_TASK';
export type MODAL_TYPE = Record<ModalKey,ModalVal>

export const MODAL_INFO:MODAL_TYPE = {
  NONE:{
    mode:'NONE'
  },
  LOADING:{
    mode:'LOADING'
  },
  ADD_SUBJECT:{
    mode:'ADD_SUBJECT'
  },
  ADD_TASK:{
    mode:'ADD_TASK'
  }
}