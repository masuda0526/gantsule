import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type LoginInfo = {
  userId:string|null,
  token:string|null,
}

const initialState:LoginInfo = {
  userId:null,
  token:null
}

const loginInfoSlicer = createSlice({
  name:'loginInfo',
  initialState,
  reducers:{
    setLoginInfo(state, action:PayloadAction<LoginInfo>){
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    logout(state){
      state = initialState
    }
  }
})

export const {setLoginInfo, logout} = loginInfoSlicer.actions;
export default loginInfoSlicer.reducer;