import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type Project from "../interface/Project"
import type Subject from "../interface/Subject"
import type Task from "../interface/Task"

type CurrentProjectStore = {
  isEdit : boolean,
  currentProject : Project
}

const initialState:CurrentProjectStore = {
  isEdit:false,
  currentProject:{name:'', projectId:'', startDt:'', endDt:'', client:'', subjects:[]}
}

const currentProjectReducer = createSlice({
  name:'currentProject',
  initialState,
  reducers:{
    setSubjects(state, action:PayloadAction<{subjects:Subject[]}>){
      state.currentProject.subjects = action.payload.subjects
    },
    addSubject(state, action:PayloadAction<{subject:Subject}>){
      state.currentProject.subjects.push(action.payload.subject);
    },
    updateSubject(state, action:PayloadAction<{subject:Subject}>){
      const target = action.payload.subject;
      state.currentProject.subjects = state.currentProject.subjects.map(sj => sj.subjectId === target.subjectId?target:sj);
    },
    removeSubject(state, action:PayloadAction<{subject:Subject}>){
      state.currentProject.subjects = state.currentProject.subjects.filter(sj => sj.subjectId !== action.payload.subject.subjectId);
    },
    setTasks(state, action:PayloadAction<{tasks:Task[]}>){
      if(action.payload.tasks.length !== 0){
        const sjId = action.payload.tasks[0].subjectId;
        state.currentProject.subjects.forEach(sj => {
          if(sj.subjectId === sjId){
            sj.tasks = action.payload.tasks;
          }
        })
      }
    },
    addTask(state, action:PayloadAction<{task:Task}>){
      const sjId = action.payload.task.subjectId;
      state.currentProject.subjects.forEach(sj => {
        if(sj.subjectId === sjId){
          sj.tasks.push(action.payload.task);
        }
      })
    },
    updateTask(state, action:PayloadAction<{task:Task}>){
      const target = action.payload.task;
      state.currentProject.subjects.forEach(sj => {
        if(sj.subjectId === target.subjectId){
          sj.tasks = sj.tasks.map(tk => tk.taskId === target.taskId?target:tk);
        }
      })
    },
    removeTask(state, action:PayloadAction<{task:Task}>){
      const target = action.payload.task;
      state.currentProject.subjects.forEach(sj => {
        if(sj.subjectId === target.subjectId){
          sj.tasks = sj.tasks.filter(tk => tk.taskId !== target.taskId);
        }
      })
    },
    toggleEditMode(state){
      state.isEdit = !state.isEdit;
    }
  }
})

export const {
  setSubjects, 
  addSubject, 
  updateSubject, 
  removeSubject,
  setTasks,
  addTask,
  updateTask,
  removeTask,
  toggleEditMode,
} = currentProjectReducer.actions;

export default currentProjectReducer.reducer;