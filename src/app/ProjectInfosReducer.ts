import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Project from "../interface/Project"

type ProjectInfos = {
  projectInfos:Project[];
}

const initialState : ProjectInfos = {
  projectInfos:[]
}

const projectInfoSlicer = createSlice({
  name:'projectInfos',
  initialState,
  reducers:{
    resetProjectInfos(state){
      state.projectInfos = []
    },
    setProjectInfos(state, action:PayloadAction<{projectInfos:Project[]}>){
      state.projectInfos = action.payload.projectInfos;
    }
  }
})

export const {resetProjectInfos, setProjectInfos} = projectInfoSlicer.actions
export default projectInfoSlicer.reducer;