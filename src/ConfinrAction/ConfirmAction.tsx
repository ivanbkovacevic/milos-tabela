import React, { useContext } from "react";
import { Context } from "../context/context";
import { ContextUI } from "../context/contextUI";
import style from "./ConfirmAction.module.scss";

const ConfirmAction: React.FC = () => {
  const {removeProject, state } = useContext(Context);
  const {  selectedProject } = state;
  const { togglePopUp } = useContext(ContextUI);
  return (
    <div className={style.wrapper}>
      <h2>
        Are you sure that you want to remove this project
      </h2>
      <div className={style.btnsWrapper}>
        <button
          onClick={() => {
            removeProject(selectedProject);
            togglePopUp();
          }}
        >
          Yes
        </button>
        <button onClick={() => togglePopUp()}>No</button>
      </div>
    </div>
  );
};

export default ConfirmAction;
