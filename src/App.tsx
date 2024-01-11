import React, { useContext, useEffect } from "react";
import { ContextUI } from "./context/contextUI";
import PopUp from "./PopUp/PopUp";
import { PopUpVariant } from "./constants";
import "./globals.scss";
import style from "./App.module.scss";
import ConfirmAction from "./ConfinrAction/ConfirmAction";
import MyTableProjects from "./MyTable/MyTableProjects";
import FormProject from "./Form/FormProject";

const App: React.FC = () => {
  const { stateUI, togglePopUp } = useContext(ContextUI);
  const { popUpIsOpen, popUpVariant } = stateUI;

  useEffect(() => {
    // Set the document title when the component mounts
    document.title = 'Web development projects';

    // Optionally, you can reset the title when the component unmounts
    return () => {
      document.title = 'Default Title';
    };
  }, []); 
  const generatePopUpChildren = () => {
    switch (popUpVariant) {

      case PopUpVariant.ADD_NEW_PROJECT:
        return <FormProject formAction={PopUpVariant.ADD_NEW_PROJECT} />;
      case PopUpVariant.CONFIRM_PROJECT:
        return <ConfirmAction />;
      case PopUpVariant.EDIT_PROJECT:
        return <FormProject formAction={PopUpVariant.EDIT_PROJECT} />;
    }
  };

  return (
    <div className={style.wrapper}>
      <h1>Web Development projects</h1>
      <button
        className={style.btnAddNew}
        onClick={() => togglePopUp(PopUpVariant.ADD_NEW_PROJECT)}
      >
        Add new
      </button>
      <MyTableProjects />
      {popUpIsOpen && <PopUp>{generatePopUpChildren()}</PopUp>}
    </div>
  );
};

export default App;
