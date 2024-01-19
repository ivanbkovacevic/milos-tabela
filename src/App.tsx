import React, { useContext, useEffect, Suspense, useState } from "react";
import { ContextUI } from "./context/contextUI";
import PopUp from "./PopUp/PopUp";
import { PopUpVariant } from "./constants";
import "./globals.scss";
import style from "./App.module.scss";
import ConfirmAction from "./ConfirmAction/ConfirmAction";
import MyTableProjects from "./MyTable/MyTableProjects";
import FormProject from "./Form/FormProject";

const App: React.FC = () => {
  const { stateUI, togglePopUp, setLoadApp } = useContext(ContextUI);
  const { popUpIsOpen, popUpVariant } = stateUI;

  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Web development projects";

    // Optionally, you can reset the title when the component unmounts

    return () => {
      document.title = "Default Title";
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

  const [formData, setFormData] = useState({
    pass: "",
  });
  
  const storedPass = localStorage.getItem("pass");
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadApp(formData.pass)
  };


  return (
    <div className={style.wrapper}>
      <h1>Web Development projects</h1>
      {(storedPass === null || storedPass !== "milosAffiliateTabela") && (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pass"
          value={formData.pass}
          onChange={handleInputChange}
        />
        <button type="submit">Load</button>
      </form>
      ) }
      {( storedPass === "milosAffiliateTabela") && (
        <>
      <button
        className={style.btnAddNew}
        onClick={() => togglePopUp(PopUpVariant.ADD_NEW_PROJECT)}
      >
        Add new
      </button>
          <Suspense fallback={<div>Loading...</div>}>
            <MyTableProjects />
            {popUpIsOpen && <PopUp>{generatePopUpChildren()}</PopUp>}
          </Suspense>
        </>
      )}
    </div>
  );
};

export default App;
