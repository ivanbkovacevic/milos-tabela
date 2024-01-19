import React from "react";
import { PopUpVariant } from "../constants";

interface ContextState {
  popUpIsOpen: boolean;
  popUpVariant: string;
}

interface ContextProps {
  stateUI: ContextState;
  togglePopUp: (v?: string ) => void;
}

const ContextUI = React.createContext<ContextProps>({
  stateUI: {
    popUpIsOpen: false,
    popUpVariant: PopUpVariant.ADD_NEW_PROJECT,
  },
  togglePopUp: () => {},
});

function ContextUIProvider(props: React.PropsWithChildren<{}>) {
  const [stateUI, setState] = React.useState<ContextState>({
    popUpIsOpen: false,
    popUpVariant: PopUpVariant.ADD_NEW_PROJECT,
  });

  const togglePopUp = (variant: string = PopUpVariant.ADD_NEW_PROJECT) => {
    setState({
      ...stateUI,
      popUpIsOpen: !stateUI.popUpIsOpen,
      popUpVariant: variant,
    });
  };


  return (
    <ContextUI.Provider
      value={{
        stateUI,
        togglePopUp,
      }}
    >
      {props.children}
    </ContextUI.Provider>
  );
}

export { ContextUI, ContextUIProvider };
