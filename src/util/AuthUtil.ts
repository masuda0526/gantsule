import { store } from "../app/store"

export const isLogin = () => {
  const state = store.getState();
  const token = state.loginInfo.token;
  const userId = state.loginInfo.userId;
  return token !==null && userId !==null;
}