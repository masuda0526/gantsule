import type React from "react";
import { TextInput } from "../component/Form/TextInput";
import { useState } from "react";
import { PassInput } from "../component/Form/PassInput";
import { ButtonArea } from "../component/Form/ButtonArea";
import { Button } from "../component/Form/Button";
import '../styles/Login.scss';

export const Login : React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const changeUserId = (e:React.ChangeEvent<HTMLInputElement>) => {setUserId(e.target.value)}
  const [pass, setPass] = useState<string>('')
  const changePass = (e:React.ChangeEvent<HTMLInputElement>) => {setPass(e.target.value)}


  return (
    <div className="login-container">
      <h3>ログイン</h3>
      <TextInput title="ユーザーID" field="userId" value={userId} onChange={changeUserId}></TextInput>
      <PassInput title="パスワード" field="pass" value={pass} onChange={changePass}></PassInput>
      <ButtonArea>
        <Button label="ログイン"></Button>
      </ButtonArea>
    </div>
  )
}