import {configureStore} from '@reduxjs/toolkit';
import LoginInfoReducer from './LoginInfoReducer';
import CurrentProjectReducer from './CurrentProjectReducer';
import ModalInfoReducer from './ModalReducer';

export const store = configureStore({
  reducer:{
    loginInfo:LoginInfoReducer,
    currentProject:CurrentProjectReducer,
    modalInfo:ModalInfoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;