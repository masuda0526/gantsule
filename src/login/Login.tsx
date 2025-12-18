import type React from "react";
import { TextInput } from "../component/Form/TextInput";
import { useState } from "react";
import { PassInput } from "../component/Form/PassInput";
import { ButtonArea } from "../component/Form/ButtonArea";
import { Button } from "../component/Form/Button";
import '../styles/Login.scss';
import { LinkButton } from "../component/Form/LinkButton";
import { go } from "../util/HashOperate";
import { useAppDispatch } from "../app/hook";
import { URL } from "../constants/Url";
import { ValidationContext } from "../util/validation/ValidationContext";
import { ValidationBuilder } from "../util/validation/ValidationBuilder";
import { api, type ApiResponse } from "../util/AxiosUtil";
import { endLoading, startLoading } from "../app/ModalReducer";
import { setLoginInfo } from "../app/LoginInfoReducer";

type ResponseType = {
  token:string;
  userId:string;
}
export const Login : React.FC = () => {
  // redux
  const dispatch = useAppDispatch();

  // 状態管理
  const [userId, setUserId] = useState<string>('');
  const changeUserId = (e:React.ChangeEvent<HTMLInputElement>) => {setUserId(e.target.value)}
  const [pass, setPass] = useState<string>('')
  const changePass = (e:React.ChangeEvent<HTMLInputElement>) => {setPass(e.target.value)}

  const login = () => {
    // ローディング画面
    dispatch(startLoading());

    // バリデーション
    const v = new ValidationContext();
    v.add(new ValidationBuilder('userId', userId, 'ユーザーID').require());
    v.add(new ValidationBuilder('pass', pass, 'パスワード').require());
    v.validate(false);
    if(v.isError()){
      alert(v.getErrorMsgsForAlert());
      dispatch(endLoading());
      return;
    }

    // サーバーへ送信
    api.post<ApiResponse<ResponseType>>(URL.POST_LOGIN, {
      userId:userId,
      password:pass
    }).then((res) => {
      console.log(res.data);
      const data = res.data.data;
      dispatch(setLoginInfo({userId:data.userId, token:data.token}));
      go(`#/list?userId=${userId}`);
    }).catch(err => {
      console.log('エラー')
      console.log(err);
    })

    dispatch(endLoading());
  }

  const register = () => {
    go('#/register')
  }


  return (
    <div className="login-container">
      <h3>ログイン</h3>
      <TextInput title="ユーザーID" field="userId" value={userId} onChange={changeUserId} option={{validRules:'require'}}></TextInput>
      <PassInput title="パスワード" field="pass" value={pass} onChange={changePass} option={{validRules:'require'}}></PassInput>
      <ButtonArea option={{position:'left'}}>
        <LinkButton label="新規登録へ" onClick={register}></LinkButton>
      </ButtonArea>
      <ButtonArea>
        <Button label="ログイン" onClick={login}></Button>
      </ButtonArea>
      {/* <ButtonArea option={{position:'center'}}>
        <LinkButton label="パスワードを忘れた方はこちら"></LinkButton>
      </ButtonArea> */}
    </div>
  )
}