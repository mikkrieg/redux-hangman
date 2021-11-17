import React, { useState } from "react";


export const AppContext = React.createContext();

export const AppProvider = ({children}) => {

  const [ openInstructions, setOpenInstructions ] = useState(false);
  const [ openLoser, setOpenLoser ] = useState(false);

  return (
    <AppContext.Provider value=
    {{
      openInstructions,
      setOpenInstructions,
      openLoser, 
      setOpenLoser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
