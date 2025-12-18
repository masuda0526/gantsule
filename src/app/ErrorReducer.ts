import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ErrorInfo } from "../util/validation/ValidationTypes"


type ErrorStore = {
  errors:ErrorInfo[];
}

const initialState:ErrorStore = {
  errors:[]
}

const errorStoreSlicer = createSlice({
  name:'errorStore',
  initialState,
  reducers:{
    setErrors(state, action:PayloadAction<ErrorStore>){
      state.errors = action.payload.errors
    },
    resetErrors(state){
      state.errors = [];
    }
  }
})

export const {setErrors, resetErrors} = errorStoreSlicer.actions;
export default errorStoreSlicer.reducer;