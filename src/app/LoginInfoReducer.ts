import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type LoginInfo = {
  isLogin:boolean,
  userId:string|null,
  limitDt:string|null,
  token:string|null,
}

const initialState:LoginInfo = {
  isLogin:false,
  userId:null,
  limitDt:null,
  token:null
}

const loginInfoSlicer = createSlice({
  name:'loginInfo',
  initialState,
  reducers:{
    setLoginInfo(state, action:PayloadAction<LoginInfo>){
      state.isLogin = action.payload.isLogin;
      state.userId = action.payload.userId;
      state.limitDt = action.payload.limitDt;
      state.token = action.payload.token;
    },
    updateLimit(state, action:PayloadAction<{limitDt:string}>){
      state.limitDt = action.payload.limitDt;
    },
    logout(){
      return initialState
    }
  }
})

export const {setLoginInfo, updateLimit, logout} = loginInfoSlicer.actions;
export default loginInfoSlicer.reducer;