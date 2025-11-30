import type React from "react";

type PositionKey = 'center'|'left'|'right'|'between'|'even'|'around';
type Option = {
  position?:PositionKey;
}

export const ButtonArea:React.FC<{children:React.ReactNode, option?:Option}> = ({children, option}) => {
  const {
    position = 'center'
  } = option || {}
  
  return (
    <div style={{display:'flex', justifyContent:getPositionStyleString(position)}}>
      {children}
    </div>
  )
}

const getPositionStyleString = (pos:PositionKey) => {
  if(pos === 'between'){
    return 'space-between'
  }
  if(pos === 'even'){
    return 'space-evenly'
  }
  if(pos === 'around'){
    return 'space-around'
  }
  return pos
}