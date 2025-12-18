import axios, { type AxiosResponse } from "axios";
import type { ErrorInfo } from "./validation/ValidationTypes";
import { go } from "./HashOperate";

export type ApiResponse<T=unknown> = {
  isSuccess:boolean;
  isRedirect:boolean;
  redirectUrl?:string;
  data:T;
  errors?:ErrorInfo[];
}

export const api = axios.create();
api.interceptors.response.use(
  <T>(res:AxiosResponse<ApiResponse<T>>) => {
    const data = res.data;
    if(!data.isSuccess){
      console.log('サーバーエラー')
      console.log(data.errors);
      if(data.isRedirect){
        const url = data.redirectUrl?data.redirectUrl:'/';
        go(url);
      }
      // エラーを表示する処理
    }
    return res;
  },
  // 接続エラー
  err => {
    return Promise.reject(err)
  }
)
