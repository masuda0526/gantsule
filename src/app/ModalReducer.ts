import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { MODAL_INFO, type ModalVal } from "../constants/Modal"

type ModalState = {
  isShow:boolean,
  type:ModalVal,
}
const initialState:ModalState = {
  isShow:false,
  type:MODAL_INFO.NONE
}

const ModalInfoSlicer = createSlice({
  name:'modalState',
  initialState,
  reducers:{
    show(state, action:PayloadAction<{modalType:ModalVal}>){
      state.type = action.payload.modalType;
      state.isShow = true;
    },
    hide(state){
      state.isShow = false;
    },
    toggle(state){
      state.isShow = !state.isShow
    },
    startLoading(state){
      state.isShow = true;
      state.type = MODAL_INFO.LOADING;
    },
    endLoading(state){
      state.isShow = false;
    }
  }
})

export const {show, hide, toggle, startLoading, endLoading} = ModalInfoSlicer.actions;
export default ModalInfoSlicer.reducer;