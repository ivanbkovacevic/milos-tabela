import React, { useContext } from "react";
import { ContextUI } from "../context/contextUI";
import style from "./PopUp.module.scss";

interface PopUpProps {
  children: React.ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({ children }) => {
  const { togglePopUp } = useContext(ContextUI);

  return (
    <div className={style.overlay}>
      <div className={style.wrapper}>
        <button onClick={() => togglePopUp()}>&#10006;</button>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
