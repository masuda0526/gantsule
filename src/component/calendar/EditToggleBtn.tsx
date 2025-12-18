import type React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { toggleEditMode, updateSubject } from "../../app/CurrentProjectReducer";
import { checkStatusUnderTasks } from "../../util/StatusUtil";
import { ValidationContext } from "../../util/validation/ValidationContext";
import { addSubjectsValidator } from "../../util/validation/unique/ProjectValidation";
import axios from "axios";
import { URL } from "../../constants/Url";
import type Subject from "../../interface/Subject";
import { endLoading, startLoading } from "../../app/ModalReducer";
import type { ErrorInfo } from "../../util/validation/ValidationTypes";

export const EditToggleBtn: React.FC = () => {
  // redux
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  const subjects = useAppSelector(state => state.currentProject.currentProject.subjects);
  const project = useAppSelector(state => state.currentProject.currentProject)
  const dispatch = useAppDispatch();

  // バリデーション構築
  const vc = new ValidationContext()
  addSubjectsValidator(subjects, vc);

  // 編集モード切り替え
  const handleClick = () => {
    dispatch(startLoading());
    if (isEdit) {
      subjects.forEach(sj => {
        const statusItem = checkStatusUnderTasks(sj.tasks);
        // タスクの状況に応じてステータスを変更
        if (statusItem.value !== sj.status) {
          dispatch(updateSubject({ subject: { ...sj, status: statusItem.value } }))
        }
      })

      vc.validate(false);
      if(vc.isError()){
        alert(vc.getErrorMsgsForAlert());
        return 
      }

      console.log(project);
      axios.post(URL.POST_EDIT_SUBJECT, project)
      .then(res => {
        console.log(res.data);
        const data = res.data.data;
        if(res.data.isSuccess){
          const subjects = data.subjects as Subject[]
          subjects.forEach(sj => {
            dispatch(updateSubject({subject:sj}));
          })
        }else{
          const errors = res.data.errors as ErrorInfo[];
          const l = errors.map(e => e.message);
          alert(l.join('\n'))
        }
      }).catch(error => {
        console.log(error);
      })
    }
    dispatch(toggleEditMode());
    dispatch(endLoading());
  }
  
  return (
    <div>
      <FontAwesomeIcon icon={isEdit ? faToggleOn : faToggleOff} onClick={handleClick} />
      編集モード{isEdit ? 'ON' : 'OFF'}
    </div>
  )

}