export interface ModalVal {
  mode:string
}
type ModalKey = 'NONE'|'LOADING';
export type MODAL_TYPE = Record<ModalKey,ModalVal>

export const MODAL_INFO:MODAL_TYPE = {
  NONE:{
    mode:'NONE'
  },
  LOADING:{
    mode:'LOADING'
  }
}