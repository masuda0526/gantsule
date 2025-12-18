import React, { useState } from "react"
import { TextInput } from "../component/Form/TextInput"
import { ButtonArea } from "../component/Form/ButtonArea";
import { Button } from "../component/Form/Button";
import '../styles/Register.scss';
import { PassInput } from "../component/Form/PassInput";
import { ValidationContext } from "../util/validation/ValidationContext";
import { ValidationBuilder } from "../util/validation/ValidationBuilder";
import { useAppDispatch } from "../app/hook";
import { endLoading, startLoading } from "../app/ModalReducer";
import axios from "axios";
import { URL } from "../constants/Url";
import { go, goError } from "../util/HashOperate";
import { resetErrors, setErrors } from "../app/ErrorReducer";
import { Errors } from "../component/common/Errors/Errors";

export const Register:React.FC = () => {
  // redux
  const dispatch = useAppDispatch();
  dispatch(resetErrors());

  // 状態管理
  const [userId, setUserId] = useState<string>('');
  const changeUserId = (e:React.ChangeEvent<HTMLInputElement>) => {setUserId(e.target.value)}

  const [password, setPass] = useState<string>('');
  const changePass = (e:React.ChangeEvent<HTMLInputElement>) => {setPass(e.target.value)}

  const [rePassword, setRePass] = useState<string>('');
  const changeRePass = (e:React.ChangeEvent<HTMLInputElement>) => {setRePass(e.target.value)};
  
  const [email, setEmail] = useState<string>('');
  const changeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)};

  const [name, setName] = useState<string>('');
  const changeName = (e:React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value)}

  // クリックイベント
  const regist = () => {
    dispatch(startLoading())
    dispatch(resetErrors());
    const v = new ValidationContext();
    v.add(new ValidationBuilder('userId', userId, 'ユーザーID').require().txtbetween(5, 20))
    v.add(new ValidationBuilder('name', name, '利用者名').require().txtmax(20));
    v.add(new ValidationBuilder('email', email, 'メールアドレス').require().txtmax(50).email());
    v.add(new ValidationBuilder('password', password, 'パスワード').require().txtbetween(8, 20));
    v.add(new ValidationBuilder('repassword', rePassword, '確認用パスワード').require().txtbetween(8, 20));
    v.validate(false);
    if(v.isError()){
      dispatch(setErrors({errors:v.errors}))
      dispatch(endLoading())
      return 
    }

    // パスワード一致チェック
    if(password !== rePassword){
      dispatch(setErrors({errors:[{field:'password', message:'パスワードと確認用パスワードが一致しません。'}]}))
      dispatch(endLoading());
      return 
    }

    axios.post(URL.POST_REGISTER, {
      userId:userId,
      name:name,
      pass:password,
      repass:rePassword,
      email:email
    }).then(res => {
      console.log(res.data);
      const data = res.data;
      if(data.isSuccess){
        dispatch(endLoading());
        go(`/#/list?userId=${userId}`);
      }else{
        alert('登録に失敗しました');
        dispatch(endLoading());
      }
    }).catch(error => {
      console.log(error);
      alert('予期せぬエラーが発生しました。しばらく経ってから登録してください。');
      goError('予期せぬエラーが発生しました。しばらく経ってから登録してください。');
    })
  }

  return (
    <div className="register-container">
      <Errors></Errors>
      <h3>新規登録</h3>
      <TextInput title="ユーザーID" field="userId" value={userId} onChange={changeUserId} option={{validRules:'require|txtbetween:5:20'}}></TextInput>
      <TextInput title='利用者名' field="name" value={name} onChange={changeName} option={{validRules:'require|txtmax:20'}}></TextInput>
      <TextInput title="メールアドレス" field='email' value={email} onChange={changeEmail} option={{validRules:'require|txtmax:50|email'}}></TextInput>
      <PassInput title="パスワード" field="password" value={password} onChange={changePass} option={{validRules:'require|txtbetween:8:20'}}></PassInput>
      <PassInput title="確認用パスワード" field="repassword" value={rePassword} onChange={changeRePass} option={{validRules:'require|txtbetween:8:20'}}></PassInput>
      <ButtonArea>
        <Button label="登録する" onClick={regist}></Button>
      </ButtonArea>
    </div>
  )
}