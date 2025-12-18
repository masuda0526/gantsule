import axios, { type AxiosResponse } from "axios";
import type { ErrorInfo } from "./validation/ValidationTypes";
import { go } from "./HashOperate";
import { addErrors } from "../component/common/Errors/ErrorUtil";

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
      addErrors(data.errors)
      if(data.isRedirect){
        const url = data.redirectUrl?data.redirectUrl:'/';
        go(url);
      }      
    }
    return res;
  },
  // 接続エラー
  err => {
    return Promise.reject(err)
  }
)
