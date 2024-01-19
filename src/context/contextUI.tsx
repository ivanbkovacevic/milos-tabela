import React from "react";
import { PopUpVariant } from "../constants";

interface ContextState {
  popUpIsOpen: boolean;
  popUpVariant: string;
  loadApp: boolean,
  
}

interface ContextProps {
  stateUI: ContextState;
  setLoadApp: (key:string) => void;
  togglePopUp: (v?: string ) => void;
}

const ContextUI = React.createContext<ContextProps>({
  stateUI: {
    popUpIsOpen: false,
    popUpVariant: PopUpVariant.ADD_NEW_PROJECT,
    loadApp: false,
  },
  togglePopUp: () => {},
  setLoadApp: () => {},

});

function ContextUIProvider(props: React.PropsWithChildren<{}>) {
  const [stateUI, setState] = React.useState<ContextState>({
    popUpIsOpen: false,
    popUpVariant: PopUpVariant.ADD_NEW_PROJECT,
    loadApp: false,

  });

  const togglePopUp = (variant: string = PopUpVariant.ADD_NEW_PROJECT) => {
    setState({
      ...stateUI,
      popUpIsOpen: !stateUI.popUpIsOpen,
      popUpVariant: variant,
    });
  };

  const setLoadApp = (key:string) => {
    setState({
      ...stateUI,
      loadApp: !stateUI.loadApp,
    });
    localStorage.setItem("pass", key);
  };


  return (
    <ContextUI.Provider
      value={{
        stateUI,
        togglePopUp,
        setLoadApp,
      }}
    >
      {props.children}
    </ContextUI.Provider>
  );
}

export { ContextUI, ContextUIProvider };
