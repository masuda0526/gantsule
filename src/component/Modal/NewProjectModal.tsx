import type React from "react";
import { ModalBase } from "./ModalBase";
import { TextInput } from "../Form/TextInput";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { ButtonArea } from "../Form/ButtonArea";
import { Button } from "../Form/Button";
import { useState } from "react";
import { URL } from "../../constants/Url";
import { hide, show } from "../../app/ModalReducer";
import { MODAL_INFO } from "../../constants/Modal";
import { ValidationContext } from "../../util/validation/ValidationContext";
import { ValidationBuilder } from "../../util/validation/ValidationBuilder";
import { setProjectInfos } from "../../app/ProjectInfosReducer";
import type Project from "../../interface/Project";
import { addErrors } from "../common/Errors/ErrorUtil";
import { Errors } from "../common/Errors/Errors";
import { resetErrors } from "../../app/ErrorReducer";
import { api } from "../../util/AxiosUtil";


export const NewProjectModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.loginInfo.userId);

  const [localPjName, setLocalPjName] = useState<string>('')
  const changeLocalPjName = (e: React.ChangeEvent<HTMLInputElement>) => { setLocalPjName(e.target.value) }

  const [localStDt, setStDt] = useState<string>('')
  const changeLocalStDt = (e: React.ChangeEvent<HTMLInputElement>) => (setStDt(e.target.value));

  const [localEdDt, setEdDt] = useState<string>('');
  const changeLocalEdDt = (e: React.ChangeEvent<HTMLInputElement>) => (setEdDt(e.target.value));

  const [localClient, setLocalClient] = useState<string>('');
  const changeLocalClient = (e: React.ChangeEvent<HTMLInputElement>) => (setLocalClient(e.target.value));

  const handleClick = async () => {
    // 復元用
    const tmpPjName = localPjName
    const tmpStDt = localStDt
    const tmpEdDt = localEdDt
    const tmpClient = localClient

    dispatch(resetErrors());

    // バリデーション
    const v = new ValidationContext();
    v.add(new ValidationBuilder('name', localPjName, 'プロジェクト名').require().txtmax(30));
    v.add(new ValidationBuilder('startDt', localStDt, 'プロジェクト開始日').require().existdate().dateformat('hypfen'))
    v.add(new ValidationBuilder('endDt', localEdDt, 'プロジェクト終了日').require().existdate().dateformat('hypfen'))
    v.add(new ValidationBuilder('client', localClient, '依頼者').require().txtmax(30));
    v.validate(false);
    if(v.isError()){
      addErrors(v.errors);
      dispatch(show({modalType:MODAL_INFO.NEW_PROJECT}));
      return;
    }

    // 登録
    await api.post(URL.POST_NEW_PROJECT, {
      userId: userId,
      name: localPjName,
      client: localClient,
      startDt: localStDt,
      endDt: localEdDt,
    }).then(res => {
      const data = res.data
      const isSucess: boolean = data.isSuccess;
      // 成功
      if (isSucess) {
        // const successMessages: string[] = data.flashMsgs;
        // alert(successMessages.join('¥n'));
        dispatch(setProjectInfos({projectInfos:data.data.projects as Project[]}))
        dispatch(hide());
        return;
      } 
    }).catch(error => {
      console.log(error);
    })
    // 失敗時に復元
    setLocalClient(tmpClient)
    setLocalPjName(tmpPjName)
    setStDt(tmpStDt)
    setEdDt(tmpEdDt)
  }

  return (
    <ModalBase title="新規プロジェクトを追加">
      <Errors></Errors>
      <div>
        <TextInput
          title="プロジェクト名"
          field="projectName"
          value={localPjName}
          onChange={changeLocalPjName}
          option={{ validRules: 'require|txtmax:30' }}
        ></TextInput>
        <TextInput
          title="プロジェクト開始日"
          field="projectStartDt"
          value={localStDt}
          onChange={changeLocalStDt}
          option={{ validRules: 'require|dateformat:hypfen|existdate' }}
        ></TextInput>
        <TextInput
          title="プロジェクト終了日"
          field="projectEndDt"
          value={localEdDt}
          onChange={changeLocalEdDt}
          option={{ validRules: 'require|dateformat:hypfen|existdate' }}
        ></TextInput>
        <TextInput
          title="依頼者"
          field="client"
          value={localClient}
          onChange={changeLocalClient}
          option={{ validRules: 'require|txtmax:30' }}
        ></TextInput>
        <ButtonArea>
          <Button onClick={handleClick} label="作成する"></Button>
        </ButtonArea>
      </div>
    </ModalBase>
  )
}