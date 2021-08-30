import { useEffect } from "react";

import Draggable from "react-draggable";
export const Repository: React.FC<{
  setFocus: () => null;
  selected: boolean;
}> = ({ setFocus, selected }) => {

  useEffect(() => {
    console.log("mounted");
    return () => {console.log("unmounted")}
  },[])

  useEffect(() => {console.log("refreshed")})

  return (
    <Draggable bounds="parent">
      <div className={`repo-wrapper ${selected ? 'bordered' : ''}`} onClick={setFocus}></div>
    </Draggable>
  );
};
