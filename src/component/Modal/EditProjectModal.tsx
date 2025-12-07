import type React from "react";
import { ModalBase } from "./ModalBase";
import { TextInput } from "../Form/TextInput";
import { useAppSelector } from "../../app/hook";
import { ButtonArea } from "../Form/ButtonArea";
import { Button } from "../Form/Button";
import { useState } from "react";


export const EditProjectModal : React.FC = () => {
  const project = useAppSelector(state => state.currentProject.currentProject);

  const [localPjName, setLocalPjName] = useState<string>(project.name)
  const changeLocalPjName = (e:React.ChangeEvent<HTMLInputElement>) => {setLocalPjName(e.target.value)}

  const [localStDt, setStDt] = useState<string>(project.startDt)
  const changeLocalStDt = (e:React.ChangeEvent<HTMLInputElement>) => (setStDt(e.target.value));

  const [localEdDt, setEdDt] = useState<string>(project.endDt);
  const changeLocalEdDt = (e:React.ChangeEvent<HTMLInputElement>) => (setEdDt(e.target.value));

  const [localClient, setLocalClient] = useState<string>(project.client);
  const changeLocalClient = (e:React.ChangeEvent<HTMLInputElement>) => (setLocalClient(e.target.value));

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
          <Button label="編集する"></Button>
        </ButtonArea>
      </div>
    </ModalBase>
  )
}