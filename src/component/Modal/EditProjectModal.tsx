import type React from "react";
import { ModalBase } from "./ModalBase";
import { TextInput } from "../Form/TextInput";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { ButtonArea } from "../Form/ButtonArea";
import { Button } from "../Form/Button";
import { useState } from "react";
import axios from "axios";
import { URL } from "../../constants/Url";
import { hide, show, startLoading } from "../../app/ModalReducer";
import { setProject } from "../../app/CurrentProjectReducer";
import type { ErrorInfo } from "../../util/validation/ValidationTypes";
import { MODAL_INFO } from "../../constants/Modal";


export const EditProjectModal : React.FC = () => {
  const project = useAppSelector(state => state.currentProject.currentProject);
  const userId = useAppSelector(state => state.loginInfo.userId);
  const dispatch = useAppDispatch()

  const [localPjName, setLocalPjName] = useState<string>(project.name)
  const changeLocalPjName = (e:React.ChangeEvent<HTMLInputElement>) => {setLocalPjName(e.target.value)}

  const [localStDt, setStDt] = useState<string>(project.startDt)
  const changeLocalStDt = (e:React.ChangeEvent<HTMLInputElement>) => (setStDt(e.target.value));

  const [localEdDt, setEdDt] = useState<string>(project.endDt);
  const changeLocalEdDt = (e:React.ChangeEvent<HTMLInputElement>) => (setEdDt(e.target.value));

  const [localClient, setLocalClient] = useState<string>(project.client);
  const changeLocalClient = (e:React.ChangeEvent<HTMLInputElement>) => (setLocalClient(e.target.value));

  const handleClick = async() => {
    startLoading()
    await axios.post(URL.POST_EDIT_INFO, {
      projectInfo:{
        projectId:project.projectId,
        name:localPjName,
        client:localClient, 
        startDt:localStDt,
        endDt:localEdDt,
      },
      userId:userId
    }).then(res => {
      const data = res.data
      const isSucess:boolean = data.isSuccess;
      if(isSucess){
        dispatch(setProject({project:{...project, name:localPjName,client:localClient, startDt:localStDt, endDt:localEdDt}}))
        const successMessages :string[] = data.flashMsgs;
        alert(successMessages.join('¥n'));
        dispatch(hide());
      }else{
        const errors:ErrorInfo[] = data.errors;
        const msgs:string[] = errors.map(e => {
          return e.message
        });
        alert(msgs.join('¥n'));
        dispatch(show({modalType:MODAL_INFO.EDIT_PROJECT}))
      }
    }).catch(error => {
      console.log(error);
      dispatch(show({modalType:MODAL_INFO.EDIT_PROJECT}))
    })
  }

  return (
    <ModalBase title="プロジェクトを編集">
      <div>
        <TextInput 
          title="プロジェクト名"
          field="projectName"
          value={localPjName}
          onChange={changeLocalPjName}
          option={{validRules:'require|txtmax:30'}}
        ></TextInput>
        <TextInput
          title="プロジェクト開始日"
          field="projectStartDt"
          value={localStDt}
          onChange={changeLocalStDt}
          option={{validRules:'require|dateformat:hypfen|existdate'}}
        ></TextInput>
        <TextInput
          title="プロジェクト終了日"
          field="projectEndDt"
          value={localEdDt}
          onChange={changeLocalEdDt}
          option={{validRules:'require|dateformat:hypfen|existdate'}}
        ></TextInput>
        <TextInput
          title="依頼者"
          field="client"
          value={localClient}
          onChange={changeLocalClient}
          option={{validRules:'require|txtmax:30'}}
        ></TextInput>
        <ButtonArea>
          <Button onClick={handleClick} label="編集する"></Button>
        </ButtonArea>
      </div>
    </ModalBase>
  )
}